/**
 * Vaccine & Anti-Venom Routes
 *
 * Endpoints for the Search Vaccine & Anti-Venom feature (SRS 3.1.7).
 * Mounted at /api/vaccines by the main API router.
 *
 * @module VaccineRoutes
 */

const express = require( 'express' );

const VaccineController = require( '../controllers/vaccine-controller' );

const router = express.Router();

router.get( '/', VaccineController.search );
router.get( '/:id', VaccineController.getById );

module.exports = router;