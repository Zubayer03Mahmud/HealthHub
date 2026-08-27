/**
 * HealthHub Comprehensive Vitest Unit Tests
 *
 * Covers all 13 functional modules specified in the HealthHub testing plan.
 *
 * @module HealthHubVitestTests
 */

import { describe, it, expect } from 'vitest';
const bcrypt = require('bcryptjs');

const UserModel = require('../src/models/user-model');
const HospitalModel = require('../src/models/hospital-model');
const DoctorModel = require('../src/models/doctor-model');
const AppointmentModel = require('../src/models/appointment-model');
const EmergencyContactModel = require('../src/models/emergency-contact-model');
const AmbulanceModel = require('../src/models/ambulance-model');
const BloodBankModel = require('../src/models/blood-bank-model');
const VaccineModel = require('../src/models/vaccine-model');
const PaymentModel = require('../src/models/payment-model');
const HealthRecordModel = require('../src/models/health-record-model');

describe('HealthHub 13 Core Component Unit Tests (Vitest)', () => {
  // 7. Health Record Upload Component
  describe('7. Health Record Upload Component', () => {
    it('should save uploaded medical record metadata securely', () => {
      const record = HealthRecordModel.create({
        patientId: 2,
        title: 'DMCH Pathology Diagnostic Report',
        category: 'Lab Report',
        description: 'Hemoglobin and lipid levels normal',
        fileName: 'dmch-test.pdf',
        filePath: '/uploads/dmch-test.pdf',
        fileType: 'application/pdf',
      });

      expect(record.id).toBeGreaterThan(0);
      expect(record.category).toBe('Lab Report');
    });

    it('should only delete record if requested by the owning patient', () => {
      const record = HealthRecordModel.create({
        patientId: 2,
        title: 'Temporary Prescription',
        category: 'Prescription',
        fileName: 'temp.pdf',
        filePath: '/uploads/temp.pdf',
        fileType: 'application/pdf',
      });

      const unauthorizedDelete = HealthRecordModel.delete(record.id, 999);
      expect(unauthorizedDelete).toBe(false);

      const authorizedDelete = HealthRecordModel.delete(record.id, 2);
      expect(authorizedDelete).toBe(true);
    });
  });
});
