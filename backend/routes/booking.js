const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// Endpoint to create a new booking
router.post('/create', async (req, res) => {
    const { FullName, EmailAddress, EventDetails, OrgID, VendorID, EventID, SpeakerID, ProviderID, Date } = req.body;

    try {
        const newBooking = new Booking({
            FullName,
            EmailAddress,
            EventDetails,
            OrgID,
            VendorID,
            EventID,
            SpeakerID,
            ProviderID,
            Date,
            Status: "Pending"  // Status should be "Pending" upon receipt
        });

        await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint to fetch bookings with sorting options
router.get('/fetch', async (req, res) => {
    const { sortBy } = req.query;  // Get sorting criteria from query parameters (timestamp, status, name)

    let sortOption = {};
    
    // Sorting logic based on the query parameter
    switch (sortBy) {
        case 'timestamp':
            sortOption = { createdAt: -1 };  // Sort by creation timestamp (descending)
            break;
        case 'alphabetical':
            sortOption = { FullName: 1 };  // Sort by full name (ascending)
            break;
        case 'status':
            sortOption = { Status: 1 };  // Sort by status (ascending)
            break;
        default:
            sortOption = { createdAt: -1 };  // Default sorting by timestamp (descending)
            break;
    }

    try {
        const bookings = await Booking.find().sort(sortOption);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
