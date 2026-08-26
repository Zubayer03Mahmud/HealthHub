-- HealthHub Relational Database Schema (Bangladesh Healthcare Context)
-- Database: MySQL 8.0+

CREATE DATABASE IF NOT EXISTS healthhub_db;
USE healthhub_db;

-- 1. Users Table (Role-based authentication)
CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	email VARCHAR(150) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	phone VARCHAR(30) NOT NULL,
	role ENUM('Patient', 'Doctor', 'Hospital Authority', 'Ambulance Provider', 'Administrator') NOT NULL DEFAULT 'Patient',
	gender ENUM('Male', 'Female', 'Other') DEFAULT 'Other',
	dob DATE NULL,
	address TEXT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Hospitals Table
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

-- 3. Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NULL,
	hospital_id INT NOT NULL,
	name VARCHAR(150) NOT NULL,
	specialization VARCHAR(100) NOT NULL,
	qualifications TEXT NOT NULL,
	experience INT NOT NULL DEFAULT 0,
	consultation_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
	available_days JSON NOT NULL,
	available_time_slots JSON NOT NULL,
	rating DECIMAL(2,1) DEFAULT 5.0,
	profile_photo VARCHAR(255) NULL,
	status ENUM('Available', 'On Leave', 'Busy') DEFAULT 'Available',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
	FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
	id INT AUTO_INCREMENT PRIMARY KEY,
	patient_id INT NOT NULL,
	doctor_id INT NOT NULL,
	appointment_date DATE NOT NULL,
	appointment_time VARCHAR(50) NOT NULL,
	consultation_fee DECIMAL(10,2) NOT NULL,
	status ENUM('Booked', 'Rescheduled', 'Cancelled', 'Completed') DEFAULT 'Booked',
	payment_status ENUM('Unpaid', 'Paid', 'Refunded') DEFAULT 'Unpaid',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Blood Banks & Inventory Table
