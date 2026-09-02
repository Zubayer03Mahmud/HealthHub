/**
 * API Routes Definition — Ambulance Search Slice
 *
 * Connects Ambulance Search JSON endpoints to the Ambulance Controller.
 * Trimmed from the original HealthHub `src/routes/api-routes.js`, which
 * also mounted routes for Auth, Hospitals, Doctors, Appointments,
 * Emergency Contacts, Blood Banks, Vaccines, Recommendations, Payments,
 * and Health Records. Those controllers are not part of this module, so
 * their `require()` calls and route registrations were removed to avoid
 * broken imports.
 *
 * @module ApiRoutes
 */

const express = require( 'express' );
const router = express.Router();

const AmbulanceController = require( '../controllers/ambulance-controller' );

// Ambulance search
router.get( '/ambulances', AmbulanceController.search );

module.exports = router;
