/**
 * API Routes Definition — Hospital Search Slice
 *
 * Connects Hospital Search JSON endpoints to the Hospital Controller.
 * Trimmed from the original HealthHub `src/routes/api-routes.js`, which
 * also mounted routes for Auth, Doctors, Appointments, Emergency,
 * Blood Banks, Vaccines, Ambulances, Recommendations, Payments, and
 * Health Records. Those controllers are not part of this module, so
 * their `require()` calls and route registrations were removed to avoid
 * broken imports.
 *
 * @module ApiRoutes
 */

const express = require( 'express' );
const router = express.Router();

const HospitalController = require( '../controllers/hospital-controller' );

// Hospital search
router.get( '/hospitals', HospitalController.search );
router.get( '/hospitals/:id', HospitalController.getById );

module.exports = router;
