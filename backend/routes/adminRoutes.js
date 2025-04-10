const express = require('express');
const router = express.Router();
const { Organization} = require("../models/Organization");


const Vendor = require("../models/Vendor");
const GuestSpeaker = require("../models/GuestSpeaker");
const TransportationProvider = require("../models/TransportationProvider");

const getProviderModel = (type) => {
  switch (type) {
    case "vendor":
      return Vendor;
    case "guest-speaker":
      return GuestSpeaker;
    case "transportation":
      return TransportationProvider;
    default:
      return null;
  }
};


// TEMP: Reset password for an organization manually (for recovery purposes only)
//NOTE!!!!!!!!!!! ONLY TO BE USED WITH POSTMAN
const bcrypt = require("bcrypt");

router.post("/reset-password/:id", async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword || newPassword.trim().length < 4) {
      return res.status(400).json({ msg: "New password must be at least 4 characters long." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedOrg = await Organization.findByIdAndUpdate(
      req.params.id,
      { $set: { Password: hashedPassword } },
      { new: true }
    );

    if (!updatedOrg) {
      return res.status(404).json({ msg: "Organization not found." });
    }

    res.status(200).json({ msg: `Password reset for ${updatedOrg.Name}` });
  } catch (err) {
    console.error("Admin reset password error:", err);
    res.status(500).json({ msg: "Server error during password reset." });
  }
});

//Password Reset for provider
router.post("/reset-password/:providerType/:id", async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { providerType, id } = req.params;

    if (!newPassword || newPassword.trim().length < 4) {
      return res.status(400).json({ msg: "New password must be at least 4 characters long." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const Model = getProviderModel(providerType);

    if (!Model) {
      return res.status(400).json({ msg: "Invalid provider type." });
    }

    const updatedProvider = await Model.findByIdAndUpdate(
      id,
      { $set: { Password: hashedPassword } },
      { new: true }
    );

    if (!updatedProvider) {
      return res.status(404).json({ msg: "Provider not found." });
    }

    res.status(200).json({ msg: `Password reset for ${updatedProvider.Name}` });
  } catch (err) {
    console.error("Provider reset password error:", err);
    res.status(500).json({ msg: "Server error during password reset." });
  }
});

module.exports = router;

module.exports = router;
