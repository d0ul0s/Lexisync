require('dotenv').config();
const mongoose = require('mongoose');
const Word = require('./models/Word');

const uri = process.env.MONGO_URI;

const words = [
  { binubolinaoWord: "Ngaran", englishMeaning: "Name", partOfSpeech: "Noun", exampleSentenceBinubolinao: "Ani ngaran mo?", exampleSentenceEnglish: "What is your name?", submittedBy: "David" },
  { binubolinaoWord: "Tutawo", englishMeaning: "People", partOfSpeech: "Noun", exampleSentenceBinubolinao: "Mabig a tutawo.", exampleSentenceEnglish: "Good people.", submittedBy: "David" },
  { binubolinaoWord: "Sansinakban", englishMeaning: "World / Universe", partOfSpeech: "Noun", exampleSentenceBinubolinao: "Mabungat a sansinakban.", exampleSentenceEnglish: "The world is big.", submittedBy: "David" },
  { binubolinaoWord: "Tyan", englishMeaning: "Stomach", partOfSpeech: "Noun", exampleSentenceBinubolinao: "Masakit a tyan ko.", exampleSentenceEnglish: "My stomach hurts.", submittedBy: "David" },
  { binubolinaoWord: "Mata", englishMeaning: "Eye", partOfSpeech: "Noun", exampleSentenceBinubolinao: "Abran mo a mata mo.", exampleSentenceEnglish: "Open your eyes.", submittedBy: "David" },
  { binubolinaoWord: "Aso", englishMeaning: "Dog", partOfSpeech: "Noun", exampleSentenceBinubolinao: "Mabisik a aso.", exampleSentenceEnglish: "The dog is fast.", submittedBy: "David" },
  { binubolinaoWord: "Tanda", englishMeaning: "To know", partOfSpeech: "Verb", exampleSentenceBinubolinao: "Kai ko tanda.", exampleSentenceEnglish: "I don't know.", submittedBy: "David" },
  { binubolinaoWord: "Mami", englishMeaning: "To give", partOfSpeech: "Verb", exampleSentenceBinubolinao: "Mami ka nin danum.", exampleSentenceEnglish: "Give some water.", submittedBy: "David" },
  { binubolinaoWord: "Masakit", englishMeaning: "Painful", partOfSpeech: "Adjective", exampleSentenceBinubolinao: "Masakit a tyan ko.", exampleSentenceEnglish: "My stomach is painful.", submittedBy: "David" },
  { binubolinaoWord: "Busat", englishMeaning: "Sibling", partOfSpeech: "Noun", exampleSentenceBinubolinao: "Sya a busat ko.", exampleSentenceEnglish: "He/She is my sibling.", submittedBy: "David" },
  { binubolinaoWord: "Abran", englishMeaning: "To open", partOfSpeech: "Verb", exampleSentenceBinubolinao: "Abran mo a dudungawan.", exampleSentenceEnglish: "Open the window.", submittedBy: "David" },
  { binubolinaoWord: "Dudungawan", englishMeaning: "Window", partOfSpeech: "Noun", exampleSentenceBinubolinao: "Abran mo a dudungawan.", exampleSentenceEnglish: "Open the window.", submittedBy: "David" },
  { binubolinaoWord: "Katyangan", englishMeaning: "In-law", partOfSpeech: "Noun", exampleSentenceBinubolinao: "Mabig a katyangan ko.", exampleSentenceEnglish: "My in-law is good.", submittedBy: "David" },
  { binubolinaoWord: "Yabi na", englishMeaning: "Good evening", partOfSpeech: "Phrase", exampleSentenceBinubolinao: "Yabi na komoyon kaganawan.", exampleSentenceEnglish: "Good evening to all of you.", submittedBy: "David" },
  { binubolinaoWord: "Adti ka mako?", englishMeaning: "Where are you going?", partOfSpeech: "Phrase", exampleSentenceBinubolinao: "Adti ka mako ngonyan?", exampleSentenceEnglish: "Where are you going today?", submittedBy: "David" },
  { binubolinaoWord: "Nabsoy akoy na", englishMeaning: "I am full", partOfSpeech: "Phrase", exampleSentenceBinubolinao: "Salamat, nabsoy akoy na.", exampleSentenceEnglish: "Thank you, I am full already.", submittedBy: "David" },
  { binubolinaoWord: "Tay na", englishMeaning: "Let's go", partOfSpeech: "Phrase", exampleSentenceBinubolinao: "Tay na sa abong.", exampleSentenceEnglish: "Let's go home.", submittedBy: "David" },
  { binubolinaoWord: "Darasan mo", englishMeaning: "Hurry up", partOfSpeech: "Phrase", exampleSentenceBinubolinao: "Darasan mo ta mako tay na.", exampleSentenceEnglish: "Hurry up because we are leaving.", submittedBy: "David" },
  { binubolinaoWord: "Palna palna ka", englishMeaning: "Be careful", partOfSpeech: "Phrase", exampleSentenceBinubolinao: "Palna palna ka sa dalan.", exampleSentenceEnglish: "Be careful on the road.", submittedBy: "David" },
  { binubolinaoWord: "Sinano?", englishMeaning: "How much?", partOfSpeech: "Phrase", exampleSentenceBinubolinao: "Sinano ining sira?", exampleSentenceEnglish: "How much is this fish?", submittedBy: "David" },
  { binubolinaoWord: "Sumubli ka dilap", englishMeaning: "Come back tomorrow", partOfSpeech: "Phrase", exampleSentenceBinubolinao: "Kai ko tanda, sumubli ka dilap.", exampleSentenceEnglish: "I don't know, come back tomorrow.", submittedBy: "David" }
];

mongoose.connect(uri)
  .then(async () => {
    await Word.insertMany(words);
    console.log("Inserted " + words.length + " more words!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
