import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getUser } from "../../utils/auth";

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const user = getUser();

  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    date: "",
    numberOfGuests: "",
    location: "",
  });

  const [providerOptions, setProviderOptions] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [providerType, setProviderType] = useState("");
  const [selectedProviderId, setSelectedProviderId] = useState("");
  const [providerRate, setProviderRate] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5050/api/organization/events/${user.organizationID}`
        );
        const targetEvent = res.data.find((e) => e._id === eventId);
        if (targetEvent) {
          setFormData({
            eventName: targetEvent.eventName,
            eventDescription: targetEvent.eventDescription,
            date: targetEvent.date?.slice(0, 10), // date format for input (date picker)
            numberOfGuests: targetEvent.numberOfGuests,
            location: targetEvent.location,
          });
          setSelectedProviders(
            (targetEvent.providers || []).map((p) => ({
              providerID: p.providerID || p._id, // normalize
              providerName: p.providerName,
              providerType: p.providerType,
              rate: p.rate || 0,
              inviteId: p._id,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch event:", err);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId, user.organizationID]);

  useEffect(() => {
    if (!providerType) return;

    const endpointMap = {
      Vendor: "vendors/search",
      GuestSpeaker: "guest-speakers/search",
      TransportationProvider: "transportation-providers/search",
    };

    axios
      .get(`http://localhost:5050/api/${endpointMap[providerType]}`)
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
    if (!found || selectedProviders.some((p) => p.providerID === found._id))
      return;

    const providerEntry = {
      providerID: found._id,
      providerName: found.Name,
      providerType,
      rate: Number(providerRate),
    };

    setSelectedProviders((prev) => [...prev, providerEntry]);
    setSelectedProviderId("");
    setProviderRate("");
  };

  const handleRemoveProvider = async (p) => {
    if (!p.inviteId) {
      console.error("No inviteId found to delete");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5050/api/event-invites/${p.inviteId}`
      );

      setSelectedProviders((prev) =>
        prev.filter((provider) => provider.inviteId !== p.inviteId)
      );
      alert('Event Invite Rescinded');
    } catch (err) {
      console.error("Failed to delete provider from backend:", err);
      alert("Could not remove provider from event. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProviders = selectedProviders.filter(p => !p.inviteId);
  
      if (newProviders.length > 0) {
        const invitePayload = {
          invites: newProviders.map(p => ({
            eventId,
            providerId: p.providerID,
            providerName: p.providerName,
            providerType: p.providerType,
            rate: p.rate,
            status: "pending",
          })),
        };
  
        await axios.post("http://localhost:5050/api/event-invites", invitePayload);
      }
  
      const payload = {
        ...formData,
        numberOfGuests: Number(formData.numberOfGuests),
        organizationId: user.organizationID,
        organizationName: user.name,
        providers: selectedProviders, 
      };
  
      await axios.put(`http://localhost:5050/api/organization/events/${eventId}`, payload);
      navigate("/event");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Could not update event.");
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="pt-24 px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Event</h2>
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

          <select
            value={providerType}
            onChange={(e) => setProviderType(e.target.value)}
            className="w-full p-2 border rounded"
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

          {selectedProviders.map((p) => (
            <div
              key={p.inviteId || p.providerID}
              className="flex justify-between items-center bg-gray-100 p-2 rounded"
            >
              <span>
                {p.providerName} - {p.providerType} - ${p.rate}
              </span>
              <button
                onClick={() => handleRemoveProvider(p)}
                className="text-red-600 cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            Update Event
          </button>
        </form>
      </div>
    </>
  );
};

export default EditEvent;
