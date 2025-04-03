const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Vendor = require("../models/Vendor");
const GuestSpeaker = require("../models/GuestSpeaker");
const TransportationProvider = require("../models/TransportationProvider");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const searchQuery = { Email: { $regex: `^${email}$`, $options: 'i' } };

  try {
    let provider =
      await Vendor.findOne(searchQuery) ||
      await GuestSpeaker.findOne(searchQuery) ||
      await TransportationProvider.findOne(searchQuery);

    if (!provider) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, provider.Password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid usermail or password" });
    }

    const token = jwt.sign(
      {
        providerID: provider._id,
        providerType: provider.ProviderType,
        email: provider.Email,
        name: provider.Name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
