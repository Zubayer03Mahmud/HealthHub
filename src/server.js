/**
 * HealthHub Application Server
 *
 * Configures the Express application, request parsers, static asset hosting
 * and the API router.
 *
 * @module Server
 */

const path = require( 'path' );
const express = require( 'express' );
const dotenv = require( 'dotenv' );

const apiRoutes = require( './routes/api-routes' );

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

// The browser interface is plain HTML, CSS and JavaScript served from /public.
app.use( express.static( path.join( __dirname, '../public' ) ) );

app.use( '/api', apiRoutes );

// Unknown API paths must answer with JSON, not the HTML page, so the
// client always receives the shape it expects.
app.use( '/api', ( req, res ) => {
	res.status( 404 ).json( { success: false, message: 'API endpoint not found.' } );
} );

app.listen( PORT, () => {
	console.log( `HealthHub server running at http://localhost:${ PORT }` );
} );

module.exports = app;