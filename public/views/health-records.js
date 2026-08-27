/**
 * Health Records Client Module
 *
 * Handles document upload to Multer API and displays patient files.
 *
 * @module HealthRecordsClient
 */

async function loadHealthRecords() {
	if ( ! currentUser ) {
		navigateTo( 'login' );
		return;
	}

	const res = await apiRequest( '/api/records' );
	const tbody = document.getElementById( 'records-tbody' );

	if ( ! res.success || res.data.length === 0 ) {
		tbody.innerHTML = `<tr><td colspan="4" style="text-align: center;">No uploaded medical records found.</td></tr>`;
		return;
	}

	tbody.innerHTML = res.data.map( ( r ) => `
		<tr>
			<td><strong>${ r.title }</strong><br><small style="color: var(--text-muted);">${ r.description }</small></td>
			<td><span class="badge badge-blue">${ r.category }</span></td>
			<td>${ r.uploadedAt }</td>
			<td>
				<a href="${ r.filePath }" target="_blank" class="btn btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.8rem; text-decoration: none;">View</a>
				<button class="btn btn-danger" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;" onclick="deleteHealthRecord(${ r.id })">Delete</button>
			</td>
		</tr>
	` ).join( '' );
}

document.getElementById( 'record-upload-form' ).addEventListener( 'submit', async ( e ) => {
	e.preventDefault();
	const title = document.getElementById( 'rec-title' ).value;
	const category = document.getElementById( 'rec-cat' ).value;
	const description = document.getElementById( 'rec-desc' ).value;
	const fileInput = document.getElementById( 'rec-file' );

	if ( fileInput.files.length === 0 ) {
		showAlert( 'Please select a file to upload.', 'danger' );
		return;
	}

	const formData = new FormData();
	formData.append( 'title', title );
	formData.append( 'category', category );
	formData.append( 'description', description );
	formData.append( 'recordFile', fileInput.files[ 0 ] );

	const res = await apiRequest( '/api/records/upload', 'POST', formData );
	if ( res.success ) {
		showAlert( 'Document uploaded successfully.', 'success' );
		document.getElementById( 'record-upload-form' ).reset();
		loadHealthRecords();
	} else {
		showAlert( res.message, 'danger' );
	}
} );

async function deleteHealthRecord( id ) {
	if ( ! confirm( 'Are you sure you want to delete this medical file?' ) ) return;
	const res = await apiRequest( `/api/records/${ id }`, 'DELETE' );
	if ( res.success ) {
		showAlert( 'Record removed.', 'success' );
		loadHealthRecords();
	}
}