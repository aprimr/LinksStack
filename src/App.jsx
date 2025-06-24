import { useEffect } from "react";
import { Toaster } from "sonner";
import { Routes, Route, useLocation } from "react-router-dom";

import useAuthStore from "./store/authStore";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import Signup from "./pages/Signup";
import Upgrade from "./pages/Upgrade";
import VerifyEmail from "./pages/VerifyEmail";
import Profile from "./pages/Profile";
import VerifyAccount from "./pages/VerifyAccount";
import HelpCenter from "./pages/HelpCenter";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
import ProSupport from "./pages/ProSupport";
import Settings from "./pages/Settings";
function App() {
  const checkSession = useAuthStore((state) => state.checkSession);
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  const location = useLocation();

  useEffect(() => {
    checkSession();
  }, []);

  const bypassVerificationRoutes = ["/", "/account/verify"];

  if (loading) return <Loading />;

  // only show verify account page if user is not verified and the route is not in the bypass list
  if (
    user?.emailVerification === false &&
    !bypassVerificationRoutes.includes(location.pathname)
  )
    return <VerifyAccount />;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account/verify" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms-and-privacy" element={<TermsAndPrivacy />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        <Route
          path="/upgrade"
          element={
            <PrivateRoute>
              <Upgrade />
            </PrivateRoute>
          }
        />

        <Route
          path="/pro-support"
          element={
            <PrivateRoute>
              <ProSupport />
            </PrivateRoute>
          }
        />

        <Route
          path="/help"
          element={
            <PrivateRoute>
              <HelpCenter />
            </PrivateRoute>
          }
        />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-left" richColors />
    </>
  );
}

export default App;
