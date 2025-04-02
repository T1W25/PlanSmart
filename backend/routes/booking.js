const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// Temporary mock format — for testing
const sampleVendorData = [
    {
      _id: '1',
      status: 'pending',
      vendor: {
        name: 'Vendor One',
        email: 'vendor1@example.com',
      },
      event: {
        title: 'Luxury Wedding',
        location: 'Central Park',
        date: new Date(),
        guests: 100,
      },
    },
    {
      _id: '2',
      status: 'accepted',
      vendor: {
        name: 'Vendor Two',
        email: 'vendor2@example.com',
      },
      event: {
        title: 'Corporate Gala',
        location: 'Downtown NYC',
        date: new Date(),
        guests: 250,
      },
    },
  ];
  
  router.post('/create', async (req, res) => {
    const {
      FullName,
      EmailAddress,
      EventDetails,
      Location,     // ✅ NEW
      Guests,       // ✅ NEW
      OrgID,
      VendorID,
      EventID,
      SpeakerID,
      ProviderID,
      Date,
    } = req.body;
  
    try {
      const newBooking = new Booking({
        FullName,
        EmailAddress,
        EventDetails,
        Location,
        Guests,
        OrgID,
        VendorID,
        EventID,
        SpeakerID,
        ProviderID,
        Date,
        Status: 'Pending',
      });
  
      await newBooking.save();
      res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

router.get('/fetch', async (req, res) => {
    const { sortBy } = req.query;
  
    let sortOption = {};
    switch (sortBy) {
      case 'timestamp':
        sortOption = { createdAt: -1 };
        break;
      case 'alphabetical':
        sortOption = { FullName: 1 };
        break;
      case 'status':
        sortOption = { Status: 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
        break;
    }
  
    try {
      const bookings = await Booking.find().sort(sortOption);
  
      // Transform real DB data to expected frontend format
      const mapped = bookings.map((b) => ({
        _id: b._id,
        status: b.Status.toLowerCase(), // "Pending" → "pending"
        vendor: {
          name: b.FullName,
          email: b.EmailAddress,
        },
        event: {
          title: b.EventDetails || 'Untitled Event',
          location: 'Unknown', // 🔧 Update if location exists
          date: b.Date,
          guests: 100,         // 🔧 Replace with actual guests field if exists
        },
      }));
  
      res.status(200).json(mapped);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
