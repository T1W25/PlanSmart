import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

const OrganizationDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    Name: "",
    Email: "",
    Industry: "",
    Address: "",
    Password: "",
  });

  const [providers, setProviders] = useState([]);

  useEffect(() => {
    // Fetch all providers
    if (activeTab === "providers") {
      Promise.all([
        axios.get("http://localhost:5050/api/vendors"),
        axios.get("http://localhost:5050/api/guest-speakers"),
        axios.get("http://localhost:5050/api/transportation-providers"),
      ])
        .then(([vendors, speakers, transporters]) => {
          setProviders([
            ...vendors.data,
            ...speakers.data,
            ...transporters.data,
          ]);
        })
        .catch((err) => console.error("Error fetching providers:", err));
    }
  }, [activeTab]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated (not connected to backend yet)");
  };

  const handleEventCreate = (e) => {
    e.preventDefault();
    alert("Event created (not connected to backend yet)");
  };

  return (
    <>
    <Navbar/>
    <div className="p-8 max-w-5xl mx-auto pt-20">
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 border-b pb-2">
        {["profile", "event", "providers"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-md ${
              activeTab === tab
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {tab === "profile"
              ? "Edit Profile"
              : tab === "event"
              ? "Create Event"
              : "All Providers"}
          </button>
        ))}
      </div>

      {/* Edit Profile Tab */}
      {activeTab === "profile" && (
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <input
            name="Name"
            placeholder="Organization Name"
            value={profileData.Name}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="Email"
            placeholder="Email"
            value={profileData.Email}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="Industry"
            placeholder="Industry"
            value={profileData.Industry}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="Address"
            placeholder="Address"
            value={profileData.Address}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="Password"
            type="password"
            placeholder="Change Password"
            value={profileData.Password}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded"
          />
          <button type="submit" className="bg-black text-white px-6 py-2 rounded">
            Save Changes
          </button>
        </form>
      )}

      {/* Create Event Tab */}
      {activeTab === "event" && (
        <form onSubmit={handleEventCreate} className="space-y-4">
          <input placeholder="Event Name" className="w-full border p-2 rounded" />
          <input placeholder="Location" className="w-full border p-2 rounded" />
          <input type="date" className="w-full border p-2 rounded" />
          <input placeholder="Number of Guests" className="w-full border p-2 rounded" />
          <textarea placeholder="Event Details" className="w-full border p-2 rounded" />
          <button type="submit" className="bg-black text-white px-6 py-2 rounded">
            Create Event
          </button>
        </form>
      )}

      {/* Providers Tab */}
      {activeTab === "providers" && (
        <div className="space-y-4">
          {providers.length === 0 ? (
            <p>No providers found.</p>
          ) : (
            providers.map((p) => (
              <div key={p._id} className="border p-4 rounded">
                <p className="font-bold">{p.Name}</p>
                <p className="text-sm text-gray-600">{p.Email}</p>
                <p className="text-sm">{p.ProviderType}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default OrganizationDashboard;
