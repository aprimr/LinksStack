import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  CheckCircle,
  Sparkles,
  ShieldCheck,
  X,
  Flame,
  Loader2,
  ChevronDown,
  KeyRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { functions } from "../appwrite/config";
import { toast } from "sonner";
import Esewa from "../assets/esewa.png";
import ImePay from "../assets/imepay.png";
import Khalti from "../assets/khalti.png";

function Upgrade() {
  const user = useAuthStore((state) => state.user);
  const isPremium = useAuthStore((state) => state.isPremium);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showTestCredentials, setShowTestCredentials] = useState(false);
  const [loadingButton, setLoadingButton] = useState();

  const scrollRef = useRef(null);

  useEffect(() => {
    if (showPaymentModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPaymentModal]);

  const handlePayWithEsewa = async () => {
    try {
      setLoadingButton("esewa");
      const result = await functions.createExecution(
        import.meta.env.VITE_ESEWA_PAYMENT_GATEWAY_FUNCTION_ID,
        JSON.stringify({ userId: user.$id })
      );

      if (result.responseStatusCode !== 200) {
        toast.error("Failed to initiate eSewa payment.");
        return;
      }

      const parsed = JSON.parse(result.responseBody);
      if (parsed.error) {
        toast.error("Server error.");
      } else {
        const { esewaUrl, payload } = parsed;

        const form = document.createElement("form");
        form.method = "POST";
        form.action = esewaUrl;

        Object.entries(payload).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        setLoadingButton(null);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // const handlePayWithKhalti = () => {
  //   try {
  //     setLoadingButton("khalti");
  //     toast.info("Khalti payment is not available yet.");
  //     setLoadingButton(null);
  //   } catch (error) {
  //     console.log("Payment error:", error);
  //   }
  // };

  // const handlePayWithImePay = () => {
  //   try {
  //     setLoadingButton("imepay");
  //     toast.info("ImePay payment is not available yet.");
  //     setLoadingButton(null);
  //   } catch (error) {
  //     console.log("Payment error:", error);
  //   }
  // };

  // Function to handle horizontal scrolling

  const handleWheel = (e) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-md mx-auto space-y-8">
        {/* Header with conditional title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br sm:bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 brightness-150 mb-2 font-sans">
            {isPremium ? "You Are PRO" : "Upgrade To PRO"}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 mt-2"
          >
            {!isPremium && "Unlock premium features"}
          </motion.p>
        </motion.div>

        {/* Price Display - Only shows if not premium */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-tl from-gray-900/80 via-gray-950/80 to-amber-900/20 border border-amber-600/50 rounded-xl p-6 text-center overflow-hidden"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/10 rounded-full filter blur-3xl"></div>
            </div>

            <p className="text-gray-300 text-sm mb-1 font-medium">
              One-time payment
            </p>
            <div className="relative inline-block">
              <p className="font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-amber-400 via-rose-500 to-fuchsia-600 text-5xl tracking-tight">
                रु 299
              </p>
            </div>
            <p className="text-gray-400 text-sm mt-2 font-medium">
              Lifetime access, no recurring fees
            </p>
          </motion.div>
        )}

        {/* Pro Plan Card */}
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.01 }}
          className="relative w-full rounded-xl bg-gradient-to-br from-gray-900/80 via-gray-950/80 to-amber-900/20 p-8 border border-amber-600/30 shadow-xl shadow-amber-900/10 flex flex-col backdrop-blur-sm"
        >
          {/* Top Badge */}
          <div className="w-full flex justify-center">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -top-3 border border-amber-600 text-white bg-gradient-to-br from-amber-900 via-gray-950 to-amber-900 text-xs font-semibold px-4 py-1 rounded-full tracking-wider shadow-lg shadow-amber-900/30 uppercase"
            >
              {isPremium
                ? "Thank you for your support!"
                : "Pay once, enjoy forever"}
            </motion.div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-8">
              <motion.div
                initial={{ rotate: -15, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="bg-gradient-to-tl from-amber-900/50 via-gray-900/80 to-gray-800 p-3 rounded-xl border border-amber-600/20 shadow-inner shadow-amber-900/20"
              >
                <Zap className="text-amber-300 h-7 w-7" />
              </motion.div>
              <div className="text-right">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600">
                  Pro
                </h3>
                <p className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-500 text-sm font-poppins">
                  Never Expires
                </p>
              </div>
            </div>

            {/* Features List */}
            <ul className="space-y-4">
              {[
                "Unlimited links",
                "Custom domains support",
                "Advanced analytics dashboard",
                "Premium themes & customization",
                "Priority customer support",
                "No branding - 100% yours",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="flex items-start gap-3 group"
                >
                  <CheckCircle className="text-amber-400 mt-0.5 flex-shrink-0 h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-200 group-hover:text-white transition-colors">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Upgrade Button Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-4"
        >
          {isPremium ? (
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled
              className="w-full flex justify-center items-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-400 font-semibold py-4 px-6 rounded-xl cursor-not-allowed border border-gray-700/50 shadow-inner"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-tl from-amber-300 to-amber-100">
                SUBSCRIBED
              </span>
            </motion.button>
          ) : (
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-fuchsia-600/20 to-rose-500/20 animate-pulse rounded-xl blur-xs" />
              <button
                onClick={() => setShowPaymentModal(true)}
                className="relative w-full flex justify-center items-center bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 hover:brightness-110 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-rose-500/30 group"
              >
                <Sparkles className="mr-2 h-5 w-5 text-white/90" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-100 to-white brightness-125">
                  Upgrade to PRO
                </span>
                <Sparkles className="ml-2 h-5 w-5 text-white/90" />
              </button>
            </motion.div>
          )}

          {/* Payment Methods & Guarantee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="pt-4 border-t border-gray-800/50"
          >
            <div className="flex flex-col items-center">
              {!isPremium && (
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  <span className="text-xs text-gray-200">
                    Secure payment processing
                  </span>
                </div>
              )}

              <p className="text-xs text-gray-400 mt-1">
                {isPremium && (
                  <p>
                    Need Help?
                    <NavLink to="/support" className="ml-1 text-amber-100">
                      Contact Support
                    </NavLink>
                  </p>
                )}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Select payment method */}
      {showPaymentModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ y: 20, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-2xl border border-amber-900/60 bg-gradient-to-br from-gray-900 via-gray-950 to-black bg-opacity-90 backdrop-blur-lg p-8 "
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setLoadingButton(null);
              }}
              className="absolute top-5 right-5 p-1 rounded-full hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-950"
              aria-label="Close payment modal"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-amber-400" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-rose-400 to-fuchsia-500 bg-clip-text text-transparent mb-3">
                Complete Your Payment
              </h2>
              <p className="text-gray-300 text-sm font-poppins">
                Choose your preferred payment method
              </p>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4 mb-8">
              {/* Esewa Button */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loadingButton === "esewa"}
                onClick={handlePayWithEsewa}
                className={`w-full flex items-center justify-between bg-gradient-to-l disabled:from-gray-800 disabled:to-gray-950 from-green-500 to-gray-900 px-4 py-1 rounded-xl shadow-lg`}
              >
                <div className="flex items-center gap-4">
                  {loadingButton === "esewa" ? (
                    <Loader2 className="animate-spin text-white h-7 w-7 my-2.5" />
                  ) : (
                    <img
                      src={Esewa}
                      alt="Esewa"
                      className="h-12 w-auto"
                      loading="lazy"
                    />
                  )}
                  <span className="text-white flex justify-center items-center gap-2 font-medium text-lg font-poppins">
                    {loadingButton === "esewa"
                      ? "Redirecting to esewa"
                      : "Pay with Esewa"}
                  </span>
                </div>
                <Zap className="text-white/90 w-5 h-5" />
              </motion.button>

              {/* Khalti Button 
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loadingButton === "khalti"}
                onClick={handlePayWithKhalti}
                className={`w-full flex items-center justify-between bg-gradient-to-l disabled:from-gray-800 disabled:to-gray-950 from-purple-600 to-gray-900 px-4 py-1 rounded-xl shadow-lg`}
              >
                <div className="flex items-center gap-4">
                  {loadingButton === "khalti" ? (
                    <Loader2 className="animate-spin text-white h-7 w-7 my-2.5" />
                  ) : (
                    <img
                      src={Khalti}
                      alt="Khalti"
                      className="h-12 w-auto"
                      loading="lazy"
                    />
                  )}
                  <span className="text-white flex justify-center items-center gap-2 font-medium text-lg font-poppins">
                    {loadingButton === "khalti"
                      ? "Redirecting to khalti"
                      : "Pay with Khalti"}
                  </span>
                </div>
                <Sparkles className="text-white/90 w-5 h-5" />
              </motion.button>

               ImePay Button 
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loadingButton === "imepay"}
                onClick={handlePayWithImePay}
                className={`w-full flex items-center justify-between bg-gradient-to-l disabled:from-gray-800 disabled:to-gray-950 from-rose-500 to-gray-900 px-4 py-1 rounded-xl shadow-lg`}
              >
                <div className="flex items-center gap-4">
                  {loadingButton === "imepay" ? (
                    <Loader2 className="animate-spin text-white h-7 w-7 my-2.5" />
                  ) : (
                    <img
                      src={ImePay}
                      alt="ImePay"
                      className="h-12 w-auto"
                      loading="lazy"
                    />
                  )}
                  <span className="text-white flex justify-center items-center gap-2 font-medium text-lg font-poppins">
                    {loadingButton === "imepay"
                      ? "Redirecting to imepay"
                      : "Pay with ImePay"}
                  </span>
                </div>
                <Flame className="text-white/90 w-5 h-5" />
              </motion.button> */}
            </div>

            {/* View Test Credentials */}
            <div className="flex flex-col items-center mt-4 mb-4 w-full max-w-sm mx-auto">
              {/* Header */}
              <div
                onClick={() => setShowTestCredentials(!showTestCredentials)}
                className="w-full flex justify-between items-center text-sm text-gray-300 mb-2 font-poppins px-2 cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-amber-400" />
                  <span className="font-semibold">Test Credentials</span>
                </div>
                <motion.div
                  animate={{ rotate: showTestCredentials ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="h-5 w-5 text-amber-400" />
                </motion.div>
              </div>

              {/* Animated Credential Table */}
              <AnimatePresence initial={false}>
                {showTestCredentials && (
                  <motion.div
                    key="credentials"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden w-full"
                  >
                    <p className="text-[10px] md:text-xs text-gray-400/70 mb-2 font-poppins px-2 select-none">
                      These credentials are provided by wallets for testing
                      purposes and do not perform real transactions.
                    </p>
                    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-md py-3 shadow-md">
                      {/* Scrollable wrapper */}

                      <div
                        className="overflow-x-auto scrollbar-hide"
                        ref={scrollRef}
                        onWheel={handleWheel}
                      >
                        <table className="w-full min-w-[500px] text-xs text-gray-300 font-poppins border-collapse">
                          <thead className="select-none">
                            <tr className="text-white border-b border-gray-700">
                              <th className="py-2 px-3 font-semibold text-left">
                                Gateway
                              </th>
                              <th className="py-2 px-3 font-semibold text-left">
                                Phone
                              </th>
                              <th className="py-2 px-3 font-semibold text-left">
                                MPIN
                              </th>
                              <th className="py-2 px-3 font-semibold text-left">
                                Password
                              </th>
                              <th className="py-2 px-3 font-semibold text-left">
                                OTP
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                gateway: "eSewa",
                                phone: "9806800001",
                                mpin: "1122",
                                pass: "Nepal@123",
                                otp: "123456",
                              },
                              // {
                              //   gateway: "Khalti",
                              //   phone: "9806800002",
                              //   mpin: "3344",
                              //   pass: "Khalti@123",
                              //   otp: "654321",
                              // },
                              // {
                              //   gateway: "IME Pay",
                              //   phone: "9806800003",
                              //   mpin: "5566",
                              //   pass: "ImePay@123",
                              //   otp: "112233",
                              // },
                            ].map((item, i) => (
                              <tr
                                key={i}
                                className="border-b border-gray-800 last:border-none hover:bg-gray-800 transition-colors"
                              >
                                <td className="py-2 px-3">{item.gateway}</td>
                                <td className="py-2 px-3 text-white font-medium">
                                  {item.phone}
                                </td>
                                <td className="py-2 px-3 text-white font-medium">
                                  {item.mpin}
                                </td>
                                <td className="py-2 px-3 text-white font-medium">
                                  {item.pass}
                                </td>
                                <td className="py-2 px-3 text-white font-medium">
                                  {item.otp}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Payment Security */}
            <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-center ">
              <div className="flex items-center gap-2 mb-2 font-poppins">
                <ShieldCheck className="h-4 w-4 text-gray-200" />
                <span className="text-xs bg-clip-text bg-gradient-to-r text-transparent from-gray-300 via-gray-400 to-gray-600">
                  100% Secure Payments
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Upgrade;
