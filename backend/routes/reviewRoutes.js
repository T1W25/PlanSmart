const express = require("express");
const router = express.Router();

const GuestSpeaker = require("../models/guestSpeaker");
const Vendor = require("../models/Vendor");
const TransportationProvider = require("../models/TransportationProvider");

// Unified GET endpoint for retrieving reviews of any provider
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let entity =
      await GuestSpeaker.findById(id) ||
      await Vendor.findById(id) ||
      await TransportationProvider.findById(id);

    if (!entity) {
      return res.status(404).json({ error: "Entity not found" });
    }

    res.json({
      reviews: entity.Reviews || [],
      total: entity.Reviews?.length || 0,
      rating: entity.rating || 0,
    });
  } catch (err) {
    console.error("Review fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { clientName, rating, reviewText } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ msg: "Rating must be between 1 and 5" });
  }

  try {
    // First try to find the provider from each collection
    let Model = null;
    if (await GuestSpeaker.findById(id)) Model = GuestSpeaker;
    else if (await Vendor.findById(id)) Model = Vendor;
    else if (await TransportationProvider.findById(id)) Model = TransportationProvider;

    if (!Model) {
      return res.status(404).json({ msg: "Provider not found" });
    }

    const provider = await Model.findById(id);

    provider.Reviews.push({ clientName, rating, reviewText });

    const total = provider.Reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    provider.rating = Math.round(total / provider.Reviews.length);

    // Use findByIdAndUpdate to bypass schema validation on required fields
    await Model.findByIdAndUpdate(id, {
      Reviews: provider.Reviews,
      rating: provider.rating
    });

    res.status(201).json({ msg: "Review added successfully" });
  } catch (err) {
    console.error("Review post error:", err);
    res.status(500).json({ msg: "Server error while posting review" });
  }
});


module.exports = router;
