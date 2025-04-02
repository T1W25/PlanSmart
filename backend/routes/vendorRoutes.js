const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');

// ✅ GET all vendor portfolios with prioritization for verified vendors and search
router.get('/', async (req, res) => {
  try {
    // Extract query parameters
    const { searchTerm, verified, page = 1, limit = 10 } = req.query; // Defaults: page 1, limit 10
    
    let searchQuery = {};

    // Search by name or email
    if (searchTerm) {
      searchQuery = {
        $or: [
          { Name: { $regex: searchTerm, $options: 'i' } },
          { Email: { $regex: searchTerm, $options: 'i' } },
        ],
      };
    }

    // Filter by verified vendors if "verified=true" is in query
    if (verified) {
      searchQuery.isVerified = true;  // Only fetch verified vendors
    }

    // Pagination
    const skip = (page - 1) * limit;
    
    // Find vendors with search query and sorting by verified vendors first, then by rating
    const vendors = await Vendor.find(searchQuery)
      .sort({ isVerified: -1, rating: -1 }) // Sort by isVerified (verified vendors first), then rating
      .skip(skip)
      .limit(Number(limit))
      .exec();

    // Count the total number of vendors matching the search query for pagination purposes
    const totalVendors = await Vendor.countDocuments(searchQuery);

    // Send response with vendors and pagination info
    res.json({
      vendors,
      pagination: {
        totalVendors,
        totalPages: Math.ceil(totalVendors / limit),
        currentPage: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error('Vendor Fetch Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const provider = await Vendor.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ msg: 'Provider not found' });
    }
    res.json(provider);
  } catch (error) {
    console.error('Get by ID Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

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
