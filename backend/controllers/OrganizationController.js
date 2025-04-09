const { Organization, Spending } = require("../models/Organization"); // Import the Organization and Spending models

// Function to get an organization with spending records
const getOrganizationWithSpending = async (orgId) => {
  try {
    const organization = await Organization.findById(orgId).populate("SpendingRecords");
    console.log(organization);
    return organization;
  } catch (err) {
    console.error("Error fetching organization:", err);
    throw new Error("Error fetching organization");
  }
};

// Function to add a spending record to an organization
const addSpendingRecord = async (orgId, spendingData) => {
  try {
    // Check if organization exists first
    const organization = await Organization.findById(orgId);
    if (!organization) {
      console.log("Organization not found.");
      throw new Error("Organization not found");
    }

    // Inject the orgId into the spending record
    const spending = new Spending({
      ...spendingData,
      OrgID: orgId // ← Required now
    });

    await spending.save();

    // Add reference to organization
    organization.SpendingRecords.push(spending._id);
    await organization.save();

    console.log("Spending record added successfully.");
    return spending;
  } catch (err) {
    console.error("Error adding spending record:", err);
    throw new Error("Error adding spending record");
  }
};

module.exports = { getOrganizationWithSpending, addSpendingRecord };
