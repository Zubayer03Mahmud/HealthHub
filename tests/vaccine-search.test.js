/**
 * Vaccine & Anti-Venom Search — Unit Tests
 *
 * Verifies the behaviour required by SRS 3.1.7 at the model level.
 *
 * @module VaccineSearchTests
 */

import { describe, it, expect } from 'vitest';

const VaccineModel = require( '../src/models/vaccine-model' );

describe( 'VaccineModel.search — SRS 3.1.7', () => {

	describe( 'Searching by name (M1)', () => {

		it( 'should return vaccines matching a vaccine name', () => {
			const results = VaccineModel.search( 'Rabies', 'All' );
			expect( results.length ).toBeGreaterThanOrEqual( 2 );
		} );

		it( 'should return anti-venoms matching an anti-venom name', () => {
			const results = VaccineModel.search( 'Anti-Snake Venom', 'All' );
			expect( results.length ).toBeGreaterThanOrEqual( 2 );
			results.forEach( ( item ) => {
				expect( item.type ).toBe( 'Anti-Venom' );
			} );
		} );

		it( 'should return an empty array when nothing matches', () => {
			expect( VaccineModel.search( 'zzzzzzzz', 'All' ) ).toEqual( [] );
		} );
	} );

	describe( 'Searching by facility, city, area and address (M1)', () => {

		it( 'should find a facility by hospital or pharmacy name', () => {
			const results = VaccineModel.search( 'Mitford', 'All' );
			expect( results.length ).toBeGreaterThanOrEqual( 1 );
		} );

		it( 'should find facilities by city', () => {
			const results = VaccineModel.search( 'Sylhet', 'All' );
			expect( results.length ).toBe( 1 );
			expect( results[ 0 ].city ).toBe( 'Sylhet' );
		} );

		it( 'should find facilities by area', () => {
			const results = VaccineModel.search( 'Shahbagh', 'All' );
			expect( results.length ).toBeGreaterThanOrEqual( 1 );
			expect( results[ 0 ].area ).toBe( 'Shahbagh' );
		} );

		it( 'should find facilities by full street address', () => {
			const results = VaccineModel.search( 'Fazlul Kader', 'All' );
			expect( results.length ).toBe( 1 );
			expect( results[ 0 ].id ).toBe( 4 );
		} );
	} );

	describe( 'Filtering by category (M4)', () => {

		it( 'should return only vaccines when the category is Vaccine', () => {
			const results = VaccineModel.search( '', 'Vaccine' );
			expect( results.length ).toBeGreaterThan( 0 );
			results.forEach( ( item ) => {
				expect( item.type ).toBe( 'Vaccine' );
			} );
		} );

		it( 'should return only anti-venoms when the category is Anti-Venom', () => {
			const results = VaccineModel.search( '', 'Anti-Venom' );
			expect( results.length ).toBe( 3 );
			results.forEach( ( item ) => {
				expect( item.type ).toBe( 'Anti-Venom' );
			} );
		} );

		it( 'should return both categories when the category is All', () => {
			const types = VaccineModel.search( '', 'All' ).map( ( item ) => item.type );
			expect( types ).toContain( 'Vaccine' );
			expect( types ).toContain( 'Anti-Venom' );
		} );

		it( 'should combine the category filter with the search term', () => {
			expect( VaccineModel.search( 'Anti-Snake Venom', 'Vaccine' ) ).toEqual( [] );
		} );
	} );

	describe( 'Input normalisation', () => {

		it( 'should ignore letter case', () => {
			const upper = VaccineModel.search( 'RABIES', 'All' );
			const lower = VaccineModel.search( 'rabies', 'All' );
			expect( upper.length ).toBe( lower.length );
			expect( upper.length ).toBeGreaterThan( 0 );
		} );

		it( 'should ignore surrounding whitespace', () => {
			const padded = VaccineModel.search( '   Rabies   ', 'All' );
			const clean = VaccineModel.search( 'Rabies', 'All' );
			expect( padded.length ).toBe( clean.length );
		} );

		it( 'should treat a whitespace-only term as an empty search', () => {
			expect( VaccineModel.search( '     ', 'All' ).length ).toBe( 8 );
		} );

		it( 'should return the full inventory for an empty search term', () => {
			expect( VaccineModel.search( '', 'All' ).length ).toBe( 8 );
		} );

		it( 'should not crash when the search term is missing', () => {
			expect( VaccineModel.search( undefined, undefined ).length ).toBe( 8 );
		} );
	} );

	describe( 'Availability (M2, F2)', () => {

		it( 'should still return a facility whose stock is currently empty', () => {
			const results = VaccineModel.search( 'Sylhet', 'All' );
			expect( results[ 0 ].status ).toBe( 'Out of Stock' );
			expect( results[ 0 ].availableStock ).toBe( 0 );
		} );
	} );
} );

describe( 'VaccineModel.findById — SRS 3.1.7 M5', () => {

	it( 'should return the record matching a numeric id', () => {
		const item = VaccineModel.findById( 1 );
		expect( item ).not.toBeNull();
		expect( item.id ).toBe( 1 );
	} );

	it( 'should accept a numeric string, as route parameters arrive as strings', () => {
		const item = VaccineModel.findById( '4' );
		expect( item ).not.toBeNull();
		expect( item.city ).toBe( 'Chattogram' );
	} );

	it( 'should return null for an id that does not exist', () => {
		expect( VaccineModel.findById( 9999 ) ).toBeNull();
	} );

	it( 'should return null for a non-numeric id', () => {
		expect( VaccineModel.findById( 'abc' ) ).toBeNull();
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