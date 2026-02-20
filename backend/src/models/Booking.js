import pool from '../config/database.js';

/**
 * Booking Model
 * 
 * Handles database operations for Bookings.
 */
class Booking {
    /**
     * Get all bookings
     * @returns {Promise<Array>} List of all bookings
     */
    static async findAll() {
        const query = `
            SELECT b.*, v.name as venue_name 
            FROM bookings b 
            JOIN venues v ON b.venue_id = v.id 
            ORDER BY b.event_date DESC
        `;
        const [rows] = await pool.query(query);
        return rows;
    }

    /**
     * Get booking by ID
     * @param {number} id - Booking ID
     * @returns {Promise<Object>} Booking details
     */
    static async findById(id) {
        const query = `
            SELECT b.*, v.name as venue_name 
            FROM bookings b 
            JOIN venues v ON b.venue_id = v.id 
            WHERE b.id = ?
        `;
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    }

    /**
     * Create new booking
     * @param {Object} bookingData - Booking details
     * @returns {Promise<number>} New Booking ID
     */
    static async create(bookingData) {
        const {
            venue_id,
            user_id,
            customer_name,
            customer_email,
            customer_phone,
            event_date,
            start_time,
            end_time,
            event_type,
            guest_count,
            total_amount,
            special_requests
        } = bookingData;

        const query = `
            INSERT INTO bookings (
                venue_id, user_id, customer_name, customer_email, customer_phone, 
                event_date, start_time, end_time, event_type, guest_count, 
                total_amount, special_requests, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
        `;

        const [result] = await pool.query(query, [
            venue_id,
            user_id || null,
            customer_name,
            customer_email,
            customer_phone,
            event_date,
            start_time,
            end_time,
            event_type,
            guest_count,
            total_amount,
            special_requests
        ]);

        return result.insertId;
    }

    /**
     * Update booking
     * @param {number} id - Booking ID
     * @param {Object} bookingData - Booking details to update
     * @returns {Promise<number>} Number of affected rows
     */
    static async update(id, bookingData) {
        const fields = Object.keys(bookingData).map(key => `${key} = ?`).join(', ');
        const values = [...Object.values(bookingData), id];

        const [result] = await pool.query(
            `UPDATE bookings SET ${fields} WHERE id = ?`,
            values
        );
        return result.affectedRows;
    }

    /**
     * Delete booking
     * @param {number} id - Booking ID
     * @returns {Promise<number>} Number of affected rows
     */
    static async delete(id) {
        const [result] = await pool.query('DELETE FROM bookings WHERE id = ?', [id]);
        return result.affectedRows;
    }

    /**
     * Get bookings by user
     * @param {number} userId - User ID
     * @returns {Promise<Array>} List of user's bookings
     */
    static async findByUserId(userId) {
        const query = `
            SELECT b.*, v.name as venue_name 
            FROM bookings b 
            JOIN venues v ON b.venue_id = v.id 
            WHERE b.user_id = ? 
            ORDER BY b.event_date DESC
        `;
        const [rows] = await pool.query(query, [userId]);
        return rows;
    }

    /**
     * Check availability
     * Checks if a venue is available for a given date and time range
     * @param {number} venueId
     * @param {string} date
     * @returns {Promise<boolean>} True if available
     */
    static async checkAvailability(venueId, date) {
        // Simple daily check for now (can be expanded to time slots)
        const [rows] = await pool.query(
            'SELECT COUNT(*) as count FROM bookings WHERE venue_id = ? AND event_date = ? AND status != "cancelled"',
            [venueId, date]
        );
        return rows[0].count === 0;
    }
}

export default Booking;
