import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getUser } from "../../utils/auth";
// ...imports remain the same
const CreateEvent = () => {
    const navigate = useNavigate();
    const user = getUser();
  
    const [formData, setFormData] = useState({
      eventName: "",
      eventDescription: "",
      date: "",
      numberOfGuests: "",
      location: "",
      rate: "",
    });
  
    const [providerType, setProviderType] = useState("");
    const [providerOptions, setProviderOptions] = useState([]);
    const [selectedProviderId, setSelectedProviderId] = useState("");
    const [selectedProviders, setSelectedProviders] = useState([]);
  
    useEffect(() => {
      if (!providerType) return;
  
      const endpointMap = {
        "Vendor": "vendors/search",
        "GuestSpeaker": "guest-speakers/search",
        "TransportationProvider": "transportation-providers/search",
      };
  
      axios
        .get(`http://localhost:5050/api/${endpointMap[providerType]}`)
        .then((res) => {
          const key = Object.keys(res.data).find(k => Array.isArray(res.data[k]));
          setProviderOptions(res.data[key] || []);
        })
        .catch((err) => console.error("Error fetching providers:", err));
    }, [providerType]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleAddProvider = () => {
      const found = providerOptions.find((p) => p._id === selectedProviderId);
      if (!found || selectedProviders.some((sp) => sp.providerID === found._id)) return;
  
      const normalizedType =
        providerType === "Vendor" ? "Vendor"
        : providerType === "GuestSpeaker" ? "GuestSpeaker"
        : "TransportationProvider";
  
      const providerEntry = {
        providerID: found._id,
        providerName: found.Name,
        providerType: normalizedType,
      };
  
      setSelectedProviders((prev) => [...prev, providerEntry]);
      setSelectedProviderId("");
    };
  
    const handleRemoveProvider = (id) => {
      setSelectedProviders((prev) => prev.filter(p => p.providerID !== id));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const payload = {
          ...formData,
          numberOfGuests: Number(formData.numberOfGuests),
          rate: Number(formData.rate),
          organizationId: user.organizationID,
          organizationName: user.name,
          providers: selectedProviders,
        };
  
        await axios.post("http://localhost:5050/api/organization/events", payload);
        navigate("/event");
      } catch (err) {
        console.error("Event creation error:", err);
      }
    };
  
    return (
      <>
        <Navbar />
        <div className="pt-24 px-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Create Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
            {/* ...regular form fields */}
            <input name="eventName" value={formData.eventName} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Event Name" required />
            <textarea name="eventDescription" value={formData.eventDescription} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Description" rows="3" />
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input name="numberOfGuests" type="number" value={formData.numberOfGuests} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Number of Guests" required />
            <input name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Location" />
            <input name="rate" type="number" value={formData.rate} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Rate" required />
  
            {/* Select Provider Type */}
            <select value={providerType} onChange={(e) => { setProviderType(e.target.value); setSelectedProviderId(""); }} className="w-full p-2 border rounded" required>
              <option value="" disabled>Select Provider Type</option>
              <option value="Vendor">Vendor</option>
              <option value="GuestSpeaker">Guest Speaker</option>
              <option value="TransportationProvider">Transportation Provider</option>
            </select>
  
            {/* Select Provider */}
            {providerOptions.length > 0 && (
              <div className="flex space-x-2">
                <select
                  value={selectedProviderId}
                  onChange={(e) => setSelectedProviderId(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="" disabled>Select Provider</option>
                  {providerOptions.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.Name} ({p.Email}) {p.isVerified ? "✅" : ""}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={handleAddProvider} className="bg-blue-600 text-white px-4 rounded">Add</button>
              </div>
            )}
  
            {/* Selected Providers List */}
            <div className="space-y-2 mt-2">
              {selectedProviders.map((p) => (
                <div key={p.providerID} className="flex justify-between items-center border p-2 rounded bg-gray-50">
                  <span>{p.providerName} - {p.providerType}</span>
                  <button type="button" onClick={() => handleRemoveProvider(p.providerID)} className="text-red-600">Remove</button>
                </div>
              ))}
            </div>
  
            <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-700 cursor-pointer">Create Event</button>
          </form>
        </div>
      </>
    );
  };
  
  export default CreateEvent;
  