/**
 * Mock Database Layer
 * Stores active doctors, time slots, and booked appointments.
 * @module data/mock-database
 */

const mockDatabase = {
	doctors: [
		{ id: 101, name: 'Dr. Rafiqul Islam', department: 'Cardiology', hospital: 'Dhaka Medical College Hospital', visitFee: 1000 },
		{ id: 102, name: 'Dr. Nusrat Jahan', department: 'Pediatrics', hospital: 'Square Hospital', visitFee: 1200 },
		{ id: 103, name: 'Dr. Tanvir Ahmed', department: 'Orthopedics', hospital: 'Enam Medical College Hospital', visitFee: 800 },
		{ id: 104, name: 'Dr. Farhana Yasmin', department: 'Gynecology', hospital: 'BIRDEM General Hospital', visitFee: 1000 }
	],
	availableTimeSlots: [
		'09:00 AM - 09:30 AM',
		'10:00 AM - 10:30 AM',
		'11:00 AM - 11:30 AM',
		'04:00 PM - 04:30 PM',
		'05:00 PM - 05:30 PM',
		'06:00 PM - 06:30 PM'
	],
	appointments: [
		{
			id: 1,
			patientName: 'Kazi Tanvir',
			patientPhone: '01712345678',
			patientEmail: 'tanvir@gmail.com',
			doctorId: 101,
			doctorName: 'Dr. Rafiqul Islam',
			department: 'Cardiology',
			appointmentDate: '2026-09-01',
			timeSlot: '09:00 AM - 09:30 AM',
			status: 'Confirmed'
		}
	]
};

module.exports = mockDatabase;