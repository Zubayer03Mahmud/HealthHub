/**
 * HealthHub Application Server
 *
 * Configures the Express application, middleware,
 * session management, static files, and API routes.
 *
 * @module Server
 */

const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express application (এটি সবার আগে ক্রিয়েট করতে হবে)
const app = express();

// Import API Routes
const apiRoutes = require('./src/routes/api-route');

// Server Port
const PORT = process.env.PORT || 3000;

// Session Secret
const SESSION_SECRET =
    process.env.SESSION_SECRET ||
    'healthhub_secure_session_secret_key_2026';

// ===============================
// Middleware
// ===============================

// Parse JSON data
app.use(express.json());

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// ===============================
// Session Configuration
// ===============================

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }
    })
);

// ===============================
// Static Files
// ===============================

// Serves files from HealthHub/public
app.use(express.static(path.join(__dirname, 'public')));

// ===============================
// API Routes
// ===============================

// Example: /api/login
app.use('/api', apiRoutes);

// ===============================
// Home Route
// ===============================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===============================
// 404 / Fallback Route
// ===============================

app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// ===============================
// Start Server
// ===============================

app.listen(PORT, () => {
    console.log('==============================================');
    console.log('🏥 HealthHub Server is running successfully!');
    console.log(`🌐 Website: http://localhost:${PORT}`);
    console.log(`📚 API: http://localhost:${PORT}/api`);
    console.log('==============================================');
});