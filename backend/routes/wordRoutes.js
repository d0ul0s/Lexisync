const express = require('express');
const router = express.Router();

// Import our controller functions
const { createWord, getAllWords, voteWord, getLeaderboard } = require('../controllers/wordController');

/**
 * GET Route to fetch all words
 * Endpoint: GET /api/words
 */
router.get('/', getAllWords);

/**
 * GET Route to fetch the leaderboard
 * Endpoint: GET /api/words/leaderboard
 */
router.get('/leaderboard', getLeaderboard);

/**
 * POST Route to create a new word
 * Endpoint: POST /api/words
 */
router.post('/', createWord);

/**
 * PUT Route to vote on a word
 * Endpoint: PUT /api/words/:id/vote
 */
router.put('/:id/vote', voteWord);

// Export the router so server.js can use it
module.exports = router;
