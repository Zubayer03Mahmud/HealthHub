/**
 * @fileoverview Frontend API Client Utility for HealthHub.
 * Handles standard fetch requests to the backend endpoints.
 * 
 * @module public/views/api-client
 * @author Konok
 */

const ApiClient = {
	/**
	 * Perform GET request.
	 * @param {string} endpoint
	 * @returns {Promise<object>}
	 */
	async get( endpoint ) {
		const response = await fetch( endpoint );
		if ( ! response.ok ) {
			throw new Error( `HTTP error! status: ${response.status}` );
		}
		return await response.json();
	}
};

if ( typeof module !== 'undefined' ) {
	module.exports = ApiClient;
}