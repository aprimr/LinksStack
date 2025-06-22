import { useState, useEffect } from "react";
import {
  User,
  Layers2,
  LayoutDashboard,
  Sparkles,
  CircleUserRound,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

// Hook to detect scroll direction
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollDirection(currentY > lastY ? "down" : "up");
      setLastY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return scrollDirection;
}

function Navbar() {
  const { user, userDetails, isPremium } = useAuthStore();
  const scrollDirection = useScrollDirection();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const homeRoute = pathname === "/";
  const authRoute = ["/login", "/signup"].includes(pathname);
  const verifyRoute = pathname.startsWith("/account/verify");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (verifyRoute) return null;

  const showMobileNav = scrollDirection === "up" || !scrolled;

  const commonLinks = !user
    ? [
        { to: "/about", label: "About Us" },
        { to: "/contact", label: "Contact" },
        { to: "/terms-and-privacy", label: "Terms And Privacy" },
      ]
    : [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/settings", label: "Settings" },
      ];

  return (
    <header className="fixed top-0 w-full bg-gray-900/10 backdrop-blur-xl z-50">
      <div className="max-w-screen-lg mx-auto px-6 py-3 flex justify-between items-center font-inter">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-white text-2xl font-bold flex items-center select-none"
        >
          <Layers2 className="inline-block mr-2 h-7 w-7 text-white" />
          LinksStack
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {!homeRoute && user && (
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `text-sm font-medium font-poppins transition-colors ${
                  isActive
                    ? "text-sky-500"
                    : "text-gray-200 hover:text-gray-400"
                }`
              }
            >
              Home
            </NavLink>
          )}
          {commonLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium font-poppins transition-colors ${
                  isActive
                    ? "text-sky-500"
                    : "text-gray-200 hover:text-gray-400"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {homeRoute &&
            (isPremium ? (
              <NavLink
                to="/pro-support"
                className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-600 hover:from-gray-300 hover:via-gray-400 hover:to-gray-500 text-sm font-medium font-poppins transition-colors"
              >
                PRO Support
              </NavLink>
            ) : (
              user && (
                <NavLink
                  to="/help"
                  className="text-sm font-medium font-poppins text-gray-200 hover:text-gray-400 transition-colors"
                >
                  Help Center
                </NavLink>
              )
            ))}
        </nav>

        {/* Auth / CTA Buttons */}
        {user ? (
          !homeRoute ? (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 px-2 pr-3 py-1.5 rounded-full transition-all ${
                  isActive
                    ? "bg-sky-500/20 text-sky-500"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`
              }
            >
              {userDetails?.avatarUrl ? (
                <img
                  src={userDetails.avatarUrl}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover border-2 border-sky-500"
                />
              ) : (
                <CircleUserRound className="h-6 w-6 rounded-full stroke-[1.5]" />
              )}
              <span className="text-sm font-medium font-poppins">Profile</span>
            </NavLink>
          ) : isPremium ? (
            <button
              onClick={() => navigate("/home")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-sky-600/20 text-sky-500 hover:bg-sky-900/30 transition-all font-poppins"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="text-sm lg:text-base font-medium">Home</span>
            </button>
          ) : (
            <button
              onClick={() => navigate("/upgrade")}
              className="px-3 sm:px-5 py-3 text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-md shadow hover:brightness-125 transition duration-300 font-poppins"
            >
              Become a PRO
              <Sparkles className="inline-block ml-1 h-4 w-4" />
            </button>
          )
        ) : !authRoute ? (
          <NavLink
            to="/login"
            className="px-5 py-2 text-sm bg-white text-gray-900 font-semibold rounded-md shadow hover:bg-white/85 transition"
          >
            Login
          </NavLink>
        ) : null}
      </div>

      {/* Mobile Navigation */}
      {!authRoute && (
        <nav
          className={`w-full md:hidden gap-6 pt-2 mb-2 transition-transform duration-300 ${
            showMobileNav ? "flex justify-center" : "hidden -translate-y-full"
          }`}
        >
          {!homeRoute && user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-sm font-medium font-poppins transition-colors ${
                  isActive
                    ? "text-sky-500"
                    : "text-gray-200 hover:text-gray-400"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
          {commonLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium font-poppins transition-colors ${
                  isActive
                    ? "text-sky-500"
                    : "text-gray-200 hover:text-gray-400"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {homeRoute &&
            (isPremium ? (
              <NavLink
                to="/pro-support"
                className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-600 hover:from-gray-300 hover:via-gray-400 hover:to-gray-500 text-sm font-medium font-poppins transition"
              >
                PRO Support
              </NavLink>
            ) : (
              user && (
                <NavLink
                  to="/help"
                  className="text-sm font-medium font-poppins text-gray-200 hover:text-gray-400 transition"
                >
                  Help Center
                </NavLink>
              )
            ))}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
