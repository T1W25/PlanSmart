import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token"); // clear auth token
    navigate("/login"); // redirect to login
  };

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-300 p-4 flex justify-between items-center shadow-sm z-[50]">
      {/* Left Side - Logo */}
      <Link to='/'>
        <h1 className="text-3xl font-bold">Plansmart</h1>
      </Link>

      {/* Center - Navigation Links */}
      <div className="flex space-x-10 font-bold ml-auto">
        <Link to="/dashboard" className="text-black-600 text-sm hover:text-black transition-transform duration-300 transform hover:scale-105">
          Dashboard
        </Link>
        <Link to="/booking" className="text-black-600 text-sm hover:text-black transition-transform duration-300 transform hover:scale-105">
          Bookings
        </Link>
        <Link to="/contact" className="text-black-600 text-sm hover:text-black transition-transform duration-300 transform hover:scale-105">
          Contact Us
        </Link>
      </div>

      {/* Right Side - Sign Out */}
      <button 
        onClick={handleSignOut}
        className="bg-black text-white text-sm px-4 py-2 rounded-md font-bold ml-10 transition-all duration-300 transform hover:scale-105 hover:bg-gray-800 cursor-pointer"
      >
        Sign Out
      </button>
    </nav>
  );
};

export default Navbar;
