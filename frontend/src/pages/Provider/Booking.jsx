import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Navbar from '../../components/Navbar.jsx';

const Booking = () => {
  const [selectedRange, setSelectedRange] = useState({ from: undefined, to: undefined });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [bookingInfo, setBookingInfo] = useState(null);
  const [filter, setFilter] = useState('All');
  const [vendors, setVendors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [prefill, setPrefill] = useState({ name: '', email: '', details: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;




  useEffect(() => {
    handleFilter('All');
  }, []);

  const getSortKey = (statusLabel) => {
    switch (statusLabel.toLowerCase()) {
      case 'all':
      case 'pending':
      case 'accepted':
      case 'declined':
        return 'status';
      case 'alphabetical':
        return 'alphabetical';
      case 'date':
      case 'timestamp':
        return 'timestamp';
      default:
        return 'status';
    }
  };

  const handleFilter = async (status) => {
    setFilter(status);
    setCurrentPage(1); 
  
    // Filtering Data
    try {
      const res = await fetch(`/api/booking/fetch?sortBy=status`);
      const data = await res.json();
  
      let filteredData = data;
  
      if (status !== 'All') {
        filteredData = data.filter(b => b.status.toLowerCase() === status.toLowerCase());
      }
  
      setVendors(filteredData);
    } catch (err) {
      console.error('Error fetching filtered bookings:', err);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });

    setTimeout(() => {
      setLoading(false);
      setBookingInfo({
        name: e.target.name.value,
        email: e.target.email.value,
        details: e.target.details.value,
        location: e.target.location.value,   // ✅ NEW
        guests: e.target.guests.value,       // ✅ NEW
        dates: selectedRange,
      });      
      setMessage({ type: 'success', content: 'Booking successful!' });
      setIsModalOpen(false);
      setPrefill({ name: '', email: '', details: '' }); // reset
    }, 1500);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/booking/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        handleFilter(filter); 
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleBookNowFromVendor = (vendor) => {
    setIsModalOpen(true);
    setPrefill({
      name: vendor.vendor.name || '',
      email: vendor.vendor.email || '',
      details: `Booking inquiry for ${vendor.event.title} on ${new Date(vendor.event.date).toLocaleDateString()}`,
    });
  };

  const renderVendorCard = (vendor, index) => {
    if (!vendor || !vendor.vendor || !vendor.event) return null;

    return (
      <div key={index} className="flex border rounded-xl p-4 mb-4 shadow relative bg-white">
        <img src="https://via.placeholder.com/120" alt="Vendor" className="w-28 h-28 object-cover rounded-md mr-4" />
        <div className="flex-1">
          <h3 className="text-lg font-bold">{vendor.event.title}</h3>
          <p className="text-sm text-gray-700">{vendor.event.location}</p>
          <p className="text-sm">{new Date(vendor.event.date).toLocaleDateString()}</p>
          <p className="text-sm">Guests: <strong>{vendor.event.guests}</strong></p>
          <p className="text-sm mt-1 text-gray-700">Vendor: <strong>{vendor.vendor.name}</strong></p>
          <div className="mt-2 flex space-x-2">
            <button
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => updateStatus(vendor._id, 'accepted')}
            >
              Accept
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => updateStatus(vendor._id, 'declined')}
            >
              Decline
            </button>
            <button
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-400"
              onClick={() => updateStatus(vendor._id, 'pending')}
            >
              Book Now
            </button>
          </div>
        </div>
        <div className="absolute top-2 right-4 text-sm font-bold uppercase">
          <span
            className={`px-2 py-1 rounded ${
              vendor.status === 'accepted'
                ? 'bg-green-100 text-green-700'
                : vendor.status === 'declined'
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {vendor.status}
          </span>
        </div>
      </div>
    );
  };

  // pagination logic
  const filtered = vendors.filter((vendor) => {
    const matchesSearch = vendor?.vendor?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVerified = !showVerifiedOnly || vendor?.vendor?.isVerified;
    return matchesSearch && matchesVerified;
  });
  
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);
  
  return (
    <>
      <Navbar />
      <div className="pt-24 px-6">
        <h1 className="text-3xl font-bold mb-4">Bookings</h1>

        {/* Filter Buttons */}
        <div className="flex space-x-4 mb-6">
          {['All', 'Accepted', 'Declined', 'Pending'].map((status) => (
            <button
              key={status}
              onClick={() => handleFilter(status)}
              className={`px-4 py-2 rounded-full border ${
                filter === status ? 'bg-black text-white' : 'bg-white text-black'
              } hover:bg-gray-200 transition`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Manual Book Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              setPrefill({ name: '', email: '', details: '' });
              setIsModalOpen(true);
            }}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Book Now
          </button>
        </div>
            {/* Search and Verified Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by vendor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded w-full sm:w-64"
            />
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={showVerifiedOnly}
                onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                className="accent-black"
              />
              <span>Show Verified Only</span>
            </label>
          </div>

        {/* Vendor Cards with Pagination */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Vendor Requests</h2>
          {paginated.length > 0 ? (
            <>
              {paginated.map(renderVendorCard)}
              <div className="flex justify-center gap-2 mt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="px-2 text-sm mt-1">Page {currentPage} of {totalPages}</span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">No vendors to display.</p>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Book Your Event</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block text-sm font-semibold">Select your dates:</label>
                <DayPicker
                  mode="range"
                  selected={selectedRange}
                  onSelect={setSelectedRange}
                  className="border rounded-md p-2"
                />
                <input name="name" type="text" placeholder="Full Name" defaultValue={prefill.name} className="w-full border p-2 rounded-md" required />
                <input name="email" type="email" placeholder="Email Address" defaultValue={prefill.email} className="w-full border p-2 rounded-md" required />
                <textarea name="details" placeholder="Event Details" defaultValue={prefill.details} className="w-full border p-2 rounded-md" required />
                <input name="location" type="text" placeholder="Event Location" className="w-full border p-2 rounded-md" required />
                <input name="guests" type="number" placeholder="Number of Guests" className="w-full border p-2 rounded-md" required />


                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Booking'}
                </button>
                {message.content && (
                  <div className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {message.content}
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Confirmation */}
        {bookingInfo && (
          <div className="mt-8 p-6 bg-green-100 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Booking Confirmation</h2>
            <p><strong>Name:</strong> {bookingInfo.name}</p>
            <p><strong>Email:</strong> {bookingInfo.email}</p>
            <p><strong>Event Dates:</strong>{`${bookingInfo.dates.from?.toLocaleDateString()} to ${bookingInfo.dates.to?.toLocaleDateString()}`}</p>
            <p><strong>Details:</strong> {bookingInfo.details}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Booking;
