import { BrowserRouter as Router } from "react-router-dom";
// import CustomCursor from "./components/CustomCursor";
// import { useDarkMode } from "./hooks/useDarkMode";
import { AuthProvider } from "./context/AuthContext";
import { CommonProvider } from "./context/CommonContext";
import Header from "./components/layout/Header";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <CommonProvider>
        <Router>
          <div className="App min-h-screen w-full bg-[#f9f9f9] text-[#ff5500]">
            <ToastContainer position="top-center" hideProgressBar theme="light" />
            <Header />
            <div>{/* space for bottom nav on mobile */}
              <AppRoutes />
            </div>
          </div>
        </Router>
      </CommonProvider>
    </AuthProvider>
  );
}

export default App;
