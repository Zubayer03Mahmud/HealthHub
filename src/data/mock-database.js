/**
 * Mock Database for Login
 *
 * @module MockDatabase
 */

const bcrypt = require('bcryptjs');

const DEFAULT_PASSWORD_HASH = bcrypt.hashSync('password123', 10);

const mockDatabase = {
    users: [
        {
            id: 1,
            name: 'Prof. Dr. Md. Rafiqul Islam',
            email: 'doctor@healthhub.com',
            password: DEFAULT_PASSWORD_HASH,
            role: 'Doctor'
        },
        {
            id: 2,
            name: 'Rahim Ahmed',
            email: 'patient@healthhub.com',
            password: DEFAULT_PASSWORD_HASH,
            role: 'Patient'
        },
        {
            id: 3,
            name: 'Dhaka Medical College Hospital Authority',
            email: 'hospital@healthhub.com',
            password: DEFAULT_PASSWORD_HASH,
            role: 'Hospital Authority'
        },
        {
            id: 4,
            name: 'Al-Amin Emergency Ambulance Service',
            email: 'ambulance@healthhub.com',
            password: DEFAULT_PASSWORD_HASH,
            role: 'Ambulance Provider'
        },
        {
            id: 5,
            name: 'System Administrator',
            email: 'admin@healthhub.com',
            password: DEFAULT_PASSWORD_HASH,
            role: 'Administrator'
        }
    ]
};

module.exports = mockDatabase;