// routes/organizationRoutes.js

const express = require("express");
const router = express.Router();
const Organization = require("../models/Organization");

// ✅ GET all organizations
router.get("/", async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    console.error("Fetch Organizations Error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
    try {
      const organization = await Organization.findById(req.params.id);
      if (!organization) {
        return res.status(404).json({ msg: "Organization not found" });
      }
      res.json(organization);
    } catch (error) {
      console.error("Fetch Organization by ID Error:", error);
      res.status(500).json({ msg: "Server Error" });
    }
  });

module.exports = router;

// Post a new Organization

router.post("/", async (req, res) => {
    try {
      const newOrg = new Organization(req.body);
      const savedOrg = await newOrg.save();
      res.status(201).json(savedOrg);
    } catch (error) {
      console.error("Create Organization Error:", error);
      res.status(500).json({ msg: "Server Error" });
    }
  });
  
  // Update Organization.
  router.put("/:id", async (req, res) => {
    try {
      const updatedOrg = await Organization.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
  
      if (!updatedOrg) {
        return res.status(404).json({ msg: "Organization not found" });
      }
  
      res.json(updatedOrg);
    } catch (error) {
      console.error("Update Organization Error:", error);
      res.status(500).json({ msg: "Server Error" });
    }
  });
  
