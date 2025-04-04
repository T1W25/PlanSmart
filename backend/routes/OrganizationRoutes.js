const express = require("express");
const router = express.Router();
const { Organization, Spending } = require("../models/Organization");
const {
  getOrganizationWithSpending,
  addSpendingRecord
} = require("../controllers/organizationController"); // Import the controller functions
const Event = require("../models/Events");



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

router.get("/events/:orgId", async (req, res) => {
  try {
    const events = await Event.find({ organizationId: req.params.orgId })
      .sort({ createdAt: -1 }); // Sort by newest

    if (!events.length) {
      return res.status(404).json({ msg: "No events found for this organization." });
    }

    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ msg: "Server error" });
  }
});


router.post("/events", async (req, res) => {
  try {
    const {
      eventName,
      eventDescription,
      date,
      numberOfGuests,
      location,
      rate,
      organizationId,
      organizationName,
      providers,
    } = req.body;

    // Validate that at least one provider exists
    if (!Array.isArray(providers) || providers.length === 0) {
      return res.status(400).json({ msg: "At least one provider is required." });
    }

    // Optional: validate fields inside the provider
    for (const provider of providers) {
      if (!provider.providerID || !provider.providerType || !provider.providerName) {
        return res.status(400).json({ msg: "Invalid provider information." });
      }
    }

    const newEvent = new Event({
      eventName,
      eventDescription,
      date,
      numberOfGuests,
      location,
      rate,
      organizationId,
      organizationName,
      providers, // just use the full array as received
    });

    await newEvent.save();
    res.status(201).json({ msg: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Event creation error:", error);
    res.status(500).json({ msg: "Server error during event creation" });
  }
});

module.exports = router;
