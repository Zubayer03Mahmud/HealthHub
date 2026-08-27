/**
 * Authentication Controller
 *
 * Manages user login, session lifecycle, and authentication checks.
 *
 * @module AuthController
 */

const bcrypt = require('bcryptjs');
const UserModel = require('../models/login-model');

class AuthController {

	/**
	 * Authenticates user credentials and establishes a session.
	 *
	 * @async
	 * @param {Object} req Express request.
	 * @param {Object} res Express response.
	 * @returns {Promise<void>}
	 */
	static async login(req, res) {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return res.status(400).json({
					success: false,
					message: 'Please provide both email and password.'
				});
			}

			const user = UserModel.findByEmail(email);

			if (!user) {
				return res.status(404).json({
					success: false,
					message: 'User account not found.'
				});
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(401).json({
					success: false,
					message: 'Invalid email or password.'
				});
			}

			req.session.user = {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role
			};

			res.status(200).json({
				success: true,
				message: 'Login successful.',
				user: req.session.user
			});

		} catch (error) {
			console.error(error);

			res.status(500).json({
				success: false,
				message: 'Internal server error during authentication.'
			});
		}
	}

	/**
	 * Retrieves the current session user.
	 *
	 * @param {Object} req Express request.
	 * @param {Object} res Express response.
	 * @returns {void}
	 */
	static getCurrentUser(req, res) {
		if (req.session && req.session.user) {
			return res.status(200).json({
				success: true,
				user: req.session.user
			});
		}

		res.status(200).json({
			success: true,
			user: null
		});
	}

	/**
	 * Terminates the user session.
	 *
	 * @param {Object} req Express request.
	 * @param {Object} res Express response.
	 * @returns {void}
	 */
	static logout(req, res) {
		req.session.destroy((error) => {
			if (error) {
				return res.status(500).json({
					success: false,
					message: 'Could not log out.'
				});
			}

			res.clearCookie('connect.sid');

			res.status(200).json({
				success: true,
				message: 'Logged out successfully.'
			});
		});
	}
}

module.exports = AuthController;