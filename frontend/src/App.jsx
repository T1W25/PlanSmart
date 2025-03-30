import { useState } from 'react'
import Portfolio from './components/PortfolioDisplay'
import PortfolioEditor from './pages/PortfolioEditor'
import Dashboard from './pages/Dashboard'
import ProfileEdit from './pages/ProfileEdit'
import ProfileView from './pages/ProfileView'
import Booking from './pages/Booking';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
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