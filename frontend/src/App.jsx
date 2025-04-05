import Portfolio from './components/PortfolioDisplay';
import PortfolioEditor from './pages/PortfolioEditor';
import Dashboard from './pages/Dashboard';
import ProfileEdit from './pages/ProfileEdit';
import ProfileView from './pages/ProfileView';
import Booking from './pages/Booking';
import Register from './pages/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrgLogin from './pages/OrgLogin';
import Login from './pages/Login'; // 👈 Import
import ProtectedRoute from './components/ProtectedRoute'; // ⬅️ import this

import Contact from './pages/Contact';


import RedirectHome from './components/redirectHome';
import OrganizationDashboard from './pages/Organization/OrganizationDashboard';
import OrgRegister from './pages/OrgRegister';
import Unauthorized from './pages/Unauthorized';
import ViewProviders from './pages/Organization/ViewProviders';


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
            <ProtectedRoute allowedRoles={["provider"]}>
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

        <Route
          path="/viewproviders"
          element={
            <ProtectedRoute allowedRoles={["organization"]}>
              <ViewProviders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orgdashboard"
          element={
            <ProtectedRoute allowedRoles={["organization"]}>
              <OrganizationDashboard />
            </ProtectedRoute>
          }
        />
        {/* The rest (not protected) */}
        <Route path="/login" element={<Login />} />
        <Route path="/pages/profileedit" element={<ProfileEdit />} />
        <Route path="/pages/profileview" element={<ProfileView />} />
        <Route path="/pages/portfoliodisplay" element={<Portfolio />} />
        <Route path="/pages/portfolioeditor" element={<PortfolioEditor />} />

        <Route path="/contact" element={<Contact/>} />

        <Route path="/pages/orglogin" element={<OrgLogin />} />
        <Route path="/pages/orgregister" element={<OrgRegister />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

      </Routes>
    </Router>
  );
}

export default App;
