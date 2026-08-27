/**
 * API Routes
 *
 * Mounts one router per feature. Each team member adds a single line for
 * their own feature and changes nothing else in this file.
 *
 * @module ApiRoutes
 */

const express = require( 'express' );

const vaccineRoutes = require( './vaccine-routes' );

const router = express.Router();

// Feature 7 - Search Vaccine & Anti-Venoms (SRS 3.1.7)
router.use( '/vaccines', vaccineRoutes );

// TEAM: add your feature router below, one line each.
// Example: router.use( '/hospitals', hospitalRoutes );

module.exports = router;