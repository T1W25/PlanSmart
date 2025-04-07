const express = require('express');
const router = express.Router();
const TransportationProvider = require('../models/TransportationProvider');

// ALL GET REQUESTS
// GET provider by email (NEW route)
router.get('/by-email/:email', async (req, res) => {
  console.log("Incoming email param:", req.params.email);

  try {
    const all = await TransportationProvider.find(); // 👈 ADD HERE
    console.log("📦 All provider emails:", all.map(p => p.Email)); // 👈 AND HERE

    const incomingEmail = req.params.email.trim().toLowerCase();
    const provider = await TransportationProvider.findOne({
      Email: { $regex: new RegExp(`^${incomingEmail}$`, 'i') } // case-insensitive match
    });
    

    if (!provider) {
      console.log("❌ Provider not found with email:", req.params.email);
      return res.status(404).json({ msg: 'Provider not found' });
    }

    console.log("Found provider:", provider.Email);
    res.json(provider);
  } catch (error) {
    console.error('Get by Email Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});


// GET all transportation provider portfolios
router.get('/', async (req, res) => {
  try {
    const portfolios = await TransportationProvider.find().sort({ isAvailable: -1, isVerified: -1 });;
    res.json(portfolios);
  } catch (error) {
    console.error('Transportation Provider Fetch Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { searchTerm, verified, page = 1, limit = 10 } = req.query;
    let searchQuery = {};

    if (searchTerm) {
      searchQuery = {
        $or: [
          { Name: { $regex: searchTerm, $options: "i" } },
          { Email: { $regex: searchTerm, $options: "i" } },
        ],
      };
    }

    if (verified) {
      searchQuery.isVerified = true;
    }

    const skip = (page - 1) * limit;

    const transportProviders = await TransportationProvider.find(searchQuery)
      .sort({ isVerified: -1, rating: -1 })
      .skip(skip)
      .limit(Number(limit))
      .exec();

    const total = await TransportationProvider.countDocuments(searchQuery);

    res.json({
      transportProviders,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error("TransportProvider Search Error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const provider = await TransportationProvider.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ msg: 'Provider not found' });
    }
    res.json(provider);
  } catch (error) {
    console.error('Get by ID Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ALL POST REQUESTS
// POST: Create a new TransportationProvider profile
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

// ALL PUT REQUESTS
// PUT: Update a transportation provider by ID
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
  
  // ALL DELETE REQUESTS
  // DELETE: Remove a transportation provider by ID
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