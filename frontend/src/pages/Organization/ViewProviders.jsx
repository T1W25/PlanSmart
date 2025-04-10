import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import ProviderList from "../../components/orgComponents/ProviderList.jsx";

const ViewProviders = () => {
  const [activeTab, setActiveTab] = useState("vendors");
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    let endpoint = "";
    switch (activeTab) {
      case "vendors":
        endpoint = "vendors";
        break;
      case "transport":
        endpoint = "transportation-providers";
        break;
      case "speakers":
        endpoint = "guest-speakers";
        break;
      default:
        return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/${endpoint}`)
      .then((res) => 
        setProviders(res.data))
      .catch((err) => console.error("Error fetching providers:", err));
  }, [activeTab]);

  return (
    <>
      <Navbar />
      <div className="p-8 pt-24 max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b pb-2">
          <button
            onClick={() => setActiveTab("vendors")}
            className={`px-4 py-2 cursor-pointer rounded-t-md ${
              activeTab === "vendors"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Vendors
          </button>
          <button
            onClick={() => setActiveTab("transport")}
            className={`px-4 py-2 cursor-pointer rounded-t-md ${
              activeTab === "transport"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Transportation Providers
          </button>
          <button
            onClick={() => setActiveTab("speakers")}
            className={`px-4 py-2 cursor-pointer rounded-t-md ${
              activeTab === "speakers"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Guest Speakers
          </button>
        </div>

        {/* Providers List */}
        <ProviderList providers={providers} />
      </div>
    </>
  );
};

export default ViewProviders;