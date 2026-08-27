/**
 * @fileoverview Emergency Hotline View Component
 * @module public/views/emergency
 * @author Konok
 */

const EmergencyView = {
	render: async ( containerElement ) => {
		containerElement.innerHTML = `
			<section class="emergency-section" style="max-width: 1000px; margin: 2rem auto; padding: 0 1rem;">
				<div style="background: linear-gradient(135deg, #dc2626, #991b1b); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
					<h1 style="margin: 0 0 0.5rem 0;">🚨 24/7 National Emergency Hotlines</h1>
					<p style="margin: 0; opacity: 0.9;">Instant direct dial for medical triage, ambulance, and hospital emergency casualty desks in Bangladesh.</p>
				</div>

				<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
					<input type="text" id="emergencySearchInput" placeholder="Search hospital name, area (e.g. Savar, DMCH)..." style="flex: 1; min-width: 260px; padding: 0.75rem 1rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 1rem;" />
					<select id="emergencyCategoryFilter" style="padding: 0.75rem 1rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 1rem; background: white;">
						<option value="All">All Categories</option>
						<option value="National">National Priority Hotlines</option>
						<option value="Hospital">Hospital Emergency Casualty</option>
					</select>
				</div>

				<div id="emergencyCardsGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.25rem;">
					<p style="color: #64748b;">Loading emergency hotlines...</p>
				</div>
			</section>
		`;

		const searchInput = document.getElementById( 'emergencySearchInput' );
		const categoryFilter = document.getElementById( 'emergencyCategoryFilter' );
		const grid = document.getElementById( 'emergencyCardsGrid' );

		const fetchAndRender = async () => {
			const query = searchInput.value;
			const category = categoryFilter.value;

			try {
				const result = await ApiClient.get( `/api/emergency-contacts?search=${encodeURIComponent( query )}&category=${encodeURIComponent( category )}` );

				if ( ! result.success || result.data.length === 0 ) {
					grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 2rem;">No emergency contacts found matching your query.</p>`;
					return;
				}

				grid.innerHTML = result.data.map( ( item ) => `
					<div style="border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.25rem; background: white; box-shadow: 0 2px 6px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
						<div>
							<div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
								<span style="background: ${item.category === 'National' ? '#fee2e2' : '#e0f2fe'}; color: ${item.category === 'National' ? '#991b1b' : '#0369a1'}; font-weight: 600; font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 4px;">
									${item.category}
								</span>
								<span style="font-size: 0.75rem; color: #16a34a; font-weight: 600;">● ${item.operatingHours}</span>
							</div>
							<h3 style="margin: 0.5rem 0 0.25rem 0; font-size: 1.1rem; color: #0f172a;">${item.serviceName}</h3>
							<p style="margin: 0 0 1rem 0; font-size: 0.85rem; color: #64748b;">${item.description}</p>
						</div>

						<div>
							<div style="font-size: 0.85rem; color: #475569; margin-bottom: 0.75rem;">
								<strong>Location:</strong> ${item.district} ${item.tollFree ? '<span style="color: #16a34a; margin-left: 0.5rem;">(Toll-Free)</span>' : ''}
							</div>
							<a href="tel:${item.emergencyNumber}" style="display: block; text-align: center; background: #dc2626; color: white; text-decoration: none; padding: 0.65rem; border-radius: 6px; font-weight: bold;">
								📞 Call ${item.emergencyNumber}
							</a>
						</div>
					</div>
				` ).join( '' );
			} catch ( err ) {
				grid.innerHTML = `<p style="color: #dc2626; grid-column: 1/-1;">Failed to load emergency contacts.</p>`;
			}
		};

		searchInput.addEventListener( 'input', fetchAndRender );
		categoryFilter.addEventListener( 'change', fetchAndRender );
		fetchAndRender();
	}
};