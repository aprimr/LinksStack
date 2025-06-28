import { use, useEffect, useState } from "react";
import { BadgeCheck, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthStore from "../store/authStore";
import { toast } from "sonner";

const PaymentSuccess = () => {
  const userDetails = useAuthStore((state) => state.userDetails);
  const upgrade = useAuthStore((state) => state.upgrade);
  const isPremium = useAuthStore((state) => state.isPremium);
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uId, setUId] = useState("");

  useEffect(() => {
    if (isPremium) {
      navigate("/upgrade");
    }
  }, [isPremium, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get("data");

    if (encodedData) {
      try {
        const decodedString = atob(encodedData);
        const dataObject = JSON.parse(decodedString);
        setPaymentData(dataObject);

        const extractedId = dataObject.transaction_uuid.split("-")[1];
        setUId(extractedId);
      } catch (error) {
        toast.error("Error decoding payment data");
        navigate("/");
      }
    } else {
      navigate("/");
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (paymentData && uId && userDetails?.$id) {
      if (paymentData.status !== "COMPLETE") {
        navigate("/upgrade");
      } else if (uId !== userDetails.userId) {
        toast.error("Transaction user ID mismatch");
        navigate("/payment-failed");
      } else {
        upgrade(uId, paymentData).then((res) => {
          if (!res.success) {
            toast.error(res.message || "Failed to upgrade to premium");
            navigate("/");
          }
        });
      }
    }
  }, [paymentData, uId, userDetails, navigate, upgrade]);

  const particles = Array(50).fill(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Colorful Confetti Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{
              opacity: 0,
              y: -10,
              x: Math.random() * 100 - 50,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              y: window.innerHeight,
              x: Math.random() * 100 - 50,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              background: `hsl(${Math.random() * 360}, 90%, 65%)`,
            }}
          />
        ))}
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-950 rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden backdrop-blur-sm z-10"
      >
        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#111827_0%,#1f2937_25%,#111827_50%,#1f2937_75%,#111827_100%)] opacity-30 pointer-events-none" />
        <div className="absolute inset-0 border border-gray-600/20 rounded-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-green-500/5 rounded-2xl pointer-events-none" />

        <div className="p-8 sm:p-10 relative z-10">
          {/* Avatar and Badge */}
          <motion.div
            className="relative mx-auto w-32 h-32 mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-br from-amber-400 via-rose-500 to-pink-600 shadow-xl">
              <img
                src={userDetails?.avatarUrl}
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover bg-gray-900"
              />
            </div>

            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 500 }}
              className="absolute bottom-1 right-1 w-8 h-8 rounded-full p-1 bg-gradient-to-br from-amber-400 to-rose-500 shadow-lg"
            >
              <div className="w-full h-full rounded-full flex items-center justify-center">
                <BadgeCheck className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-center mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400">
              Payment Successful
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-6 mx-auto text-center text-gray-200 break-words text-balance font-poppins"
          >
            Your payment has been processed successfully. Enjoy access to all
            premium features and priority support.
          </motion.p>

          {/* Pro Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="mb-10 text-center"
          >
            <span className="text-2xl sm:text-3xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-400 to-fuchsia-400 drop-shadow-md">
              YOU'RE NOW A PRO!
            </span>
          </motion.div>

          {/* Dashboard Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-4"
          >
            <button
              onClick={() => navigate("/dashboard")}
              disabled={loading}
              className="relative overflow-hidden py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading && <Loader2 className="h-6 w-6" />}
                {loading ? "Processing request" : "Go to Dashboard"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
