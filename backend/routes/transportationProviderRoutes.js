const express = require('express');
const router = express.Router();
const TransportationProvider = require('../models/TransportationProvider');

// ✅ALL GET REQUESTS✅
// ✅ GET all transportation provider portfolios
router.get('/', async (req, res) => {
  try {
    const portfolios = await TransportationProvider.find();
    res.json(portfolios);
  } catch (error) {
    console.error('Transportation Provider Fetch Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ALL POST REQUESTS✅
// ✅ POST: Create a new TransportationProvider profile
router.post('/', async (req, res) => {
  try {
    const newPortfolio = new TransportationProvider(req.body);
    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    console.error('Transportation Provider Creation Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ALL PUT REQUESTS✅
// ✅ PUT: Update a transportation provider by ID
router.put('/:id', async (req, res) => {
    try {
      const updatedProvider = await TransportationProvider.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!updatedProvider) {
        return res.status(404).json({ msg: 'Transportation Provider not found' });
      }
      res.json(updatedProvider);
    } catch (error) {
      console.error('Transportation Provider Update Error:', error);
      res.status(500).json({ msg: 'Server Error' });
    }
  });
  
  // ✅ PUT: Update only Portfolio
  router.put('/portfolio/:id', async (req, res) => {
    try {
      const { Type, Description } = req.body;
  
      const updatedProvider = await TransportationProvider.findByIdAndUpdate(
        req.params.id,
        { 
          $set: { 
            "Portfolio.Type": Type, 
            "Portfolio.Description": Description 
          } 
        },
        { new: true, runValidators: true }
      );
  
      if (!updatedProvider) {
        return res.status(404).json({ msg: 'Transportation Provider not found' });
      }
  
      res.json(updatedProvider);
    } catch (error) {
      console.error('Transportation Provider Portfolio Update Error:', error);
      res.status(500).json({ msg: 'Server Error' });
    }
  });
  
  // ✅ALL DELETE REQUESTS✅
  // ✅ DELETE: Remove a transportation provider by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedProvider = await TransportationProvider.findByIdAndDelete(req.params.id);
      if (!deletedProvider) {
        return res.status(404).json({ msg: 'Transportation Provider not found' });
      }
      res.json({ msg: 'Transportation Provider deleted successfully' });
    } catch (error) {
      console.error('Transportation Provider Deletion Error:', error);
      res.status(500).json({ msg: 'Server Error' });
    }
  });
  
  module.exports = router;