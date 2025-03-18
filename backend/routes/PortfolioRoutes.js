
// backend/routes/portfolioRoutes.js
const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio'); // ✅ Import Portfolio model
const GuestSpeaker = require('../models/GuestSpeaker');
const TransportationProvider = require('../models/TransportationProvider');
const Vendor = require('../models/Vendor');

// ✅ GET: Fetch all guestspeaker portfolios
router.get('/GuestSpeaker', async (req, res) => {
  try {
    const portfolios = await GuestSpeaker.find();
    res.json(portfolios);
  } catch (error) {
    console.error('Portfolio Fetch Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ GET: Fetch all TransportationProvider portfolios
router.get('/TransportationProvider', async (req, res) => {
  try {
    const portfolios = await TransportationProvider.find();
    res.json(portfolios);
  } catch (error) {
    console.error('Portfolio Fetch Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ GET: Fetch all Vendor portfolios
router.get('/Vendor', async (req, res) => {
  try {
    const portfolios = await Vendor.find();
    res.json(portfolios);
  } catch (error) {
    console.error('Portfolio Fetch Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ POST: Create a new GuestSpeaker profile
router.post('/GuestSpeaker', async (req, res) => {
  try {
    const newPortfolio = new GuestSpeaker(req.body);
    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    console.error('Portfolio Creation Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ POST: Create a new Vendor profile
router.post('/Vendor', async (req, res) => {
  try {
    const newPortfolio = new Vendor(req.body);
    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    console.error('Portfolio Creation Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ POST: Create a new TransportationProvider profile
router.post('/GuestSpeaker', async (req, res) => {
  try {
    const newPortfolio = new TransportationProvider(req.body);
    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    console.error('Portfolio Creation Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});



// ✅ PUT: Update a portfolio by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedPortfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.json(updatedPortfolio);
  } catch (error) {
    console.error('Portfolio Update Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ DELETE: Remove a portfolio by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPortfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!deletedPortfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.json({ msg: 'Portfolio deleted successfully' });
  } catch (error) {
    console.error('Portfolio Deletion Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
