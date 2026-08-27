/**
 * Authentication API Routes
 *
 * Handles Login, Current User and Logout API endpoints.
 *
 * @module AuthRoutes
 */

const express = require('express');
const router = express.Router();

// Import Login Controller
const AuthController = require('../controllers/login-controller');

// ==============================
// Authentication Routes
// ==============================

// Login
router.post('/auth/login', AuthController.login);

// Get Current Logged-in User
router.get('/auth/me', AuthController.getCurrentUser);

// Logout
router.post('/auth/logout', AuthController.logout);

// ==============================
// Export Router
// ==============================

module.exports = router;