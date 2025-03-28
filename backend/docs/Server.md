# 🖥️ Server Setup & Responsibilities

This file explains the purpose and internal structure of the main backend server in the Plansmart application. The server acts as the central hub that connects the database, enables communication between frontend and backend, handles media uploads, and manages all routes for the various user types.

The setup ensures scalability and maintainability by separating concerns into route files and middleware, while integrating essential features like file uploads, static hosting, and cross-origin access.

---

## 🔌 Core Responsibilities

The Express server handles the following:

- Loads `.env` variables securely using `dotenv`
- Connects to MongoDB via a reusable config file
- Applies essential middleware for JSON parsing and CORS
- Handles local file uploads with `multer` (for testing or fallback)
- Hosts static files for accessing uploaded content
- Registers API routes for:
  - Guest Speakers
  - Vendors
  - Transportation Providers
  - Portfolios
- Starts the server on a configurable port

---

## 🧠 Server Logic Breakdown

### 1. Load Environment Variables and Required Modules

```js  
require('dotenv').config()  
const express = require('express')  
const multer = require('multer')  
const path = require('path')  
const cors = require('cors')  
const connectDB = require('./config/db')  

const app = express()
```
---

### 2. Connect to MongoDB

```js  
connectDB()
```
This calls the exported function from `config/db.js` to connect using the `MONGO_URI` environment variable.

---

### 3. Apply Middleware

```js  
app.use(express.json())  
app.use(cors())
```
- `express.json()` parses incoming JSON payloads  
- `cors()` allows frontend apps on different origins (like localhost:5173) to communicate with the backend

---

### 4. Serve Static Files

```js  
app.use("/uploads", express.static('uploads'))
```
This line exposes the `uploads/` directory publicly so that users can access uploaded images or media.

---

### 5. Configure Multer for File Uploads

```js  
const storage = multer.diskStorage({  
  destination: (req, file, cb) => cb(null, "uploads/"),  
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))  
})  

const upload = multer({ storage })
```
Multer is configured to:

- Save uploaded files to the `uploads/` folder  
- Rename each file with a timestamp and original extension

---

### 6. Create File Upload Endpoint

```js  
app.post("/api/upload", upload.single("media"), (req, res) => {  
  if (!req.file) return res.status(400).json({ msg: "No file uploaded" })  
  res.json({ filePath: `/uploads/${req.file.filename}` })  
})
```
This endpoint handles single media file uploads, stores them locally, and returns the accessible path.

---

### 7. Import and Use Route Files

```js  
const guestSpeakerRoutes = require('./routes/GuestSpeakerRoutes')  
const vendorRoutes = require('./routes/VendorRoutes')  
const transportationProviderRoutes = require('./routes/transportationProviderRoutes')  
const portfolioRoutes = require('./routes/PortfolioRoutes')  

app.use('/api/guest-speakers', guestSpeakerRoutes)  
app.use('/api/vendors', vendorRoutes)  
app.use('/api/transportation-providers', transportationProviderRoutes)  
app.use('/api/portfolio', portfolioRoutes)
```
Each route module manages its specific logic and connects models to controller actions.

---

### 8. Start the Server

```js  
const PORT = process.env.PORT || 5050  
app.listen(PORT, () => {  
  console.log(`✅ Server running on port ${PORT}`)  
})
```