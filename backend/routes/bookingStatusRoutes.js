const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// Updating booking status
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;

  if (!status || !['pending', 'accepted', 'declined'].includes(status.toLowerCase())) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { Status: status.charAt(0).toUpperCase() + status.slice(1) }, 
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', booking: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
