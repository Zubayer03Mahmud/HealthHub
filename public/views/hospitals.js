/**
 * Hospital Client Module
 *
 * Queries hospital facilities and renders hospital search results.
 *
 * @module HospitalClient
 */

async function searchHospitals() {
	const query = document.getElementById( 'hospital-search-input' ).value;
	const res = await apiRequest( `/api/hospitals?q=${ encodeURIComponent( query ) }` );
	const container = document.getElementById( 'hospitals-list' );

	if ( ! res.success || res.data.length === 0 ) {
		container.innerHTML = `<div class="alert alert-danger" style="grid-column: 1/-1;">No hospitals found for the selected criteria.</div>`;
		return;
	}

	container.innerHTML = res.data.map( ( h ) => `
		<div class="card">
			<div>
				<div style="display: flex; justify-content: space-between;">
					<h3>${ h.name }</h3>
					<span class="badge badge-blue">★ ${ h.rating }</span>
				</div>
				<p style="color: var(--text-muted); margin: 0.3rem 0;">📍 ${ h.address }</p>
				<p><strong>Departments:</strong> ${ h.availableDepartments.join( ', ' ) }</p>
				<div style="margin: 0.8rem 0; display: flex; gap: 0.5rem;">
					<span class="badge badge-green">Beds: ${ h.availableBeds } / ${ h.totalBeds }</span>
				</div>
			</div>
			<div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
				<a href="tel:${ h.emergencyHotline }" class="btn btn-danger" style="flex: 1; text-decoration: none;">🚨 Call Hotline</a>
				<button class="btn btn-outline" style="flex: 1;" onclick="navigateTo('doctors')">View Doctors</button>
			</div>
		</div>
	` ).join( '' );
}
