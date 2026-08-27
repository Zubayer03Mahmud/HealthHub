/**
 * Hospital Controller
 *
 * Serves hospital inventory and bed occupancy queries.
 *
 * @module HospitalController
 */

const HospitalModel = require( '../models/hospital-model' );

class HospitalController {
	/**
	 * Searches hospitals by keyword.
	 *
	 * @param {Object} req Express request.
	 * @param {Object} res Express response.
	 * @returns {void}
	 */
	static search( req, res ) {
		try {
			const query = req.query.q || '';
			const hospitals = HospitalModel.search( query );
			res.status( 200 ).json( { success: true, data: hospitals } );
		} catch ( error ) {
			console.error( error );
			res.status( 500 ).json( { success: false, message: 'Failed to retrieve hospitals.' } );
		}
	}

	/**
	 * Retrieves hospital by ID.
	 *
	 * @param {Object} req Express request.
	 * @param {Object} res Express response.
	 * @returns {void}
	 */
	static getById( req, res ) {
		const hospital = HospitalModel.findById( req.params.id );
		if ( ! hospital ) {
			return res.status( 404 ).json( { success: false, message: 'Hospital not found.' } );
		}
		res.status( 200 ).json( { success: true, data: hospital } );
	}

}

module.exports = HospitalController;