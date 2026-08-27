/**
 * Hospital Search Module — Vitest Unit Tests
 *
 * Extracted from the original HealthHub `tests/healthhub.test.js`.
 * Only the "4. Hospital Search Component" block is kept, since it is the
 * only one that exercises
 * HospitalModel. All other blocks (Registration, Login, Doctor Profile,
 * Appointment Booking, Health Records, Emergency Contacts, Ambulance
 * Search, Blood Bank, Vaccines, Payments) depended on models that are not
 * part of this extracted module and were removed.
 *
 * @module HospitalSearchVitestTests
 */

import { describe, it, expect } from 'vitest';

const HospitalModel = require( '../src/models/hospital-model' );

describe( 'Hospital Search Module Unit Tests (Vitest)', () => {

	// 4. Hospital Search Component
	describe( '4. Hospital Search Component', () => {
		it( 'should search hospitals by keyword and area (Savar / Enam Medical)', () => {
			const results = HospitalModel.search( 'Enam Medical' );
			expect( results.length ).toBeGreaterThanOrEqual( 1 );
			expect( results[ 0 ].name ).toBe( 'Enam Medical College Hospital' );
			expect( results[ 0 ].city ).toBe( 'Savar' );
			expect( results[ 0 ].district ).toBe( 'Dhaka' );
		} );

		it( 'should return all facilities when search query is empty', () => {
			const all = HospitalModel.getAll();
			const results = HospitalModel.search( '' );
			expect( results.length ).toBe( all.length );
		} );

		it( 'should return a hospital by its numeric ID', () => {
			const hospital = HospitalModel.findById( 3 );
			expect( hospital ).not.toBeNull();
			expect( hospital.name ).toBe( 'Square Hospital Limited' );
		} );

		it( 'should return null for a non-existent hospital ID', () => {
			const hospital = HospitalModel.findById( 999 );
			expect( hospital ).toBeNull();
		} );
	} );
} );
