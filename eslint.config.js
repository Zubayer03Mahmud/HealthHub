/**
 * @fileoverview ESLint Flat Configuration for HealthHub MVC Application.
 */

const js = require( '@eslint/js' );

module.exports = [
	js.configs.recommended,
	{
		files: [ 'src/**/*.js', 'public/views/**/*.js' ],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'commonjs',
			globals: {
				// Node.js Globals
				process: 'readonly',
				__dirname: 'readonly',
				module: 'readonly',
				require: 'readonly',
				console: 'readonly',
				// Browser Globals
				window: 'readonly',
				document: 'readonly',
				fetch: 'readonly',
				alert: 'readonly',
				confirm: 'readonly',
				HTMLElement: 'readonly',
				// Frontend Module Globals
				ApiClient: 'writable',
				EmergencyView: 'writable',
				AppointmentView: 'writable'
			}
		},
		rules: {
			'no-unused-vars': [ 'warn', { argsIgnorePattern: '^(req|res|next|_.*)$', varsIgnorePattern: '^(ApiClient|EmergencyView|AppointmentView)$' } ],
			'no-console': 'off',
			'semi': [ 'error', 'always' ],
			'quotes': [ 'error', 'single', { avoidEscape: true } ],
			'eqeqeq': [ 'error', 'always' ],
			'no-undef': 'error'
		}
	}
];