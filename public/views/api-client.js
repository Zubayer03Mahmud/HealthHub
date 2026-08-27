/**
 * API Client & Router Module — Hospital Search Slice
 *
 * Provides the central HTTP fetch wrapper and single-page navigation logic.
 * Trimmed from the original HealthHub `public/views/api-client.js`.
 *
 * Two changes were required to make this module run independently:
 * 1. `navigateTo()` originally triggered loader functions for every
 *    HealthHub feature (loadDoctors, loadMyAppointments, loadAmbulances,
 *    etc.). Those loader functions live in view files that are not part
 *    of this extracted module, so calling them would throw
 *    `ReferenceError`. Only the `hospitals` trigger is kept.
 * 2. The `checkAuthStatus()` call in `DOMContentLoaded` and the
 *    `auth-actions` navbar container were removed, since Auth
 *    (Features 1 & 2) is not part of Hospital Search and `/api/auth/me`
 *    does not exist in this slice's routes.
 *
 * @module ApiClient
 */

/**
 * Universal JSON Fetch Wrapper.
 *
 * @async
 * @param {string} endpoint Target API URL.
 * @param {string} method HTTP Method.
 * @param {Object|null} body Optional payload.
 * @returns {Promise<Object>} JSON response.
 */
async function apiRequest( endpoint, method = 'GET', body = null ) {
	const options = {
		method,
		headers: {}
	};

	if ( body && ! ( body instanceof FormData ) ) {
		options.headers[ 'Content-Type' ] = 'application/json';
		options.body = JSON.stringify( body );
	} else if ( body instanceof FormData ) {
		options.body = body;
	}

	try {
		const response = await fetch( endpoint, options );
		const data = await response.json();
		return data;
	} catch ( error ) {
		console.error( `API Request Error (${ endpoint }):`, error );
		return { success: false, message: 'Network or server communication error.' };
	}
}

/**
 * Displays global temporary status banner.
 *
 * @param {string} message Text message.
 * @param {string} type 'success' or 'danger'.
 */
function showAlert( message, type = 'success' ) {
	const alertBox = document.getElementById( 'global-alert' );
	alertBox.className = `alert alert-${ type }`;
	alertBox.textContent = message;
	alertBox.classList.remove( 'hidden' );
	setTimeout( () => {
		alertBox.classList.add( 'hidden' );
	}, 4000 );
}

/**
 * Navigates to a specific single-page view.
 *
 * @param {string} viewName View ID suffix.
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

	// Trigger the hospital search loader.
	if ( viewName === 'hospitals' ) searchHospitals();
}

document.addEventListener( 'DOMContentLoaded', () => {
	navigateTo( 'home' );
} );
