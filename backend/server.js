require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect DB (optional skip during test)
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static('uploads'));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Upload route
app.post("/api/upload", upload.single("media"), (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No file uploaded" });
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Route imports
const guestSpeakerRoutes = require('./routes/GuestSpeakerRoutes');
const vendorRoutes = require('./routes/VendorRoutes');
const transportationProviderRoutes = require('./routes/transportationProviderRoutes');
const portfolioRoutes = require('./routes/PortfolioRoutes');
const organizationRoutes = require('./routes/OrganizationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');


// Add your new routes here 👇
const bookingRoutes = require('./routes/booking');
const registerRoutes = require('./routes/register'); //New

const bookingStatusRoutes = require('./routes/bookingStatusRoutes');

const signInRoutes = require('./routes/signIn');
const eventInvites = require('./routes/eventInvites')

const adminRoutes = require('./routes/adminRoutes');



// Route usage
app.use('/api/guest-speakers', guestSpeakerRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/transportation-providers', transportationProviderRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/api/signin', signInRoutes);
app.use('/api/reviews', reviewRoutes);


// Register new routes here 👇
app.use('/api/booking', bookingRoutes);
app.use('/api/register', registerRoutes); // New
app.use('/api/booking', bookingStatusRoutes);
app.use('/api/event-invites',eventInvites);
app.use('/api/admin', adminRoutes);


// Export app for testing
module.exports = app;

// Start server only if not testing
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}
