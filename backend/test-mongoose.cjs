const mongoose = require('mongoose');
const Word = require('./backend/models/Word');

mongoose.connect('mongodb+srv://admin:admin123@lexisync.7ezmocg.mongodb.net/lexisync?retryWrites=true&w=majority&appName=LexiSync')
  .then(async () => {
    const word = await Word.findOne();
    console.log("Upvotes type:", typeof word.upvotes);
    console.log("Upvotes isArray:", Array.isArray(word.upvotes));
    console.log("Upvotes value:", word.upvotes);
    mongoose.disconnect();
  });
