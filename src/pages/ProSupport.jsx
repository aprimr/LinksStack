import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import formatDateAndTime from "../utils/formatDateAndTime";
import useAuthStore from "../store/authStore";
import useTicketStore from "../store/ticketStore";
import {
  Mail,
  Zap,
  Sparkles,
  ChevronRight,
  AlertCircle,
  Clock,
  Check,
  Ticket,
  TicketPlus,
  ScrollText,
  RefreshCcw,
  TicketSlash,
  CircleUserRound,
  PauseCircle,
  CheckCircle2,
  XCircle,
  Archive,
  Ban,
  Trash2,
  Calendar,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

const ProSupport = () => {
  const user = useAuthStore((state) => state.user);
  const isPremium = useAuthStore((state) => state.isPremium);

  const fetchTickets = useTicketStore((state) => state.fetchTickets);
  const tickets = useTicketStore((state) => state.tickets);
  const addTicket = useTicketStore((state) => state.addTicket);
  const deleteTicket = useTicketStore((state) => state.deleteTicket);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("raise");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState("");
  const [details, setDetails] = useState("");

  const [subject, setSubject] = useState("");
  const [ticketTag, setTicketTag] = useState(null);
  const [subjectLength, setSubjectLength] = useState(0);
  const [messageLength, setMessageLength] = useState(0);
  const [message, setMessage] = useState("");
  const availableTags = ["Bug", "Link", "Account", "Billing", "Other"];

  const [recaptchaValue, setRecaptchaValue] = useState(null);

  useEffect(() => {
    if (!isPremium) {
      navigate(-1);
    }
  }, [isPremium, navigate]);

  useEffect(() => {
    if (activeTab === "view" && user?.$id) {
      fetchTickets(user.$id);
    }
  }, [activeTab, user?.$id, fetchTickets]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("creating-ticket");

    if (!recaptchaValue) {
      toast.error("Please verify that you are not a robot");
      setLoading("");
      return;
    }

    if (!subject || !ticketTag || !message) {
      toast.error("Please fill in all fields");
      setLoading("");
      return;
    }

    if (subjectLength > 100 || messageLength > 1000) {
      toast.error("Subject or message length exceeded");
      setLoading("");
      return;
    }

    try {
      await addTicket(user.$id, user.email, subject, ticketTag, message);
      toast.success("Ticket raised successfully");
      fetchTickets();
    } catch (error) {
      console.error("Error adding ticket:", error);
    } finally {
      setLoading("");
    }

    setSubject("");
    setMessage("");
    setTicketTag(null);
    setIsSubmitted(true);
    setSubjectLength(0);
    setMessageLength(0);
    setRecaptchaValue(null);
  };

  const handleDelete = async (id) => {
    setLoading(id);
    try {
      await deleteTicket(id);
      fetchTickets();
    } catch (error) {
      console.error("Error deleting ticket:", error);
    } finally {
      setLoading("");
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "new":
        return {
          bg: "bg-blue-900/20",
          border: "border-blue-700/40",
          text: "text-blue-400",
          icon: <Clock className="h-[10px] w-[10px]" />,
        };
      case "in-progress":
        return {
          bg: "bg-amber-900/20",
          border: "border-amber-700/40",
          text: "text-amber-400",
          icon: <AlertCircle className="h-[10px] w-[10px]" />,
        };
      case "on-hold":
        return {
          bg: "bg-orange-900/20",
          border: "border-orange-700/40",
          text: "text-orange-400",
          icon: <PauseCircle className="h-[10px] w-[10px]" />,
        };
      case "resolved":
        return {
          bg: "bg-green-900/20",
          border: "border-green-700/40",
          text: "text-green-400",
          icon: <CheckCircle2 className="h-[10px] w-[10px]" />,
        };
      case "rejected":
        return {
          bg: "bg-red-900/20",
          border: "border-red-700/40",
          text: "text-red-400",
          icon: <XCircle className="h-[10px] w-[10px]" />,
        };
      case "closed":
        return {
          bg: "bg-gray-800/20",
          border: "border-gray-600/40",
          text: "text-gray-300",
          icon: <Archive className="h-[10px] w-[10px]" />,
        };
      case "cancelled":
        return {
          bg: "bg-zinc-800/20",
          border: "border-zinc-600/40",
          text: "text-zinc-400",
          icon: <Ban className="h-[10px] w-[10px]" />,
        };
      default:
        return {
          bg: "bg-gray-800/30",
          border: "border-gray-700/40",
          text: "text-gray-400",
          icon: <Clock className="h-[10px] w-[10px]" />,
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
            onClick={() => {
              setActiveTab("raise");
              setIsSubmitted(false);
              setRecaptchaValue(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border backdrop-blur-sm ${
              activeTab === "raise"
                ? "border-indigo-500/30 bg-indigo-600/20 text-indigo-400 shadow-lg shadow-indigo-500/10"
                : "border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40"
            }`}
          >
            <TicketPlus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-poppins">Raise a Ticket</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.58 }}
            onClick={() => {
              setActiveTab("view");
              setIsSubmitted(false);
              setRecaptchaValue(null);
              fetchTickets(user.$id);
            }}
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
                    <TicketPlus className="h-6 w-6 text-amber-400" />
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
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-sm sm:text-base font-medium text-gray-200">
                      Raise Ticket as
                    </p>
                    <div className="inline-flex items-center gap-2 bg-gray-600/30 rounded-full px-3 py-1.5">
                      <CircleUserRound className="h-5 w-5 text-gray-400" />
                      <span className="font-poppins text-sm text-gray-300">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-200 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        setSubjectLength(e.target.value.length);
                      }}
                      className="w-full px-4 py-3 mb-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-300 placeholder:font-poppins placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                      placeholder="Briefly describe your issue"
                    />
                    <p
                      className={`text-xs text-right ${
                        subjectLength > 100 ? "text-red-500" : "text-gray-400"
                      } 
                      ${subjectLength === 0 ? "text-gray-600" : ""}
                      font-poppins`}
                    >
                      {subjectLength}/100
                    </p>
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
                            setTicketTag(tag === ticketTag ? null : tag)
                          }
                          className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-md text-xs font-medium transition-colors backdrop-blur-sm border ${
                            ticketTag === tag
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
                      onChange={(e) => {
                        setMessage(e.target.value);
                        setMessageLength(e.target.value.length);
                      }}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-300 placeholder:font-poppins placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                      placeholder="Please provide detailed information about your request..."
                    />
                    <p
                      className={`text-xs text-right ${
                        messageLength > 1000 ? "text-red-500" : "text-gray-400"
                      } 
                      ${messageLength === 0 ? "text-gray-600" : ""}
                      font-poppins`}
                    >
                      {messageLength}/1000
                    </p>
                  </div>

                  <div className=" flex justify-between items-end flex-wrap gap-4">
                    <ReCAPTCHA
                      onChange={(value) => setRecaptchaValue(value)}
                      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    />

                    <div className="flex flex-col gap-1">
                      <button
                        type="submit"
                        disabled={loading === "creating-ticket"}
                        className={`min-w-[10rem] px-7 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/20 font-poppins ${
                          !recaptchaValue && "opacity-50"
                        } disabled:cursor-not-allowed`}
                      >
                        {loading === "creating-ticket" ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Create Ticket"
                        )}
                      </button>
                    </div>
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
              <div className="columns-1 lg:columns-2 gap-4 space-y-4">
                {tickets.map((ticket) => {
                  const statusStyles = getStatusStyles(ticket.ticketStatus);
                  return (
                    <motion.div
                      key={ticket.$id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`break-inside-avoid rounded-2xl border ${statusStyles.border} ${statusStyles.bg} backdrop-blur-sm shadow-md hover:shadow-xl transition-shadow duration-300`}
                    >
                      {/* Status Badge */}
                      <div className="absolute top-0 right-0">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-bl-xl rounded-tr-xl text-[10px] font-semibold tracking-wide ${statusStyles.bg} ${statusStyles.text} ${statusStyles.border} uppercase`}
                        >
                          {statusStyles.icon}
                          {ticket.ticketStatus}
                        </span>
                      </div>

                      {/* Date Badge */}
                      <div className="absolute top-0 left-0">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-br-xl rounded-tl-xl text-[10px] font-medium tracking-wide ${statusStyles.bg} ${statusStyles.text} ${statusStyles.border}`}
                        >
                          <Calendar className="h-3 w-3" />
                          {formatDateAndTime(ticket.$createdAt)}
                        </span>
                      </div>

                      {/* Ticket Info */}
                      <div className="flex flex-col gap-2 p-6 pt-12">
                        <h3
                          className={`text-xl font-semibold font-poppins text-white ${
                            details !== ticket.$id
                              ? "line-clamp-2"
                              : "break-words"
                          }`}
                        >
                          {ticket.subject}
                        </h3>
                        <p
                          className={`text-sm font-medium text-gray-400 font-poppins ${
                            details !== ticket.$id
                              ? "line-clamp-4"
                              : "break-words"
                          }`}
                        >
                          {ticket.message}
                        </p>

                        {/* Admin Response */}
                        {details === ticket.$id && (
                          <div className="mt-4 bg-gray-800/40 border border-gray-700 p-4 rounded-xl text-gray-200 text-sm space-y-2">
                            <div className="flex items-center gap-1 font-semibold text-emerald-400 text-xs font-poppins uppercase">
                              <MessageSquare className="h-4 w-4" />
                              Admin Response
                            </div>
                            {ticket.response ? (
                              <p className="leading-relaxed text-xs font-poppins">
                                {ticket.response}
                              </p>
                            ) : (
                              <p className="text-gray-500 italic">
                                No response yet.
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div
                        className={`flex flex-col w-full gap-4 p-6 -mb-3 pt-0 border-t ${statusStyles.border}`}
                      >
                        {/* Ticket ID & Tag */}
                        <div className="flex flex-row justify-between items-start sm:items-center mt-3 gap-3">
                          <div
                            className={`flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium ${statusStyles.bg} ${statusStyles.text} ${statusStyles.border}`}
                          >
                            <Ticket className="h-4 w-4" />
                            <span className="truncate max-w-[120px] sm:max-w-[180px]">
                              {ticket.$id}
                            </span>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-md text-xs font-semibold ${statusStyles.bg} ${statusStyles.text} ${statusStyles.border}`}
                          >
                            {ticket.ticketTag}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end items-center gap-2">
                          {ticket.ticketStatus === "new" && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleDelete(ticket.$id)}
                              disabled={loading === ticket.$id}
                              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium text-rose-500 bg-rose-900/20 border border-rose-700/50 hover:bg-rose-700/30 transition ${
                                loading === ticket.$id
                                  ? "cursor-not-allowed brightness-75"
                                  : ""
                              }`}
                            >
                              {loading === ticket.$id ? (
                                <>
                                  <Loader2 className="animate-spin h-4 w-4" />
                                  Deleting
                                </>
                              ) : (
                                <>
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </>
                              )}
                            </motion.button>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              setDetails(
                                details === ticket.$id ? "" : ticket.$id
                              )
                            }
                            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition border ${
                              details === ticket.$id
                                ? "bg-gray-800/40 text-gray-400 border-gray-700 hover:bg-gray-700/40"
                                : "bg-blue-900/20 text-blue-400 border-blue-700 hover:bg-blue-700/30"
                            }`}
                          >
                            {details === ticket.$id
                              ? "Hide Details"
                              : "See Details"}
                          </motion.button>
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
