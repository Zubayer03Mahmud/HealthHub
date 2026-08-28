/**
 * Vaccines & Anti-Venoms Client Module
 *
 * Renders the search interface, result list and facility detail view for the
 * Search Vaccine & Anti-Venom feature (SRS 3.1.7).
 *
 * @module VaccineClient
 */

/**
 * Runs a search and renders the results into the page.
 *
 * @async
 * @returns {Promise<void>}
 */
async function loadVaccines() {
	const type = document.getElementById( 'vaccine-type-filter' ).value;
	const query = document.getElementById( 'vaccine-search-input' ).value;
	const container = document.getElementById( 'vaccines-list' );

	closeVaccineDetail();
	container.innerHTML = '<p class="muted" style="grid-column: 1/-1;">Searching...</p>';

	const endpoint = `/api/vaccines?type=${ encodeURIComponent( type ) }&q=${ encodeURIComponent( query ) }`;
	const res = await apiRequest( endpoint );

	if ( ! res.success ) {
		container.innerHTML = buildMessage( res.message, 'danger' );
		return;
	}

	if ( res.count === 0 ) {
		container.innerHTML = buildMessage( 'No vaccine or anti-venom found.', 'info' );
		return;
	}

	let notice = '';

	if ( res.availableCount === 0 ) {
		notice = buildMessage(
			'The searched vaccine or anti-venom is currently unavailable at the listed facilities.',
			'info'
		);
	}

	container.innerHTML = notice + res.data.map( ( item ) => buildVaccineCard( item ) ).join( '' );
}

/**
 * Builds a full-width message banner for the results grid.
 *
 * @param {string} message Text to display.
 * @param {string} variant 'info' for normal outcomes, 'danger' for failures.
 * @returns {string} Banner markup.
 */
function buildMessage( message, variant ) {
	return `<div class="alert alert-${ variant }" style="grid-column: 1/-1;">${ message }</div>`;
}

/**
 * Builds one result card.
 *
 * @param {Object} item Record returned by the API.
 * @returns {string} Card markup.
 */
function buildVaccineCard( item ) {
	const isAvailable = item.status === 'Available' && item.availableStock > 0;
	const typeBadge = item.type === 'Anti-Venom' ? 'badge-red' : 'badge-blue';
	const stockBadge = isAvailable
		? `<span class="badge badge-green">${ item.availableStock } in stock</span>`
		: '<span class="badge badge-red">Out of stock</span>';

	return `
		<div class="card">
			<div style="display: flex; justify-content: space-between;">
				<span class="badge ${ typeBadge }">${ item.type }</span>
				${ stockBadge }
			</div>
			<h3>${ item.name }</h3>
			<p><strong>Facility:</strong> ${ item.hospitalOrPharmacy }</p>
			<p class="muted">${ item.location }</p>
			<p><strong>Price:</strong> ${ item.unitPrice } BDT</p>
			<button class="btn btn-outline" onclick="viewVaccineDetail( ${ item.id } )">View full details</button>
		</div>
	`;
}

/**
 * Loads and displays the complete details of one facility (SRS 3.1.7 M5).
 *
 * @async
 * @param {number} id Identifier of the selected record.
 * @returns {Promise<void>}
 */
async function viewVaccineDetail( id ) {
	const detail = document.getElementById( 'vaccine-detail' );
	const res = await apiRequest( `/api/vaccines/${ id }` );

	if ( ! res.success ) {
		detail.innerHTML = `<div class="alert alert-danger">${ res.message }</div>`;
		detail.classList.remove( 'hidden' );
		return;
	}

	const item = res.data;
	const availability = item.status === 'Available' && item.availableStock > 0
		? `Available — ${ item.availableStock } unit(s) in stock`
		: 'Currently out of stock';

	detail.innerHTML = `
		<div class="card">
			<h3>${ item.name }</h3>
			<p><strong>Category:</strong> ${ item.type }</p>
			<p><strong>Facility:</strong> ${ item.hospitalOrPharmacy }</p>
			<p><strong>Address:</strong> ${ item.location }</p>
			<p><strong>Area:</strong> ${ item.area }, ${ item.city }</p>
			<p><strong>Availability:</strong> ${ availability }</p>
			<p><strong>Price:</strong> ${ item.unitPrice } BDT</p>
			<a href="tel:${ item.contactNumber }" class="btn btn-primary" style="text-decoration: none;">Call ${ item.contactNumber }</a>
			<button class="btn btn-outline" onclick="closeVaccineDetail()">Close</button>
		</div>
	`;

	detail.classList.remove( 'hidden' );
	window.scrollTo( 0, 0 );
}

/**
 * Hides the facility detail panel.
 *
 * @returns {void}
 */
function closeVaccineDetail() {
	document.getElementById( 'vaccine-detail' ).classList.add( 'hidden' );
}