import { useState } from 'react'
import Portfolio from './components/PortfolioDisplay'
import PortfolioEditor from './pages/PortfolioEditor'
import Dashboard from './pages/Dashboard'
import ProfileEdit from './pages/ProfileEdit'
import ProfileView from './pages/ProfileView'
import Booking from './pages/Booking';
import Register from './pages/Register'; // New
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Register />} /> {/* Default route */}
        <Route path="/register" element={<Register />} /> {/* Optional */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Updated this to make register as default page */}
        <Route path="/pages/profileedit" element={<ProfileEdit />} />
        <Route path="/pages/profileview" element={<ProfileView />} />
        <Route path="/pages/portfoliodisplay" element={<Portfolio />} />
        <Route path="/pages/portfolioeditor" element={<PortfolioEditor />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Router>
  )
}

export default App