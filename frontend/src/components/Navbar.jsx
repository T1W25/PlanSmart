import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <h1 className="text-xl font-bold">Plansmart</h1>
      <div className="space-x-6">
        <a href="#" className="text-gray-700 hover:text-black">Dashboard</a>
        <a href="#" className="text-gray-700 hover:text-black">Bookings</a>
        <a href="#" className="text-gray-700 hover:text-black">Contact Us</a>
      </div>
      <button className="bg-black text-white px-4 py-2 rounded-md">Sign Out</button>
    </nav>
  );
};

export default Navbar;
