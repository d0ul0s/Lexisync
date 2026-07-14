const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

/**
 * POST Route to register a user
 * Endpoint: POST /api/auth/register
 */
router.post('/register', registerUser);

/**
 * POST Route to login a user
 * Endpoint: POST /api/auth/login
 */
router.post('/login', loginUser);

module.exports = router;
