/**
 * API Client Utility
 * Handles standard fetch requests to the backend endpoints.
 */

const ApiClient = {
	async get( endpoint ) {
		const response = await fetch( endpoint );
		if ( ! response.ok ) {
			throw new Error( `HTTP error! status: ${response.status}` );
		}
		return await response.json();
	}
};