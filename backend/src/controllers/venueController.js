import Venue from '../models/Venue.js';

/**
 * Venue Controller
 * 
 * Handles API requests related to Venues.
 */

// Get all venues
export const getAllVenues = async (req, res) => {
    try {
        const venues = await Venue.findAll();
        res.status(200).json({
            success: true,
            count: venues.length,
            data: venues
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching venues',
            error: error.message
        });
    }
};

// Get single venue by ID
export const getVenue = async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id);
        if (!venue) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }
        res.status(200).json({
            success: true,
            data: venue
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching venue',
            error: error.message
        });
    }
};

// Create venue
export const createVenue = async (req, res) => {
    try {
        const venueId = await Venue.create(req.body);
        const venue = await Venue.findById(venueId);
        res.status(201).json({
            success: true,
            message: 'Venue created successfully',
            data: venue
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating venue',
            error: error.message
        });
    }
};

// Update venue
export const updateVenue = async (req, res) => {
    try {
        const affectedRows = await Venue.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found or no changes made'
            });
        }
        const venue = await Venue.findById(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Venue updated successfully',
            data: venue
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating venue',
            error: error.message
        });
    }
};

// Delete venue
export const deleteVenue = async (req, res) => {
    try {
        const affectedRows = await Venue.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Venue not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Venue deleted successfully' // Soft delete actually
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting venue',
            error: error.message
        });
    }
};
