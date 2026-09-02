/**
 * ESLint Configuration
 *
 * Static analysis rules for HealthHub. These mirror the project's
 * JavaScript Coding Standard document, so a rule break is reported
 * automatically instead of being caught by hand in code review.
 *
 * Currently scoped to the Blood Bank Search feature's files only.
 *
 * @module EslintConfig
 */

const globals = require( 'globals' );

// One shared rule set, reused by every block below, so the standard
// is written down exactly once.
const healthHubRules = {
	// --- Coding Standard: formatting ---
	indent: [ 'error', 'tab' ],
	quotes: [ 'error', 'single' ],
	semi: [ 'error', 'always' ],
	'space-in-parens': [ 'error', 'always' ],
	'array-bracket-spacing': [ 'error', 'always' ],
	'object-curly-spacing': [ 'error', 'always' ],
	'template-curly-spacing': [ 'error', 'always' ],
	'space-before-blocks': [ 'error', 'always' ],
	'keyword-spacing': [ 'error', { before: true, after: true } ],
	'comma-spacing': [ 'error', { before: false, after: true } ],
	'no-trailing-spaces': 'error',
	'eol-last': [ 'error', 'always' ],

	// --- Coding Standard: language rules ---
	'no-var': 'error',
	'prefer-const': 'error',
	eqeqeq: [ 'error', 'always' ],
	curly: [ 'error', 'all' ],
	camelcase: [ 'error', { properties: 'never' } ],

	// --- Likely bugs, not style ---
	'no-undef': 'error',
	'no-unused-vars': 'error'
};

module.exports = [
	{
		// Server-side files: models, controllers, routes, data.
		files: [ 'src/**/blood-bank*.js' ],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'commonjs',
			globals: { ...globals.node }
		},
		rules: { ...healthHubRules }
	},
	{
		// Test files. Vitest is imported explicitly, so no extra globals.
		files: [ 'tests/**/blood-bank*.js' ],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: { ...globals.node }
		},
		rules: { ...healthHubRules }
	},
	{
		// Browser file. Runs in the page, not in Node.
		files: [ 'public/views/blood-bank*.js' ],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'script',
			globals: {
				...globals.browser,
				apiRequest: 'readonly',
				navigateTo: 'readonly'
			}
		},
		// Functions here are called from onclick="..." in index.html.
		// ESLint cannot read HTML, so it would wrongly report them unused.
		rules: { ...healthHubRules, 'no-unused-vars': 'off' }
	}
];