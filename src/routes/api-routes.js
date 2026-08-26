/**
 * @fileoverview Main API Routes Aggregator (Appointment Booking Feature)
 * @module routes/api-routes
 */

const express = require( 'express' );
const router = express.Router();
const AppointmentController = require( '../controllers/appointment-controller' );

// ============================================================================
// DOCTOR APPOINTMENT BOOKING ROUTES (SRS 3.1.2)
// ============================================================================
router.get( '/appointments/doctors', AppointmentController.getDoctors );
router.get( '/appointments/slots', AppointmentController.getAvailableSlots );
router.get( '/appointments', AppointmentController.getAllAppointments );
router.post( '/appointments', AppointmentController.bookAppointment );
router.delete( '/appointments/:id', AppointmentController.cancelAppointment );

module.exports = router;