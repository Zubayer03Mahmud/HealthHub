/**
 * @fileoverview ICU & CCU Bed Availability Model.
 * Queries and filters hospital critical care facilities from the database layer.
 *
 * @module src/models/icu-ccu-model
 * @author Konok
 */

const mockDatabase = require( '../data/mock-database' );

class IcuCcuModel {
	/**
	 * Retrieve hospital critical care facilities with filters.
	 *
	 * @param {string} [location=''] City, district, or hospital name search keyword.
	 * @param {string} [type='all'] Bed category filter ('all', 'icu', 'ccu').
	 * @returns {Array<Object>} Filtered list of hospitals with bed availability.
	 */
	static getAvailability( location = '', type = 'all' ) {
		const hospitals = mockDatabase.hospitals || [];
		const normalizedLocation = location.toLowerCase().trim();
		const normalizedType = type.toLowerCase().trim();

		return hospitals.filter( ( hospital ) => {
			const matchesLocation = ! normalizedLocation ||
				hospital.name.toLowerCase().includes( normalizedLocation ) ||
				hospital.city.toLowerCase().includes( normalizedLocation ) ||
				hospital.district.toLowerCase().includes( normalizedLocation ) ||
				hospital.address.toLowerCase().includes( normalizedLocation );

			if ( ! matchesLocation ) {
				return false;
			}

			if ( normalizedType === 'icu' ) {
				return hospital.icuAvailable > 0;
			}

			if ( normalizedType === 'ccu' ) {
				return hospital.ccuAvailable > 0;
			}

			return true;
		} );
	}

	/**
	 * Find critical care capacity details for a specific hospital by identifier.
	 *
	 * @param {number|string} id Hospital identifier.
	 * @returns {Object|null} Hospital critical care details or null.
	 */
	static getById( id ) {
		const hospital = ( mockDatabase.hospitals || [] ).find( ( h ) => h.id === Number( id ) );
		if ( ! hospital ) {
			return null;
		}
		return {
			id: hospital.id,
			name: hospital.name,
			city: hospital.city,
			district: hospital.district,
			address: hospital.address,
			emergencyHotline: hospital.emergencyHotline,
			contactNumber: hospital.contactNumber,
			generalContact: hospital.generalContact,
			icuTotal: hospital.icuTotal,
			icuAvailable: hospital.icuAvailable,
			ccuTotal: hospital.ccuTotal,
			ccuAvailable: hospital.ccuAvailable,
			rating: hospital.rating
		};
	}
}

module.exports = IcuCcuModel;