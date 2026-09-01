/**
 * Payment Model
 *
 * Manages payment receipts and transaction records.
 *
 * @module PaymentModel
 */

const mockDatabase = require( '../data/mock-database' );

class PaymentModel {
	/**
	 * Creates a new transaction record.
	 *
	 * @param {Object} paymentData Transaction details.
	 * @returns {Object} Processed payment record.
	 */
	static create( paymentData ) {
		const transactionId = `TXN-${ Math.floor( 100000 + Math.random() * 900000 ) }`;
		const payment = {
			id: transactionId,
			status: 'Successful',
			transactionDate: new Date().toISOString().replace( 'T', ' ' ).substring( 0, 19 ),
			...paymentData
		};
		mockDatabase.payments.push( payment );
		return payment;
	}

	/**
	 * Finds payment by transaction ID.
	 *
	 * @param {string} transactionId Transaction ID.
	 * @returns {Object|null} Payment record.
	 */
	static findById( transactionId ) {
		const payment = mockDatabase.payments.find( ( p ) => p.id === transactionId );
		return payment || null;
	}
}

module.exports = PaymentModel;