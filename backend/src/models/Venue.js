import pool from '../config/database.js';

/**
 * Venue Model
 * 
 * Handles database operations for Venues.
 */
class Venue {
    /**
     * Find all venues
     * @returns {Promise<Array>} List of all venues
     */
    static async findAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM venues WHERE is_active = TRUE');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find venue by ID
     * @param {number} id - Venue ID
     * @returns {Promise<Object>} Venue details
     */
    static async findById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM venues WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find venue by Slug
     * @param {string} slug - Venue slug
     * @returns {Promise<Object>} Venue details
     */
    static async findBySlug(slug) {
        try {
            const [rows] = await pool.query('SELECT * FROM venues WHERE slug = ?', [slug]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create a new venue
     * @param {Object} venueData - Venue details
     * @returns {Promise<number>} New Venue ID
     */
    static async create(venueData) {
        const { name, slug, type, capacity_min, capacity_max, price, description, features, image_url } = venueData;
        try {
            const [result] = await pool.query(
                'INSERT INTO venues (name, slug, type, capacity_min, capacity_max, price, description, features, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [name, slug, type, capacity_min, capacity_max, price, description, JSON.stringify(features), image_url]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update a venue
     * @param {number} id - Venue ID
     * @param {Object} venueData - Venue details to update
     * @returns {Promise<number>} Number of affected rows
     */
    static async update(id, venueData) {
        // Construct dynamic query
        const keys = Object.keys(venueData);
        const values = Object.values(venueData);

        // Convert features array to JSON string if present
        const featuresIndex = keys.indexOf('features');
        if (featuresIndex !== -1) {
            values[featuresIndex] = JSON.stringify(values[featuresIndex]);
        }

        const setClause = keys.map(key => `${key} = ?`).join(', ');

        try {
            const [result] = await pool.query(
                `UPDATE venues SET ${setClause} WHERE id = ?`,
                [...values, id]
            );
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete (soft delete) a venue
     * @param {number} id - Venue ID
     * @returns {Promise<number>} Number of affected rows
     */
    static async delete(id) {
        try {
            // Soft delete by setting is_active to FALSE
            const [result] = await pool.query('UPDATE venues SET is_active = FALSE WHERE id = ?', [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

export default Venue;
