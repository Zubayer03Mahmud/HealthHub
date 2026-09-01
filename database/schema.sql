-- HealthHub Relational Database Schema (Bangladesh Healthcare Context)
-- Database: MySQL 8.0+

CREATE DATABASE IF NOT EXISTS healthhub_db;
USE healthhub_db;

-- Hospitals & Critical Care Table
CREATE TABLE IF NOT EXISTS hospitals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    contact_number VARCHAR(30) NOT NULL,
    emergency_hotline VARCHAR(30) NOT NULL,
    ambulance_contact VARCHAR(30) NOT NULL,
    general_contact VARCHAR(30) NOT NULL,
    available_departments JSON NOT NULL,
    operating_hours VARCHAR(100) DEFAULT '24/7 Always Open',
    total_beds INT NOT NULL DEFAULT 0,
    available_beds INT NOT NULL DEFAULT 0,
    icu_total INT NOT NULL DEFAULT 0,
    icu_available INT NOT NULL DEFAULT 0,
    ccu_total INT NOT NULL DEFAULT 0,
    ccu_available INT NOT NULL DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 5.0,
    cost_rating ENUM('Affordable', 'Moderate', 'Premium') DEFAULT 'Moderate',
    services JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data Insertion
INSERT INTO hospitals (id, name, city, district, address, contact_number, emergency_hotline, ambulance_contact, general_contact, available_departments, operating_hours, total_beds, available_beds, icu_total, icu_available, ccu_total, ccu_available, rating, cost_rating)
VALUES 
(1, 'Dhaka Medical College Hospital (DMCH)', 'Dhaka', 'Dhaka', 'Secretariat Road, Shahbagh, Dhaka-1000', '+880-2-55165088', '999', '+880-2-55165000', '+880-2-55165001', '["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Burn & Plastic Surgery", "Nephrology"]', '24/7 Always Open', 2600, 140, 50, 6, 30, 3, 4.7, 'Affordable'),
(2, 'Enam Medical College Hospital', 'Savar', 'Dhaka', 'Thana Road, Savar, Dhaka-1342', '+880-2-55165606', '16263', '+8801711-000222', '+880-2-55165600', '["Cardiology", "Endocrinology", "Oncology", "Gastroenterology", "General Surgery"]', '24/7 Always Open', 1900, 95, 40, 4, 25, 0, 4.8, 'Affordable'),
(3, 'Square Hospital Limited', 'Dhaka', 'Dhaka', '18/F, Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka-1205', '10616', '10616', '+8801713-377773', '+880-2-8159457', '["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Obstetrics & Gynecology"]', '24/7 Always Open', 400, 48, 35, 5, 20, 4, 4.9, 'Premium'),
(4, 'Evercare Hospital Dhaka', 'Dhaka', 'Dhaka', 'Plot 81, Block E, Bashundhara R/A, Dhaka-1229', '10678', '10678', '+8801714-090000', '+880-2-8431661', '["Cardiology", "Oncology", "Pediatrics", "Neurosurgery", "Critical Care"]', '24/7 Always Open', 425, 60, 45, 8, 20, 3, 4.9, 'Premium'),
(5, 'Chittagong Medical College Hospital (CMCH)', 'Chattogram', 'Chattogram', '57 K.B. Fazlul Kader Road, Chattogram-4203', '+880-31-619400', '999', '+880-31-619401', '+880-31-619402', '["Cardiology", "Pediatrics", "Orthopedics", "Nephrology", "Dermatology"]', '24/7 Always Open', 1500, 85, 30, 3, 15, 2, 4.6, 'Affordable');