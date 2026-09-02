/**
 * Ambulance Controller
 *
 * Handles ambulance search and availability queries.
 *
 * @module AmbulanceController
 */

const AmbulanceModel = require( '../models/ambulance-model' );

class AmbulanceController {
	/**
	 * Searches ambulance services.
	 *
	 * @param {Object} req Express request.
	 * @param {Object} res Express response.
	 * @returns {void}
	 */
	static search( req, res ) {
		try {
			const location = req.query.location || '';
			const ambulances = AmbulanceModel.search( location );
			res.status( 200 ).json( { success: true, data: ambulances } );
		} catch ( error ) {
			console.error( error );
			res.status( 500 ).json( { success: false, message: 'Failed to search ambulance units.' } );
		}
	}
}

module.exports = AmbulanceController;
