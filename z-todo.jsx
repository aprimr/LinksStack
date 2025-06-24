import { motion } from "framer-motion";
import {
  User,
  Eye,
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
} from "lucide-react";
import { FaApple, FaLinux, FaSafari } from "react-icons/fa";
import { DiAndroid } from "react-icons/di";
import { format, formatDistanceToNow } from "date-fns";

const dummySessions = [
  {
    $id: "6858082c9073a5ec70c8",
    $createdAt: "2025-06-22T13:42:04.600+00:00",
    $updatedAt: "2025-06-22T13:42:04.600+00:00",
    clientCode: "CM",
    clientEngine: "Blink",
    clientEngineVersion: "137.0.0.0",
    clientName: "Chrome Mobile",
    clientType: "mobile", // changed from "browser"
    clientVersion: "137.0",
    countryCode: "np",
    countryName: "Nepal",
    current: false,
    deviceBrand: "",
    deviceModel: "",
    deviceName: "smartphone",
    expire: "2026-06-22T13:42:04.591+00:00",
    factors: ["password"],
    ip: "111.119.34.67",
    mfaUpdatedAt: "",
    osCode: "AND",
    osName: "Android",
    osVersion: "10",
    provider: "email",
    providerAccessToken: "",
    providerAccessTokenExpiry: "",
    providerRefreshToken: "",
    providerUid: "aprimregmi24@gmail.com",
    secret: "",
    userId: "6856c828001479605ba7",
  },
  {
    $id: "685847136cd8aea9906a",
    $createdAt: "2025-06-22T18:10:27.451+00:00",
    $updatedAt: "2025-06-22T18:10:27.451+00:00",
    clientCode: "CH",
    clientEngine: "Blink",
    clientEngineVersion: "137.0.0.0",
    clientName: "Chrome",
    clientType: "desktop", // changed from "browser"
    clientVersion: "137.0",
    countryCode: "np",
    countryName: "Nepal",
    current: false,
    deviceBrand: "",
    deviceModel: "",
    deviceName: "desktop",
    expire: "2026-06-22T18:10:27.445+00:00",
    factors: ["password"],
    ip: "111.119.34.67",
    mfaUpdatedAt: "",
    osCode: "LIN",
    osName: "GNU/Linux",
    osVersion: "",
    provider: "email",
    providerAccessToken: "",
    providerAccessTokenExpiry: "",
    providerRefreshToken: "",
    providerUid: "aprimregmi24@gmail.com",
    secret: "",
    userId: "6856c828001479605ba7",
  },
  {
    $id: "685984603afed5cf6967",
    $createdAt: "2025-06-23T16:44:16.251+00:00",
    $updatedAt: "2025-06-23T16:44:16.251+00:00",
    clientCode: "CM",
    clientEngine: "Blink",
    clientEngineVersion: "137.0.0.0",
    clientName: "Chrome Mobile",
    clientType: "mobile", // changed from "browser"
    clientVersion: "137.0",
    countryCode: "np",
    countryName: "Nepal",
    current: false,
    deviceBrand: "",
    deviceModel: "",
    deviceName: "smartphone",
    expire: "2026-06-23T16:44:16.241+00:00",
    factors: ["password"],
    ip: "111.119.34.35",
    mfaUpdatedAt: "",
    osCode: "AND",
    osName: "Android",
    osVersion: "10",
    provider: "email",
    providerAccessToken: "",
    providerAccessTokenExpiry: "",
    providerRefreshToken: "",
    providerUid: "aprimregmi24@gmail.com",
    secret: "",
    userId: "6856c828001479605ba7",
  },
  {
    $id: "685989bbc17973795331",
    $createdAt: "2025-06-23T17:07:07.798+00:00",
    $updatedAt: "2025-06-23T17:07:07.798+00:00",
    clientCode: "MF",
    clientEngine: "WebKit",
    clientEngineVersion: "605.1.15",
    clientName: "Mobile Safari",
    clientType: "mobile",
    clientVersion: "16.6",
    countryCode: "np",
    countryName: "Nepal",
    current: false,
    deviceBrand: "Apple",
    deviceModel: "iPhone",
    deviceName: "smartphone",
    expire: "2026-06-23T17:07:07.792+00:00",
    factors: ["password"],
    ip: "111.119.34.35",
    mfaUpdatedAt: "",
    osCode: "IOS",
    osName: "iOS",
    osVersion: "16.6",
    provider: "email",
    providerAccessToken: "",
    providerAccessTokenExpiry: "",
    providerRefreshToken: "",
    providerUid: "aprimregmi24@gmail.com",
    secret: "",
    userId: "6856c828001479605ba7",
  },
  {
    $id: "685a66e7ddc4e0d6b03c",
    $createdAt: "2025-06-24T08:50:47.913+00:00",
    $updatedAt: "2025-06-24T08:50:47.913+00:00",
    clientCode: "CH",
    clientEngine: "Blink",
    clientEngineVersion: "137.0.0.0",
    clientName: "Chrome",
    clientType: "desktop", // changed from "browser"
    clientVersion: "137.0",
    countryCode: "np",
    countryName: "Nepal",
    current: true,
    deviceBrand: "",
    deviceModel: "",
    deviceName: "desktop",
    expire: "2026-06-24T08:50:47.908+00:00",
    factors: ["password"],
    ip: "111.119.34.35",
    mfaUpdatedAt: "",
    osCode: "LIN",
    osName: "GNU/Linux",
    osVersion: "",
    provider: "email",
    providerAccessToken: "",
    providerAccessTokenExpiry: "",
    providerRefreshToken: "",
    providerUid: "aprimregmi24@gmail.com",
    secret: "",
    userId: "6856c828001479605ba7",
  },
];

