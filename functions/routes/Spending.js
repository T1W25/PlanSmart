const express = require("express");
const router = express.Router();
const { Organization, Spending } = require("./models/Organization");

// Route to add a spending record to an organization
router.post("/organization/:orgId/spending", async (req, res) => {
  try {
    const orgId = req.params.orgId;
    const { EventID, OrgID, AmountSpent, Date } = req.body;

    // Create a new spending record
    const spending = new Spending({ EventID, OrgID, AmountSpent, Date });
    await spending.save();

    // Find the organization and add the spending record to it
    const organization = await Organization.findById(orgId);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    organization.SpendingRecords.push(spending._id);
    await organization.save();

    res.status(201).json({ message: "Spending record added", spending });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
