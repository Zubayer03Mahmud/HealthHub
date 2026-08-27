/**
 * @fileoverview Main API Routes Aggregator
 * @module routes/api-routes
 */

const express = require( 'express' );
const router = express.Router();
const EmergencyController = require( '../controllers/emergency-controller' );

// Emergency Contact Endpoints
router.get( '/emergency-contacts/national', EmergencyController.getNationalHotlines );
router.get( '/emergency-contacts', EmergencyController.getAllContacts );
router.get( '/emergency-contacts/:id', EmergencyController.getContactById );

module.exports = router;