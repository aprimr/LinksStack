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

// detect scroll direction
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [prevOffset, setPrevOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      setScrollDirection(currentOffset > prevOffset ? "down" : "up");
      setPrevOffset(currentOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevOffset]);

  return scrollDirection;
}

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const userDetails = useAuthStore((state) => state.userDetails);
  const isPremium = useAuthStore((state) => state.isPremium);
  const scrollDirection = useScrollDirection();
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const homeRoute = location.pathname === "/";
  const authRoute =
    location.pathname === "/login" || location.pathname === "/signup";
  const verifyAccountRoute = location.pathname.startsWith("/account/verify");

  // Additional effect to track if user has scrolled at all
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine mobile nav visibility
  const showMobileNav = scrollDirection === "up" || !scrolled;

  if (verifyAccountRoute) {
    return null;
  }

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

        {/* Navigation - desktop*/}
        <nav className="hidden md:flex gap-6">
          {!homeRoute && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-gray-200 text-sm font-medium transition-colors duration-300 font-poppins ${
                  isActive ? "text-sky-500" : "hover:text-gray-400"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
          {(!user
            ? [
                // Guest Navigation
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
                { to: "/terms", label: "Terms" },
                { to: "/privacy", label: "Privacy" },
              ]
            : !isPremium
            ? [
                // User Navigation
                { to: "/analytics", label: "Analytics" },
                { to: "/settings", label: "Settings" },
              ]
            : [
                // Pro User Navigation
                { to: "/analytics", label: "Analytics" },
                { to: "/settings", label: "Settings" },
              ]
          ).map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-gray-200 text-sm font-medium transition-colors duration-300 font-poppins ${
                  isActive ? "text-sky-500" : "hover:text-gray-400"
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
                className={`bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-600 hover:from-gray-300 hover:via-gray-400 hover:to-gray-500 text-sm font-medium transition-colors duration-300 font-poppins`}
              >
                PRO Support
              </NavLink>
            ) : (
              user && (
                <NavLink
                  to="/help"
                  className={`text-gray-200 hover:text-gray-400 text-sm font-medium transition-colors duration-300 font-poppins`}
                >
                  Help Center
                </NavLink>
              )
            ))}
        </nav>

        {/* Login / Logout Button */}
        {user ? (
          !homeRoute ? (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 px-2 pr-3 py-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-sky-500/20 text-sky-500"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`
              }
            >
              {userDetails?.avatarUrl ? (
                <img
                  src={userDetails?.avatarUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-sky-500"
                />
              ) : (
                <CircleUserRound className="h-6 w-6 m-0.5 rounded-full stroke-[1.5]" />
              )}
              <span className="text-sm font-medium font-poppins">Profile</span>
            </NavLink>
          ) : isPremium ? (
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-300 backdrop-blur-sm border border-white/10 bg-sky-600/20 text-sky-500 hover:bg-sky-900/30"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="text-sm lg:text-base font-medium font-poppins">
                Dashboard
              </span>
            </button>
          ) : (
            <button
              onClick={() => navigate("/upgrade")}
              className="px-3 sm:px-5 py-3 text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 brightness-110 hover:brightness-125 text-black font-semibold rounded-md shadow duration-300 font-poppins"
            >
              Become a PRO
              <Sparkles className="inline-block ml-1 h-4 w-4" />
            </button>
          )
        ) : authRoute ? (
          " "
        ) : (
          <NavLink
            to="/login"
            className="px-5 py-2 text-sm bg-white text-gray-900 font-semibold rounded-md shadow hover:bg-white/85 transition-colors duration-300"
          >
            Login
          </NavLink>
        )}
      </div>

      {/* Navigation - mobile */}
      {!authRoute && (
        <nav
          className={`w-full md:hidden gap-6 mb-2 pt-2 -mt-1 transition-transform duration-300 ${
            showMobileNav
              ? "transform translate-y-0 flex justify-center"
              : "transform -translate-y-full hidden"
          }`}
        >
          {!homeRoute && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-gray-200 text-sm font-medium transition-colors duration-300 font-poppins ${
                  isActive ? "text-sky-500" : "hover:text-gray-400"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
          {(!user
            ? [
                // Guest Navigation
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
                { to: "/terms", label: "Terms" },
                { to: "/privacy", label: "Privacy" },
              ]
            : !isPremium
            ? [
                // User Navigation
                { to: "/analytics", label: "Analytics" },
                { to: "/settings", label: "Settings" },
              ]
            : [
                // Pro User Navigation
                { to: "/analytics", label: "Analytics" },
                { to: "/settings", label: "Settings" },
              ]
          ).map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-gray-200 text-sm font-medium transition-colors duration-300 font-poppins ${
                  isActive ? "text-sky-500" : "hover:text-gray-400"
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
                className={`bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-600 hover:from-gray-300 hover:via-gray-400 hover:to-gray-500 text-sm font-medium transition-colors duration-300 font-poppins`}
              >
                PRO Support
              </NavLink>
            ) : (
              user && (
                <NavLink
                  to="/help"
                  className={`text-gray-200 hover:text-gray-400 text-sm font-medium transition-colors duration-300 font-poppins`}
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
