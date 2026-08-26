/**
 * Mock Database Layer
 * Central data store containing national and hospital emergency hotlines.
 * @module data/mock-database
 */

const mockDatabase = {
	emergencyContacts: [
		{
			id: 1,
			serviceName: 'National Emergency Service (Police, Fire, Ambulance)',
			category: 'National',
			emergencyNumber: '999',
			alternativeNumber: '',
			operatingHours: '24/7 Always Open',
			district: 'National',
			description: 'Central government triage dispatch for urgent police, ambulance, and fire brigade services.',
			tollFree: true
		},
		{
			id: 2,
			serviceName: 'Shastho Batayon (National Health Hotline)',
			category: 'National',
			emergencyNumber: '16263',
			alternativeNumber: '+8809611616263',
			operatingHours: '24/7 Always Open',
			district: 'National',
			description: 'Directorate General of Health Services (DGHS) 24/7 tele-doctor medical advice hotline.',
			tollFree: true
		},
		{
			id: 3,
			serviceName: 'National Helpline for Women & Children in Distress',
			category: 'National',
			emergencyNumber: '109',
			alternativeNumber: '',
			operatingHours: '24/7 Always Open',
			district: 'National',
			description: 'Immediate emergency support and medical rescue referral for violence victims.',
			tollFree: true
		},
		{
			id: 4,
			serviceName: 'Dhaka Medical College Hospital (DMCH) Casualty ER',
			category: 'Hospital',
			emergencyNumber: '+880255165088',
			alternativeNumber: '+880255165000',
			operatingHours: '24/7 Emergency Casualty Open',
			district: 'Dhaka',
			description: 'Level-1 Tertiary trauma center, toxicological bite emergency, and rapid ICU admission.',
			tollFree: false
		},
		{
			id: 5,
			serviceName: 'Enam Medical College Hospital Emergency Unit',
			category: 'Hospital',
			emergencyNumber: '+880255165606',
			alternativeNumber: '+8801711000222',
			operatingHours: '24/7 Emergency Casualty Open',
			district: 'Dhaka',
			description: 'Industrial trauma, general critical care admission, and 24-hour diagnostic desk in Savar.',
			tollFree: false
		},
		{
			id: 6,
			serviceName: 'Square Hospital 24-Hour Emergency Line',
			category: 'Hospital',
			emergencyNumber: '10616',
			alternativeNumber: '+8801713377773',
			operatingHours: '24/7 Emergency Life Support',
			district: 'Dhaka',
			description: 'Equipped critical stroke/cardiac emergency center and rapid mobile resuscitation team.',
			tollFree: false
		},
		{
			id: 7,
			serviceName: 'Chittagong Medical College Hospital (CMCH) Emergency',
			category: 'Hospital',
			emergencyNumber: '+88031619400',
			alternativeNumber: '+88031619401',
			operatingHours: '24/7 Emergency Casualty Open',
			district: 'Chattogram',
			description: 'Primary government trauma and acute critical care center serving the southeastern zone.',
			tollFree: false
		}
	]
};

module.exports = mockDatabase;