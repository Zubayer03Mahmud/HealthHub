/**
 * Health Record Controller
 *
 * Manages medical records and diagnostics file uploads.
 *
 * @module HealthRecordController
 */

const HealthRecordModel = require( '../models/health-record-model' );

class HealthRecordController {
	/**
	 * Retrieves patient health records.
	 *
	 * @param {Object} req Express request.
	 * @param {Object} res Express response.
	 * @returns {void}
	 */
	static list( req, res ) {
		try {
			const records = HealthRecordModel.getByPatientId( req.session.user.id );
			res.status( 200 ).json( { success: true, data: records } );
		} catch ( error ) {
			console.error( error );
			res.status( 500 ).json( { success: false, message: 'Failed to fetch health records.' } );
		}
	}

	/**
	 * Uploads a health document.
	 *
	 * @param {Object} req Express request.
	 * @param {Object} res Express response.
	 * @returns {void}
	 */
	static upload( req, res ) {
		try {
			if ( ! req.file ) {
				return res.status( 400 ).json( { success: false, message: 'Please attach a valid file (PDF, JPG, PNG).' } );
			}

			const { title, category, description } = req.body;
			const record = HealthRecordModel.create( {
				patientId: req.session.user.id,
				title: title || req.file.originalname,
				category: category || 'General Report',
				description: description || '',
				fileName: req.file.originalname,
				filePath: `/uploads/${ req.file.filename }`,
				fileType: req.file.mimetype
			} );

			res.status( 201 ).json( {
				success: true,
				message: 'Health record uploaded successfully.',
				data: record
			} );
		} catch ( error ) {
			console.error( error );
			res.status( 500 ).json( { success: false, message: 'File upload failed.' } );
		}
	}

	/**
	 * Deletes a health record.
	 *
	 * @param {Object} req Express request.
	 * @param {Object} res Express response.
	 * @returns {void}
	 */
	static delete( req, res ) {
		try {
			const isDeleted = HealthRecordModel.delete( req.params.id, req.session.user.id );
			if ( ! isDeleted ) {
				return res.status( 404 ).json( { success: false, message: 'Record not found or unauthorized.' } );
			}
			res.status( 200 ).json( { success: true, message: 'Record removed successfully.' } );
		} catch ( error ) {
			console.error( error );
			res.status( 500 ).json( { success: false, message: 'Failed to delete record.' } );
		}
	}
}

module.exports = HealthRecordController;