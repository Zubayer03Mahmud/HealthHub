/**
 * Auth Client Module
 *
 * Handles client login and authentication state synchronization.
 *
 * @module AuthClient
 */

/**
 * Checks the current authentication status
 * and updates the authentication navigation.
 *
 * @async
 * @returns {Promise<void>}
 */
async function checkAuthStatus() {
	const response = await apiRequest('/api/auth/me');
	const authContainer = document.getElementById('auth-actions');

	if (response.success && response.user) {
		currentUser = response.user;

		authContainer.innerHTML = `
			<button class="btn btn-outline"
				onclick="navigateTo('my-appointments')">
				My Appointments
			</button>

			<button class="btn btn-outline"
				onclick="navigateTo('records')">
				My Records
			</button>

			<button class="btn btn-danger"
				onclick="handleLogout()">
				Logout (${currentUser.name.split(' ')[0]})
			</button>
		`;
	} else {
		currentUser = null;

		authContainer.innerHTML = `
			<button class="btn btn-outline"
				onclick="navigateTo('login')">
				Login
			</button>

			<button class="btn btn-primary"
				onclick="navigateTo('register')">
				Register
			</button>
		`;
	}
}

/**
 * Handles login form submission.
 */
document.getElementById('login-form').addEventListener('submit', async (e) => {
	e.preventDefault();

	const email = document.getElementById('login-email').value;
	const password = document.getElementById('login-password').value;

	const res = await apiRequest(
		'/api/auth/login',
		'POST',
		{ email, password }
	);

	if (res.success) {
		showAlert('Login successful!', 'success');

		await checkAuthStatus();

		navigateTo('home');
	} else {
		showAlert(res.message, 'danger');
	}
});

/**
 * Handles user logout.
 */
async function handleLogout() {
	const res = await apiRequest('/api/auth/logout', 'POST');

	if (res.success) {
		showAlert('Logged out successfully.', 'success');

		await checkAuthStatus();

		navigateTo('home');
	}
}