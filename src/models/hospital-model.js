/**
 * Hospital Model
 *
 * Handles hospital directory querying and bed occupancy.
 *
 * @module HospitalModel
 */

const mockDatabase = require( '../data/mock-database' );

class HospitalModel {
	/**
	 * Retrieves all hospital records.
	 *
	 * @returns {Array<Object>} List of hospitals.
	 */
	static getAll() {
		return mockDatabase.hospitals;
	}

	/**
	 * Finds a hospital by identifier.
	 *
	 * @param {number} id Hospital ID.
	 * @returns {Object|null} Hospital record or null.
	 */
	static findById( id ) {
		const hospital = mockDatabase.hospitals.find( ( h ) => h.id === Number( id ) );
		return hospital || null;
	}

	/**
	 * Searches hospitals by keyword (name, city, or district).
	 *
	 * @param {string} keyword Search term.
	 * @returns {Array<Object>} Filtered hospitals list.
	 */
	static search( keyword ) {
		if ( ! keyword || keyword.trim() === '' ) {
			return mockDatabase.hospitals;
		}
		const term = keyword.toLowerCase().trim();
		return mockDatabase.hospitals.filter( ( hospital ) => {
			return hospital.name.toLowerCase().includes( term ) ||
				hospital.city.toLowerCase().includes( term ) ||
				hospital.district.toLowerCase().includes( term );
		} );
	}
}

module.exports = HospitalModel;