/**
 * API Routes Definition
 *
 * Connects all JSON endpoints with respective MVC Controllers.
 *
 * @module ApiRoutes
 */

const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth-controller');
const HospitalController = require('../controllers/hospital-controller');
const DoctorController = require('../controllers/doctor-controller');
const AppointmentController = require('../controllers/appointment-controller');
const EmergencyController = require('../controllers/emergency-controller');
const BloodBankController = require('../controllers/blood-bank-controller');
const VaccineController = require('../controllers/vaccine-controller');
const AmbulanceController = require('../controllers/ambulance-controller');
const RecommendationController = require('../controllers/recommendation-controller');
const PaymentController = require('../controllers/payment-controller');
const HealthRecordController = require('../controllers/health-record-controller');

const { requireAuth, requireRole } = require('../middleware/auth-middleware');
const upload = require('../middleware/upload-middleware');

// Health Records (Feature 13)
router.get('/records', requireAuth, HealthRecordController.list);
router.post(
  '/records/upload',
  requireAuth,
  upload.single('recordFile'),
  HealthRecordController.upload,
);
router.delete('/records/:id', requireAuth, HealthRecordController.delete);

module.exports = router;
