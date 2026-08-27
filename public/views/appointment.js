/**
 * @fileoverview Appointment Booking View Component.
 * Dynamic appointment reservation form, doctor selector, and slot cancellation.
 * 
 * @module public/views/appointment
 * @author Teammate
 */

const AppointmentView = {
	/**
	 * Render the appointment booking form and list.
	 * @param {HTMLElement} containerElement
	 */
	render: async ( containerElement ) => {
		containerElement.innerHTML = `
			<section style="max-width: 900px; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, sans-serif;">
				<div style="background: linear-gradient(135deg, #0284c7, #0369a1); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.08);">
					<h1 style="margin: 0 0 0.5rem 0;">📅 Doctor Appointment Booking</h1>
					<p style="margin: 0; opacity: 0.9;">Schedule real-time doctor consultations across specialized clinical departments.</p>
				</div>

				<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; background: white; padding: 2rem; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
					<!-- Booking Form -->
					<form id="appointmentForm" style="display: flex; flex-direction: column; gap: 1rem;">
						<h3 style="margin: 0 0 0.5rem 0; color: #0f172a;">Patient & Doctor Details</h3>
						
						<div>
							<label style="display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 0.25rem;">Patient Name</label>
							<input type="text" id="patientName" required placeholder="e.g. Tanvir Ahmed" style="width: 100%; padding: 0.65rem; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box;" />
						</div>

						<div>
							<label style="display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 0.25rem;">Phone Number</label>
							<input type="tel" id="patientPhone" required placeholder="e.g. 01712345678" style="width: 100%; padding: 0.65rem; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box;" />
						</div>

						<div>
							<label style="display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 0.25rem;">Select Doctor</label>
							<select id="doctorSelect" required style="width: 100%; padding: 0.65rem; border: 1px solid #cbd5e1; border-radius: 6px; background: white; box-sizing: border-box;">
								<option value="">Loading doctors...</option>
							</select>
						</div>

						<div>
							<label style="display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 0.25rem;">Appointment Date</label>
							<input type="date" id="appointmentDate" required style="width: 100%; padding: 0.65rem; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box;" />
						</div>

						<div>
							<label style="display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 0.25rem;">Available Time Slot</label>
							<select id="timeSlotSelect" required style="width: 100%; padding: 0.65rem; border: 1px solid #cbd5e1; border-radius: 6px; background: white; box-sizing: border-box;">
								<option value="">Choose doctor & date first</option>
							</select>
						</div>

						<button type="submit" style="margin-top: 0.5rem; background: #0284c7; color: white; border: none; padding: 0.75rem; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s;">
							Confirm Appointment
						</button>
						<div id="bookingStatus" style="font-size: 0.9rem; margin-top: 0.5rem;"></div>
					</form>

					<!-- Confirmed Appointments List -->
					<div>
						<h3 style="margin: 0 0 1rem 0; color: #0f172a;">Confirmed Bookings</h3>
						<div id="bookedAppointmentsList" style="display: flex; flex-direction: column; gap: 0.75rem; max-height: 440px; overflow-y: auto;">
							<p style="color: #64748b;">Loading appointments...</p>
						</div>
					</div>
				</div>
			</section>
		`;

		const doctorSelect = document.getElementById( 'doctorSelect' );
		const dateInput = document.getElementById( 'appointmentDate' );
		const slotSelect = document.getElementById( 'timeSlotSelect' );
		const form = document.getElementById( 'appointmentForm' );
		const statusBox = document.getElementById( 'bookingStatus' );
		const listContainer = document.getElementById( 'bookedAppointmentsList' );

		dateInput.min = new Date().toISOString().split( 'T' )[ 0 ];

		// Fetch and load doctors
		const loadDoctors = async () => {
			const res = await fetch( '/api/appointments/doctors' );
			const result = await res.json();
			if ( result.success ) {
				doctorSelect.innerHTML = '<option value="">-- Choose Specialist Doctor --</option>' +
					result.data.map( ( d ) => `<option value="${d.id}">${d.name} (${d.department})</option>` ).join( '' );
			}
		};

		// Fetch available time slots
		const loadSlots = async () => {
			const doctorId = doctorSelect.value;
			const date = dateInput.value;
			if ( ! doctorId || ! date ) return;

			slotSelect.innerHTML = '<option value="">Checking slot availability...</option>';
			const res = await fetch( `/api/appointments/slots?doctorId=${doctorId}&date=${date}` );
			const result = await res.json();

			if ( result.success && result.availableSlots.length > 0 ) {
				slotSelect.innerHTML = result.availableSlots.map( ( s ) => `<option value="${s}">${s}</option>` ).join( '' );
			} else {
				slotSelect.innerHTML = '<option value="">No slots available for this date</option>';
			}
		};

		// Fetch list of bookings with Confirmed status & Cancel action button
		const loadAppointments = async () => {
			const res = await fetch( '/api/appointments' );
			const result = await res.json();
			if ( result.success ) {
				if ( result.data.length === 0 ) {
					listContainer.innerHTML = '<p style="color: #64748b;">No active appointments scheduled.</p>';
					return;
				}

				listContainer.innerHTML = result.data.map( ( apt ) => `
					<div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem; background: ${apt.status === 'Cancelled' ? '#f1f5f9' : '#ffffff'}; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
						<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
							<strong style="color: ${apt.status === 'Cancelled' ? '#94a3b8' : '#0f172a'};">${apt.patientName}</strong>
							<div style="display: flex; align-items: center; gap: 0.5rem;">
								<span style="font-size: 0.75rem; background: ${apt.status === 'Confirmed' ? '#dcfce7' : '#fee2e2'}; color: ${apt.status === 'Confirmed' ? '#15803d' : '#b91c1c'}; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: bold;">
									${apt.status}
								</span>
								${apt.status === 'Confirmed' ? `
									<button class="btn-cancel" data-id="${apt.id}" style="background: #ffffff; color: #dc2626; border: 1px solid #fca5a5; padding: 0.2rem 0.55rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; cursor: pointer;">
										Cancel
									</button>
								` : ''}
							</div>
						</div>
						<div style="font-size: 0.85rem; color: #475569;">
							👨‍⚕️ ${apt.doctorName} (${apt.department})
						</div>
						<div style="font-size: 0.8rem; color: #64748b; margin-top: 0.2rem;">
							🕒 ${apt.appointmentDate} | ${apt.timeSlot}
						</div>
					</div>
				` ).join( '' );
			}
		};

		// Event Delegation for Cancel Button Click
		listContainer.addEventListener( 'click', async ( e ) => {
			if ( e.target.classList.contains( 'btn-cancel' ) ) {
				const appointmentId = e.target.getAttribute( 'data-id' );
				const confirmCancel = confirm( 'Are you sure you want to cancel this appointment?' );

				if ( confirmCancel ) {
					try {
						const response = await fetch( `/api/appointments/${appointmentId}`, {
							method: 'DELETE'
						} );
						const data = await response.json();

						if ( data.success ) {
							await loadAppointments();
							await loadSlots(); // Slot free hoye gele update hobe
						} else {
							alert( data.message || 'Failed to cancel appointment.' );
						}
					} catch ( err ) {
						alert( 'Network error. Could not cancel appointment.' );
					}
				}
			}
		} );

		doctorSelect.addEventListener( 'change', loadSlots );
		dateInput.addEventListener( 'change', loadSlots );

		// Form Submission
		form.addEventListener( 'submit', async ( e ) => {
			e.preventDefault();
			statusBox.innerHTML = '<span style="color: #0284c7;">Processing booking...</span>';

			const payload = {
				patientName: document.getElementById( 'patientName' ).value,
				patientPhone: document.getElementById( 'patientPhone' ).value,
				doctorId: doctorSelect.value,
				appointmentDate: dateInput.value,
				timeSlot: slotSelect.value
			};

			try {
				const res = await fetch( '/api/appointments', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify( payload )
				} );
				const data = await res.json();

				if ( data.success ) {
					statusBox.innerHTML = '<span style="color: #16a34a; font-weight: bold;">✓ Appointment Confirmed!</span>';
					form.reset();
					await loadSlots();
					await loadAppointments();
				} else {
					statusBox.innerHTML = `<span style="color: #dc2626;">✕ ${data.message}</span>`;
				}
			} catch ( err ) {
				statusBox.innerHTML = '<span style="color: #dc2626;">✕ Failed to submit booking request.</span>';
			}
		} );

		await loadDoctors();
		await loadAppointments();
	}
};

if ( typeof module !== 'undefined' ) {
	module.exports = AppointmentView;
}