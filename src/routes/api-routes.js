/**
 * API Routes Definition
 *
 * Connects JSON endpoints with MVC Controllers.
 *
 * @module ApiRoutes
 */

const express = require('express');

const router = express.Router();

const HealthRecordController = require('../controllers/health-record-controller');
const upload = require('../middleware/upload-middleware');

// Health Records (Feature 13)
router.get('/records', HealthRecordController.list);

router.post(
  '/records/upload',
  upload.single('recordFile'),
  HealthRecordController.upload,
);

router.delete('/records/:id', HealthRecordController.delete);

module.exports = router;
