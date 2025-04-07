const express = require('express');
const router = express.Router();
const { Organization} = require("../models/Organization");


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

module.exports = router;
