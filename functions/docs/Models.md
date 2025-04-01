# 🧩 Schema Documentation

This document outlines the data models used in the **Plansmart** application. All major user types—**Guest Speaker**, **Vendor**, and **Transportation Provider**—share a unified structure supported by reusable schemas like **Portfolio** and **ClientReview**.

---

## 🔗 Schema Relationships Overview

The `GuestSpeaker`, `Vendor`, and `TransportationProvider` schemas share a common structure and are interrelated through the `Portfolio` and `ClientReview` schemas.

### Portfolio Integration

Each major entity includes a **Portfolio** field that enables them to showcase past work, media content, awards, and descriptions of their services. This field is based on the shared `PortfolioSchema`.

### Client Reviews Association

Each provider can receive multiple reviews from clients. These are stored as an array of entries using the `ClientReviewSchema`, allowing the system to dynamically calculate and display a provider’s average rating.

### Shared Structure

All provider schemas share the following core fields:

- **Name**
- **Email**
- **Phone**
- **Password**
- **isVerified** (Boolean flag for identity verification)
- **Portfolio** (work showcase)
- **Reviews** (array of client feedback)
- **Rating** (auto-calculated average score)
- **ProfilePhoto**

This consistency promotes maintainability and scalability as new user types are added.

---

## 👤 Guest Speaker Schema

The Guest Speaker schema defines professional speakers registered on the platform. It includes personal information, portfolio content, profile photo, and reviews from clients.

**Key Features:**

- Passwords are securely hashed before storage.
- When saving, the system checks for any new reviews and recalculates the average rating.

---

## 🧾 Client Review Schema

This schema is embedded in all provider types to capture reviews submitted by clients.

| Field        | Type    | Required | Description                        |
|--------------|---------|----------|------------------------------------|
| clientName   | String  | No       | Name of the reviewer               |
| rating       | Number  | No       | Star rating between 1 and 5        |
| reviewText   | String  | No       | Content of the review              |
| date         | Date    | No       | Automatically set to current date  |

---

## 🚐 Transportation Provider Schema

The schema for transportation service providers mirrors the Guest Speaker schema but with a different `ProviderType` designation.

**Main Characteristics:**

- Includes the same fields: contact info, password, portfolio, profile photo, reviews, and rating.
- Designed for drivers or transport vendors offering mobility services.

---

## 🏪 Vendor Schema

The Vendor schema defines users offering event-related services such as catering, decoration, equipment rentals, etc.

**Structure:**

- Nearly identical to Guest Speaker schema
- Includes pre-save logic for:
  - **Password hashing**
  - **Average rating calculation**

---

## 🗂 Portfolio Schema

The Portfolio schema is used across all provider types to describe their work.

| Field           | Type   | Description                                     |
|------------------|--------|-------------------------------------------------|
| Type             | String | Category or specialization                     |
| Description      | String | Narrative about their services and experience  |
| PastWorkMedia    | String | Cloudinary Link to media showcasing their past projects   |
| Awards           | String | Recognition, honors, or certifications         |

This schema supports rich content display on provider profiles.

---

## ✅ Summary

The Plansmart schema system emphasizes:

- **Reusability** through shared components like Portfolio and Reviews  
- **Security** by encrypting sensitive data such as passwords  
- **Modularity** to support easy updates and role extensions  
- **Data Consistency** for simpler management and querying  

This model foundation ensures the platform remains robust, extensible, and easy to maintain as new features and user roles are introduced.
