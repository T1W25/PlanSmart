import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar.jsx";
import { getUser } from "../../utils/auth";


const ProfileView = () => {
  const authUser = getUser();
  const userId = authUser?.providerID;
  const providerType = authUser?.providerType;

  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    isVerified: false,
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
        setUserData({
          Name,
          Email,
          Phone,
          isVerified,
          ProfileImage: Portfolio?.ImageUrl || "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        });
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [userId, providerType]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-white pt-20 px-4">
        {/* Profile Image */}
        <div className="mt-6 flex flex-col items-center">
          <img
            src={userData.ProfileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="w-full max-w-md mt-10 space-y-6">
          <div>
            <p className="text-sm font-medium mb-1">Full Name</p>
            <div className="border rounded-md px-4 py-2 bg-gray-100">{userData.Name}</div>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Email Address</p>
            <div className="border rounded-md px-4 py-2 bg-gray-100">{userData.Email}</div>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Phone Number</p>
            <div className="border rounded-md px-4 py-2 bg-gray-100">{userData.Phone}</div>
          </div>

          {/* Verification Status */}
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-md text-xs font-semibold ${userData.isVerified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} mb-10`}>
              {userData.isVerified ? "Verified Profile" : "Not Verified"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileView;
