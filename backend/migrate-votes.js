const mongoose = require('mongoose');
require('dotenv').config();
const Word = require('./models/Word');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB. Running migration...");
    
    // Find all words
    const words = await Word.find({});
    let updatedCount = 0;
    
    for (let word of words) {
      let changed = false;
      
      // If the array contains a number string like "3", reset it
      if (word.upvotes && word.upvotes.length === 1 && !isNaN(word.upvotes[0])) {
        word.upvotes = [];
        changed = true;
      }
      if (word.downvotes && word.downvotes.length === 1 && !isNaN(word.downvotes[0])) {
        word.downvotes = [];
        changed = true;
      }
      
      if (changed) {
        await word.save();
        updatedCount++;
      }
    }
    
    console.log(`Migration complete. Reset votes for ${updatedCount} legacy words.`);
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
