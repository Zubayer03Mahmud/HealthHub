/**
 * @fileoverview Emergency Contact Model
 * Implements data query methods interacting with the mock database.
 * @module models/emergency-contact-model
 * @author Konok
 */

const mockDatabase = require( '../data/mock-database' );

class EmergencyContactModel {
	/**
	 * Retrieve all emergency contacts.
	 * @returns {Array<Object>} List of all hotlines.
	 */
	static getAll() {
		return [ ...mockDatabase.emergencyContacts ];
	}

	/**
	 * Find contact by ID.
	 * @param {number} id - Target contact ID.
	 * @returns {Object|null} Found contact or null.
	 */
	static findById( id ) {
		const contact = mockDatabase.emergencyContacts.find( ( item ) => item.id === Number( id ) );
		return contact ? { ...contact } : null;
	}

	/**
	 * Search and filter emergency contacts by query and category.
	 * @param {string} [query=''] - Keyword search.
	 * @param {string} [category=''] - Category filter.
	 * @returns {Array<Object>} Filtered contacts.
	 */
	static search( query = '', category = '' ) {
		let results = [ ...mockDatabase.emergencyContacts ];

		if ( category && category.trim() !== '' && category.toLowerCase() !== 'all' ) {
			results = results.filter( ( item ) =>
				item.category.toLowerCase() === category.trim().toLowerCase()
			);
		}

		if ( query && query.trim() !== '' ) {
			const cleanQuery = query.trim().toLowerCase();
			results = results.filter( ( item ) =>
				item.serviceName.toLowerCase().includes( cleanQuery ) ||
				item.district.toLowerCase().includes( cleanQuery ) ||
				item.emergencyNumber.includes( cleanQuery ) ||
				item.description.toLowerCase().includes( cleanQuery )
			);
		}

		return results;
	}

	/**
	 * Retrieve only National Emergency Hotlines.
	 * @returns {Array<Object>}
	 */
	static getNationalHotlines() {
		return mockDatabase.emergencyContacts.filter( ( item ) => item.category === 'National' );
	}
}

module.exports = EmergencyContactModel;