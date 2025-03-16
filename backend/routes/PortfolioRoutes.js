
// backend/routes/portfolioRoutes.js
const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio'); // ✅ Import Portfolio model

// ✅ GET: Fetch all portfolios
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.json(portfolios);
  } catch (error) {
    console.error('Portfolio Fetch Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ POST: Create a new portfolio
router.post('/', async (req, res) => {
  try {
    const newPortfolio = new Portfolio(req.body);
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
