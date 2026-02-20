-- Swahili Pot Booking System Database Schema
-- Version: 1.0.0
-- Description: Schema for venues, bookings, and users customized for Swahili Pot requirements.

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS bs2_booking;
USE bs2_booking;

-- Disable foreign key checks for clean reload
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------
-- Table: Users
-- Description: Stores admin and staff users.
-- -----------------------------------------------------
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- Hashed password
  role ENUM('admin', 'staff', 'customer') DEFAULT 'customer',
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table: Venues
-- Description: Stores information about available event spaces.
-- -----------------------------------------------------
DROP TABLE IF EXISTS venues;
CREATE TABLE venues (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL COMMENT 'e.g. Pwani Boardroom',
  slug VARCHAR(100) UNIQUE NOT NULL COMMENT 'URL friendly name',
  type VARCHAR(50) NOT NULL COMMENT 'e.g. Boardroom, Lounge, Hall, Garden',
  capacity_min INT DEFAULT 0,
  capacity_max INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL COMMENT 'Starting price in KES',
  description TEXT,
  features JSON COMMENT 'Array of features e.g. ["Projector", "Sound System"]',
  image_url VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table: Bookings
-- Description: Stores reservation details.
-- -----------------------------------------------------
DROP TABLE IF EXISTS bookings;
CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venue_id INT NOT NULL,
  user_id INT, -- Nullable if guest booking
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  event_date DATE NOT NULL,
  start_time TIME, -- Optional for full day bookings
  end_time TIME,   -- Optional
  event_type VARCHAR(50) COMMENT 'Wedding, Corporate, Party, etc.',
  guest_count INT NOT NULL,
  total_amount DECIMAL(10, 2),
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE RESTRICT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- -----------------------------------------------------
-- Seed Data
-- -----------------------------------------------------

-- Insert Admin User (password: admin123 - heavily hashed in real app, here for demo)
-- Note: In production, use bcrypt hash. This is a placeholder hash.
INSERT INTO users (name, email, password, role) VALUES 
('Admin', 'admin@swahilipot.co.ke', '$2a$10$XqZ8J8YqZ8J8YqZ8J8YqZOe8J8YqZ8J8YqZ8J8YqZ8J8YqZ8J8Yq', 'admin');

-- Insert Venues
INSERT INTO venues (name, slug, type, capacity_min, capacity_max, price, description, features, image_url) VALUES 
(
    'Pwani Boardroom', 
    'pwani-boardroom',
    'Boardroom', 
    20, 
    40, 
    15000.00, 
    'Modern, fully equipped boardroom suitable for corporate meetings and seminars.', 
    '["Projector", "Whiteboard", "AC", "WiFi"]',
    '/images/pwani-boardroom.jpg'
),
(
    'Bahari Lounge', 
    'bahari-lounge',
    'Lounge', 
    30, 
    60, 
    25000.00, 
    'Intimate lounge space perfect for cocktail parties and bridal showers.', 
    '["Sound System", "Mood Lighting", "Bar Area"]',
    '/images/bahari-lounge.jpg'
),
(
    'Mkenya Grand Hall', 
    'mkenya-grand-hall',
    'Banquet Hall', 
    150, 
    300, 
    80000.00, 
    'Flagship banquet hall with stage and full catering kitchen.', 
    '["Stage", "Catering Kitchen", "Sound System", "Changing Rooms"]',
    '/images/mkenya-grand-hall.jpg'
),
(
    'Bustani Garden', 
    'bustani-garden',
    'Garden', 
    100, 
    250, 
    50000.00, 
    'Lush outdoor garden space with tropical palms.', 
    '["Tent", "Outdoor Lighting", "Power Backup"]',
    '/images/bustani-garden.jpg'
);

