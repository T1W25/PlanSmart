import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import { getUser } from "../../utils/auth";

const CreateEvent = () => {
  const navigate = useNavigate();
  const user = getUser();

  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    date: "",
    numberOfGuests: "",
    location: "",
  });

  const [providerType, setProviderType] = useState("");
  const [providerOptions, setProviderOptions] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState("");
  const [providerRate, setProviderRate] = useState("");
  const [selectedProviders, setSelectedProviders] = useState([]);

  useEffect(() => {
    if (!providerType) return;

    const endpointMap = {
      Vendor: "vendors/search",
      GuestSpeaker: "guest-speakers/search",
      TransportationProvider: "transportation-providers/search",
    };

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/${endpointMap[providerType]}`)
      .then((res) => {
        const key = Object.keys(res.data).find((k) =>
          Array.isArray(res.data[k])
        );
        const sorted = (res.data[key] || []).sort(
          (a, b) => b.isVerified - a.isVerified
        );
        setProviderOptions(sorted);
      })
      .catch((err) => console.error("Error fetching providers:", err));
  }, [providerType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProvider = () => {
    const found = providerOptions.find((p) => p._id === selectedProviderId);
    if (!found || selectedProviders.some((sp) => sp.providerID === found._id))
      return;

    const normalizedType =
      providerType === "Vendor"
        ? "Vendor"
        : providerType === "GuestSpeaker"
        ? "GuestSpeaker"
        : "TransportationProvider";

    const providerEntry = {
      providerID: found._id,
      providerName: found.Name,
      providerType: normalizedType,
      rate: Number(providerRate),
    };

    setSelectedProviders((prev) => [...prev, providerEntry]);
    setSelectedProviderId("");
    setProviderRate("");
  };

  const handleRemoveProvider = (id) => {
    setSelectedProviders((prev) => prev.filter((p) => p.providerID !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        numberOfGuests: Number(formData.numberOfGuests),
        organizationId: user.organizationID,
        organizationName: user.name,
        providers: selectedProviders,
      };

      const eventRes = await axios.post(
        "${import.meta.env.VITE_API_URL}/api/organization/events",
        payload
      );
      const eventId = eventRes.data?.event?._id;
      if (!eventId) throw new Error("Event creation failed");

      const invites = selectedProviders.map((p) => ({
        eventId,
        providerId: p.providerID,
        providerName: p.providerName,
        providerType: p.providerType,
        rate: p.rate,
      }));

      await axios.post("${import.meta.env.VITE_API_URL}/api/event-invites", { invites });
      navigate("/event");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Create Event</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-lg shadow"
        >
          <input
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Event Name"
            required
          />
          <textarea
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Description"
            rows="3"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="numberOfGuests"
            type="number"
            value={formData.numberOfGuests}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Guests"
            required
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Location"
          />

          {/* Provider Fields */}
          <select
            value={providerType}
            onChange={(e) => setProviderType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Provider Type</option>
            <option value="Vendor">Vendor</option>
            <option value="GuestSpeaker">Guest Speaker</option>
            <option value="TransportationProvider">
              Transportation Provider
            </option>
          </select>

          {providerOptions.length > 0 && (
            <>
              <select
                value={selectedProviderId}
                onChange={(e) => setSelectedProviderId(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Provider</option>
                {providerOptions.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.Name} ({p.Email}) {p.isVerified && "✅"}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Rate for provider"
                value={providerRate}
                onChange={(e) => setProviderRate(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={handleAddProvider}
                className="bg-black text-white px-4 py-1 rounded cursor-pointer"
              >
                Add Provider
              </button>
            </>
          )}

          {/* Display selected providers */}
          <div className="mt-4 space-y-2">
            {selectedProviders.map((p) => (
              <div
                key={p.providerID}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>
                  {p.providerName} - {p.providerType} - ${p.rate}
                </span>
                <button
                  onClick={() => handleRemoveProvider(p.providerID)}
                  className="text-red-600 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            Create Event
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateEvent;
