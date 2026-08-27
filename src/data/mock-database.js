/**
 * Mock Database Layer (Bangladesh Healthcare Context) — Hospital Search Slice
 *
 * In-memory data store containing only the `hospitals` collection required
 * by the Hospital Search module. Extracted verbatim from the original
 * HealthHub `src/data/mock-database.js`; unrelated collections (users,
 * doctors, appointments, blood banks, vaccines, ambulances, payments,
 * health records) were intentionally omitted because Hospital Search does
 * not read or write them.
 *
 * @module MockDatabase
 */

const mockDatabase = {
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
			rating: 4.8,
			costRating: 'Affordable',
			services: [ 'Specialized OPD', 'Emergency Triage', 'General Surgery' ]
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
			availableDepartments: [ 'Cardiology', 'Oncology', 'Pediatrics', 'Neurosurgery' ],
			operatingHours: '24/7 Always Open',
			totalBeds: 425,
			availableBeds: 60,
			rating: 4.9,
			costRating: 'Premium',
			services: [ 'International Standard Care', 'Bone Marrow Transplant', 'Level 1 Trauma Care' ]
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
			rating: 4.6,
			costRating: 'Affordable',
			services: [ 'Emergency Ward', 'Dialysis Center', 'Burn Unit', 'Blood Bank' ]
		}
	]
};

module.exports = mockDatabase;
