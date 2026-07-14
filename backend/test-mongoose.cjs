const mongoose = require('mongoose');
const Word = require('./backend/models/Word');

mongoose.connect('mongodb+srv://user:pass@cluster.mongodb.net/lexisync')
  .then(async () => {
    const word = await Word.findOne();
    console.log("Upvotes type:", typeof word.upvotes);
    console.log("Upvotes isArray:", Array.isArray(word.upvotes));
    console.log("Upvotes value:", word.upvotes);
    mongoose.disconnect();
  });
