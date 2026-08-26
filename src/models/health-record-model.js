/**
 * Health Record Model
 *
 * Stores and manages patient diagnostic documents and medical records.
 *
 * @module HealthRecordModel
 */

const mockDatabase = require( '../data/mock-database' );

class HealthRecordModel {
	/**
	 * Creates a new health record entry.
	 *
	 * @param {Object} recordData Upload metadata.
	 * @returns {Object} Created record.
	 */
	static create( recordData ) {
		const newId = mockDatabase.healthRecords.length > 0 ? mockDatabase.healthRecords[ mockDatabase.healthRecords.length - 1 ].id + 1 : 1;
		const record = {
			id: newId,
			uploadedAt: new Date().toISOString().split( 'T' )[ 0 ],
			...recordData
		};
		mockDatabase.healthRecords.push( record );
		return record;
	}

	/**
	 * Retrieves all records belonging to a patient.
	 *
	 * @param {number} patientId Patient identifier.
	 * @returns {Array<Object>} List of uploaded records.
	 */
	static getByPatientId( patientId ) {
		return mockDatabase.healthRecords.filter( ( r ) => r.patientId === Number( patientId ) );
	}

	/**
	 * Deletes a health record.
	 *
	 * @param {number} id Record ID.
	 * @param {number} patientId Patient ID.
	 * @returns {boolean} True if deleted successfully.
	 */
	static delete( id, patientId ) {
		const initialCount = mockDatabase.healthRecords.length;
		mockDatabase.healthRecords = mockDatabase.healthRecords.filter(
			( r ) => ! ( r.id === Number( id ) && r.patientId === Number( patientId ) )
		);
		return mockDatabase.healthRecords.length < initialCount;
	}
}

module.exports = HealthRecordModel;