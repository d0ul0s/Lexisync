require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Word = require('./models/Word');

const uri = process.env.MONGO_URI;

const words = [
  {
    binubolinaoWord: "Mabli",
    englishMeaning: "Expensive",
    partOfSpeech: "Adjective",
    exampleSentenceBinubolinao: "Mabli ining sapatos.",
    exampleSentenceEnglish: "These shoes are expensive.",
    submittedBy: "David",
    upvotes: [],
    downvotes: []
  },
  {
    binubolinaoWord: "Rabay kata",
    englishMeaning: "I like you",
    partOfSpeech: "Phrase",
    exampleSentenceBinubolinao: "Rabay kata ta mabisik ka.",
    exampleSentenceEnglish: "I like you because you are fast.",
    submittedBy: "David",
    upvotes: [],
    downvotes: []
  },
  {
    binubolinaoWord: "Kawanan kata",
    englishMeaning: "I love you",
    partOfSpeech: "Phrase",
    exampleSentenceBinubolinao: "Kawanan kata angga sa kapuloan.",
    exampleSentenceEnglish: "I love you to the islands and back.",
    submittedBy: "David",
    upvotes: [],
    downvotes: []
  },
  {
    binubolinaoWord: "Maabig a buklas",
    englishMeaning: "Good morning",
    partOfSpeech: "Phrase",
    exampleSentenceBinubolinao: "Maabig a buklas komoyon kaganawan.",
    exampleSentenceEnglish: "Good morning to all of you.",
    submittedBy: "David",
    upvotes: [],
    downvotes: []
  },
  {
    binubolinaoWord: "Mabitil",
    englishMeaning: "Hungry",
    partOfSpeech: "Adjective",
    exampleSentenceBinubolinao: "Mabitil akoy na, tay na mangan.",
    exampleSentenceEnglish: "I am hungry now, let's eat.",
    submittedBy: "David",
    upvotes: [],
    downvotes: []
  }
];

mongoose.connect(uri)
  .then(async () => {
    console.log("Connected to MongoDB...");
    
    // Check if David exists
    let david = await User.findOne({ username: 'David' });
    if (!david) {
        david = new User({ username: 'David', password: 'David' });
        await david.save();
        console.log("Created user David.");
    } else {
        console.log("User David already exists.");
    }
    
    await Word.insertMany(words);
    console.log("Successfully seeded Binubolinao words!");
    
    process.exit(0);
  })
  .catch(err => {
    console.error("Error seeding data:", err);
    process.exit(1);
  });
