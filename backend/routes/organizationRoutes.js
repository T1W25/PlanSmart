const express = require("express");
const router = express.Router();
const Organization = require("../models/Organization");

// Get organization by ID
router.get("/:id", async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization)
      return res.status(404).json({ message: "Organization not found" });
    res.json(organization);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Add a new organization
router.post("/", async (req, res) => {
  try {
    const { name, description, location, contactInformation, spendingHistory } =
      req.body;

    // Create a new organization with the new fields
    const newOrganization = new Organization({
      name,
      description,
      location,
      contactInformation,
      spendingHistory,
    });

    // Save to database
    const savedOrganization = await newOrganization.save();
    res.status(201).json(savedOrganization);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating organization", error: err.message });
  }
});

module.exports = router;