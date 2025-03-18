
// backend/routes/portfolioRoutes.js
const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio'); // ✅ Import Portfolio model



// ✅ post: creates new  portfolios
router.post('/', async (req, res) => {
  try {
      const newPortfolio = new Portfolio(req.body);
      await newPortfolio.save();
      res.status(201).json(newPortfolio);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


// ✅ GET: Fetch all portfolios
router.get('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.find();
    res.json(portfolio);
  } catch (error) {
    console.error('Portfolio Fetch Error:', error);
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




router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Music Festival', description: 'A large music event' },
    { id: 2, name: 'Food Expo', description: 'A gathering for food lovers' }
  ]);
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

router.put('/vendors/:vendorId/respond', async (req, res) => {
  const { vendorId } = req.params;
  const { status } = req.body;

  if (!['Accepted', 'Declined'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
  }

  try {
      const updatedPortfolio = await Portfolio.findOneAndUpdate(
          { "Vendors.VendorID": vendorId },
          { $set: { "Vendors.$.Status": status } },
          { new: true }
      );

      if (!updatedPortfolio) {
          return res.status(404).json({ message: "Vendor not found" });
      }

      res.json(updatedPortfolio);
  } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
  }
});



module.exports = router;
