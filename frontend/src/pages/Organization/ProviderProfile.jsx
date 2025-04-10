import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";

const ProviderProfileView = () => {
  const { providerType, id } = useParams();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const normalized = providerType?.toLowerCase().replace(/\s/g, "-");
    const routeMap = {
      vendor: "vendors",
      vendors: "vendors",
      "guest-speaker": "guest-speakers",
      "guest-speakers": "guest-speakers",
      "transportation-provider": "transportation-providers",
      "transportation-providers": "transportation-providers"
    };

    const endpoint = routeMap[normalized];
    if (!endpoint || !id) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/${endpoint}/${id}`)
      .then((res) => setProvider(res.data))
      .catch((err) => {
        console.error("Failed to fetch provider:", err);
        setProvider(null);
      });
  }, [providerType, id]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-white pt-20 px-4">
        {provider ? (
          <>
            <img
              src={provider?.Portfolio?.ImageUrl || "https://res.cloudinary.com/demo/image/upload/sample.jpg"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mt-6"
            />

            <div className="w-full max-w-md mt-10 space-y-6">
              <div>
                <p className="text-sm font-medium mb-1">Name</p>
                <div className="border rounded-md px-4 py-2 bg-gray-100">{provider.Name}</div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Email</p>
                <div className="border rounded-md px-4 py-2 bg-gray-100">{provider.Email}</div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Phone</p>
                <div className="border rounded-md px-4 py-2 bg-gray-100">{provider.Phone || "Not provided"}</div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`mb-10 px-3 py-1 rounded-md text-xs font-semibold ${provider.isVerified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {provider.isVerified ? "Verified Profile" : "Not Verified"}
                </span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500 mt-10">Loading profile...</p>
        )}
      </div>
    </>
  );
};

export default ProviderProfileView;
