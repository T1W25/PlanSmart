import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { getUser } from "../../utils/auth";
import AvailabilityToggle from "../../components/providerComponents/AvailabilityToggle"; // Adjust the path as needed

const ProfileEdit = () => {
  const authUser = getUser();
  const userId = authUser?.providerID;
  const providerType = authUser?.providerType;


  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
    isVerified: false,
    isAvailable: false,
    ProfileImage: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  });

  useEffect(() => {
    if (!userId || !providerType) return;

  const baseUrlMap = {
    "Transportation Provider": "transportation-providers",
    "Vendor": "vendors",
    "Guest Speaker": "guest-speakers"
  };

  const route = baseUrlMap[providerType];
  if (!route) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/${route}/${userId}`)
      .then((res) => {
        const { Name, Email, Phone, isVerified, Portfolio } = res.data;
        setFormData({
          Name,
          Email,
          Phone,
          Password: "",
          isVerified,
          isAvailable: res.data.isAvailable || false, // if available in your response
          ProfileImage:
            Portfolio?.ImageUrl ||
            "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        });
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [userId,providerType]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!userId || !providerType) return;

  const baseUrlMap = {
    "Transportation Provider": "transportation-providers",
    "Vendor": "vendors",
    "Guest Speaker": "guest-speakers"
  };

  const route = baseUrlMap[providerType];
  if (!route) return;
    try {
      const payload = {
        Name: formData.Name,
        Email: formData.Email,
        Phone: formData.Phone,
        isAvailable: formData.isAvailable,
      };

      if (formData.Password.trim()) {
        payload.Password = formData.Password;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/${route}/${userId}`,
        payload
      );
      console.log("Profile updated:", response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-white pt-20 px-4">
        <div className="mt-6 flex flex-col items-center">
          <img
            src={formData.ProfileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <button
            className="mt-2 text-xs text-white bg-black px-3 py-1 rounded-md 
                       hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 cursor-pointer"
          >
            Change Picture
          </button>
        </div>

        <div className="w-full max-w-md mt-10 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              name="Name"
              type="text"
              value={formData.Name}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              name="Email"
              type="email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              name="Phone"
              type="tel"
              value={formData.Phone}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <AvailabilityToggle
              checked={formData.isAvailable}
              onChange={() =>
                setFormData({
                  ...formData,
                  isAvailable: !formData.isAvailable,
                })
              }
            />
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="bg-black text-white px-4 py-2 rounded-md text-xs cursor-pointer
                     hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
            >
              Verify Profile
            </button>
            <span className="text-gray-400 text-sm">
              {formData.isVerified
                ? "This Profile is verified"
                : "This Profile has not been verified"}
            </span>
          </div>

          <div className="flex justify-end pb-20">
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-6 py-2 rounded-md text-xs cursor-pointer
                       hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;