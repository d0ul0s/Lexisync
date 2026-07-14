const mongoose = require('mongoose');
const uri = "mongodb+srv://trashashyaffirm_db_user:j89Q7QgIql8zIbTV@lexisync.7ezmocg.mongodb.net/?appName=Lexisync";

mongoose.connect(uri)
  .then(() => {
    console.log("Connected");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
