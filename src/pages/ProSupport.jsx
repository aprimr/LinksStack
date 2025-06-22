import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import {
  Mail,
  Zap,
  CheckCircle,
  Sparkles,
  ChevronRight,
  AlertCircle,
  Clock,
  Check,
  X,
  Ticket,
  TicketPlus,
  ScrollText,
  RefreshCcw,
  TicketSlash,
} from "lucide-react";

const ProSupport = () => {
  const user = useAuthStore((state) => state.user);
  const isPremium = useAuthStore((state) => state.isPremium);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("raise");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const availableTags = [
    "Bug",
    "Link",
    "Account",
    "Billing",
    "Feature Request",
    "Other",
  ];

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState([
    {
      id: 1,
      subject: "Login issues",
      message: "Unable to login with my credentials",
      status: "open",
      date: "2023-05-15",
    },
    {
      id: 2,
      subject: "Feature request",
      message: "Need dark mode for dashboard",
      status: "in-progress",
      date: "2023-05-10",
    },
    {
      id: 3,
      subject: "Payment problem",
      message: "Subscription not renewing automatically",
      status: "resolved",
      date: "2023-05-01",
    },
    {
      id: 4,
      subject: "Bug report",
      message: "Dashboard crashes on mobile",
      status: "rejected",
      date: "2023-04-28",
    },
  ]);

  useEffect(() => {
    if (!isPremium) {
      navigate(-1);
    }
  }, [isPremium, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      id: tickets.length + 1,
      subject,
      message,
      status: "open",
      date: new Date().toISOString().split("T")[0],
    };
    setTickets([newTicket, ...tickets]);
    setSubject("");
    setMessage("");
    setIsSubmitted(true);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "open":
        return {
          bg: "bg-blue-900/20",
          border: "border-blue-700/40",
          text: "text-blue-400",
          icon: <Clock className="h-4 w-4" />,
        };
      case "in-progress":
        return {
          bg: "bg-amber-900/20",
          border: "border-amber-700/40",
          text: "text-amber-400",
          icon: <AlertCircle className="h-4 w-4" />,
        };
      case "resolved":
        return {
          bg: "bg-green-900/20",
          border: "border-green-700/40",
          text: "text-green-400",
          icon: <Check className="h-4 w-4" />,
        };
      case "rejected":
        return {
          bg: "bg-red-900/20",
          border: "border-red-700/40",
          text: "text-red-400",
          icon: <X className="h-4 w-4" />,
        };
      default:
        return {
          bg: "bg-gray-800/30",
          border: "border-gray-700/40",
          text: "text-gray-400",
          icon: <Clock className="h-4 w-4" />,
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 mt-14 relative"
        >
          <div className="absolute -top-2 -right-2"></div>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 px-5 py-2 rounded-full mb-4 border border-amber-300/50 shadow-lg shadow-amber-500/20">
            <Sparkles className="h-6 w-6" />
            <span className="font-bold">EXCLUSIVE PRO SUPPORT</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-800">
            Priority Support for{" "}
            <span className="font-black bg-clip-text text-transparent bg-gradient-to-bl from-amber-400 via-rose-500 to-fuchsia-600">
              PRO
            </span>{" "}
            Users
          </h1>
          <p className="text-lg text-white mt-4 max-w-xl mx-auto font-poppins">
            Dedicated assistance for our valued PRO members
          </p>
        </motion.div>

        {/* Ribbon */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-full bg-gradient-to-r from-[#1e1b4b] via-[#221e9a] to-[#4f46e5] text-white px-3 py-2 sm:px-4 sm:py-3 rounded-[2rem] flex justify-between items-center shadow-xl shadow-indigo-900/30 mb-8 border-2 border-[#4f46e5]">
            <div className="flex items-center gap-2 sm:gap-3 truncate">
              <div className="p-1.5 sm:p-2 bg-white/10 rounded-full">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className="text-sm sm:text-base font-medium text-white/90 font-poppins truncate">
                Need instant help?{" "}
                <span className="hidden md:inline">Check our </span>
                <span className="hidden md:inline font-semibold text-white">
                  Help Center
                </span>
              </p>
            </div>
            <button
              onClick={() => navigate("/help")}
              className="p-2 sm:px-6 sm:py-2.5 rounded-full bg-white/95 hover:bg-white text-indigo-700 hover:text-indigo-800 transition-all duration-200 hover:scale-[1.03] active:scale-100 shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center"
              aria-label="Visit Help Center"
            >
              <span className="hidden font-semibold sm:inline-block">
                Visit Help Center
              </span>
              <ChevronRight className="w-5 h-5 sm:ml-2 stroke-[3]" />
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-5">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.58 }}
            onClick={() => setActiveTab("raise")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border backdrop-blur-sm ${
              activeTab === "raise"
                ? "border-indigo-500/30 bg-indigo-600/20 text-indigo-400 shadow-lg shadow-indigo-500/10"
                : "border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40"
            }`}
          >
            <TicketPlus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-poppins">Raise Ticket</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.58 }}
            onClick={() => setActiveTab("view")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border backdrop-blur-sm ${
              activeTab === "view"
                ? "border-indigo-500/30 bg-indigo-600/20 text-indigo-400 shadow-lg shadow-indigo-500/10"
                : "border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40"
            }`}
          >
            <ScrollText className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-poppins">View Tickets</span>
          </motion.button>
        </div>

        {/* Tab Content */}
        {activeTab === "raise" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden"
          >
            {isSubmitted ? (
              <div className="p-8 sm:p-12 text-center">
                <motion.div
                  initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    duration: 0.5,
                  }}
                  className="inline-flex p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/30"
                >
                  <Check className="w-10 h-10 text-white stroke-[4]" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mt-6 mb-3">
                  Ticket Submitted
                </h2>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                  We've received your ticket and will respond within 24 hours.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsSubmitted(false)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all border border-amber-500/30 bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 shadow-md shadow-amber-500/10"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    Submit Another
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab("view")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all border border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40"
                  >
                    <ScrollText className="h-4 w-4" />
                    View Tickets
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <div className="h-12 w-12 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20">
                    <Mail className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      Raise Support Ticket
                    </h2>
                    <p className="text-gray-400 font-poppins">
                      Our team is ready to assist you
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-200 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-300 placeholder:font-poppins placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                      placeholder="Briefly describe your issue"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-200 mb-2">
                      Select Tag
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <button
                          type="button"
                          key={tag}
                          onClick={() =>
                            setSelectedTag(tag === selectedTag ? null : tag)
                          }
                          className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-md text-xs font-medium transition-colors backdrop-blur-sm border ${
                            selectedTag === tag
                              ? "bg-blue-500/10 border-blue-700 text-blue-400 shadow shadow-blue-500/10"
                              : "bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-200 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-300 placeholder:font-poppins placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                      placeholder="Please provide detailed information about your request..."
                      required
                    />
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="submit"
                      className="px-5 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/20 font-poppins"
                    >
                      Submit Ticket
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="h-12 w-12 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20">
                <Ticket className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  View Support Ticket
                </h2>
                <p className="text-gray-400 font-poppins">
                  View and manage your support tickets
                </p>
              </div>
            </div>

            {tickets.length === 0 ? (
              <div className="flex flex-col justify-center items-center gap-6 text-center py-6">
                <div className="flex flex-col gap-2">
                  <motion.div
                    animate={{ rotate: [4, 0, -4, 0, 4] }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                      repeat: Infinity,
                    }}
                  >
                    <TicketSlash className="h-20 w-20 text-amber-500 mx-auto bg-amber-600/20 p-3 rounded-full" />
                  </motion.div>
                  <p className="text-gray-200 font-poppins">No tickets found</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab("raise")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all border border-emerald-500/30 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 shadow-md shadow-emerald-500/10"
                >
                  <TicketPlus className="h-4 w-4" />
                  Create a new ticket
                </motion.button>
              </div>
            ) : (
              <div className="grid gap-4">
                {tickets.map((ticket) => {
                  const statusStyles = getStatusStyles(ticket.status);
                  return (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-5 rounded-xl border ${statusStyles.border} ${statusStyles.bg} backdrop-blur-sm`}
                    >
                      <div className="relative flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">
                            {ticket.subject}
                          </h3>
                          <p className="text-sm text-gray-300 mt-2">
                            {ticket.message}
                          </p>
                        </div>
                        <div className="absolute -top-5 -right-5 flex items-center gap-2">
                          <span
                            className={`w-auto text-xs sm:text-sm px-2.5 py-1 rounded-bl-xl ${statusStyles.text} ${statusStyles.bg} `}
                          >
                            {ticket.status.replace("-", " ")}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-700/50">
                        <span className="text-xs text-gray-400">
                          {ticket.date}
                        </span>
                        <div className="flex items-center gap-2">
                          <button className="text-xs  text-amber-400 hover:text-amber-300 flex items-center gap-1">
                            <span>View</span>
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProSupport;
