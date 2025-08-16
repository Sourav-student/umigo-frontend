import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import CustomCursor from "./components/CustomCursor";
// import { useDarkMode } from "./hooks/useDarkMode";
import { AuthProvider } from "./contexts/AuthContext";
import AboutUs from "./pages/AboutUs";
import Features from "./pages/Features";
import Events from "./pages/Events";
import Support from "./pages/Support";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import Landing from "./pages/Landing";
import Notifications from "./pages/Notifications";
import CreatePlan from "./pages/CreatePlan";
import GlowMode from "./pages/GlowMode";
import Chat from "./pages/Chat";
import Header from "./components/Header";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen w-full bg-[#f9f9f9] text-[#ff5500]">
          <ToastContainer position="top-center" hideProgressBar theme="light" />
          <Header />
          <div className="pb-20">{/* space for bottom nav on mobile */}
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/create" element={<CreatePlan />} />
              <Route path="/glow" element={<GlowMode />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/features" element={<Features />} />
              <Route path="/events" element={<Events />} />
              <Route path="/support" element={<Support />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
