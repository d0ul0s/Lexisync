const mongoose = require('mongoose');

// A Schema defines the structure of our database document
const wordSchema = new mongoose.Schema({
  // The Binubolinao word itself
  binubolinaoWord: {
    type: String,
    required: true, // This field is mandatory
  },
  // The English translation of the word
  englishMeaning: {
    type: String,
    required: true,
  },
  // The grammatical part of speech (e.g., Noun, Verb, Adjective)
  partOfSpeech: {
    type: String,
    required: true,
  },
  // An example sentence using the word in Binubolinao
  exampleSentenceBinubolinao: {
    type: String,
  },
  // The English translation of the example sentence
  exampleSentenceEnglish: {
    type: String,
  },
  // Array of usernames who upvoted this word
  upvotes: [{
    type: String
  }],
  // Array of usernames who downvoted this word
  downvotes: [{
    type: String
  }],
  // The username of the user who submitted the word
  submittedBy: {
    type: String,
    required: true,
  }
}, {
  // Automatically add 'createdAt' and 'updatedAt' timestamps
  timestamps: true 
});

// We create a Model from the schema so we can interact with the "words" collection in MongoDB
const Word = mongoose.model('Word', wordSchema);

// Export the model so other files can use it
module.exports = Word;
