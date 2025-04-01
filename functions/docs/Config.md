# ⚙️ Configuration & Environment Setup

This document describes the configuration files and environment variables required to run the **Plansmart** application backend. The setup ensures a secure, modular, and scalable environment for connecting to services like MongoDB, Cloudinary, and handling app-wide settings.

---

## 🛠 Project Configuration Structure

The configuration files are located in the `backend/config/` directory and typically include:

### `db.js` – Database Connection
Handles the MongoDB connection using `mongoose`.

- Loads the MongoDB URI from `.env`.
- Connects using async/await with error logging.
- Exports the connection to be used in `server.js`.

---

## 🧪 dotenv Configuration

Environment variables are managed securely using the `dotenv` package. These variables are defined in a `.env` file at the root of the `backend/` directory and loaded into the application at runtime.

Ensure `require('dotenv').config()` is called at the top of the main entry file (e.g., `server.js` or `db.js`).

---

## 🗃 Sample `.env` Variables

Below is a list of required environment variables used across the backend:

# MongoDB Connection
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/plansmart?retryWrites=true&w=majority

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Port (Test)
PORT=5050

## 🔗 MongoDB Integration

The application connects to **MongoDB Atlas** using the connection string defined in the `MONGO_URI` environment variable. The connection logic is typically handled in `config/db.js`.

**Key Notes:**

- `mongoose.connect()` is used with `async/await` for handling asynchronous connection logic.
- Success and failure of the connection are logged to the console.
- The connection is imported into `server.js` to initialize the database before the backend server starts.

**On successful connection, the app logs:**

## ☁️ Cloudinary Setup

Cloudinary handles all media uploads and storage across the Plansmart platform. The credentials are securely accessed from the `.env` file.

**Required credentials:**

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

**Cloudinary is configured globally like this:**

```js
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});