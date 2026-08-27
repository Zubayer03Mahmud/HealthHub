-- HealthHub Appointment Booking Table Schema
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(150) NOT NULL,
    patient_phone VARCHAR(20) NOT NULL,
    patient_email VARCHAR(100),
    doctor_id INT NOT NULL,
    doctor_name VARCHAR(150) NOT NULL,
    department VARCHAR(100) NOT NULL,
    appointment_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    status ENUM('Confirmed', 'Pending', 'Cancelled', 'Completed') DEFAULT 'Confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);