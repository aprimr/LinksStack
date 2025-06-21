import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AlertCircle, Check, Layers2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import useAuthStore from "../store/authStore";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying your email...");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const verifyEmail = useAuthStore((state) => state.verifyEmail);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.emailVerification) navigate("/dashboard");

    const verify = async () => {
      const userId = searchParams.get("userId");
      const secret = searchParams.get("secret");

      if (!userId || !secret) {
        setMessage("Invalid verification link. Please check your email again.");
        setIsError(true);
        setIsLoading(false);
        return;
      }

      try {
        const result = await verifyEmail(userId, secret);

        if (result.success) {
          setMessage(
            "Email verified successfully! Redirecting to dashboard..."
          );
          setIsError(false);
          setTimeout(() => navigate("/dashboard"), 3000);
        } else {
          setMessage(result.error || "Verification failed. Please try again.");
          setIsError(true);
        }
      } catch (error) {
        setMessage("An unexpected error occurred. Please try again.");
        setIsError(true);
      }

      setIsLoading(false);
    };

    verify();
  }, [searchParams, navigate, user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 text-center bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 text-white font-poppins overflow-hidden relative">
      {/* Main Card */}
      <motion.div
        className="p-8 sm:p-12 rounded-3xl max-w-lg w-full space-y-6 mt-16 bg-gradient-to-b from-gray-800 to-gray-900/30 border border-gray-900 relative overflow-hidden z-10"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Animated border highlight */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-transparent pointer-events-none"
          animate={{
            borderColor: [
              "rgba(99,102,241,0)",
              "rgba(99,102,241,0.3)",
              "rgba(99,102,241,0)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <AnimatePresence mode="wait">
          {/* Loading */}
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center space-y-8"
            >
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <Loader2 className="w-20 h-20 text-indigo-400" />
              </motion.div>
              <div className="space-y-2">
                <h1 className="text-4xl font-semibold text-white">
                  Verifying Email
                </h1>
                <p className="text-gray-400">
                  Please wait a moment while we verify your email.
                </p>
              </div>
            </motion.div>
          )}

          {/* Error */}
          {isError && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center space-y-6"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{ repeat: 1, duration: 0.6 }}
              >
                <AlertCircle className="w-16 h-16 text-rose-500" />
              </motion.div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-rose-500">
                  Verification Failed
                </h1>
                <p className="text-gray-300 text-lg">{message}</p>
              </div>
              <motion.button
                onClick={() => navigate("/")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 sm:py-3.5 px-6 text-base sm:text-lg font-medium bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-500 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                Back to Home
              </motion.button>
            </motion.div>
          )}

          {/* Success */}
          {!isLoading && !isError && (
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
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{ repeat: 1, duration: 0.6 }}
                  className="p-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl   shadow-lg "
                >
                  <Check className="w-10 h-10 text-white stroke-[5]" />
                </motion.div>
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                  Account Verified
                </h1>
              </motion.div>
              <p className="text-gray-300 text-center text-sm sm:text-base font-poppins">
                Your account has been successfully verified. You can now
                continue to use our services.
              </p>

              <motion.button
                onClick={() => navigate("/")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 sm:py-3.5 px-6 text-base sm:text-lg font-medium bg-gradient-to-br from-emerald-400 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                Continue
              </motion.button>
            </motion.div>
          )}

          {/*  */}
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-10 flex gap-2 items-center z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Layers2 className="h-8 w-8 text-blue-400" />
        <h1 className="text-3xl font-medium text-white">LinksStack</h1>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
