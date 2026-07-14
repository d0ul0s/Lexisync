require('dotenv').config(); // Load environment variables from our .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import our routes
const wordRoutes = require('./routes/wordRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize the Express app
const app = express();

// =======================
// Middleware Setup
// =======================
// Enable CORS so the React frontend can talk to this API
app.use(cors());

// Enable Express to parse JSON data from incoming requests
app.use(express.json());

// =======================
// Routes Setup
// =======================
// Register the wordRoutes. All routes in that file will be prefixed with /api/words
app.use('/api/words', wordRoutes);

// Register the authRoutes.
app.use('/api/auth', authRoutes);

// A simple test route to ensure the server is running
app.get('/', (req, res) => {
  res.send('LexiSync Backend API is running!');
});

// =======================
// Database Connection
// =======================
// Get the port and database URI from environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Database');
    // Start the server only AFTER a successful database connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      
      // Anti-sleep mechanism for Render free tier
      // Render automatically provides RENDER_EXTERNAL_URL for web services
      const KEEP_ALIVE_URL = process.env.RENDER_EXTERNAL_URL; 
      if (KEEP_ALIVE_URL) {
        const https = require('https');
        // Ping every 14 minutes (Render sleeps after 15 minutes of inactivity)
        setInterval(() => {
          https.get(KEEP_ALIVE_URL, (res) => {
            console.log(`[Keep-Alive] Pinged ${KEEP_ALIVE_URL} - Status: ${res.statusCode}`);
          }).on('error', (err) => {
            console.error(`[Keep-Alive] Error: ${err.message}`);
          });
        }, 14 * 60 * 1000); 
        console.log(`🕒 Keep-alive mechanism activated for ${KEEP_ALIVE_URL}`);
      }
    });
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error.message);
  });
