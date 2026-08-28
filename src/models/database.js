/**
 * Database Connection
 *
 * Configures a mysql2 connection pool. Automated tests use a separate
 * database on the same MySQL server, so they never touch or damage the
 * real application data.
 *
 * @module Database
 */

const mysql = require( 'mysql2/promise' );
const dotenv = require( 'dotenv' );

dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

// Tests use a different database name on the same server, so running
// npm test never reads or writes the real application's data.
const databaseName = isTest ? `${ process.env.DB_NAME }_test` : process.env.DB_NAME;

/**
 * Creates the application's database if it does not already exist.
 *
 * @async
 * @returns {Promise<void>}
 */
async function ensureDatabaseExists() {
	const connection = await mysql.createConnection( {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 3306,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD
	} );

	await connection.query( `CREATE DATABASE IF NOT EXISTS \`${ databaseName }\`` );
	await connection.end();
}

// A pool keeps a handful of ready connections open, instead of opening and
// closing a brand new one for every single query.
const pool = mysql.createPool( {
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT || 3306,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: databaseName,
	waitForConnections: true,
	connectionLimit: 10
} );

module.exports = pool;
module.exports.ensureDatabaseExists = ensureDatabaseExists;