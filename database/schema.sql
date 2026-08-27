-- HealthHub Relational Database Schema (Bangladesh Healthcare Context)
-- Hospital Search Module — Standalone Extraction
-- Database: MySQL 8.0+
--
-- NOTE: The running application (src/data/mock-database.js) uses an
-- in-memory data store, not a live MySQL connection, so this schema is
-- not required to run or test the module — it is provided for parity
-- with the original HealthHub project and for anyone who wants to back
-- the module with a real MySQL database instead of the mock store.
--
-- Only the `hospitals` table is included. In the original schema, other
-- tables (doctors, blood_banks) declare an outbound foreign key TO
-- hospitals.id, but hospitals itself has no inbound foreign key
-- dependency on any other table, so it can be created and used in full
-- isolation.

CREATE DATABASE IF NOT EXISTS healthhub_db;
USE healthhub_db;

-- Hospitals Table
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
	rating DECIMAL(2,1) DEFAULT 5.0,
	cost_rating ENUM('Affordable', 'Moderate', 'Premium') DEFAULT 'Moderate',
	services JSON NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Seed Data Insertion (Bangladesh Medical Network)
-- --------------------------------------------------------

INSERT INTO hospitals (id, name, city, district, address, contact_number, emergency_hotline, ambulance_contact, general_contact, available_departments, operating_hours, total_beds, available_beds, rating, cost_rating)
VALUES
(1, 'Dhaka Medical College Hospital (DMCH)', 'Dhaka', 'Dhaka', 'Secretariat Road, Shahbagh, Dhaka-1000', '+880-2-55165088', '999', '+880-2-55165000', '+880-2-55165001', '["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Burn & Plastic Surgery", "Nephrology"]', '24/7 Always Open', 2600, 140, 4.7, 'Affordable'),
(2, 'Enam Medical College Hospital', 'Savar', 'Dhaka', 'Thana Road, Savar, Dhaka-1342', '+880-2-55165606', '16263', '+8801711-000222', '+880-2-55165600', '["Cardiology", "Endocrinology", "Oncology", "Gastroenterology", "General Surgery"]', '24/7 Always Open', 1900, 95, 4.8, 'Affordable'),
(3, 'Square Hospital Limited', 'Dhaka', 'Dhaka', '18/F, Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka-1205', '10616', '10616', '+8801713-377773', '+880-2-8159457', '["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Obstetrics & Gynecology"]', '24/7 Always Open', 400, 48, 4.9, 'Premium'),
(4, 'Evercare Hospital Dhaka', 'Dhaka', 'Dhaka', 'Plot 81, Block E, Bashundhara R/A, Dhaka-1229', '10678', '10678', '+8801714-090000', '+880-2-8431661', '["Cardiology", "Oncology", "Pediatrics", "Neurosurgery"]', '24/7 Always Open', 425, 60, 4.9, 'Premium'),
(5, 'Chittagong Medical College Hospital (CMCH)', 'Chattogram', 'Chattogram', '57 K.B. Fazlul Kader Road, Chattogram-4203', '+880-31-619400', '999', '+880-31-619401', '+880-31-619402', '["Cardiology", "Pediatrics", "Orthopedics", "Nephrology", "Dermatology"]', '24/7 Always Open', 1500, 85, 4.6, 'Affordable');
