const express = require('express');
const multer = require('multer');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const TransportationProvider = require('../models/TransportationProvider');
const Vendor = require('../models/Vendor');
const GuestSpeaker = require('../models/GuestSpeaker');
require('dotenv').config();

// Configure Multer for File Upload (In-Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// GET: Retrieve Portfolio by ID (Works for GuestSpeaker, Vendor, and TransportationProvider)
router.get('/:id', async (req, res) => {
  try {
    const entityId = req.params.id;

    // Find the correct entity in any collection
    let entity = await GuestSpeaker.findById(entityId) ||
                 await Vendor.findById(entityId) ||
                 await TransportationProvider.findById(entityId);

    if (!entity) {
      return res.status(404).json({ msg: "Entity not found in any collection" });
    }

    res.json(entity.Portfolio);
  } catch (error) {
    console.error('Portfolio Fetch Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Unified PUT Route for Portfolio Updates (Automatically Detects Entity Type)
router.put('/:id', async (req, res) => {
    try {
        const { Type, Description } = req.body;
        const entityId = req.params.id;

        // Find the correct entity in any collection
        let entity = await Vendor.findById(entityId) || 
                     await GuestSpeaker.findById(entityId) || 
                     await TransportationProvider.findById(entityId);

        if (!entity) {
            return res.status(404).json({ msg: "Entity not found in any collection" });
        }

        // Perform the update
        const updatedEntity = await entity.constructor.findByIdAndUpdate(
            entityId,
            { $set: { "Portfolio.Type": Type, "Portfolio.Description": Description } },
            { new: true, runValidators: true }
        );

        res.json(updatedEntity);
    } catch (error) {
        console.error(' Portfolio Update Error:', error);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Upload Media to Cloudinary & Save to Portfolio
router.post('/upload/:id', upload.single('media'), async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    console.log(`Uploading file for ID: ${id}`);

    // Upload file to Cloudinary
    cloudinary.uploader.upload_stream({ resource_type: "auto" }, async (error, uploadedFile) => {
      if (error) {
        console.error("Cloudinary Upload Error:", error);
        return res.status(500).json({ msg: "Cloudinary upload failed", error });
      }

      console.log("File Uploaded:", uploadedFile.secure_url);

      // Find the correct entity
      let entity = await Vendor.findById(id) || 
                   await GuestSpeaker.findById(id) || 
                   await TransportationProvider.findById(id);

      if (!entity) {
        return res.status(404).json({ msg: "Entity not found in any collection" });
      }

      // Add media to Portfolio
      const updatedEntity = await entity.constructor.findByIdAndUpdate(
          id,
          { $push: { "Portfolio.PastWorkMedia": uploadedFile.secure_url } }, // Push new media to array
          { new: true }
      );

      res.json({
        msg: "Media uploaded successfully",
        mediaUrl: uploadedFile.secure_url,
        updatedEntity,
      });
    }).end(file.buffer);

  } catch (error) {
    console.error("Upload Route Error:", error);
    res.status(500).json({ msg: "Server Error", error });
  }
});

module.exports = router;
