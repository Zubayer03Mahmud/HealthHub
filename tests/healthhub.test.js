/**
 * @fileoverview Central Test Suite for HealthHub Application (Vitest)
 * Includes unit and integration tests across all system modules.
 */

import { describe, it, expect } from 'vitest';
const EmergencyContactModel = require( '../src/models/emergency-contact-model' );

// SPRINT 1 - MODULE 1: Emergency Contact Management (SRS 3.1.8) [Owner: Konok]
describe( 'SRS 3.1.8: Emergency Contact Hotline Directory Module', () => {
	it( 'should retrieve all emergency contact records from mock database', () => {
		const contacts = EmergencyContactModel.getAll();
		expect( Array.isArray( contacts ) ).toBe( true );
		expect( contacts.length ).toBeGreaterThanOrEqual( 5 );
	} );

	it( 'should retrieve critical national priority hotlines (999 and 16263)', () => {
		const nationalHotlines = EmergencyContactModel.getNationalHotlines();
		expect( nationalHotlines.length ).toBeGreaterThanOrEqual( 2 );

		const has999 = nationalHotlines.some( ( c ) => c.emergencyNumber === '999' );
		const has16263 = nationalHotlines.some( ( c ) => c.emergencyNumber === '16263' );

		expect( has999 ).toBe( true );
		expect( has16263 ).toBe( true );
	} );

	it( 'should filter emergency contacts by hospital keyword query', () => {
		const results = EmergencyContactModel.search( 'Enam Medical' );
		expect( results.length ).toBeGreaterThanOrEqual( 1 );
		expect( results[ 0 ].serviceName ).toContain( 'Enam Medical' );
		expect( results[ 0 ].district ).toBe( 'Dhaka' );
	} );

	it( 'should strictly filter contacts by category (Hospital vs National)', () => {
		const hospitalContacts = EmergencyContactModel.search( '', 'Hospital' );
		expect( hospitalContacts.length ).toBeGreaterThanOrEqual( 1 );
		hospitalContacts.forEach( ( item ) => {
			expect( item.category ).toBe( 'Hospital' );
		} );
	} );

	it( 'should find a single emergency contact by unique ID', () => {
		const contact = EmergencyContactModel.findById( 1 );
		expect( contact ).not.toBeNull();
		expect( contact.serviceName ).toContain( 'National Emergency Service' );
		expect( contact.tollFree ).toBe( true );
	} );

	it( 'should return null when searching with an invalid ID', () => {
		const contact = EmergencyContactModel.findById( 99999 );
		expect( contact ).toBeNull();
	} );
} );

