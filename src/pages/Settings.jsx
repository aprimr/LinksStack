import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Eye,
  EyeOff,
  Check,
  LogOut,
  Trash2,
  Star,
  ChevronRight,
  Mail,
  Shield,
  Monitor,
  Smartphone,
  MonitorSmartphone,
  Globe,
  CircleOff,
  SquareUser,
  Layers2,
  Loader2,
  Info,
} from "lucide-react";
import { FaApple, FaLinux, FaSafari } from "react-icons/fa";
import { DiAndroid } from "react-icons/di";
import { format, formatDistanceToNow } from "date-fns";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useSettingsStore from "../store/settingsStore";
import { toast } from "sonner";

// Device icon component
const DeviceIcon = ({ deviceName, clientName }) => {
  if (deviceName === "smartphone")
    return <Smartphone className="text-blue-400" size={18} />;
  if (deviceName === "desktop")
    return <Monitor className="text-green-400" size={18} />;
  if (clientName.includes("Safari"))
    return <FaSafari className="text-purple-400" size={18} />;
  return <Globe className="text-gray-400" size={18} />;
};

// OS icon component
const OsIcon = ({ osCode }) => {
  if (osCode === "AND")
    return <DiAndroid className="text-green-500" size={16} />;
  if (osCode === "IOS") return <FaApple className="text-gray-300" size={16} />;
  if (osCode === "LIN")
    return <FaLinux className="text-yellow-500" size={16} />;
  return null;
};

// Format date helper
const formatDate = (dateString) => {
  try {
    return format(new Date(dateString), "PP");
  } catch {
    return "Invalid date";
  }
};

// Format time helper
const formatTime = (dateString) => {
  try {
    return format(new Date(dateString), "pp");
  } catch {
    return "Invalid time";
  }
};

// Format expiry helper
const formatExpiry = (dateString) => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch {
    return "Invalid date";
  }
};

// Slug formatter
const filterSlug = (input) => {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
};

