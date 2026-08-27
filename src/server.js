/**
 * HealthHub Application Server
 *
 * Configures Express application, security parsers, session store, static assets, and API routes.
 *
 * @module Server
 */

const express = require( 'express' );
const path = require( 'path' );
const session = require( 'express-session' );
const cookieParser = require( 'cookie-parser' );
const dotenv = require( 'dotenv' );
const apiRoutes = require( './routes/api-routes' );

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'healthhub_secure_session_secret_key_2026';

// Parsers & Middleware
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( cookieParser() );

// Session Setup
app.use( session( {
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 24 * 60 * 60 * 1000 }
} ) );

// Static Assets Hosting
app.use( express.static( path.join( __dirname, '../public' ) ) );

// API Mount Point
app.use( '/api', apiRoutes );

// Catch-all fallback middleware to serve the single-page application shell
app.use( ( req, res ) => {
	res.sendFile( path.join( __dirname, '../public/index.html' ) );
} );

app.listen( PORT, () => {
	console.log( '====================================================' );
	console.log( `🏥 HealthHub Pure JS Server listening on http://localhost:${ PORT }` );
	console.log( `📚 API endpoints active at http://localhost:${ PORT }/api` );
	console.log( '====================================================' );
} );