const express = require("express");
const router = express.Router();
const { Organization, Spending } = require("../models/Organization");
const {
  getOrganizationWithSpending,
  addSpendingRecord
} = require("../controllers/OrganizationController"); // Import the controller functions capitlziation
const Event = require("../models/Events");
const EventInvite = require("../models/EventInvite");
const bcrypt = require("bcrypt");

// GET all organizations
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

//GET an organization with its spending records
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

//grab events for an organization
router.get("/events/:orgId", async (req, res) => {
  try {
    const events = await Event.find({ organizationId: req.params.orgId }).lean().sort({ createdAt: -1 }); // Sort by newest; // lean for performance
    
    // Attach invites per event
    const eventIds = events.map(e => e._id);
    const invites = await EventInvite.find({ eventId: { $in: eventIds } }).lean();

    // Map invites to corresponding events
    const invitesMap = invites.reduce((acc, invite) => {
      if (!acc[invite.eventId]) acc[invite.eventId] = [];
      acc[invite.eventId].push(invite);
      return acc;
    }, {});

    const eventsWithProviders = events.map(event => ({
      ...event,
      providers: invitesMap[event._id] || [],
    }));

    res.json(eventsWithProviders);
  } catch (err) {
    console.error("Error fetching events with invites:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

//create events
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

    //Validate that at least one provider exists
    if (!Array.isArray(providers) || providers.length === 0) {
      return res.status(400).json({ msg: "At least one provider is required." });
    }

    //Optional: validate fields inside the provider
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
      providers,
    });

    await newEvent.save();
    res.status(201).json({ msg: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Event creation error:", error);
    res.status(500).json({ msg: "Server error during event creation" });
  }
});


//UPDATE an event by ID
router.put("/events/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const {
      eventName,
      eventDescription,
      date,
      numberOfGuests,
      location,
      organizationId,
      organizationName,
      providers,
    } = req.body;

    //Validate required fields
    if (!eventName || !date || !numberOfGuests || !organizationId || !Array.isArray(providers)) {
      return res.status(400).json({ msg: "Missing or invalid fields in request." });
    }

    //Check providers have essential fields
    for (const provider of providers) {
      if (!provider.providerID || !provider.providerType || !provider.providerName) {
        return res.status(400).json({ msg: "Each provider must include providerID, providerType, and providerName." });
      }
    }

    //Update the event
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        eventName,
        eventDescription,
        date,
        numberOfGuests,
        location,
        organizationId,
        organizationName,
        providers,
      },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ msg: "Event not found." });
    }

    return res.status(200).json({ msg: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error("Event update error:", error);
    return res.status(500).json({ msg: "Server error while updating event." });
  }
});


// DELETE an event and its related invites
router.delete("/events/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;

    // Delete the event
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Delete all related invites
    await EventInvite.deleteMany({ eventId });

    res.status(200).json({ msg: "Event and related invites deleted successfully" });
  } catch (error) {
    console.error("Delete Event Error:", error);
    res.status(500).json({ msg: "Server error while deleting event" });
  }
});


module.exports = router;
