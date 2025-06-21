import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Check,
  Trash2,
  LogOut,
  Mail,
  Layers2,
  Home,
  HomeIcon,
} from "lucide-react";
import useAuthStore from "../store/authStore";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

const VerifyAccount = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const deleteAccount = useAuthStore((state) => state.deleteAccount);
  const sendVerificationLink = useAuthStore(
    (state) => state.sendVerificationLink
  );

  const handleSendVerificationLink = async () => {
    setIsLoading(true);
    try {
      await sendVerificationLink();
      setIsVerified(true);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" min-h-[100svh] flex justify-center items-center bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 p-4"
    >
      <motion.div
        initial={{ scale: 0.96, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-md mx-2 sm:mx-4 p-2 sm:p-8 space-y-8 bg-transparent sm:bg-gradient-to-t from-gray-950 via-gray-900 to-gray-800 rounded-3xl sm:border border-gray-900/50 "
      >
        {/* Unverified View */}
        {!isVerified ? (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Header */}
            <motion.div
              className="flex flex-col items-center space-y-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                Verify Your Account
              </h1>
              <div className="flex items-center gap-2 text-gray-300 bg-gray-700/40 px-4 py-2 rounded-full font-poppins">
                <Mail className="w-5 h-5" />
                <span className="text-sm sm:text-base">{user.email}</span>
              </div>
            </motion.div>

            <p className="text-gray-300 text-center text-sm sm:text-base font-poppins">
              Click the button below to receive a verification link in your
              inbox.
            </p>

            {/* Verify Button */}
            <motion.button
              onClick={handleSendVerificationLink}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              disabled={isLoading}
              className={`w-full py-3 sm:py-3.5 px-6 rounded-xl text-base sm:text-lg font-semibold text-white shadow-lg flex items-center justify-center gap-2 ${
                isLoading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-600"
              }`}
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Verifying...
                </>
              ) : (
                <>Send Verification Link</>
              )}
            </motion.button>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-sm sm:text-base">
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </motion.button>
              <motion.button
                onClick={() => {
                  window.location.href = "/";
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-sky-800 hover:bg-sky-700 text-gray-100 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </motion.button>
            </div>
          </motion.div>
        ) : (
          // Verified View
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="flex flex-col items-center space-y-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                initial={{ rotate: 8, scale: 0.7 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.2, ease: "linear" }}
                className="p-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl   shadow-lg "
              >
                <Check className="w-10 h-10 text-white stroke-[5]" />
              </motion.div>
              <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                Verification Link Sent
              </h1>
              <div className="flex items-center gap-2 text-gray-300 bg-gray-800/50 px-4 py-2 rounded-full">
                <Mail className="w-5 h-5" />
                <span className="text-sm sm:text-base">{user.email}</span>
              </div>
            </motion.div>
            <p className="text-gray-300 text-center text-sm sm:text-base font-poppins">
              We've sent a verification link to your email. Please check your
              inbox, click the link to verify your account, and then click
              Continue.
            </p>

            <motion.button
              onClick={() => window.location.reload()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 sm:py-3.5 px-6 text-base sm:text-lg font-semibold bg-gradient-to-br from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* LinksStack Footer */}
      <footer className="absolute bottom-6 w-full text-center text-xl text-white font-normal sm:font-semibold">
        <Layers2 className="inline-block mr-2 h-6 w-6 font-inter" />
        LinksStack
      </footer>
    </motion.div>
  );
};

export default VerifyAccount;
