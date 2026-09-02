/**
 * Mock Database Layer (Bangladesh Healthcare Context) — Ambulance Search Slice
 *
 * In-memory data store containing only the `ambulances` collection required
 * by the Ambulance Search module. Extracted verbatim from the original
 * HealthHub `src/data/mock-database.js`; unrelated collections (users,
 * hospitals, doctors, appointments, blood banks, vaccines, health records,
 * payments) were intentionally omitted because Ambulance Search does not
 * read or write them.
 *
 * @module MockDatabase
 */

const mockDatabase = {
	ambulances: [
		{
			id: 1,
			providerName: 'Al-Amin Emergency ICU Ambulance Service',
			vehicleType: 'ICU Mobile Unit (Advanced Life Support & Ventilator)',
			vehicleNumber: 'Dhaka Metro-Cha-71-2091',
			city: 'Dhaka',
			district: 'Dhaka',
			serviceArea: 'Dhanmondi, Panthapath, Shahbagh, Mirpur',
			contactNumber: '+8801711-223344',
			emergencyContact: '999',
			status: 'Available'
		},
		{
			id: 2,
			providerName: 'Shadhinota Cardiac Life Support Ambulance',
			vehicleType: 'Cardiac Life Support (AC Ambulance)',
			vehicleNumber: 'Dhaka Metro-Cha-53-8812',
			city: 'Dhaka',
			district: 'Dhaka',
			serviceArea: 'Gulshan, Banani, Uttara, Mohakhali',
			contactNumber: '+8801819-556677',
			emergencyContact: '16263',
			status: 'Available'
		},
		{
			id: 3,
			providerName: 'Chattogram Red Crescent Rapid Ambulance',
			vehicleType: 'Basic Life Support (Oxygen & First Aid)',
			vehicleNumber: 'Chatto Metro-Cha-11-4099',
			city: 'Chattogram',
			district: 'Chattogram',
			serviceArea: 'All Chattogram City & Highway Corridor',
			contactNumber: '+8801911-334455',
			emergencyContact: '999',
			status: 'Available'
		}
	]
};

module.exports = mockDatabase;
