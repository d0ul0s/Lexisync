const Word = require('../models/Word');

/**
 * Controller to create a new word in the database
 * This runs when the frontend sends a POST request to add a word
 */
const createWord = async (req, res) => {
  try {
    // 1. Extract data from the incoming request body
    const { 
      binubolinaoWord, 
      englishMeaning, 
      partOfSpeech, 
      exampleSentenceBinubolinao, 
      exampleSentenceEnglish,
      submittedBy
    } = req.body;

    // 2. Create a new Word document using the data
    const newWord = new Word({
      binubolinaoWord,
      englishMeaning,
      partOfSpeech,
      exampleSentenceBinubolinao,
      exampleSentenceEnglish,
      submittedBy
    });

    // 3. Save the document to the MongoDB database
    const savedWord = await newWord.save();

    // 4. Send a success response back to the frontend with the saved data
    res.status(201).json(savedWord);
  } catch (error) {
    // If an error occurs (e.g. missing required fields), send an error response
    console.error("Error creating word:", error);
    res.status(500).json({ message: 'Failed to create word', error: error.message });
  }
};

const getAllWords = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const search = req.query.search || '';
    const filter = req.query.filter || 'All';

    // Build query
    const query = {};
    if (search) {
      query.$or = [
        { binubolinaoWord: { $regex: search, $options: 'i' } },
        { englishMeaning: { $regex: search, $options: 'i' } }
      ];
    }
    if (filter !== 'All') {
      query.partOfSpeech = filter;
    }

    // Fetch paginated results
    const words = await Word.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for this query to determine if there are more pages
    const totalWords = await Word.countDocuments(query);
    const hasMore = skip + words.length < totalWords;

    res.status(200).json({
      words,
      hasMore,
      total: totalWords
    });
  } catch (error) {
    console.error("Error fetching words:", error);
    res.status(500).json({ message: 'Failed to fetch words', error: error.message });
  }
};

/**
 * Controller to vote on a word
 * Endpoint: PUT /api/words/:id/vote
 */
const voteWord = async (req, res) => {
  try {
    const { id } = req.params;
    const { voteType, username } = req.body;

    if (!username) {
      return res.status(401).json({ message: 'Must be logged in to vote.' });
    }

    const word = await Word.findById(id);
    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }

    // Convert old Number types to Arrays if they are corrupted (safety check for old data)
    if (typeof word.upvotes === 'number') {
      word.upvotes = Array.from({ length: word.upvotes }, (_, i) => `anon_${i}`);
    } else if (!Array.isArray(word.upvotes)) {
      word.upvotes = [];
    }

    if (typeof word.downvotes === 'number') {
      word.downvotes = Array.from({ length: word.downvotes }, (_, i) => `anon_${i}`);
    } else if (!Array.isArray(word.downvotes)) {
      word.downvotes = [];
    }

    const hasUpvoted = word.upvotes.includes(username);
    const hasDownvoted = word.downvotes.includes(username);

    if (voteType === 'upvote') {
      if (hasUpvoted) {
        // Toggle off upvote
        word.upvotes = word.upvotes.filter(u => u !== username);
      } else {
        // Add upvote, remove downvote if exists
        word.upvotes.push(username);
        word.downvotes = word.downvotes.filter(u => u !== username);
      }
    } else if (voteType === 'downvote') {
      if (hasDownvoted) {
        // Toggle off downvote
        word.downvotes = word.downvotes.filter(u => u !== username);
      } else {
        // Add downvote, remove upvote if exists
        word.downvotes.push(username);
        word.upvotes = word.upvotes.filter(u => u !== username);
      }
    } else {
      return res.status(400).json({ message: 'Invalid voteType. Must be upvote or downvote.' });
    }

    const updatedWord = await word.save();
    res.status(200).json(updatedWord);
  } catch (error) {
    console.error("Error voting on word:", error);
    res.status(500).json({ message: 'Failed to vote on word', error: error.message });
  }
};

/**
 * Controller to fetch the leaderboard
 * Endpoint: GET /api/words/leaderboard
 */
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Word.aggregate([
      { $match: { submittedBy: { $exists: true, $ne: null } } },
      { $group: { _id: "$submittedBy", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $project: { username: "$_id", count: 1, _id: 0 } }
    ]);
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: 'Failed to fetch leaderboard', error: error.message });
  }
};

// Export the controller functions so the routes can use them
module.exports = {
  createWord,
  getAllWords,
  voteWord,
  getLeaderboard
};
