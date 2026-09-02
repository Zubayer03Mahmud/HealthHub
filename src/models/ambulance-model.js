/**
 * Ambulance Model
 *
 * Manages rapid lookup for mobile life support and critical care vehicles.
 *
 * @module AmbulanceModel
 */

const mockDatabase = require( '../data/mock-database' );

class AmbulanceModel {
	/**
	 * Retrieves all ambulance records.
	 *
	 * @returns {Array<Object>} List of ambulance providers.
	 */
	static getAll() {
		return mockDatabase.ambulances;
	}

	/**
	 * Searches ambulance services by location or district.
	 *
	 * @param {string} location City or district name.
	 * @returns {Array<Object>} Matching ambulance providers.
	 */
	static search( location ) {
		if ( ! location || location.trim() === '' ) {
			return mockDatabase.ambulances;
		}
		const term = location.toLowerCase().trim();
		return mockDatabase.ambulances.filter( ( amb ) => {
			return amb.city.toLowerCase().includes( term ) ||
				amb.district.toLowerCase().includes( term ) ||
				amb.serviceArea.toLowerCase().includes( term );
		} );
	}
}

module.exports = AmbulanceModel;
