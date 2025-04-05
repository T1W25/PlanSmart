const express = require("express");
const router = express.Router();

const GuestSpeaker = require("../models/GuestSpeaker");
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

module.exports = router;
