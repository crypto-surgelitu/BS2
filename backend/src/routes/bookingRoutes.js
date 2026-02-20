import express from 'express';
import {
    getAllBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking,
    getUserBookings
} from '../controllers/bookingController.js';

const router = express.Router();

router.route('/')
    .get(getAllBookings)
    .post(createBooking);

router.route('/:id')
    .get(getBooking)
    .put(updateBooking)
    .delete(deleteBooking);

router.get('/user/:userId', getUserBookings);

export default router;
