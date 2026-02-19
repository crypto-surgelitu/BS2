-- BS2 Booking System Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS bs2_booking;
USE bs2_booking;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  capacity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  amenities JSON,
  image_url VARCHAR(255),
  status ENUM('available', 'unavailable', 'maintenance') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  room_id INT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Insert sample admin user (password: admin123)
-- Hash generated for 'admin123'
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@bs2.com', '$2y$10$S6ByiHnI9.B8vYmJk5YqHe0WzR9p8e8e8e8e8e8e8e8e8e8e8e', 'admin'),
('John Doe', 'john@example.com', '$2y$10$S6ByiHnI9.B8vYmJk5YqHe0WzR9p8e8e8e8e8e8e8e8e8e8e8e', 'user'),
('Jane Smith', 'jane@example.com', '$2y$10$S6ByiHnI9.B8vYmJk5YqHe0WzR9p8e8e8e8e8e8e8e8e8e8e8e', 'user');

-- Insert sample rooms
INSERT INTO rooms (name, type, capacity, price, description, amenities, status) VALUES 
('Deluxe Suite', 'Suite', 2, 150.00, 'Spacious deluxe suite with ocean view', '["WiFi", "TV", "Mini Bar", "Air Conditioning"]', 'available'),
('Standard Room', 'Standard', 2, 80.00, 'Comfortable standard room', '["WiFi", "TV", "Air Conditioning"]', 'available'),
('Family Room', 'Family', 4, 200.00, 'Large family room with two beds', '["WiFi", "TV", "Mini Bar", "Air Conditioning", "Kitchen"]', 'available'),
('Luxury Penthouse', 'Suite', 6, 500.00, 'Top floor luxury penthouse with panoramic city view', '["WiFi", "TV", "Mini Bar", "Jacuzzi", "Private Terrace"]', 'available'),
('Single Budget Room', 'Standard', 1, 45.00, 'Small but functional room for solo travelers', '["WiFi", "Fan"]', 'available');

-- Insert sample bookings
INSERT INTO bookings (user_id, room_id, check_in, check_out, guests, total_price, status) VALUES 
(2, 1, '2026-03-01', '2026-03-05', 2, 600.00, 'confirmed'),
(3, 2, '2026-03-10', '2026-03-12', 2, 160.00, 'pending'),
(2, 3, '2026-04-15', '2026-04-20', 4, 1000.00, 'pending');
