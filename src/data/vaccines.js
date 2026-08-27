/**
 * Vaccine & Anti-Venom Dataset
 *
 * In-memory records for the Search Vaccine & Anti-Venom feature (SRS 3.1.7).
 * Mirrors the vaccines_antivenoms table defined in database/schema.sql.
 *
 * @module VaccineData
 */

module.exports = [
	{
		id: 1,
		name: 'Polyvalent Anti-Snake Venom (ASV)',
		type: 'Anti-Venom',
		hospitalOrPharmacy: 'Dhaka Medical College Hospital Emergency Unit',
		location: 'Secretariat Road, Shahbagh, Dhaka-1000',
		city: 'Dhaka',
		area: 'Shahbagh',
		contactNumber: '+880-2-55165088',
		availableStock: 45,
		status: 'Available',
		unitPrice: 1200
	},
	{
		id: 2,
		name: 'Rabies Vaccine (Verorab)',
		type: 'Vaccine',
		hospitalOrPharmacy: 'Infectious Diseases Hospital, Mohakhali',
		location: 'Mohakhali TB Gate Road, Dhaka-1212',
		city: 'Dhaka',
		area: 'Mohakhali',
		contactNumber: '+880-2-9898796',
		availableStock: 130,
		status: 'Available',
		unitPrice: 650
	},
	{
		id: 3,
		name: 'Hepatitis B Vaccine (Hepa-B)',
		type: 'Vaccine',
		hospitalOrPharmacy: 'Enam Medical College Hospital Vaccination Counter',
		location: 'Bank Town, Savar, Dhaka-1340',
		city: 'Savar',
		area: 'Bank Town',
		contactNumber: '+880-2-7745242',
		availableStock: 75,
		status: 'Available',
		unitPrice: 450
	},
	{
		id: 4,
		name: 'Tetanus Toxoid (TT) Vaccine',
		type: 'Vaccine',
		hospitalOrPharmacy: 'Chattogram Medical College Hospital EPI Center',
		location: 'K. B. Fazlul Kader Road, Panchlaish, Chattogram-4203',
		city: 'Chattogram',
		area: 'Panchlaish',
		contactNumber: '+880-31-2502324',
		availableStock: 210,
		status: 'Available',
		unitPrice: 150
	},
	{
		id: 5,
		name: 'Polyvalent Anti-Snake Venom (ASV)',
		type: 'Anti-Venom',
		hospitalOrPharmacy: 'Sylhet MAG Osmani Medical College Hospital',
		location: 'Medical College Road, Kajolshah, Sylhet-3100',
		city: 'Sylhet',
		area: 'Kajolshah',
		contactNumber: '+880-821-713667',
		availableStock: 0,
		status: 'Out of Stock',
		unitPrice: 1350
	},
	{
		id: 6,
		name: 'Rabies Immunoglobulin (Rabishield)',
		type: 'Vaccine',
		hospitalOrPharmacy: 'Lazz Pharma Limited, Dhanmondi Outlet',
		location: 'Road 2, Dhanmondi R/A, Dhaka-1205',
		city: 'Dhaka',
		area: 'Dhanmondi',
		contactNumber: '+880-2-9670466',
		availableStock: 25,
		status: 'Available',
		unitPrice: 8500
	},
	{
		id: 7,
		name: 'Polyvalent Anti-Snake Venom (ASV)',
		type: 'Anti-Venom',
		hospitalOrPharmacy: 'Sir Salimullah Medical College Mitford Hospital',
		location: 'Mitford Road, Babubazar, Dhaka-1100',
		city: 'Dhaka',
		area: 'Babubazar',
		contactNumber: '+880-2-7319002',
		availableStock: 30,
		status: 'Available',
		unitPrice: 1200
	},
	{
		id: 8,
		name: 'Measles-Rubella (MR) Vaccine',
		type: 'Vaccine',
		hospitalOrPharmacy: 'Khulna Medical College Hospital Vaccination Unit',
		location: 'Boyra Main Road, Khulna-9000',
		city: 'Khulna',
		area: 'Boyra',
		contactNumber: '+880-41-760350',
		availableStock: 90,
		status: 'Available',
		unitPrice: 120
	}
];