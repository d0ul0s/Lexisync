fetch('http://localhost:5001/api/words/leaderboard')
  .then(res => res.text())
  .then(text => console.log(text))
  .catch(err => console.error(err));