CREATE TABLE IF NOT EXISTS blood_banks (
	id INT AUTO_INCREMENT PRIMARY KEY,
	hospital_id INT NULL,
	blood_bank_name VARCHAR(200) NOT NULL,
	city VARCHAR(100) NOT NULL,
	area VARCHAR(100) NOT NULL,
	address TEXT NOT NULL,
	contact_number VARCHAR(30) NOT NULL,
	operating_hours VARCHAR(100) DEFAULT '24 Hours Open',
	FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS blood_inventory (
	id INT AUTO_INCREMENT PRIMARY KEY,
	blood_bank_id INT NOT NULL,
	blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
	units_available INT NOT NULL DEFAULT 0,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	UNIQUE KEY unique_bank_group (blood_bank_id, blood_group),
	FOREIGN KEY (blood_bank_id) REFERENCES blood_banks(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Vaccines & Anti-Venoms Table
CREATE TABLE IF NOT EXISTS vaccines_antivenoms (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(200) NOT NULL,
	type ENUM('Vaccine', 'Anti-Venom') NOT NULL,
	hospital_or_pharmacy VARCHAR(200) NOT NULL,
	location TEXT NOT NULL,
	city VARCHAR(100) NOT NULL,
	area VARCHAR(100) NOT NULL,
	contact_number VARCHAR(30) NOT NULL,
	available_stock INT NOT NULL DEFAULT 0,
	status ENUM('Available', 'Out of Stock') DEFAULT 'Available',
	unit_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Ambulance Services Table
CREATE TABLE IF NOT EXISTS ambulance_services (
	id INT AUTO_INCREMENT PRIMARY KEY,
	provider_name VARCHAR(200) NOT NULL,
	vehicle_type VARCHAR(100) NOT NULL,
	vehicle_number VARCHAR(50) NOT NULL UNIQUE,
	city VARCHAR(100) NOT NULL,
	district VARCHAR(100) NOT NULL,
	service_area VARCHAR(200) NOT NULL,
	contact_number VARCHAR(30) NOT NULL,
	emergency_contact VARCHAR(30) NOT NULL,
	status ENUM('Available', 'Busy', 'Maintenance') DEFAULT 'Available',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Personal Health Records Table
CREATE TABLE IF NOT EXISTS health_records (
	id INT AUTO_INCREMENT PRIMARY KEY,
	patient_id INT NOT NULL,
	title VARCHAR(200) NOT NULL,
	category ENUM('Lab Report', 'Prescription', 'Discharge Summary', 'Vaccination Certificate', 'General Report') NOT NULL,
	description TEXT NULL,
	file_name VARCHAR(255) NOT NULL,
	file_path VARCHAR(255) NOT NULL,
	file_type VARCHAR(100) NOT NULL,
	uploaded_at DATE NOT NULL,
	FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Payments Table
CREATE TABLE IF NOT EXISTS payments (
	id VARCHAR(50) PRIMARY KEY,
	appointment_id INT NOT NULL,
	patient_id INT NOT NULL,
	amount DECIMAL(10,2) NOT NULL,
	payment_method VARCHAR(100) NOT NULL,
	status ENUM('Successful', 'Pending', 'Failed') DEFAULT 'Successful',
	transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
	FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Seed Data Insertion (Bangladesh Medical Network)
-- --------------------------------------------------------

INSERT INTO hospitals (id, name, city, district, address, contact_number, emergency_hotline, ambulance_contact, general_contact, available_departments, operating_hours, total_beds, available_beds, icu_total, icu_available, ccu_total, ccu_available, rating, cost_rating)
VALUES 
(1, 'Dhaka Medical College Hospital (DMCH)', 'Dhaka', 'Dhaka', 'Secretariat Road, Shahbagh, Dhaka-1000', '+880-2-55165088', '999', '+880-2-55165000', '+880-2-55165001', '["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Burn & Plastic Surgery", "Nephrology"]', '24/7 Always Open', 2600, 140, 50, 6, 30, 3, 4.7, 'Affordable'),
(2, 'Enam Medical College Hospital', 'Thana Road', 'Savar', 'Savar, Dhaka-1342', '+880-2-55165606', '16263', '+8801711-000222', '+880-2-55165600', '["Cardiology", "Endocrinology", "Oncology", "Gastroenterology", "General Surgery"]', '24/7 Always Open', 1900, 95, 40, 4, 25, 0, 4.8, 'Affordable'),
(3, 'Square Hospital Limited', 'Dhaka', 'Dhaka', '18/F, Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka-1205', '10616', '10616', '+8801713-377773', '+880-2-8159457', '["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Obstetrics & Gynecology"]', '24/7 Always Open', 400, 48, 35, 5, 20, 4, 4.9, 'Premium');

INSERT INTO users (id, name, email, password, phone, role, gender, address)
VALUES
(1, 'Prof. Dr. Md. Rafiqul Islam', 'doctor@healthhub.com', '$2a$10$wT8m9rT6LzU9mZbDsm.40eEaLpZ4a7n2vG6S8jO1gU1D5F4X4H0Gy', '+8801711000101', 'Doctor', 'Male', 'Dhanmondi, Dhaka'),
(2, 'Rahim Ahmed', 'patient@healthhub.com', '$2a$10$wT8m9rT6LzU9mZbDsm.40eEaLpZ4a7n2vG6S8jO1gU1D5F4X4H0Gy', '+8801819000102', 'Patient', 'Male', 'Mirpur, Dhaka');

INSERT INTO doctors (id, user_id, hospital_id, name, specialization, qualifications, experience, consultation_fee, available_days, available_time_slots, rating)
VALUES
(1, 1, 1, 'Prof. Dr. Md. Rafiqul Islam', 'Cardiology', 'MBBS, FCPS (Medicine), MD (Cardiology), FACC (USA)', 18, 1200.00, '["Saturday", "Monday", "Wednesday"]', '["05:00 PM - 08:00 PM", "08:00 PM - 10:00 PM"]', 4.9);