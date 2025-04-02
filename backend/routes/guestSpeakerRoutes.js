const express = require('express');
const router = express.Router();
const GuestSpeaker = require('../models/GuestSpeaker');

// ✅ALL GET REQUESTS✅
// ✅ GET all guest speaker portfolios
router.get('/', async (req, res) => {
  try {
    const portfolios = await GuestSpeaker.find();
    res.json(portfolios);
  } catch (error) {
    console.error('Guest Speaker Fetch Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const provider = await GuestSpeaker.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ msg: 'Provider not found' });
    }
    res.json(provider);
  } catch (error) {
    console.error('Get by ID Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ALL POST REQUESTS✅
// ✅ POST: Create a new GuestSpeaker profile
router.post('/', async (req, res) => {
  try {
    const newPortfolio = new GuestSpeaker(req.body);
    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    console.error('Guest Speaker Creation Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ PUT: Update a guest speaker by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedGuestSpeaker = await GuestSpeaker.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedGuestSpeaker) {
      return res.status(404).json({ msg: 'Guest Speaker not found' });
    }
    res.json(updatedGuestSpeaker);
  } catch (error) {
    console.error('Guest Speaker Update Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});



// ✅ALL DELETE REQUESTS✅
// ✅ DELETE: Remove a guest speaker by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedGuestSpeaker = await GuestSpeaker.findByIdAndDelete(req.params.id);
    if (!deletedGuestSpeaker) {
      return res.status(404).json({ msg: 'Guest Speaker not found' });
    }
    res.json({ msg: 'Guest Speaker deleted successfully' });
  } catch (error) {
    console.error('Guest Speaker Deletion Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
