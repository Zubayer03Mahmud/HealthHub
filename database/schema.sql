-- HealthHub - MySQL Schema
-- Each feature owner appends their own table to this file.

-- Feature 7: Vaccines & Anti-Venoms (SRS 3.1.7)
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