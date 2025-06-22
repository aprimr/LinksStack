import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { LogOut, Settings, User, Plus, Link, BarChart } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-indigo-500">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-1">
              Welcome back,{" "}
              <span className="text-indigo-300">
                {user?.name || user?.email}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/settings")}
              className="p-2.5 rounded-lg bg-gray-800 hover:bg-gray-700/50 transition-colors border border-gray-700"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5 text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-red-400 rounded-lg transition-colors border border-gray-700"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:border-indigo-500/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Links</p>
                <h3 className="text-2xl font-bold mt-1 text-white">42</h3>
              </div>
              <div className="p-3 bg-indigo-900/30 rounded-lg border border-indigo-800/50">
                <Link className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:border-green-500/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Clicks Today
                </p>
                <h3 className="text-2xl font-bold mt-1 text-white">128</h3>
              </div>
              <div className="p-3 bg-green-900/30 rounded-lg border border-green-800/50">
                <BarChart className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:border-amber-500/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Top Link</p>
                <h3 className="text-lg font-bold mt-1 text-white truncate">
                  linksstack.com/pro
                </h3>
              </div>
              <div className="p-3 bg-amber-900/30 rounded-lg border border-amber-800/50">
                <User className="h-5 w-5 text-amber-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/create-link")}
              className="flex flex-col items-center justify-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-indigo-500/30 transition-all backdrop-blur-sm"
            >
              <div className="p-3 bg-indigo-900/30 rounded-full mb-3 border border-indigo-800/50">
                <Plus className="h-5 w-5 text-indigo-400" />
              </div>
              <span className="font-medium text-gray-200">Create Link</span>
            </motion.button>

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/analytics")}
              className="flex flex-col items-center justify-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-all backdrop-blur-sm"
            >
              <div className="p-3 bg-green-900/30 rounded-full mb-3 border border-green-800/50">
                <BarChart className="h-5 w-5 text-green-400" />
              </div>
              <span className="font-medium text-gray-200">Analytics</span>
            </motion.button>

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/profile")}
              className="flex flex-col items-center justify-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-amber-500/30 transition-all backdrop-blur-sm"
            >
              <div className="p-3 bg-amber-900/30 rounded-full mb-3 border border-amber-800/50">
                <User className="h-5 w-5 text-amber-400" />
              </div>
              <span className="font-medium text-gray-200">Profile</span>
            </motion.button>

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/settings")}
              className="flex flex-col items-center justify-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all backdrop-blur-sm"
            >
              <div className="p-3 bg-purple-900/30 rounded-full mb-3 border border-purple-800/50">
                <Settings className="h-5 w-5 text-purple-400" />
              </div>
              <span className="font-medium text-gray-200">Settings</span>
            </motion.button>
          </div>
        </div>

        {/* Recent Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6 backdrop-blur-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Links</h2>
            <button
              onClick={() => navigate("/links")}
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((link) => (
              <motion.div
                key={link}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-4 hover:bg-gray-700/30 rounded-lg transition-colors border border-gray-700/50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-900/30 rounded-lg border border-indigo-800/50">
                    <Link className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">
                      linksstack.com/pro-{link}
                    </h3>
                    <p className="text-sm text-gray-400">Created 2 days ago</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-300">
                  128 clicks
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
