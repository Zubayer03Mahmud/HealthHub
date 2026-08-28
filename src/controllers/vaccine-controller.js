/**
 * Vaccine Controller
 *
 * Handles HTTP requests for vaccine and anti-venom availability (SRS 3.1.7).
 *
 * @module VaccineController
 */

const VaccineModel = require( '../models/vaccine-model' );

class VaccineController {
	/**
	 * Searches vaccines and anti-venoms.
	 *
	 * Responds 400 when the search criteria are invalid, 200 with the matching
	 * records otherwise, and 500 if the inventory cannot be read.
	 *
	 * @param {Object} req Express request. Reads req.query.q and req.query.type.
	 * @param {Object} res Express response.
	 * @returns {void}
	 */
	static search( req, res ) {
		try {
			const { q, type } = req.query;

			// A repeated parameter such as ?q=a&q=b arrives as an array, not a string.
			if ( q !== undefined && typeof q !== 'string' ) {
				return res.status( 400 ).json( {
					success: false,
					message: 'Please enter valid search criteria.'
				} );
			}

			if ( type !== undefined && ! VaccineModel.isValidType( type ) ) {
				return res.status( 400 ).json( {
					success: false,
					message: 'Please select a valid category: All, Vaccine or Anti-Venom.'
				} );
			}

			const items = VaccineModel.search( q, type );

			// Counted here so the interface can tell "nothing found" apart from
			// "found, but every facility is out of stock" (SRS 3.1.7 F1 and F2).
			const availableCount = items.filter( ( item ) => {
				return item.status === 'Available' && item.availableStock > 0;
			} ).length;

			return res.status( 200 ).json( {
				success: true,
				count: items.length,
				availableCount,
				data: items
			} );
		} catch ( error ) {
			console.error( error );
			return res.status( 500 ).json( {
				success: false,
				message: 'Unable to retrieve vaccine information. Please try again later.'
			} );
		}
	}

	/**
	 * Retrieves the complete details of one vaccine or anti-venom record.
	 *
	 * @param {Object} req Express request. Reads req.params.id.
	 * @param {Object} res Express response.
	 * @returns {void}
	 */
	static getById( req, res ) {
		try {
			const item = VaccineModel.findById( req.params.id );

			if ( ! item ) {
				return res.status( 404 ).json( {
					success: false,
					message: 'No vaccine or anti-venom found.'
				} );
			}

			return res.status( 200 ).json( { success: true, data: item } );
		} catch ( error ) {
			console.error( error );
			return res.status( 500 ).json( {
				success: false,
				message: 'Unable to retrieve vaccine information. Please try again later.'
			} );
		}
	}
}

module.exports = VaccineController;