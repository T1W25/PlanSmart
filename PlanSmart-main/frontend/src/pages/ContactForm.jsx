import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    review: '',
    complaint: '',
    inquiryType: 'General',
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });

    try {
      // Simulate form submission (API call, etc.)
      setTimeout(() => {
        setLoading(false);
        setMessage({
          type: 'success',
          content: 'Your message has been sent successfully!',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          review: '',
          complaint: '',
          inquiryType: 'General',
          agreeToTerms: false,
        });
      }, 1500);
    } catch (err) {
      setLoading(false);
      setMessage({
        type: 'error',
        content: 'There was an error sending your message. Please try again later.',
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 px-6">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number (optional)"
              className="w-full border p-2 rounded-md"
            />
          </div>

          {/* Subject */}
          <div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          {/* Review Section (1-5 Star Rating) */}
          <div>
            <label className="block text-sm font-medium mb-2">Rate Us</label>
            <select
              name="review"
              value={formData.review}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            >
              <option value="">Select Rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>

          {/* Complaint Box */}
          <div>
            <textarea
              name="complaint"
              value={formData.complaint}
              onChange={handleChange}
              placeholder="Any Complaints (Optional)"
              className="w-full border p-2 rounded-md"
            />
          </div>

          {/* Inquiry Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Inquiry Type</label>
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            >
              <option value="General">General</option>
              <option value="Support">Support</option>
              <option value="Feedback">Feedback</option>
              <option value="Complaint">Complaint</option>
            </select>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm">
              I agree to the terms and conditions.
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
              disabled={loading || !formData.agreeToTerms}
            >
              {loading ? 'Submitting...' : 'Send Message'}
            </button>
          </div>
        </form>

        {/* Feedback Message */}
        {message.content && (
          <div className={`mt-4 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message.content}
          </div>
        )}
      </div>
    </>
  );
};

export default ContactForm;
