/**
 * Doctor Model
 *
 * Manages medical practitioner profiles, schedules, ratings, and specialties.
 *
 * @module DoctorModel
 */

const mockDatabase = require( '../data/mock-database' );

class DoctorModel {
	/**
	 * Retrieves all doctors.
	 *
	 * @returns {Array<Object>} List of doctors.
	 */
	static getAll() {
		return mockDatabase.doctors;
	}

	/**
	 * Finds a doctor by ID.
	 *
	 * @param {number} id Doctor ID.
	 * @returns {Object|null} Doctor record or null.
	 */
	static findById( id ) {
		const doctor = mockDatabase.doctors.find( ( d ) => d.id === Number( id ) );
		return doctor || null;
	}

	/**
	 * Finds a doctor by linked user account ID.
	 *
	 * @param {number} userId User ID.
	 * @returns {Object|null} Doctor record or null.
	 */
	static findByUserId( userId ) {
		const doctor = mockDatabase.doctors.find( ( d ) => d.userId === Number( userId ) );
		return doctor || null;
	}

	/**
	 * Updates a doctor's schedule, fee, and credentials.
	 *
	 * @param {number} id Doctor ID.
	 * @param {Object} updatedFields Modified properties.
	 * @returns {Object|null} Updated doctor record.
	 */
	static update( id, updatedFields ) {
		const doctor = this.findById( id );
		if ( ! doctor ) {
			return null;
		}
		Object.assign( doctor, updatedFields );
		return doctor;
	}
}

module.exports = DoctorModel;