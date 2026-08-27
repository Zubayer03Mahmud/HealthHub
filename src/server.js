/**
 * @fileoverview Express Application Entry Point for HealthHub.
 * Configures application middleware, serves frontend assets,
 * mounts API routes, and starts the HTTP server.
 * 
 * @module server
 * @version 1.0.0
 */

const express = require( 'express' );
const path = require( 'path' );
const apiRoutes = require( './routes/api-routes' );

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================================
// MIDDLEWARE CONFIGURATION
// ============================================================================

// 1. Parse JSON payloads and URL-encoded form data
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

// 2. Request Logger Middleware
app.use( ( req, res, next ) => {
	const timestamp = new Date().toISOString();
	console.log( `[${timestamp}] 📡 ${req.method} ${req.originalUrl}` );
	next();
} );

// 3. Serve Frontend Static Assets (CSS, JS, Images)
app.use( express.static( path.join( __dirname, '../public' ) ) );

// ============================================================================
// API ROUTES
// ============================================================================

// Mount central API router
app.use( '/api', apiRoutes );

// ============================================================================
// FRONTEND ROUTE FALLBACK (Express 4 & 5 Compatible)
// ============================================================================

app.use( ( req, res ) => {
	res.sendFile( path.join( __dirname, '../public/index.html' ) );
} );

// ============================================================================
// CENTRAL ERROR HANDLING MIDDLEWARE
// ============================================================================

app.use( ( err, req, res, next ) => {
	console.error( '❌ [Application Error]:', err.stack || err.message );
	const statusCode = err.status || 500;
	res.status( statusCode ).json( {
		success: false,
		message: err.message || 'Internal Server Error',
		error: process.env.NODE_ENV === 'production' ? null : err.message
	} );
} );

// ============================================================================
// START SERVER
// ============================================================================

app.listen( PORT, () => {
	console.log( `====================================================` );
	console.log( `🏥 HealthHub Server running on http://localhost:${PORT}` );
	console.log( `📅 Appointments API: http://localhost:${PORT}/api/appointments` );
	console.log( `====================================================` );
} );

module.exports = app;