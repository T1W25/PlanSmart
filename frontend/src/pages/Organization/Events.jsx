import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUser } from "../../utils/auth";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import EventList from "../../components/EventList";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const user = getUser();
  const orgId = user?.organizationID;

  useEffect(() => {
    if (!orgId) return;
    axios
      .get(`http://localhost:5050/api/organization/events/${orgId}`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
  }, [orgId]);

  return (
    <>
      <Navbar />
      <div className="pt-24 max-w-4xl mx-auto px-4">
        <div className="text-center mb-6">
          <button
            onClick={() => navigate("/create-event")}
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 pl-2 pr-4 rounded cursor-pointer"
          >
            <span className="text-white font-bold text-xl">＋</span>
            <span>Add Event</span>
          </button>
        </div>

        <EventList events={events} />
      </div>
    </>
  );
};

export default EventPage;
