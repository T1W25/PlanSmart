const express = require('express');
const router = express.Router();
const EventInvite = require('../models/EventInvite'); // rename if needed to match model name

// Create multiple invites
router.post("/", async (req, res) => {
    try {
      const { invites } = req.body;
      if (!Array.isArray(invites) || invites.length === 0) {
        return res.status(400).json({ msg: "No invites provided" });
      }
  
      const completeInvites = invites.map(invite => ({
        ...invite,
        status: "pending",
        lastUpdated: Date.now(),
      }));
  
      const saved = await EventInvite.insertMany(completeInvites);
      res.status(201).json({ msg: "Invites created", invites: saved });
    } catch (err) {
      console.error("Invite creation error:", err);
      res.status(500).json({ msg: "Server error" });
    }
  });

//Get all invites for a specific provider
router.get("/provider/:id", async (req, res) => {
  try {
    const providerId = req.params.id;
    const invites = await EventInvite.find({ providerId }).populate("eventId");

    if (!invites.length) {
      return res.status(404).json({ msg: "No invites found for this provider" });
    }

    res.status(200).json(invites);
  } catch (error) {
    console.error("Fetch Provider Invites Error:", error);
    res.status(500).json({ msg: "Server error while fetching invites" });
  }
});

//Update the status (accepted/rejected) of an invite
router.put("/:id/status", async (req, res) => {
  try {
    const { status, notes } = req.body;

    const updatedInvite = await EventInvite.findByIdAndUpdate(
      req.params.id,
      {
        status,
        notes,
        lastUpdated: Date.now()
      },
      { new: true }
    );

    if (!updatedInvite) {
      return res.status(404).json({ msg: "Invite not found" });
    }

    res.status(200).json({ msg: "Invite updated", invite: updatedInvite });
  } catch (error) {
    console.error("Update Invite Status Error:", error);
    res.status(500).json({ msg: "Server error while updating invite" });
  }
});


//Delete an event-invite to a provider
router.delete("/:inviteId", async (req, res) => {
    const { inviteId } = req.params;
  
    try {
      const deleted = await EventInvite.findByIdAndDelete(inviteId);
      if (!deleted) {
        return res.status(404).json({ msg: "Invite not found" });
      }
  
      res.status(200).json({ msg: "Provider invite removed successfully" });
    } catch (error) {
      console.error("Delete provider invite error:", error);
      res.status(500).json({ msg: "Server error" });
    }
  });
  

module.exports = router;
