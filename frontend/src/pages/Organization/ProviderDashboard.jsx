import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import ProfileCards from "./ProviderProfileCards.jsx";
import ReviewCards from "../../components/providerComponents/ReviewCards.jsx";
import PortfolioShowcase from "./ProviderPortfolioShowcase.jsx";

function ProviderDashboard() {
  const { id, providerType } = useParams();
  const [providerData, setProviderData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !providerType) return;

    const routeMap = {
      vendors: "vendors",
      "guest-speakers": "guest-speakers",
      "transportation-providers": "transportation-providers",
    };

    const endpoint = routeMap[providerType];
    if (!endpoint) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/${endpoint}/${id}`)
      .then((res) => setProviderData(res.data))
      .catch((err) => {
        console.warn("Provider not found:", err?.response?.status);
      });
  }, [id, providerType]);

  return (
    <div className="flex flex-col items-center space-y-6 pt-24 px-6 w-full">
      <Navbar />

      {providerData ? (
        <>
          <ProfileCards
            id={providerData._id}
            name={providerData.Name}
            profession={providerData.ProviderType}
            rating={providerData.rating}
            isReadOnly={true}
            providerType={providerData.ProviderType}
          />

          <PortfolioShowcase
            id={providerData._id}
            name={providerData.Name}
            portfolioData={providerData?.Portfolio || {}}
            showCase1={providerData?.Portfolio?.PastWorkMedia?.slice(-1)[0] || ""}
            showCase2={providerData?.Portfolio?.PastWorkMedia?.slice(-2)[0] || ""}
            onViewAllClick={() => navigate(`/providerporfolioshow/${providerType}/${id}`)}
          />

          <ReviewCards providerId={id} />
        </>
      ) : (
        <p className="text-center text-gray-500">Loading provider...</p>
      )}
    </div>
  );
}

export default ProviderDashboard;
