# 🔁 Routes Documentation

This document describes the API routes used in the **Plansmart** backend to manage different types of users—**Vendors**, **Guest Speakers**, and **Transportation Providers**—along with their associated portfolio media.

The backend follows a RESTful structure, where each entity (vendor, guest speaker, transportation provider) has dedicated endpoints for `GET`, `POST`, `PUT`, and `DELETE` actions. Additionally, media management (uploading and deleting files like images and videos) is handled through integration with **Cloudinary**, and file parsing is managed using **Multer** middleware.

Each entity has its own router for managing profiles, and there's a shared router for handling portfolio updates and media uploads. This structure allows efficient code reuse and cleaner API logic.

---

## 👤 Guest Speaker Routes

These routes manage guest speaker profiles.

- **GET `/api/guest-speakers/`**  
  Fetch all guest speaker profiles.

- **POST `/api/guest-speakers/`**  
  Create a new guest speaker profile using data sent in the request body.

- **PUT `/api/guest-speakers/:id`**  
  Update the guest speaker profile with the given ID.

- **DELETE `/api/guest-speakers/:id`**  
  Remove a guest speaker profile by ID.

---

## 🏪 Vendor Routes

These routes handle CRUD operations for vendor profiles.

- **GET `/api/vendors/`**  
  Retrieve all vendor profiles.

- **POST `/api/vendors/`**  
  Create a new vendor profile.

- **PUT `/api/vendors/:id`**  
  Update a vendor profile using the provided ID and request body.

- **DELETE `/api/vendors/:id`**  
  Delete a vendor from the system using their ID.

---

## 🚐 Transportation Provider Routes

These routes manage transportation provider profiles.

- **GET `/api/transportation-providers/`**  
  Fetch all transportation provider profiles.

- **GET `/api/transportation-providers/:id`**  
  Retrieve a single transportation provider by ID.

- **POST `/api/transportation-providers/`**  
  Create a new transportation provider profile.

- **PUT `/api/transportation-providers/:id`**  
  Update an existing transportation provider profile.

- **DELETE `/api/transportation-providers/:id`**  
  Remove a transportation provider from the system.

---

## 🖼 Portfolio Routes (Unified Media Management)

These routes manage portfolio updates and media uploads across all provider types (Vendor, Guest Speaker, Transportation Provider).

- **GET `/api/portfolio/:id`**  
  Retrieve the portfolio of any provider by ID. The route auto-detects whether the ID belongs to a vendor, guest speaker, or transportation provider.

- **PUT `/api/portfolio/:id`**  
  Update the `Type` and `Description` fields of the provider’s portfolio.

- **POST `/api/portfolio/upload/:id`**  
  Upload an image or video to the provider’s portfolio. The file is resized (800x600) and stored in Cloudinary. The secure URL is saved to the `PastWorkMedia` array in the portfolio.

- **DELETE `/api/portfolio/media/:id`**  
  Remove a specific media file from both Cloudinary and the provider’s portfolio based on the media URL provided in the request body. This supports both images and video formats.

---

These routes make the platform flexible and scalable by enabling seamless CRUD operations across different provider types and centralizing portfolio/media management logic.