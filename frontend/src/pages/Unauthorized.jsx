// src/pages/Unauthorized.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Unauthorized = () => {
    const navigate = useNavigate();
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">🚫 Access Denied</h1>
      <p className="text-gray-700 mb-6 text-center">
        You do not have permission to view this page.
      </p>
    </div>
    </>
  );
};

export default Unauthorized;
