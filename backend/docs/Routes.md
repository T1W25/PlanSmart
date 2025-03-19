# API Routes Documentation

This API manages **Guest Speakers, Transportation Providers, and Vendors**, allowing **CRUD (Create, Read, Update, Delete) operations**. Each entity follows a **consistent structure** for managing profiles and portfolios. The API ensures **efficient data retrieval, modification, and deletion**, with **built-in error handling** to manage unexpected failures.

---

## Endpoints Overview

| Method | Route              | Description                     |
|--------|-------------------|---------------------------------|
| GET    | `/`               | Retrieve all profiles          |
| POST   | `/`               | Create a new profile           |
| PUT    | `/:id`            | Update a profile by ID         |
| PUT    | `/portfolio/:id`  | Update only portfolio details  |
| DELETE | `/:id`            | Delete a profile by ID         |

---

## Guest Speaker Routes

**Base URL:** `/api/guest-speakers`

| Method | Route             | Description                                  |
|--------|------------------|----------------------------------------------|
| GET    | `/`              | Fetch all guest speaker profiles.           |
| POST   | `/`              | Create a new guest speaker profile.         |
| PUT    | `/:id`           | Update guest speaker details.               |
| PUT    | `/portfolio/:id` | Update portfolio details only (Type, Description). |
| DELETE | `/:id`           | Remove a guest speaker profile.             |

---

## Transportation Provider Routes

**Base URL:** `/api/transportation-providers`

| Method | Route             | Description                                  |
|--------|------------------|----------------------------------------------|
| GET    | `/`              | Fetch all transportation provider profiles. |
| POST   | `/`              | Create a new transportation provider profile. |
| PUT    | `/:id`           | Update transportation provider details.     |
| PUT    | `/portfolio/:id` | Update portfolio details only.              |
| DELETE | `/:id`           | Remove a transportation provider profile.   |

---

## Vendor Routes

**Base URL:** `/api/vendors`

| Method | Route             | Description                       |
|--------|------------------|-----------------------------------|
| GET    | `/`              | Fetch all vendor profiles.       |
| POST   | `/`              | Create a new vendor profile.     |
| PUT    | `/:id`           | Update vendor details.           |
| PUT    | `/portfolio/:id` | Update portfolio details only.   |
| DELETE | `/:id`           | Remove a vendor profile.         |

---

## Error Handling

Each route includes **error handling** to manage:

- **500 - Server Error:** Handles unexpected server issues.
- **404 - Not Found:** Returned when a requested resource is not found.

---

This documentation provides a structured overview of the API routes.
