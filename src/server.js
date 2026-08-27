/**
 * @fileoverview Express Server Entry Point
 * @module server
 */

const express = require( 'express' );
const path = require( 'path' );
const apiRoutes = require( './routes/api-routes' );

const app = express();
const PORT = process.env.PORT || 3000;

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.static( path.join( __dirname, '../public' ) ) );

// API base route
app.use( '/api', apiRoutes );

app.get( '*', ( req, res ) => {
	res.sendFile( path.join( __dirname, '../public/index.html' ) );
} );

app.listen( PORT, () => {
	console.log( `🏥 HealthHub Server running on http://localhost:${PORT}` );
} );

module.exports = app;