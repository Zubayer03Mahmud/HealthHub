/**
 * Vaccine & Anti-Venom Model
 *
 * Handles searching and retrieval of vaccine and anti-venom stock records
 * (SRS 3.1.7), using plain SQL through mysql2 with no ORM.
 *
 * @module VaccineModel
 */

const pool = require( './database' );

// Column list with aliases, so every query returns camelCase property
// names matching the rest of the codebase, even though the actual MySQL
// columns are snake_case (see database/schema.sql).
const SELECT_COLUMNS = `
	id, name, type,
	hospital_or_pharmacy AS hospitalOrPharmacy,
	location, city, area,
	contact_number AS contactNumber,
	available_stock AS availableStock,
	status,
	unit_price AS unitPrice
`;

// Real column names, used when building the search WHERE clause.
const SEARCHABLE_COLUMNS = [ 'name', 'hospital_or_pharmacy', 'city', 'area', 'location' ];

// Accepted category values. Mirrors the ENUM in the table definition.
const ALLOWED_TYPES = [ 'All', 'Vaccine', 'Anti-Venom' ];

class VaccineModel {
	/**
	 * Retrieves every vaccine and anti-venom record.
	 *
	 * @async
	 * @returns {Promise<Array<Object>>} The full inventory.
	 */
	static async getAll() {
		const [ rows ] = await pool.query( `SELECT ${ SELECT_COLUMNS } FROM vaccines_antivenoms` );
		return rows;
	}

	/**
	 * Reports whether a category value is one the search accepts.
	 *
	 * @param {string} type Category to check.
	 * @returns {boolean} True when the value is 'All', 'Vaccine' or 'Anti-Venom'.
	 */
	static isValidType( type ) {
		return ALLOWED_TYPES.includes( type );
	}

	/**
	 * Searches vaccines and anti-venoms by keyword and category.
	 *
	 * The keyword is matched, case-insensitively, against the item name,
	 * facility name, city, area and street address, using parameterized
	 * queries so user input can never be interpreted as SQL commands.
	 *
	 * @async
	 * @param {string} query Keyword entered by the user.
	 * @param {string} type Category filter: 'All', 'Vaccine' or 'Anti-Venom'.
	 * @returns {Promise<Array<Object>>} Matching records, possibly empty.
	 */
	static async search( query, type ) {
		const conditions = [];
		const values = [];

		if ( type && type !== 'All' ) {
			conditions.push( 'type = ?' );
			values.push( type );
		}

		if ( query && query.trim() !== '' ) {
			const term = `%${ query.trim() }%`;
			const fieldChecks = SEARCHABLE_COLUMNS.map( ( column ) => `${ column } LIKE ?` );
			conditions.push( `( ${ fieldChecks.join( ' OR ' ) } )` );
			SEARCHABLE_COLUMNS.forEach( () => values.push( term ) );
		}

		let sql = `SELECT ${ SELECT_COLUMNS } FROM vaccines_antivenoms`;

		if ( conditions.length > 0 ) {
			sql += ` WHERE ${ conditions.join( ' AND ' ) }`;
		}

		const [ rows ] = await pool.query( sql, values );
		return rows;
	}

	/**
	 * Finds a single record by its identifier.
	 *
	 * @async
	 * @param {number|string} id Record identifier, as a number or numeric string.
	 * @returns {Promise<Object|null>} The matching record, or null when none exists.
	 */
	static async findById( id ) {
		const numericId = Number( id );

		if ( Number.isNaN( numericId ) ) {
			return null;
		}

		const [ rows ] = await pool.query(
			`SELECT ${ SELECT_COLUMNS } FROM vaccines_antivenoms WHERE id = ?`,
			[ numericId ]
		);

		return rows[ 0 ] || null;
	}
}

/**
 * Creates the vaccines table if it does not already exist, and fills it
 * with starter data the very first time this runs.
 *
 * @async
 * @returns {Promise<void>}
 */
async function initializeVaccineTable() {
	await pool.ensureDatabaseExists();

	await pool.query( `
		CREATE TABLE IF NOT EXISTS vaccines_antivenoms (
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(200) NOT NULL,
			type ENUM('Vaccine', 'Anti-Venom') NOT NULL,
			hospital_or_pharmacy VARCHAR(200) NOT NULL,
			location TEXT NOT NULL,
			city VARCHAR(100) NOT NULL,
			area VARCHAR(100) NOT NULL,
			contact_number VARCHAR(30) NOT NULL,
			available_stock INT NOT NULL DEFAULT 0,
			status ENUM('Available', 'Out of Stock') DEFAULT 'Available',
			unit_price DECIMAL(10,2) NOT NULL DEFAULT 0.00
		)
	` );

	const [ countRows ] = await pool.query( 'SELECT COUNT(*) AS total FROM vaccines_antivenoms' );
	const existingCount = countRows[ 0 ].total;

	if ( existingCount === 0 ) {
		const seedData = require( '../data/vaccines' );

		for ( const item of seedData ) {
			await pool.query(
				`INSERT INTO vaccines_antivenoms
					(name, type, hospital_or_pharmacy, location, city, area, contact_number, available_stock, status, unit_price)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
				[
					item.name, item.type, item.hospitalOrPharmacy, item.location,
					item.city, item.area, item.contactNumber, item.availableStock,
					item.status, item.unitPrice
				]
			);
		}
	}
}

module.exports = VaccineModel;
module.exports.initializeVaccineTable = initializeVaccineTable;