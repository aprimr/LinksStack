import { useEffect } from "react";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import useAuthStore from "./store/authStore";
import Login from "./pages/Login";
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account/verify" element={<VerifyEmail />} />

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
          path="/upgrade"
          element={
            <PrivateRoute>
              <Upgrade />
            </PrivateRoute>
          }
        />

        {/* test */}
        {/* <Route path="/test" element={<Test />} /> */}

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-left" richColors />
    </>
  );
}

export default App;
