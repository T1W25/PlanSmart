require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

//Serve static files (for accessing uploaded files)
app.use("/uploads", express.static('uploads'));

//Setup Multer Storage for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  },
});

const upload = multer({ storage });

// Upload Route
app.post("/api/upload", upload.single("media"), (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No file uploaded" });
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Portfolio Routes
const guestSpeakerRoutes = require('./routes/GuestSpeakerRoutes');
const vendorRoutes = require('./routes/VendorRoutes');
const transportationProviderRoutes = require('./routes/transportationProviderRoutes');
const portfolioRoutes = require('./routes/PortfolioRoutes');
const OrganizationRoutes = require('./routes/OrganizationRoutes');

// Use Routes
app.use('/api/guest-speakers', guestSpeakerRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/transportation-providers', transportationProviderRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/organization', OrganizationRoutes);

// Server Start
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
