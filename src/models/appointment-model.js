/**
 * @fileoverview Appointment Model for HealthHub.
 * Handles appointment scheduling, doctor slot availability, and booking records.
 * 
 * @module models/appointment-model
 * @author Alamin
 * @version 1.0.0
 */

const mockDatabase = require( '../data/mock-database' );

/**
 * @typedef {Object} Appointment
 * @property {number} id - Unique booking ID.
 * @property {string} patientName - Full name of patient.
 * @property {string} patientPhone - Primary contact number.
 * @property {string} patientEmail - Contact email address.
 * @property {number} doctorId - Doctor identifier.
 * @property {string} doctorName - Doctor name.
 * @property {string} department - Medical specialty.
 * @property {string} appointmentDate - Date format YYYY-MM-DD.
 * @property {string} timeSlot - Scheduled time window.
 * @property {string} status - Booking status ('Confirmed' | 'Cancelled').
 */

class AppointmentModel {
	/**
	 * Retrieve all booked appointments.
	 * @returns {Appointment[]}
	 */
	static getAll() {
		return [ ...mockDatabase.appointments ];
	}

	/**
	 * Retrieve all available doctors.
	 * @returns {Array<Object>}
	 */
	static getDoctors() {
		return [ ...mockDatabase.doctors ];
	}

	/**
	 * Get remaining unbooked time slots for a specific doctor on a chosen date.
	 * @param {number} doctorId - Target doctor ID.
	 * @param {string} date - Date string (YYYY-MM-DD).
	 * @returns {string[]} Available time slot strings.
	 */
	static getAvailableSlots( doctorId, date ) {
		const bookedSlots = mockDatabase.appointments
			.filter( ( apt ) => apt.doctorId === Number( doctorId ) && apt.appointmentDate === date && apt.status !== 'Cancelled' )
			.map( ( apt ) => apt.timeSlot );

		return mockDatabase.availableTimeSlots.filter( ( slot ) => ! bookedSlots.includes( slot ) );
	}

	/**
	 * Book a new doctor appointment with conflict checking.
	 * @param {Object} data - Booking payload.
	 * @returns {Appointment} Created booking record.
	 * @throws {Error} If required fields are missing or time slot is already booked.
	 */
	static create( data ) {
		const { patientName, patientPhone, patientEmail, doctorId, appointmentDate, timeSlot } = data;

		if ( ! patientName || ! patientPhone || ! doctorId || ! appointmentDate || ! timeSlot ) {
			throw new Error( 'Missing required booking details.' );
		}

		const doctor = mockDatabase.doctors.find( ( d ) => d.id === Number( doctorId ) );
		if ( ! doctor ) {
			throw new Error( 'Selected doctor does not exist.' );
		}

		// Conflict check: Check if slot already reserved
		const isSlotTaken = mockDatabase.appointments.some(
			( apt ) =>
				apt.doctorId === Number( doctorId ) &&
				apt.appointmentDate === appointmentDate &&
				apt.timeSlot === timeSlot &&
				apt.status !== 'Cancelled'
		);

		if ( isSlotTaken ) {
			throw new Error( 'The requested time slot has already been booked for this doctor.' );
		}

		const newAppointment = {
			id: mockDatabase.appointments.length + 1,
			patientName: patientName.trim(),
			patientPhone: patientPhone.trim(),
			patientEmail: ( patientEmail || '' ).trim(),
			doctorId: Number( doctorId ),
			doctorName: doctor.name,
			department: doctor.department,
			appointmentDate,
			timeSlot,
			status: 'Confirmed'
		};

		mockDatabase.appointments.push( newAppointment );
		return { ...newAppointment };
	}

	/**
	 * Cancel an existing appointment by ID.
	 * @param {number} id - Target appointment ID.
	 * @returns {Appointment|null} Updated appointment record or null.
	 */
	static cancel( id ) {
		const appointment = mockDatabase.appointments.find( ( apt ) => apt.id === Number( id ) );
		if ( ! appointment ) {
			return null;
		}

		appointment.status = 'Cancelled';
		return { ...appointment };
	}
}

module.exports = AppointmentModel;