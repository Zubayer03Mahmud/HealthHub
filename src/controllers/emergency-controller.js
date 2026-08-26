/**
 * @fileoverview Emergency Contact Controller
 * Handles HTTP requests for emergency directories and filters.
 * @module controllers/emergency-controller
 * @author Konok
 */

const EmergencyContactModel = require( '../models/emergency-contact-model' );

const EmergencyController = {
	/**
	 * Get all emergency hotlines or search by query & category.
	 * @route GET /api/emergency-contacts
	 */
	getAllContacts: ( req, res ) => {
		try {
			const { search, category } = req.query;
			const contacts = EmergencyContactModel.search( search, category );

			return res.status( 200 ).json( {
				success: true,
				count: contacts.length,
				data: contacts
			} );
		} catch ( error ) {
			return res.status( 500 ).json( {
				success: false,
				message: 'Failed to retrieve emergency hotlines.',
				error: error.message
			} );
		}
	},

	/**
	 * Get national priority hotlines (999, 16263).
	 * @route GET /api/emergency-contacts/national
	 */
	getNationalHotlines: ( req, res ) => {
		try {
			const hotlines = EmergencyContactModel.getNationalHotlines();
			return res.status( 200 ).json( {
				success: true,
				count: hotlines.length,
				data: hotlines
			} );
		} catch ( error ) {
			return res.status( 500 ).json( {
				success: false,
				message: 'Failed to retrieve national emergency hotlines.',
				error: error.message
			} );
		}
	},

	/**
	 * Get single emergency contact details by ID.
	 * @route GET /api/emergency-contacts/:id
	 */
	getContactById: ( req, res ) => {
		try {
			const { id } = req.params;
			const contact = EmergencyContactModel.findById( Number( id ) );

			if ( ! contact ) {
				return res.status( 404 ).json( {
					success: false,
					message: `Emergency contact with ID ${id} not found.`
				} );
			}

			return res.status( 200 ).json( {
				success: true,
				data: contact
			} );
		} catch ( error ) {
			return res.status( 500 ).json( {
				success: false,
				message: 'Error fetching emergency contact details.',
				error: error.message
			} );
		}
	}
};

module.exports = EmergencyController;