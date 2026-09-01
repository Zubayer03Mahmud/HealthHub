/**
 * Payment Controller
 *
 * Processes simulated payments and generates digital receipts.
 *
 * @module PaymentController
 */

const PaymentModel = require( '../models/payment-model' );
const AppointmentModel = require( '../models/appointment-model' );

class PaymentController {
	/**
	 * Processes a payment transaction.
	 *
	 * @param {Object} req Express request.
	 * @param {Object} res Express response.
	 * @returns {void}
	 */
	static processPayment( req, res ) {
		try {
			const { appointmentId, paymentMethod } = req.body;
			const appointment = AppointmentModel.findById( appointmentId );

			if ( ! appointment ) {
				return res.status( 404 ).json( { success: false, message: 'Appointment record not found.' } );
			}

			const payment = PaymentModel.create( {
				appointmentId: appointment.id,
				patientId: req.session.user.id,
				amount: appointment.consultationFee,
				paymentMethod: paymentMethod || 'Card'
			} );

			AppointmentModel.updatePaymentStatus( appointment.id, 'Paid' );

			res.status( 201 ).json( {
				success: true,
				message: 'Payment completed successfully.',
				data: { payment, appointment }
			} );
		} catch ( error ) {
			console.error( error );
			res.status( 500 ).json( { success: false, message: 'Payment processing failed.' } );
		}
	}

	/**
	 * Retrieves receipt details.
	 *
	 * @param {Object} req Express request.
	 * @param {Object} res Express response.
	 * @returns {void}
	 */
	static getReceipt( req, res ) {
		const payment = PaymentModel.findById( req.params.transactionId );
		if ( ! payment ) {
			return res.status( 404 ).json( { success: false, message: 'Receipt not found.' } );
		}
		const appointment = AppointmentModel.findById( payment.appointmentId );
		res.status( 200 ).json( { success: true, data: { payment, appointment } } );
	}
}

module.exports = PaymentController;