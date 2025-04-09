# 📘 Plansmart MERN Project Overview

This document provides a general overview of the technologies and structure used in the **Plansmart** web application. It is intended to guide contributors on the core stack and layout of the project during development.

---

## A Little Bit About Our Project

Plansmart is a full-stack web application built using the MERN stack—MongoDB, Express.js, React.js, and Node.js. The goal of this project is to create a platform that supports profile and portfolio management for different categories of users such as vendors, guest speakers, and transportation providers. Each user can register, log in, edit their profile, upload images or videos to showcase their work, and receive reviews and ratings from clients.

On the backend, Node.js and Express.js power the API endpoints that handle authentication, profile updates, portfolio uploads, and data management. MongoDB Atlas serves as the cloud database, while Mongoose is used to define and interact with schema models. Cloudinary is integrated to manage media uploads efficiently, and multer handles file parsing for those uploads.

The frontend is built with React and styled using Tailwind CSS, providing a responsive and intuitive user interface. Components like navigation bars, portfolio cards, and profile forms are modular and reusable, ensuring consistency across pages. Axios is used to send and receive data from the backend APIs, and React Router DOM handles page navigation. Users can interact with the dashboard, view their profiles, edit their information, and manage their portfolios all within a clean, seamless experience.

Together, the backend and frontend communicate effectively through RESTful APIs. This modular architecture allows different developers to work on separate sections of the app with minimal conflict. The structure also supports scalability, making it easier to add new features and support more user roles in the future.

---
## 🚀 Setup Instructions

To get started with the project locally, follow these steps:

---

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/plansmart.git
cd plansmart
```

### 2. Install Dependencies

**For the backend:**
```bash
cd backend
npm install.
```

**For the frontend:**
```bash
cd frontend
npm install
```


---

### 3. Configure Environment Variables

In both the `backend/` and `frontend/` folders, create a `.env` file and populate it with the necessary keys.

**Backend:** Refer to `config.md` for required variables like:

- `MONGO_URI`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

**Frontend:** Set the following:

- `VITE_API_URL=http://localhost:5000`

---

### 4. Start the Application

Open **two terminals** to run the backend and frontend simultaneously.

**Backend (usually on port 5050):**
```bash
cd backend
npm run dev
```
```bash
cd frontend
npm run dev
```


---

✅ **The application should now be running locally:**

- Frontend: [http://localhost:5173](http://localhost:5173)  
- Backend API: [${import.meta.env.VITE_API_URL}](${import.meta.env.VITE_API_URL})


---

## ⚙️ Technologies Used

### 🔧 Backend (Node.js + Express + MongoDB)

- **Node.js** – JavaScript runtime for building scalable backend services.  
- **Express.js** – Minimal and flexible Node.js web framework for building APIs.  
- **MongoDB Atlas** – Cloud-hosted NoSQL database solution.  
- **Mongoose** – ODM (Object Document Mapper) for defining schemas and interacting with MongoDB.  
- **Cloudinary** – Cloud-based media management for image and video uploads.  
- **multer** – Middleware for handling multipart/form-data for media uploads.  

### 🎨 Frontend (React + Tailwind CSS)

- **React.js** – Library for building interactive UIs using reusable components.  
- **Tailwind CSS** – Utility-first CSS framework for rapid UI development.  
- **Axios** – Promise-based HTTP client used for making API calls from React to the backend.  
- **React Router DOM** – Handles routing and navigation between pages.  

---

## 🗂 Folder Structure

### 📁 backend/

- **config/**: Contains configuration files (e.g., database connection, Cloudinary config).  
- **models/**: Mongoose schema definitions for different entities like Vendor, Guest Speaker, etc.  
- **routes/**: Express route handlers for different API functionalities.  
- **docs/**: Markdown documentation related to models, routes, and developer notes.  
- **.env**: Stores sensitive environment variables like MongoDB URI and Cloudinary credentials.  
- **server.js**: Entry point for starting the backend server.  

### 📁 frontend/

- **src/assets/**: Static assets like icons or images.  
- **src/components/**: Reusable UI components such as Navbar, PortfolioCard, etc.  
- **src/pages/**: Main pages such as Dashboard, PortfolioEditor, and ProfileEdit.  
- **src/routes/**: Centralized routing setup using React Router.  
- **App.jsx**: Root component for rendering layout and route structure.  
- **.env**: Environment configuration (e.g., backend API base URL).  

---
