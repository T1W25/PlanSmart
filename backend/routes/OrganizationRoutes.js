const express = require("express");
const router = express.Router();
const { Organization, Spending } = require("../models/Organization"); // Updated import
const {
  getOrganizationWithSpending,
  addSpendingRecord
} = require("../controllers/organizationController"); // Import the controller functions


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

// POST a new Organization
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

// Route to add a spending record to an organization
// Route to add a spending record to an organization
router.post("/:orgId/spending", async (req, res) => {
  try {
    const orgId = req.params.orgId;
    const spendingData = req.body;

    const spending = await addSpendingRecord(orgId, spendingData);

    res.status(201).json({
      message: "Spending record added successfully",
      spending: spending,
    });
  } catch (err) {
    console.error("Error adding spending record:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET an organization with its spending records
router.get("/:orgId/spending", async (req, res) => {
  try {
    const orgId = req.params.orgId;
    const organization = await getOrganizationWithSpending(orgId); // Call the controller function
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.json(organization); // Send the populated organization with spending records
  } catch (error) {
    console.error("Error fetching organization:", error);
    res.status(500).json({ message: "Error fetching organization" });
  }
});

module.exports = router;
