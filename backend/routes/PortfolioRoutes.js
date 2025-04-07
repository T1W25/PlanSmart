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
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET: Retrieve Portfolio by ID
router.get('/:id', async (req, res) => {
  try {
    const entityId = req.params.id;

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

// PUT: Update Portfolio (Auto-Detects Entity)
// Unified PUT Route for Portfolio Updates
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

      // Perform the update (Modify the nested Portfolio)
      const updatedEntity = await entity.constructor.findByIdAndUpdate(
          entityId,
          { 
            $set: { 
              "Portfolio.Type": Type, 
              "Portfolio.Description": Description 
            }
          },
          { new: true, runValidators: true }
      );

      res.json({ msg: "Portfolio updated successfully", updatedEntity });

  } catch (error) {
      console.error("Portfolio Update Error:", error);
      res.status(500).json({ msg: "Server Error" });
  }
});


//POST: Upload Media to Cloudinary & Save to Portfolio
router.post('/upload/:id', upload.single('media'), async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    console.log(`Uploading file for ID: ${id}`);

    // Upload file to Cloudinary with resizing
    cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "portfolios",
        transformation: [
          { width: 800, height: 600, crop: "limit" }, // Resize to 800x600
        ],
      },
      async (error, uploadedFile) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res.status(500).json({ msg: "Cloudinary upload failed", error });
        }

        console.log("File Uploaded:", uploadedFile.secure_url);

        let entity = await Vendor.findById(id) || 
                     await GuestSpeaker.findById(id) || 
                     await TransportationProvider.findById(id);

        if (!entity) {
          return res.status(404).json({ msg: "Entity not found in any collection" });
        }

        const updatedEntity = await entity.constructor.findByIdAndUpdate(
          id,
          { $push: { "Portfolio.PastWorkMedia": uploadedFile.secure_url } },
          { new: true }
        );

        res.json({
          msg: "Media uploaded successfully",
          mediaUrl: uploadedFile.secure_url,
          updatedEntity,
        });
      }
    ).end(file.buffer);

  } catch (error) {
    console.error("Upload Route Error:", error);
    res.status(500).json({ msg: "Server Error", error });
  }
});

// DELETE: Remove media from Cloudinary & Database
router.delete('/media/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { mediaUrl } = req.body;

    if (!mediaUrl) {
      return res.status(400).json({ msg: "Media URL is required" });
    }

    console.log(`🗑 Deleting media for ID: ${id}`);
    console.log("🧠 Media URL:", mediaUrl);

    // Extract public ID
    const urlParts = mediaUrl.split("/");
    const publicIdWithExtension = urlParts[urlParts.length - 1];
    const publicId = publicIdWithExtension.split(".")[0];

    console.log("🧠 Extracted Public ID:", publicId);

    // Detect media type
    const isVideo = mediaUrl.match(/\.(mp4|webm|ogg)$/i);

    //Delete from Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.destroy(
      `portfolios/${publicId}`,
      { resource_type: isVideo ? "video" : "image" }
    );

    console.log("Cloudinary Delete Response:", cloudinaryResponse);

    if (cloudinaryResponse.result !== "ok" && cloudinaryResponse.result !== "not found") {
      return res.status(500).json({ msg: "Failed to delete media from Cloudinary", cloudinaryResponse });
    }

    // Remove from DB
    let entity = await Vendor.findById(id) ||
                 await GuestSpeaker.findById(id) ||
                 await TransportationProvider.findById(id);

    if (!entity) {
      return res.status(404).json({ msg: "Entity not found in any collection" });
    }

    const updatedEntity = await entity.constructor.findByIdAndUpdate(
      id,
      { $pull: { "Portfolio.PastWorkMedia": mediaUrl } },
      { new: true }
    );

    res.json({
      msg: "Media deleted successfully",
      updatedEntity,
    });

  } catch (error) {
    console.error("Media Delete Error:", error.message);
    console.error(error.stack);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
});



module.exports = router;
