import express from 'express';
import {
    getAllVenues,
    getVenue,
    createVenue,
    updateVenue,
    deleteVenue
} from '../controllers/venueController.js';

const router = express.Router();

// Routes for '/api/venues'
router.get('/', getAllVenues);
router.post('/', createVenue); // Add auth middleware here later
router.get('/:id', getVenue);
router.put('/:id', updateVenue); // Add auth middleware here later
router.delete('/:id', deleteVenue); // Add auth middleware here later

export default router;
