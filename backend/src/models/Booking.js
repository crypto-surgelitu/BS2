import pool from '../config/database.js';

class Booking {
    // Get all bookings
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC');
        return rows;
    }

    // Get booking by ID
    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [id]);
        return rows[0];
    }

    // Create new booking
    static async create(bookingData) {
        const { user_id, room_id, check_in, check_out, guests, total_price } = bookingData;
        const [result] = await pool.query(
            'INSERT INTO bookings (user_id, room_id, check_in, check_out, guests, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [user_id, room_id, check_in, check_out, guests, total_price, 'pending']
        );
        return result.insertId;
    }

    // Update booking
    static async update(id, bookingData) {
        const fields = Object.keys(bookingData).map(key => `${key} = ?`).join(', ');
        const values = [...Object.values(bookingData), id];
        const [result] = await pool.query(
            `UPDATE bookings SET ${fields} WHERE id = ?`,
            values
        );
        return result.affectedRows;
    }

    // Delete booking
    static async delete(id) {
        const [result] = await pool.query('DELETE FROM bookings WHERE id = ?', [id]);
        return result.affectedRows;
    }

    // Get bookings by user
    static async findByUserId(userId) {
        const [rows] = await pool.query('SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC', [userId]);
        return rows;
    }
}

export default Booking;
