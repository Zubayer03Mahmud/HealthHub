/**
 * Vaccine & Anti-Venom Search — Unit Tests
 *
 * Verifies the behaviour required by SRS 3.1.7 at the model level. Runs
 * against a separate MySQL database (see src/models/database.js), created
 * and seeded automatically the first time this file runs.
 *
 * @module VaccineSearchTests
 */

import { describe, it, expect, beforeAll } from 'vitest';

const VaccineModel = require( '../src/models/vaccine-model' );

// This is the exact same function the real application uses to prepare
// its database - it just automatically targets the separate test database
// instead, because NODE_ENV is 'test' while Vitest is running.
beforeAll( async () => {
	await VaccineModel.initializeVaccineTable();
} );

describe( 'VaccineModel.search — SRS 3.1.7', () => {

	describe( 'Searching by name (M1)', () => {

		it( 'should return vaccines matching a vaccine name', async () => {
			const results = await VaccineModel.search( 'Rabies', 'All' );
			expect( results.length ).toBeGreaterThanOrEqual( 2 );
		} );

		it( 'should return anti-venoms matching an anti-venom name', async () => {
			const results = await VaccineModel.search( 'Anti-Snake Venom', 'All' );
			expect( results.length ).toBeGreaterThanOrEqual( 2 );
			results.forEach( ( item ) => {
				expect( item.type ).toBe( 'Anti-Venom' );
			} );
		} );

		it( 'should return an empty array when nothing matches', async () => {
			const results = await VaccineModel.search( 'zzzzzzzz', 'All' );
			expect( results ).toEqual( [] );
		} );
	} );

	describe( 'Searching by facility, city, area and address (M1)', () => {

		it( 'should find a facility by hospital or pharmacy name', async () => {
			const results = await VaccineModel.search( 'Mitford', 'All' );
			expect( results.length ).toBeGreaterThanOrEqual( 1 );
		} );

		it( 'should find facilities by city', async () => {
			const results = await VaccineModel.search( 'Sylhet', 'All' );
			expect( results.length ).toBe( 1 );
			expect( results[ 0 ].city ).toBe( 'Sylhet' );
		} );

		it( 'should find facilities by area', async () => {
			const results = await VaccineModel.search( 'Shahbagh', 'All' );
			expect( results.length ).toBeGreaterThanOrEqual( 1 );
			expect( results[ 0 ].area ).toBe( 'Shahbagh' );
		} );

		it( 'should find facilities by full street address', async () => {
			const results = await VaccineModel.search( 'Fazlul Kader', 'All' );
			expect( results.length ).toBe( 1 );
			expect( results[ 0 ].id ).toBe( 4 );
		} );
	} );

	describe( 'Filtering by category (M4)', () => {

		it( 'should return only vaccines when the category is Vaccine', async () => {
			const results = await VaccineModel.search( '', 'Vaccine' );
			expect( results.length ).toBeGreaterThan( 0 );
			results.forEach( ( item ) => {
				expect( item.type ).toBe( 'Vaccine' );
			} );
		} );

		it( 'should return only anti-venoms when the category is Anti-Venom', async () => {
			const results = await VaccineModel.search( '', 'Anti-Venom' );
			expect( results.length ).toBe( 3 );
			results.forEach( ( item ) => {
				expect( item.type ).toBe( 'Anti-Venom' );
			} );
		} );

		it( 'should return both categories when the category is All', async () => {
			const results = await VaccineModel.search( '', 'All' );
			const types = results.map( ( item ) => item.type );
			expect( types ).toContain( 'Vaccine' );
			expect( types ).toContain( 'Anti-Venom' );
		} );

		it( 'should combine the category filter with the search term', async () => {
			const results = await VaccineModel.search( 'Anti-Snake Venom', 'Vaccine' );
			expect( results ).toEqual( [] );
		} );
	} );

	describe( 'Input normalisation', () => {

		it( 'should ignore letter case', async () => {
			const upper = await VaccineModel.search( 'RABIES', 'All' );
			const lower = await VaccineModel.search( 'rabies', 'All' );
			expect( upper.length ).toBe( lower.length );
			expect( upper.length ).toBeGreaterThan( 0 );
		} );

		it( 'should ignore surrounding whitespace', async () => {
			const padded = await VaccineModel.search( '   Rabies   ', 'All' );
			const clean = await VaccineModel.search( 'Rabies', 'All' );
			expect( padded.length ).toBe( clean.length );
		} );

		it( 'should treat a whitespace-only term as an empty search', async () => {
			const results = await VaccineModel.search( '     ', 'All' );
			expect( results.length ).toBe( 8 );
		} );

		it( 'should return the full inventory for an empty search term', async () => {
			const results = await VaccineModel.search( '', 'All' );
			expect( results.length ).toBe( 8 );
		} );

		it( 'should not crash when the search term is missing', async () => {
			const results = await VaccineModel.search( undefined, undefined );
			expect( results.length ).toBe( 8 );
		} );
	} );

	describe( 'Availability (M2, F2)', () => {

		it( 'should still return a facility whose stock is currently empty', async () => {
			const results = await VaccineModel.search( 'Sylhet', 'All' );
			expect( results[ 0 ].status ).toBe( 'Out of Stock' );
			expect( results[ 0 ].availableStock ).toBe( 0 );
		} );
	} );
} );

describe( 'VaccineModel.findById — SRS 3.1.7 M5', () => {

	it( 'should return the record matching a numeric id', async () => {
		const item = await VaccineModel.findById( 1 );
		expect( item ).not.toBeNull();
		expect( item.id ).toBe( 1 );
	} );

	it( 'should accept a numeric string, as route parameters arrive as strings', async () => {
		const item = await VaccineModel.findById( '4' );
		expect( item ).not.toBeNull();
		expect( item.city ).toBe( 'Chattogram' );
	} );

	it( 'should return null for an id that does not exist', async () => {
		const item = await VaccineModel.findById( 9999 );
		expect( item ).toBeNull();
	} );

	it( 'should return null for a non-numeric id', async () => {
		const item = await VaccineModel.findById( 'abc' );
		expect( item ).toBeNull();
	} );
} );

describe( 'VaccineModel.isValidType — SRS 3.1.7 F3', () => {

	it( 'should accept the three documented category values', () => {
		expect( VaccineModel.isValidType( 'All' ) ).toBe( true );
		expect( VaccineModel.isValidType( 'Vaccine' ) ).toBe( true );
		expect( VaccineModel.isValidType( 'Anti-Venom' ) ).toBe( true );
	} );

	it( 'should reject an unknown category value', () => {
		expect( VaccineModel.isValidType( 'Medicine' ) ).toBe( false );
	} );
} );