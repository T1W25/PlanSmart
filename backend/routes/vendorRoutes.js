const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');

  // ✅ALL GET REQUESTS✅
// ✅ GET all vendor portfolios
router.get('/', async (req, res) => {
  try {
    const portfolios = await Vendor.find();
    res.json(portfolios);
  } catch (error) {
    console.error('Vendor Fetch Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});
  // ✅ALL POST REQUESTS✅
// ✅ POST: Create a new Vendor profile
router.post('/', async (req, res) => {
  try {
    const newPortfolio = new Vendor(req.body);
    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    console.error('Vendor Creation Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

  // ✅ALL PUT REQUESTS✅
// ✅ PUT: Update a vendor by ID
router.put('/:id', async (req, res) => {
    try {
      const updatedVendor = await Vendor.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!updatedVendor) {
        return res.status(404).json({ msg: 'Vendor not found' });
      }
      res.json(updatedVendor);
    } catch (error) {
      console.error('Vendor Update Error:', error);
      res.status(500).json({ msg: 'Server Error' });
    }
  });
  
  // ✅ PUT: Update only Portfolio
  router.put('/portfolio/:id', async (req, res) => {
    try {
      const { Type, Description } = req.body;
  
      const updatedVendor = await Vendor.findByIdAndUpdate(
        req.params.id,
        { 
          $set: { 
            "Portfolio.Type": Type, 
            "Portfolio.Description": Description 
          } 
        },
        { new: true, runValidators: true }
      );
  
      if (!updatedVendor) {
        return res.status(404).json({ msg: 'Vendor not found' });
      }
  
      res.json(updatedVendor);
    } catch (error) {
      console.error('Vendor Portfolio Update Error:', error);
      res.status(500).json({ msg: 'Server Error' });
    }
  });
  
    // ✅ALL DELETE REQUESTS✅
  // ✅ DELETE: Remove a vendor by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
      if (!deletedVendor) {
        return res.status(404).json({ msg: 'Vendor not found' });
      }
      res.json({ msg: 'Vendor deleted successfully' });
    } catch (error) {
      console.error('Vendor Deletion Error:', error);
      res.status(500).json({ msg: 'Server Error' });
    }
  });
  
  module.exports = router;
