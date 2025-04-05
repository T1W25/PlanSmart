import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, saveUser } from "../utils/auth";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";


function OrgLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

    // ✅ Redirect in useEffect
    useEffect(() => {
      if (isLoggedIn()) navigate("/orgdashboard");
    }, []);
  

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:5050/api/signin/org", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        
        localStorage.setItem("token", data.token);

        const userInfo = jwtDecode(data.token);
        saveUser(userInfo);

        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => navigate("/orgdashboard"), 1500);
        //Decode and save user info
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-20 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Event Planner Login
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => navigate("/pages/orgregister")}
            >
              Register here
            </button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            To login as a provider click {" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => navigate("/login")}
            >
             here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrgLogin;
