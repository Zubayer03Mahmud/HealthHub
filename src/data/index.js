/**
 * In-Memory Data Store
 *
 * Collects each feature's dataset into a single object. Every feature keeps
 * its records in its own file so team members never edit the same data.
 *
 * @module DataStore
 */

const vaccinesAndAntiVenoms = require( './vaccines' );

module.exports = {
	vaccinesAndAntiVenoms

	// TEAM: add your dataset above, one line each.
	// Example: hospitals: require( './hospitals' )
};