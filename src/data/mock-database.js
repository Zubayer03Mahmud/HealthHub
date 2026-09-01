/**
 * Mock Database Layer (Hospital Recommendation Feature)
 *
 * In-memory data store containing users, hospitals, and doctors data
 * for filtering and recommending medical facilities.
 *
 * @module MockDatabase
 */

const bcrypt = require('bcryptjs');

// Pre-compute a valid bcrypt hash for 'password123'
const DEFAULT_PASSWORD_HASH = bcrypt.hashSync('password123', 10);

const mockDatabase = {
    users: [
        {
            id: 1,
            name: 'Prof. Dr. Md. Rafiqul Islam',
            email: 'doctor@healthhub.com',
            password: DEFAULT_PASSWORD_HASH,
            phone: '+8801711000101',
            role: 'Doctor',
            gender: 'Male',
            address: 'Dhanmondi R/A, Road 27, Dhaka'
        },
        {
            id: 2,
            name: 'Rahim Ahmed',
            email: 'patient@healthhub.com',
            password: DEFAULT_PASSWORD_HASH,
            phone: '+8801819000102',
            role: 'Patient',
            gender: 'Male',
            dob: '1995-03-21',
            address: 'House 14, Road 5, Mirpur-10, Dhaka'
        }
    ],

    hospitals: [
        {
            id: 1,
            name: 'Dhaka Medical College Hospital (DMCH)',
            city: 'Dhaka',
            district: 'Dhaka',
            address: 'Secretariat Road, Shahbagh, Dhaka-1000',
            contactNumber: '+880-2-55165088',
            emergencyHotline: '999',
            ambulanceContact: '+880-2-55165000',
            generalContact: '+880-2-55165001',
            availableDepartments: [ 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Burn & Plastic Surgery', 'Nephrology' ],
            operatingHours: '24/7 Always Open',
            totalBeds: 2600,
            availableBeds: 140,
            icuTotal: 50,
            icuAvailable: 6,
            ccuTotal: 30,
            ccuAvailable: 3,
            rating: 4.7,
            costRating: 'Affordable',
            services: [ 'Emergency Triage', 'Trauma Center', 'Dialysis', 'Coronary Care', 'Blood Transfusion' ]
        },
        {
            id: 2,
            name: 'Enam Medical College Hospital',
            city: 'Savar',
            district: 'Dhaka',
            address: 'Thana Road, Savar, Dhaka-1342',
            contactNumber: '+880-2-55165606',
            emergencyHotline: '16263',
            ambulanceContact: '+8801711-000222',
            generalContact: '+880-2-55165600',
            availableDepartments: [ 'Cardiology', 'Endocrinology', 'Oncology', 'Gastroenterology', 'General Surgery' ],
            operatingHours: '24/7 Always Open',
            totalBeds: 1900,
            availableBeds: 95,
            icuTotal: 40,
            icuAvailable: 4,
            ccuTotal: 25,
            ccuAvailable: 0,
            rating: 4.8,
            costRating: 'Affordable',
            services: [ 'Specialized OPD', 'Emergency Triage', 'Critical Care Unit', 'General Surgery' ]
        },
        {
            id: 3,
            name: 'Square Hospital Limited',
            city: 'Dhaka',
            district: 'Dhaka',
            address: '18/F, Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka-1205',
            contactNumber: '10616',
            emergencyHotline: '10616',
            ambulanceContact: '+8801713-377773',
            generalContact: '+880-2-8159457',
            availableDepartments: [ 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Obstetrics & Gynecology' ],
            operatingHours: '24/7 Always Open',
            totalBeds: 400,
            availableBeds: 48,
            icuTotal: 35,
            icuAvailable: 5,
            ccuTotal: 20,
            ccuAvailable: 4,
            rating: 4.9,
            costRating: 'Premium',
            services: [ 'Emergency Life Support', 'Robotic Surgery', 'Helipad Service', 'Advanced Cath Lab' ]
        },
        {
            id: 4,
            name: 'Evercare Hospital Dhaka',
            city: 'Dhaka',
            district: 'Dhaka',
            address: 'Plot 81, Block E, Bashundhara R/A, Dhaka-1229',
            contactNumber: '10678',
            emergencyHotline: '10678',
            ambulanceContact: '+8801714-090000',
            generalContact: '+880-2-8431661',
            availableDepartments: [ 'Cardiology', 'Oncology', 'Pediatrics', 'Neurosurgery', 'Critical Care' ],
            operatingHours: '24/7 Always Open',
            totalBeds: 425,
            availableBeds: 60,
            icuTotal: 45,
            icuAvailable: 8,
            ccuTotal: 20,
            ccuAvailable: 3,
            rating: 4.9,
            costRating: 'Premium',
            services: [ 'International Standard ICU', 'Bone Marrow Transplant', 'Level 1 Trauma Care' ]
        },
        {
            id: 5,
            name: 'Chittagong Medical College Hospital (CMCH)',
            city: 'Chattogram',
            district: 'Chattogram',
            address: '57 K.B. Fazlul Kader Road, Chattogram-4203',
            contactNumber: '+880-31-619400',
            emergencyHotline: '999',
            ambulanceContact: '+880-31-619401',
            generalContact: '+880-31-619402',
            availableDepartments: [ 'Cardiology', 'Pediatrics', 'Orthopedics', 'Nephrology', 'Dermatology' ],
            operatingHours: '24/7 Always Open',
            totalBeds: 1500,
            availableBeds: 85,
            icuTotal: 30,
            icuAvailable: 3,
            ccuTotal: 15,
            ccuAvailable: 2,
            rating: 4.6,
            costRating: 'Affordable',
            services: [ 'Emergency Ward', 'Dialysis Center', 'Burn Unit', 'Blood Bank' ]
        }
    ],

    doctors: [
        {
            id: 1,
            userId: 1,
            name: 'Prof. Dr. Md. Rafiqul Islam',
            specialization: 'Cardiology',
            hospitalId: 1,
            hospitalName: 'Dhaka Medical College Hospital (DMCH)',
            qualifications: 'MBBS, FCPS (Medicine), MD (Cardiology), FACC (USA)',
            experience: 18,
            consultationFee: 1200,
            availableDays: [ 'Saturday', 'Monday', 'Wednesday' ],
            availableTimeSlots: [ '05:00 PM - 08:00 PM', '08:00 PM - 10:00 PM' ],
            rating: 4.9,
            profilePhoto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
            status: 'Available'
        },
        {
            id: 2,
            userId: null,
            name: 'Dr. Nusrat Jahan',
            specialization: 'Obstetrics & Gynecology',
            hospitalId: 2,
            hospitalName: 'Enam Medical College Hospital',
            qualifications: 'MBBS, MS (Obs & Gynae), FCPS',
            experience: 12,
            consultationFee: 1000,
            availableDays: [ 'Sunday', 'Tuesday', 'Thursday' ],
            availableTimeSlots: [ '04:00 PM - 07:00 PM', '07:00 PM - 09:00 PM' ],
            rating: 4.8,
            profilePhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
            status: 'Available'
        },
        {
            id: 3,
            userId: null,
            name: 'Dr. Tanvir Ahmed Chowdhury',
            specialization: 'Neurology',
            hospitalId: 3,
            hospitalName: 'Square Hospital Limited',
            qualifications: 'MBBS, MD (Neurology), MACP (USA)',
            experience: 15,
            consultationFee: 1500,
            availableDays: [ 'Saturday', 'Sunday', 'Wednesday', 'Thursday' ],
            availableTimeSlots: [ '06:00 PM - 09:00 PM' ],
            rating: 4.9,
            profilePhoto: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
            status: 'Available'
        },
        {
            id: 4,
            userId: null,
            name: 'Dr. Farhana Yasmin',
            specialization: 'Pediatrics',
            hospitalId: 4,
            hospitalName: 'Evercare Hospital Dhaka',
            qualifications: 'MBBS, DCH (Pediatrics), FCPS (Child Health)',
            experience: 9,
            consultationFee: 1000,
            availableDays: [ 'Saturday', 'Monday', 'Tuesday', 'Thursday' ],
            availableTimeSlots: [ '03:00 PM - 06:00 PM' ],
            rating: 4.8,
            profilePhoto: 'https://images.unsplash.com/photo-1594824813533-450529d4d5e9?auto=format&fit=crop&w=300&q=80',
            status: 'Available'
        }
    ]
};

module.exports = mockDatabase;