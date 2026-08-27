/**
 * API Client and View Router
 *
 * Provides the shared fetch wrapper and the single-page navigation used by
 * every feature view.
 *
 * @module ApiClient
 */

/**
 * Sends a request to the HealthHub API and returns the parsed JSON body.
 *
 * A failed network call is converted into the same response shape the server
 * uses, so callers only ever handle one format.
 *
 * @async
 * @param {string} endpoint API path, for example '/api/vaccines'.
 * @param {string} method HTTP method.
 * @param {Object|null} body Optional request payload.
 * @returns {Promise<Object>} Parsed response body.
 */
async function apiRequest( endpoint, method = 'GET', body = null ) {
	const options = { method, headers: {} };

	if ( body ) {
		options.headers[ 'Content-Type' ] = 'application/json';
		options.body = JSON.stringify( body );
	}

	try {
		const response = await fetch( endpoint, options );
		return await response.json();
	} catch ( error ) {
		console.error( `API request failed (${ endpoint }):`, error );
		return {
			success: false,
			message: 'Cannot reach the server. Please check your connection and try again later.'
		};
	}
}

/**
 * Shows one view section and hides the rest.
 *
 * @param {string} viewName View identifier, matching a section id of 'view-<name>'.
 * @returns {void}
 */
function navigateTo( viewName ) {
	document.querySelectorAll( '.view' ).forEach( ( view ) => {
		view.classList.remove( 'active' );
	} );

	const target = document.getElementById( `view-${ viewName }` );

	if ( target ) {
		target.classList.add( 'active' );
		window.scrollTo( 0, 0 );
	}

	if ( viewName === 'vaccines' ) {
		loadVaccines();
	}

	// TEAM: add one line above for your own view loader.
}

document.addEventListener( 'DOMContentLoaded', () => {
	navigateTo( 'home' );
} );