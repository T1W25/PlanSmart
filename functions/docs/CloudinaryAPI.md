# ☁️ Cloudinary API & Media Handling

This document covers the backend logic for uploading, storing, updating, and deleting media content (images and videos) in the **Plansmart** web application. The media files are primarily part of user portfolios and are uploaded through the unified portfolio API, which is shared across **vendors**, **guest speakers**, and **transportation providers**.

Cloudinary is used as the external media storage and management service, while Multer handles incoming file uploads. This integration supports in-memory file handling, auto-resizing, and media transformation during upload.

The routes auto-detect which collection (Vendor, GuestSpeaker, or TransportationProvider) the request is targeting based on the ID, ensuring flexibility and reduced duplication.

---

## ✅ Multer Setup

- **In-memory storage** is used, meaning files are not saved to disk but processed directly in memory before being uploaded to Cloudinary.
- Only one file is accepted at a time using `upload.single('media')`.

---

## ✅ Cloudinary Configuration

Cloudinary is configured using environment variables:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

These are securely stored in a `.env` file and loaded using `dotenv`.

---

## 📥 POST `/api/portfolio/upload/:id`

**Purpose:** Upload an image or video to the portfolio of a vendor, guest speaker, or transportation provider.

- Accepts a file via `multipart/form-data`.
- Uploads the file to the `portfolios/` folder in Cloudinary.
- Automatically resizes the image or video to 800x600 using transformation.
- Appends the `secure_url` of the uploaded media to the `PastWorkMedia` array in the relevant portfolio.

**Response:**  
A success message with the media URL and updated entity document.

---

## ✏️ PUT `/api/portfolio/:id`

**Purpose:** Update the `Type` and `Description` fields of the portfolio for any entity.

- Uses the ID to detect which collection the user belongs to.
- Updates only the nested fields within the portfolio.
- Supports validation and returns the updated entity.

**Response:**  
Confirmation message with the updated entity.

---

## 📤 GET `/api/portfolio/:id`

**Purpose:** Retrieve the full portfolio of a user by ID.

- Automatically detects if the ID belongs to a Vendor, Guest Speaker, or Transportation Provider.
- Returns only the `Portfolio` section of the document.

---

## 🗑 DELETE `/api/portfolio/media/:id`

**Purpose:** Delete a specific media file from both Cloudinary and the database.

- Requires the `mediaUrl` to be passed in the request body.
- Extracts the public ID from the Cloudinary URL.
- Automatically detects if the file is an image or video.
- Deletes the file from Cloudinary using the appropriate `resource_type`.
- Removes the media URL from the `PastWorkMedia` array in the portfolio.

**Response:**  
Confirmation message with the updated entity document.

---

## ✅ Summary

This Cloudinary API implementation ensures:

- **Seamless media upload** with resizing and secure cloud storage
- **Flexible entity detection**, reducing code duplication
- **Clean deletion** of media from both Cloudinary and the database
- **Secure configuration** using environment variables
- **User-focused** design by abstracting complexity behind consistent routes

This structure keeps media handling centralized, scalable, and maintainable across all user types.
