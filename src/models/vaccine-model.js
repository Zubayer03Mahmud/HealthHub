/**
 * Vaccine & Anti-Venom Model
 *
 * Handles searching and retrieval of vaccine and anti-venom stock records
 * held by hospitals and pharmacies (SRS 3.1.7).
 *
 * @module VaccineModel
 */

const dataStore = require( '../data' );

// Every field the search term is matched against, as listed in SRS 
// The street address is included so a user who types a road name still
// finds the facility.
const SEARCHABLE_FIELDS = [ 'name', 'hospitalOrPharmacy', 'city', 'area', 'location' ];

// Accepted category values. The last two mirror the ENUM in database/schema.sql.
const ALLOWED_TYPES = [ 'All', 'Vaccine', 'Anti-Venom' ];

class VaccineModel {
	/**
	 * Retrieves every vaccine and anti-venom record.
	 *
	 * @returns {Array<Object>} The full inventory.
	 */
	static getAll() {
		return dataStore.vaccinesAndAntiVenoms;
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
	 * The keyword is matched case-insensitively against the item name, facility
	 * name, city, area and street address. An empty keyword returns the whole
	 * inventory so the user can browse.
	 *
	 * @param {string} query Keyword entered by the user.
	 * @param {string} type Category filter: 'All', 'Vaccine' or 'Anti-Venom'.
	 * @returns {Array<Object>} Matching records, possibly empty.
	 */
	static search( query, type ) {
		let results = VaccineModel.getAll();

		if ( type && type !== 'All' ) {
			results = results.filter( ( item ) => item.type === type );
		}

		// A missing or whitespace-only keyword means "show everything in this category".
		if ( ! query || query.trim() === '' ) {
			return results;
		}

		const term = query.toLowerCase().trim();

		return results.filter( ( item ) => {
			return SEARCHABLE_FIELDS.some( ( field ) => {
				const value = item[ field ];
				return typeof value === 'string' && value.toLowerCase().includes( term );
			} );
		} );
	}

	/**
	 * Finds a single record by its identifier.
	 *
	 * @param {number|string} id Record identifier, as a number or numeric string.
	 * @returns {Object|null} The matching record, or null when none exists.
	 */
	static findById( id ) {
		const numericId = Number( id );

		// Route parameters arrive as strings, so a non-numeric id is simply "not found".
		if ( Number.isNaN( numericId ) ) {
			return null;
		}

		const item = VaccineModel.getAll().find( ( record ) => record.id === numericId );
		return item || null;
	}
}

module.exports = VaccineModel;