import Portfolio from "./components/providerComponents/PortfolioDisplay.jsx";
import PortfolioEditor from "./pages/Provider/PortfolioEditor.jsx";
import Dashboard from "./pages/Provider/Dashboard.jsx";
import ProfileEdit from "./pages/Provider/ProfileEdit.jsx";
import ProfileView from "./pages/Provider/ProfileView.jsx";
import Booking from "./pages/Provider/Booking.jsx";
import Register from "./pages/Provider/Register.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrgLogin from "./pages/Organization/OrgLogin.jsx";
import Login from "./pages/Provider/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Contact from './pages/Contact';


import RedirectHome from "./components/redirectHome.jsx";
import OrganizationDashboard from "./pages/Organization/OrganizationDashboard.jsx";
import OrgRegister from "./pages/Organization/OrgRegister.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import ViewProviders from "./pages/Organization/ViewProviders.jsx";
import AddReview from "./pages/Organization/AddReview.jsx";
import CreateEvent from "./pages/Organization/CreateEvent.jsx";
import Event from "./pages/Organization/Events.jsx";
import ProviderDashboard from "./pages/Organization/ProviderDashboard.jsx";
import ProviderPortfolio from "./pages/Organization/ProviderPortfolioShowcase.jsx";
import ProviderProfile from "./pages/Organization/ProviderProfile.jsx";
import ProviderPortfolioshowoff from "./pages/Organization/ProviderPortfolio.jsx";
import EditEvent from "./pages/Organization/EditEvent.jsx";



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
          path="/addreview/:id"
          element={
            <ProtectedRoute allowedRoles={["organization"]}>
              <AddReview />
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

        <Route
          path="/create-event"
          element={
            <ProtectedRoute allowedRoles={["organization"]}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/event"
          element={
            <ProtectedRoute allowedRoles={["organization"]}>
              <Event />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-event/:eventId"
          element={
            <ProtectedRoute allowedRoles={["organization"]}>
              <EditEvent />
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

        <Route path="/viewproviders" element={<ViewProviders />} />
        <Route
          path="/provider-dashboard/:providerType/:id"
          element={<ProviderDashboard />}
        />
        <Route path="/provider-portfolio" element={<ProviderPortfolio />} />
        <Route
          path="/providerprofile/:providerType/:id"
          element={<ProviderProfile />}
        />
        <Route
          path="/providerporfolioshow/:providerType/:id"
          element={<ProviderPortfolioshowoff />}
        />
      </Routes>
    </Router>
  );
}

export default App;
