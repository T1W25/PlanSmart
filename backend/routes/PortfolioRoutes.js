const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const Vendor = require('../models/Vendor');
const GuestSpeaker = require('../models/GuestSpeaker');
const TransportationProvider = require('../models/TransportationProvider');

// ✅ GET: Fetch all portfolios with related vendors, speakers, and providers
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find().lean();

    if (!portfolios.length) {
      return res.status(404).json({ msg: 'No portfolios found' });
    }

    // Fetch related data for each portfolio
    const portfoliosWithDetails = await Promise.all(
      portfolios.map(async (portfolio) => {
        const vendors = await Vendor.find({ PortfolioID: portfolio.PortfolioID }).lean();
        const guestSpeakers = await GuestSpeaker.find({ PortfolioID: portfolio.PortfolioID }).lean();
        const transportationProviders = await TransportationProvider.find({ PortfolioID: portfolio.PortfolioID }).lean();

        return { ...portfolio, vendors, guestSpeakers, transportationProviders };
      })
    );

    res.json(portfoliosWithDetails);
  } catch (error) {
    console.error('❌ Portfolio Fetch Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ GET: Fetch a single portfolio by PortfolioID
router.get('/:id', async (req, res) => {
  try {
    const portfolioID = parseInt(req.params.id, 10); // Ensure PortfolioID is a number
    const portfolio = await Portfolio.findOne({ PortfolioID: portfolioID }).lean();

    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }

    const vendors = await Vendor.find({ PortfolioID: portfolioID }).lean();
    const guestSpeakers = await GuestSpeaker.find({ PortfolioID: portfolioID }).lean();
    const transportationProviders = await TransportationProvider.find({ PortfolioID: portfolioID }).lean();

    res.json({ ...portfolio, vendors, guestSpeakers, transportationProviders });
  } catch (error) {
    console.error('❌ Portfolio Fetch Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ POST: Create a new portfolio
router.post('/', async (req, res) => {
  try {
    const { PortfolioID, Type, Description } = req.body;
    if (!PortfolioID || !Type || !Description) {
      return res.status(400).json({ msg: 'PortfolioID, Type, and Description are required' });
    }

    // Ensure PortfolioID is unique
    const existingPortfolio = await Portfolio.findOne({ PortfolioID }).lean();
    if (existingPortfolio) {
      return res.status(400).json({ msg: 'Portfolio with this ID already exists' });
    }

    const newPortfolio = new Portfolio({ PortfolioID, Type, Description });
    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    console.error('❌ Portfolio Creation Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ PUT: Update a portfolio by PortfolioID
router.put('/:id', async (req, res) => {
  try {
    const portfolioID = parseInt(req.params.id, 10);

    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { PortfolioID: portfolioID },
      { $set: req.body },
      { new: true, lean: true }
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }

    res.json(updatedPortfolio);
  } catch (error) {
    console.error('❌ Portfolio Update Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ DELETE: Remove a portfolio by PortfolioID
router.delete('/:id', async (req, res) => {
  try {
    const portfolioID = parseInt(req.params.id, 10);

    const deletedPortfolio = await Portfolio.findOneAndDelete({ PortfolioID: portfolioID }).lean();
    if (!deletedPortfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }

    res.json({ msg: '✅ Portfolio deleted successfully' });
  } catch (error) {
    console.error('❌ Portfolio Deletion Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
