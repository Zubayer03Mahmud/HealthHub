/**
 * @fileoverview Central Test Suite for HealthHub Application (Vitest)
 */

import { describe, it, expect } from 'vitest';
const AppointmentModel = require( '../src/models/appointment-model' );

// ============================================================================
// SPRINT 1 - MODULE: Doctor Appointment Booking (SRS 3.1.2)
// ============================================================================
describe( 'SRS 3.1.2: Doctor Appointment Booking Module', () => {
	it( 'should retrieve available specialist doctors list', () => {
		const doctors = AppointmentModel.getDoctors();
		expect( Array.isArray( doctors ) ).toBe( true );
		expect( doctors.length ).toBeGreaterThanOrEqual( 3 );
	} );

	it( 'should return available time slots for a doctor on a specific date', () => {
		const slots = AppointmentModel.getAvailableSlots( 101, '2026-09-05' );
		expect( Array.isArray( slots ) ).toBe( true );
		expect( slots.length ).toBeGreaterThan( 0 );
	} );

	it( 'should successfully schedule a new appointment when parameters are valid', () => {
		const bookingData = {
			patientName: 'Rahim Sheikh',
			patientPhone: '01898765432',
			patientEmail: 'rahim@test.com',
			doctorId: 102,
			appointmentDate: '2026-09-08',
			timeSlot: '11:00 AM - 11:30 AM'
		};

		const result = AppointmentModel.create( bookingData );
		expect( result ).toHaveProperty( 'id' );
		expect( result.patientName ).toBe( 'Rahim Sheikh' );
		expect( result.status ).toBe( 'Confirmed' );
	} );

	it( 'should throw an error when attempting to double-book an already reserved slot', () => {
		const duplicateBooking = {
			patientName: 'Karim Ullah',
			patientPhone: '01900000000',
			doctorId: 102,
			appointmentDate: '2026-09-08',
			timeSlot: '11:00 AM - 11:30 AM'
		};

		expect( () => AppointmentModel.create( duplicateBooking ) ).toThrow(
			'The requested time slot has already been booked for this doctor.'
		);
	} );

	it( 'should allow canceling an active appointment', () => {
		const cancelled = AppointmentModel.cancel( 1 );
		expect( cancelled ).not.toBeNull();
		expect( cancelled.status ).toBe( 'Cancelled' );
	} );
} );