const Settings = () => {
  // Assuming the account email is fetched or available here as a constant for demonstration
  const accountEmail = "user@example.com";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-gray-950 text-gray-100 py-16 pt-[8rem] sm:pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-lg mx-auto space-y-8">
        {/* Premium Upgrade Banner - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-2xl p-5 sm:p-6 mt-5 overflow-hidden border border-transparent bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg mx-4 sm:mx-0"
        >
          {/* Background elements */}
          <div className="absolute -right-16 -top-16 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full animate-pulse-slow"></div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 sm:w-40 sm:h-40 bg-purple-500/20 rounded-full blur-xl"></div>

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
                  Get exclusive tools, enhanced analytics, and priority support
                  with our Pro plan.
                </p>
              </div>
            </div>

            <button className="relative overflow-hidden w-full sm:w-auto mt-3 sm:mt-0 px-4 py-2 sm:px-5 sm:py-2.5 bg-white text-blue-800 font-medium sm:font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 group flex items-center justify-center shadow-md hover:shadow-lg">
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
            {[
              ...Array(
                typeof window !== "undefined" && window.innerWidth < 640 ? 4 : 8
              ),
            ].map((_, i) => (
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

        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="bg-gray-900 rounded-xl shadow-md p-6 border border-gray-900"
        >
          <h2 className="flex items-center text-xl font-semibold mb-6 text-white">
            <User className="mr-2 text-gray-400" size={20} /> Profile
            Information
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Display Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Account Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-500" size={16} />
                </div>
                <input
                  type="email"
                  value={accountEmail}
                  readOnly
                  className="w-full pl-10 px-4 py-2 bg-gray-800/40 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500"
              />
            </div>

            <div className="pt-2">
              <button className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Check className="mr-2" size={16} /> Save Changes
              </button>
            </div>
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="space-y-5 p-5  bg-gray-900 rounded-xl shadow-md border border-gray-900"
        >
          <h2 className="flex items-center text-xl font-semibold mb-6 text-white">
            <Shield className="mr-2 text-gray-400" size={20} />
            Security
          </h2>
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500 pr-10"
                />
                <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300">
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500 pr-10"
                />
                <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300">
                  <Eye size={18} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <button className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Check className="mr-2" size={16} /> Update Password
            </button>
          </div>
        </motion.div>

        {/* Active Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="bg-gray-900 rounded-xl shadow-md p-6 border border-gray-800"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center text-xl font-semibold text-white">
              <MonitorSmartphone className="mr-2 text-gray-400" size={20} />
              Active Sessions
            </h2>
            {dummySessions.length > 1 && (
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 text-sm transition-colors">
                <LogOut size={16} />
                <span className="hidden sm:inline">Log out all</span>
              </button>
            )}
          </div>

          {/* Sessions Table */}
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
                {dummySessions.map((session) => {
                  // Determine device icon based on clientType
                  const deviceIcon = () => {
                    if (session.clientType === "mobile") {
                      return <Smartphone className="text-blue-400" size={18} />;
                    } else if (session.clientType === "desktop") {
                      return <Monitor className="text-green-400" size={18} />;
                    } else if (session.clientName.includes("Safari")) {
                      return <FaSafari className="text-purple-400" size={18} />;
                    } else {
                      return <Globe className="text-gray-400" size={18} />;
                    }
                  };

                  // Determine OS icon
                  const osIcon = () => {
                    if (session.osCode === "AND") {
                      return <DiAndroid className="text-green-500" size={16} />;
                    } else if (session.osCode === "IOS") {
                      return <FaApple className="text-gray-300" size={16} />;
                    } else if (session.osCode === "LIN") {
                      return <FaLinux className="text-yellow-500" size={16} />;
                    } else {
                      return null;
                    }
                  };

                  return (
                    <tr
                      key={session.$id}
                      className={`transition-colors ${
                        session.current
                          ? "bg-blue-900/20"
                          : "hover:bg-gray-800/50"
                      }`}
                    >
                      <td className="py-4 pl-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-800 rounded-lg">
                            {deviceIcon()}
                          </div>
                          <div>
                            <p className="inline-flex text-white pb-0.5 font-medium gap-3">
                              {session.clientName}
                              {session.current && (
                                <span className="px-2 rounded-lg font-medium text-xs border border-emerald-500/40 bg-emerald-600/30 text-emerald-400 select-none">
                                  Current
                                </span>
                              )}
                            </p>
                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                              {osIcon()}
                              <span>
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
                              <Globe className="text-sky-400" size={14} />

                              {session.countryName}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {session.ip}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="text-gray-300">
                          {format(new Date(session.$createdAt), "PP")}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {format(new Date(session.$createdAt), "pp")}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="text-gray-300">
                          {formatDistanceToNow(new Date(session.expire), {
                            addSuffix: true,
                          })}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {format(new Date(session.expire), "PP")}
                        </div>
                      </td>
                      <td className="py-4 pr-2 text-right">
                        {!session.current && (
                          <button className="inline-flex items-center px-3 py-1.5 rounded-md text-sm transition-all border border-rose-500/30 bg-rose-600/20 text-rose-400 hover:bg-rose-600/30 shadow-md shadow-rose-500/10">
                            <LogOut className="mr-1.5" size={14} />
                            <span>Log out</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Delete Account Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
            delay: 0.15,
          }}
          className="bg-gray-900 rounded-xl shadow-md p-6 border border-gray-900"
        >
          <h2 className="flex items-center text-xl font-semibold mb-4 text-white">
            <Trash2 className="mr-2 text-red-400" size={20} /> Delete Account
          </h2>

          <p className="text-sm text-gray-400 mb-4">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>

          <button className="w-full flex justify-between items-center px-4 py-3 bg-red-600/10 hover:bg-red-600/20 rounded-lg text-red-400 transition-colors">
            <span className="flex items-center">
              <Trash2 className="mr-2" size={16} /> Delete Account
            </span>
            <ChevronRight className="text-red-400" size={16} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
