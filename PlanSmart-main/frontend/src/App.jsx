import Portfolio from './components/PortfolioDisplay';
import PortfolioEditor from './pages/PortfolioEditor';
import Dashboard from './pages/Dashboard';
import ProfileEdit from './pages/ProfileEdit';
import ProfileView from './pages/ProfileView';
import Booking from './pages/Booking';
import Register from './pages/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login'; // 👈 Import
import ProtectedRoute from './components/ProtectedRoute'; // ⬅️ import this
import RedirectHome from './components/redirectHome'
import ContactForm from './pages/ContactForm'; // 👈 Import the new page


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RedirectHome />} />
        <Route path="/register" element={<Register />} />
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
        {/* The rest (not protected) */}
        <Route path="/login" element={<Login />} />
        <Route path="/profileedit" element={<ProfileEdit />} /> {/* Adjusted path */}
        <Route path="/profileview" element={<ProfileView />} /> {/* Adjusted path */}
        <Route path="/portfoliodisplay" element={<Portfolio />} /> {/* Adjusted path */}
        <Route path="/portfolioeditor" element={<PortfolioEditor />} /> {/* Adjusted path */}
        
        {/* Contact Us page */}
        <Route path="/contact" element={<ContactForm />} /> {/* Updated to /contact */}
      </Routes>
    </Router>
  );
}

export default App;
