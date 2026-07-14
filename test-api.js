const testPost = async () => {
  try {
    const res = await fetch('http://localhost:5001/api/words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        binubolinaoWord: "test_word",
        englishMeaning: "test_translation",
        partOfSpeech: "Noun"
      })
    });
    
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text.substring(0, 100));
  } catch (err) {
    console.error("Fetch failed:", err);
  }
};
testPost();
