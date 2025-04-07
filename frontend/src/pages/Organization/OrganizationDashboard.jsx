import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { getUser } from "../../utils/auth";

const OrganizationDashboard = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    Name: "",
    Email: "",
    Industry: "",
    Address: "",
    Description: "",
    Password: "",
    AmountSpent: 0,
    isVerified: false,
  });
  const [loading, setLoading] = useState(true);

  const user = getUser();
  const orgId = user?.organizationID;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/organization/${orgId}`);
        setProfileData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching org:", err);
      }
    };
    if (orgId) fetchProfile();
  }, [orgId]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const dataToSend = { ...profileData };
  if (!profileData.Password || profileData.Password.trim() === "") {
    delete dataToSend.Password;
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await axios.put(`http://localhost:5050/api/organization/${orgId}`, profileData);
      setProfileData(updated.data);
      setIsEditMode(false);
      alert("Profile Updated");
    } catch (err) {
      console.error("Failed to update:", err);
      alert("Update failed");
    }
  };

  if (loading) return <div className="pt-24 text-center">Loading organization profile...</div>;

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-5xl mx-auto pt-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Organization Profile</h2>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="text-sm text-white bg-gray-800 px-4 py-1.5 rounded cursor-pointer"
          >
            {isEditMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          {/* Profile Image */}
          <div className="flex flex-col items-center space-y-2">
            <img
              src="https://res.cloudinary.com/demo/image/upload/sample.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button
              type="button"
              className="bg-black text-xs text-white px-2 py-1 rounded cursor-pointer"
            >
              Change Picture
            </button>
          </div>

          {/* Labeled Fields */}
          {["Name", "Email", "Industry", "Address"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
              <input
                name={field}
                value={profileData[field]}
                onChange={handleProfileChange}
                disabled={!isEditMode}
                className={`w-full border p-2 rounded ${!isEditMode ? "bg-gray-100 text-gray-700" : ""}`}
              />
            </div>
          ))}

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="Description"
              value={profileData.Description}
              onChange={handleProfileChange}
              disabled={!isEditMode}
              rows={5}
              className={`w-full border p-2 rounded resize-none ${
                !isEditMode ? "bg-gray-100 text-gray-700" : ""
              }`}
            />
          </div>

          {/* Amount Spent */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Amount Spent
            </label>
            <div className="border p-2 rounded bg-gray-100 text-gray-800">
              ${profileData.AmountSpent?.toFixed(2) || 0}
            </div>
          </div>

          {/* Bottom Action Buttons */}
          {isEditMode ? (
            <div className="flex space-x-4">
              <button type="submit" className="bg-black text-white px-6 py-2 rounded cursor-pointer">
                Save Changes
              </button>
              <button type="button" className="bg-green-600 text-white px-6 py-2 rounded cursor-pointer">
                Verify Your Profile
              </button>
            </div>
          ) : (
            <span
              className={`px-4 py-1 text-sm font-semibold rounded ${
                profileData.isVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {profileData.isVerified ? "Verified" : "Not Verified"}
            </span>
          )}
        </form>
      </div>
    </>
  );
};

export default OrganizationDashboard;
