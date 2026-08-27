-- HealthHub Emergency Contacts Table Schema
CREATE TABLE IF NOT EXISTS emergency_contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    category ENUM('National', 'Hospital', 'Ambulance', 'Blood Bank') NOT NULL,
    emergency_number VARCHAR(50) NOT NULL,
    alternative_number VARCHAR(50),
    operating_hours VARCHAR(100) DEFAULT '24/7 Available',
    district VARCHAR(100) NOT NULL,
    description TEXT,
    is_toll_free BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);