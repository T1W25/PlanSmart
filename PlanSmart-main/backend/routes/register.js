const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const TransportationProvider = require("../models/TransportationProvider");
const Vendor = require("../models/Vendor");
const GuestSpeaker = require("../models/GuestSpeaker");

//Mapped providerType to its respective Mongoose model
const modelMap = {
  "Transportation Provider": TransportationProvider,
  "Vendor": Vendor,
  "Guest Speaker": GuestSpeaker,
};

// Register route
router.post("/create", async (req, res) => {
  const { username, password, email, providerType } = req.body;

  try {
    // 1. Validate providerType
    const Model = modelMap[providerType];
    if (!Model) {
      return res.status(400).json({ error: "Invalid provider type" });
    }

    // 1. Hash password for User model
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Create User (auth record)
    const newProvider = new Model({
      Name: username,
      Email: email,
      Password: hashedPassword,
      ProviderType: providerType,
    });

    await newProvider.save();
    console.log("✅ User saved");

    // 4. Create JWT token
    const token = jwt.sign(
      {
        providerID: newProvider._id,
        providerType,
        email: email,
        name: newProvider.Name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: `${newProvider.Name} registered successfully`,
      token,
      providerID: newProvider._id,
      name: newProvider.Name,
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateKey = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        error: `Duplicate ${duplicateKey}. That ${duplicateKey} is already taken.`,
      });
    }
  
    console.error("❌ Registration error:", error.message);
    res.status(500).json({ error: "Failed to register user and provider" });
  }
});

module.exports = router;