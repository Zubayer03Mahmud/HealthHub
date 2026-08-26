/**
 * @fileoverview Appointment Controller.
 * Handles HTTP requests for slot queries, appointment bookings, and cancellations.
 * 
 * @module controllers/appointment-controller
 * @author Alamin
 */

const AppointmentModel = require( '../models/appointment-model' );

const AppointmentController = {
	/**
	 * List all doctors and department details.
	 * @route GET /api/appointments/doctors
	 */
	getDoctors: ( req, res ) => {
		try {
			const doctors = AppointmentModel.getDoctors();
			return res.status( 200 ).json( { success: true, data: doctors } );
		} catch ( error ) {
			return res.status( 500 ).json( { success: false, message: error.message } );
		}
	},

	/**
	 * Get open time slots for a doctor on a specific date.
	 * @route GET /api/appointments/slots
	 */
	getAvailableSlots: ( req, res ) => {
		try {
			const { doctorId, date } = req.query;

			if ( ! doctorId || ! date ) {
				return res.status( 400 ).json( {
					success: false,
					message: 'doctorId and date query parameters are required.'
				} );
			}

			const availableSlots = AppointmentModel.getAvailableSlots( Number( doctorId ), date );
			return res.status( 200 ).json( {
				success: true,
				doctorId: Number( doctorId ),
				date,
				availableSlots
			} );
		} catch ( error ) {
			return res.status( 500 ).json( { success: false, message: error.message } );
		}
	},

	/**
	 * Book an appointment.
	 * @route POST /api/appointments
	 */
	bookAppointment: ( req, res ) => {
		try {
			const appointment = AppointmentModel.create( req.body );
			return res.status( 201 ).json( {
				success: true,
				message: 'Appointment successfully confirmed.',
				data: appointment
			} );
		} catch ( error ) {
			return res.status( 400 ).json( {
				success: false,
				message: error.message
			} );
		}
	},

	/**
	 * Retrieve all booked appointments.
	 * @route GET /api/appointments
	 */
	getAllAppointments: ( req, res ) => {
		try {
			const appointments = AppointmentModel.getAll();
			return res.status( 200 ).json( {
				success: true,
				count: appointments.length,
				data: appointments
			} );
		} catch ( error ) {
			return res.status( 500 ).json( { success: false, message: error.message } );
		}
	},

	/**
	 * Cancel an appointment by ID.
	 * @route DELETE /api/appointments/:id
	 */
	cancelAppointment: ( req, res ) => {
		try {
			const { id } = req.params;
			const cancelled = AppointmentModel.cancel( Number( id ) );

			if ( ! cancelled ) {
				return res.status( 404 ).json( {
					success: false,
					message: 'Appointment record not found.'
				} );
			}

			return res.status( 200 ).json( {
				success: true,
				message: 'Appointment cancelled successfully.',
				data: cancelled
			} );
		} catch ( error ) {
			return res.status( 500 ).json( { success: false, message: error.message } );
		}
	}
};

module.exports = AppointmentController;