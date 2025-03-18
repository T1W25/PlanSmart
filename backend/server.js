require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Portfolio Routes
const guestSpeakerRoutes = require('./routes/GuestSpeakerRoutes');
const vendorRoutes = require('./routes/VendorRoutes');
const transportationProviderRoutes = require('./routes/transportationProviderRoutes');

// Use Routes
app.use('/api/guest-speakers', guestSpeakerRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/transportation-providers', transportationProviderRoutes);

// Server Start
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
