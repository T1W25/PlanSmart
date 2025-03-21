const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-300 p-4 flex justify-between items-center shadow-sm z-[50]">
      {/* Left Side - Logo */}
      <h1 className="text-3xl font-bold">Plansmart</h1>

      {/* Center - Navigation Links */}
      <div className="flex space-x-10 font-bold ml-auto">
        <a 
          href="#dashboard" 
          className="text-black-600 text-sm hover:text-black transition-transform duration-300 transform hover:scale-105"
        >
          Dashboard
        </a>
        <a 
          href="#bookings" 
          className="text-black-600 text-sm hover:text-black transition-transform duration-300 transform hover:scale-105"
        >
          Bookings
        </a>
        <a 
          href="#contact" 
          className="text-black-600 text-sm hover:text-black transition-transform duration-300 transform hover:scale-105"
        >
          Contact Us
        </a>
      </div>

      {/* Right Side - Button */}
      <button 
        className="bg-black text-white text-sm px-4 py-2 rounded-md font-bold ml-10 transition-all duration-300 transform hover:scale-105 hover:bg-gray-800 cursor-pointer"
      >
        Sign Out
      </button>
    </nav>
  );
};

export default Navbar;