const Settings = () => {
  const navigate = useNavigate();
  const { user, userDetails, isPremium } = useAuthStore();
  const {
    updateProfileSlug,
    updateProfileInfo,
    updatePassword,
    getSessions,
    sessions,
    deletesession,
    deleteAllSessions,
  } = useSettingsStore();

  // Form States
  const [name, setName] = useState(user.name);
  const [profileSlug, setProfileSlug] = useState(userDetails.profileSlug);
  const [bio, setBio] = useState(userDetails.bio);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState("");
  const isConfirmed = confirmText === "CONFIRM";

  useEffect(() => {
    getSessions();
  }, []);

  const handleUpdateProfileInfo = async () => {
    try {
      setLoading("updating-info");
      const res = await updateProfileInfo(userDetails.$id, { name, bio });
      if (res?.success) toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
    }
    setLoading("");
  };

  const handleUpdateProfileSlug = async (id, profileSlug) => {
    if (profileSlug.length < 8 || profileSlug.length > 25) {
      toast.error("Slug must be between 8 and 25 characters long");
      return;
    }
    try {
      setLoading("updating-slug");
      const res = await updateProfileSlug(id, profileSlug);
      if (res?.success) {
        setProfileSlug(profileSlug);
        toast.success("Profile link updated successfully");
      } else {
        toast.error("Profile link is not available");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading("");
  };

  const handleUpdatePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Please enter both current and new passwords");
      return;
    }

    if (oldPassword.length < 8 || newPassword.length < 8) {
      toast.error("Passwords must be at least 8 characters long");
      return;
    }

    try {
      setLoading("updating-password");
      const res = await updatePassword(oldPassword, newPassword);

      if (res?.success) {
        toast.success("Password updated successfully");
        setOldPassword("");
        setNewPassword("");
      } else {
        toast.error(res?.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Password update error:", error);
      toast.error("Error: " + error?.message || "Something went wrong");
    } finally {
      setLoading("");
    }
  };

  const handleEndSession = async (sessionId) => {
    try {
      setLoading(sessionId);
      const res = await deletesession(sessionId);

      if (res?.success) {
        toast.success("Session deleted successfully");
        getSessions();
      } else {
        toast.error(res?.message || "Failed to delete session");
      }
    } catch (error) {
      console.error("Session delete error:", error);
      toast.error("Error: " + error?.message || "Something went wrong");
    } finally {
      setLoading("");
    }
  };

  const handleDeleteAllSessions = async () => {
    try {
      setLoading("deleting-sessions");
      const res = await deleteAllSessions();

      if (res?.success) {
        toast.success("All sessions deleted successfully");
        getSessions();
      } else {
        toast.error(res?.message || "Failed to delete sessions");
      }
    } catch (error) {
      console.error("Sessions delete error:", error);
      toast.error("Error: " + error?.message || "Something went wrong");
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-gray-950 text-gray-100 py-16 sm:pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-lg mx-auto space-y-8">
        {/* Profile Setting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="bg-gray-900 rounded-xl shadow-md p-6 mt-14 md:mt-10 border border-gray-800"
        >
          <h2 className="flex items-center text-xl font-semibold mb-6 text-white">
            <User className="mr-2 text-gray-400" size={20} />
            Profile Information
          </h2>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative  ">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-gray-500" size={16} />
                  </div>
                  <input
                    type="email"
                    value={userDetails.email}
                    readOnly
                    className="w-full pl-10 pr-4 py-2 bg-gray-800/40 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Profile Link */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Profile Link
              </label>

              {/* Desktop Layout */}
              <div className="hidden md:flex items-center w-full border border-gray-600 rounded-lg bg-gray-800/40 overflow-hidden">
                <div className="flex items-center px-3 py-2 bg-gray-800/50 border-r border-gray-700">
                  <Layers2 className="text-gray-500 mr-2" size={16} />
                  <p className="text-gray-400 text-sm whitespace-nowrap">
                    {import.meta.env.VITE_FRONTEND_URL.split("//")[1]}/
                  </p>
                </div>

                <div className="flex-1 flex">
                  <input
                    type="text"
                    value={profileSlug}
                    onChange={(e) => setProfileSlug(filterSlug(e.target.value))}
                    readOnly={!isPremium}
                    className={`flex-1 px-3 py-2 bg-transparent outline-none ${
                      !isPremium
                        ? "cursor-not-allowed text-gray-400"
                        : "text-white"
                    }`}
                  />
                  {isPremium && profileSlug && (
                    <button
                      onClick={() =>
                        handleUpdateProfileSlug(userDetails.$id, profileSlug)
                      }
                      disabled={
                        loading === "updating-slug" ||
                        profileSlug === userDetails.profileSlug
                      }
                      className="px-4 py-2 flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-600/50 font-medium transition-colors whitespace-nowrap"
                    >
                      {loading === "updating-slug" && (
                        <Loader2 className="animate-spin mr-2" />
                      )}
                      {loading === "updating-slug"
                        ? "Updating"
                        : "Update Profile Link"}
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden space-y-2">
                <div className="flex items-center w-full border border-gray-600 rounded-lg bg-gray-800/40 overflow-hidden">
                  <div className="flex items-center px-3 py-2 bg-gray-800/50 border-r border-gray-700">
                    <Layers2 className="text-gray-500 mr-2" size={16} />
                    <p className="text-gray-400 text-sm whitespace-nowrap">
                      {import.meta.env.VITE_FRONTEND_URL.split("//")[1]}/
                    </p>
                  </div>
                  <input
                    type="text"
                    value={profileSlug}
                    onChange={(e) =>
                      setProfileSlug(e.target.value.toLowerCase())
                    }
                    readOnly={!isPremium}
                    className={`flex-1 px-3 py-2 bg-transparent outline-none ${
                      !isPremium
                        ? "cursor-not-allowed text-gray-400"
                        : "text-white"
                    }`}
                  />
                </div>

                {isPremium && (
                  <button
                    onClick={() =>
                      handleUpdateProfileSlug(userDetails.$id, profileSlug)
                    }
                    disabled={
                      loading === "updating-slug" ||
                      profileSlug === userDetails.profileSlug
                    }
                    className="w-full py-2 flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-600/50 font-medium rounded-lg transition-colors"
                  >
                    {loading === "updating-slug" && (
                      <Loader2 className="animate-spin mr-2" />
                    )}
                    {loading === "updating-slug"
                      ? "Updating"
                      : "Update Profile Link"}
                  </button>
                )}
              </div>

              {/* Tooltip */}
              <div className="transition-opacity duration-300 text-sky-100 text-xs mt-1">
                {!isPremium ? (
                  <div className="flex items-center gap-1">
                    <Info size={12} />
                    <span>
                      PRO feature!{" "}
                      <NavLink to="/upgrade" className="text-sky-400">
                        Upgrade?
                      </NavLink>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    Whitespaces will be automatically replaced with hyphens.
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="w-full space-y-2">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-300"
              >
                Bio
              </label>
              <textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={200}
                className="w-full min-h-[160px] sm:min-h-[100px] resize-none px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <div className="flex justify-between items-center text-sm">
                <span
                  className={`${
                    bio.length > 200 ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {bio.length} / 200
                </span>
              </div>

              <button
                onClick={handleUpdateProfileInfo}
                disabled={loading === "updating-info" || !name}
                className="mt-2 w-fit flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-600/50 transition-all"
              >
                {loading === "updating-info" ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Updating
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="bg-gray-900 rounded-xl shadow-md p-6 border border-gray-800"
        >
          <h2 className="flex items-center text-xl font-semibold mb-6 text-white">
            <Shield className="mr-2 text-gray-400" size={20} />
            Security
          </h2>

          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500 pr-10"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500 pr-10"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={handleUpdatePassword}
                disabled={loading === "updating-password"}
                className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-500/40 transition-colors flex items-center"
              >
                {loading === "updating-password" && (
                  <Loader2 className="animate-spin text-white h-5 w-5 mr-2" />
                )}
                {loading === "updating-password"
                  ? "Updating..."
                  : "Update Password"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Premium Upgrade Banner */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative rounded-2xl p-5 sm:p-6 overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg"
          >
            <div className="absolute -right-16 -top-16 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full animate-pulse-slow"></div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 sm:w-40 sm:h-40 bg-purple-500/10 rounded-full blur-xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm shadow-inner flex-shrink-0">
                  <Star
                    className="text-yellow-300"
                    size={20}
                    fill="currentColor"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Unlock Premium Features
                  </h3>
                  <p className="text-blue-100 mt-1 text-xs sm:text-sm max-w-md">
                    Get exclusive tools, enhanced analytics, and priority
                    support with our Pro plan.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/upgrade")}
                className="relative overflow-hidden w-full sm:w-auto mt-3 sm:mt-0 px-4 py-2 sm:px-5 sm:py-2.5 bg-white text-blue-800 font-medium sm:font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 group flex items-center justify-center shadow-md hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-1 sm:mr-2 text-sm sm:text-base">
                    Upgrade Now
                  </span>
                  <ChevronRight
                    size={14}
                    className="hidden sm:block transition-transform group-hover:translate-x-1"
                  />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>

            {/* Glitter effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              {[...Array(window.innerWidth < 640 ? 4 : 8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white/40 rounded-full"
                  style={{
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.6 + 0.2,
                    transform: `scale(${Math.random() * 0.5 + 0.5})`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Active Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className={`bg-gray-900 rounded-xl shadow-md p-6 border border-gray-800 
           
          `}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gray-800 rounded-lg">
                <MonitorSmartphone className="text-gray-400" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Active Sessions
              </h2>
            </div>

            <div className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-md font-poppins">
              {sessions.length} active
            </div>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <table className="min-w-[700px] w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="pb-3 pl-2">Device</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3">Started</th>
                  <th className="pb-3">Expires</th>
                  <th className="pb-3 pr-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {sessions.map((session) => (
                  <tr
                    key={session.$id}
                    className={`transition-colors ${
                      session.current
                        ? "bg-blue-900/20"
                        : "hover:bg-gray-800/50"
                    } ${
                      !session.current && !isPremium
                        ? "blur-sm pointer-events-none cursor-default select-none opacity-80"
                        : ""
                    }`}
                  >
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-800 rounded-lg">
                          <DeviceIcon
                            deviceName={session.deviceName}
                            clientName={session.clientName}
                          />
                        </div>
                        <div>
                          <p className="text-white font-medium mb-1">
                            {session.clientName}
                            {session.current && (
                              <span className="ml-2 items-center px-2 py-0.5 rounded-full font-medium text-sm border border-blue-500/30 bg-blue-600/20 text-blue-400">
                                Current Device
                              </span>
                            )}
                          </p>
                          <div className="flex items-center gap-2">
                            <OsIcon osCode={session.osCode} />
                            <span className="text-gray-300">
                              {session.osName} {session.osVersion}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="inline-flex items-center gap-1 text-gray-300">
                            <Globe className="text-emerald-400" size={14} />
                            {session.countryName}
                          </p>
                          <p className="text-gray-500 text-xs">{session.ip}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="text-gray-300">
                        {formatDate(session.$createdAt)}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {formatTime(session.$createdAt)}
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="text-gray-300">
                        {formatExpiry(session.expire)}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {formatDate(session.expire)}
                      </div>
                    </td>

                    <td className="py-4 pr-2 text-right">
                      {!session.current ? (
                        <button
                          onClick={() => handleEndSession(session.$id)}
                          disabled={loading === session.$id}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg font-medium border border-rose-500/30 bg-rose-600/20 text-rose-400 hover:bg-rose-800/20 hover:text-rose-500 disabled:border-gray-500/30 disabled:bg-gray-600/20 disabled:text-gray-400 transition-colors"
                        >
                          {loading === session.$id ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            "End Session"
                          )}
                        </button>
                      ) : (
                        <button className="inline-flex items-center px-3 py-1.5 rounded-lg font-medium border border-gray-500/30 bg-gray-600/20 text-gray-400 text-sm pointer-events-none cursor-not-allowed">
                          End Session
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Delete Account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
            delay: 0.15,
          }}
          className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800"
        >
          {/* Header */}
          <div className="flex items-center mb-4">
            <div className="p-2 bg-gray-800 rounded-lg mr-3">
              <Trash2 className="text-gray-400" size={20} />
            </div>
            <h2 className="text-xl font-semibold text-white">Delete Account</h2>
          </div>

          {/* Instruction */}
          <label className="text-sm text-gray-400 mb-4 block">
            Type <strong className="text-red-500/80 ">CONFIRM</strong> to
            permanently delete your account.
          </label>

          {/* Input + Action Row */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            {/* Input */}
            <div className="flex-1 mb-3 md:mb-0">
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="CONFIRM"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>

            {/* Delete Button */}
            <button
              disabled={!isConfirmed}
              className={`w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                isConfirmed
                  ? "bg-red-600/10 hover:bg-red-600/20 text-red-400"
                  : "bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed"
              }`}
            >
              <Trash2 size={16} />
              Delete Account
            </button>
          </div>

          {/* Warning */}
          <p className="mt-3 text-xs text-rose-500/90 font-poppins">
            This action is irreversible. Your data will be permanently deleted.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
