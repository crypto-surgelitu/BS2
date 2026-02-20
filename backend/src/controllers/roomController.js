import Room from '../models/Room.js';

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.status(200).json({
            success: true,
            count: rooms.length,
            data: rooms
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching rooms',
            error: error.message
        });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }
        res.status(200).json({
            success: true,
            data: room
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching room',
            error: error.message
        });
    }
};

export const createRoom = async (req, res) => {
    try {
        const roomId = await Room.create(req.body);
        const newRoom = await Room.findById(roomId);
        res.status(201).json({
            success: true,
            message: 'Room created successfully',
            data: newRoom
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating room',
            error: error.message
        });
    }
};

export const updateRoom = async (req, res) => {
    try {
        const affectedRows = await Room.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }
        const updatedRoom = await Room.findById(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Room updated successfully',
            data: updatedRoom
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating room',
            error: error.message
        });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        const affectedRows = await Room.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Room deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting room',
            error: error.message
        });
    }
};

export const getAvailableRooms = async (req, res) => {
    try {
        const rooms = await Room.findAvailable();
        res.status(200).json({
            success: true,
            count: rooms.length,
            data: rooms
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching available rooms',
            error: error.message
        });
    }
};
