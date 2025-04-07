import React from "react";
import ProviderCard from "./ProviderCard";

const ProviderList = ({ providers }) => {
  if (!Array.isArray(providers)) {
    return <p className="text-red-500">Error: Provider list is not valid.</p>;
  }

  return (
    <div className="space-y-4">
      {providers.map((provider) => (
        <ProviderCard
          key={provider._id}
          id={provider._id}
          name={provider.Name}
          email={provider.Email}
          phone={provider.Phone}
          rating={provider.rating}
          isVerified={provider.isVerified}
          providerType={provider.ProviderType}
        />
      ))}
    </div>
  );
};


export default ProviderList;
