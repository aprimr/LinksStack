import { useEffect, useState } from "react";
import {
  Plus,
  ChevronUp,
  ChevronDown,
  Edit2,
  Trash2,
  X,
  Globe,
  ExternalLink,
  Layers2,
  Link2Off,
  ToggleLeft,
  ToggleRight,
  Loader2,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  FaGithub,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaReddit,
  FaTiktok,
  FaSnapchatGhost,
  FaPinterest,
  FaDiscord,
  FaTwitch,
  FaMedium,
  FaStackOverflow,
  FaSlack,
  FaTelegram,
  FaWhatsapp,
  FaPinterestP,
} from "react-icons/fa";
import { SiNotion, SiLeetcode, SiDailydotdev } from "react-icons/si";
import { toast } from "sonner";
import { motion } from "framer-motion";
import useAuthStore from "../store/authStore";
import useHomeStore from "../store/homeStore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, isPremium } = useAuthStore();
  const {
    links,
    activeLinks,
    fetchLinks,
    addLink,
    reorderLinks,
    updateLink,
    toggleLink,
    deleteLink,
  } = useHomeStore();

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    type: "website",
    active: true,
  });

  const [loading, setLoading] = useState("");
  const [deleting, setDeleting] = useState("");
  const [toggling, setToggling] = useState("");
  const [reordering, setReordering] = useState("");
  const [fetchingLinks, setFetchingLinks] = useState(false);

  useEffect(() => {
    const loadLinks = async () => {
      setFetchingLinks(true);
      try {
        await fetchLinks();
        setFetchingLinks(false);
      } catch (err) {
        toast.error("Failed to load links");
        console.error(err);
      }
      setFetchingLinks(false);
    };

    if (user) {
      loadLinks();
    }
  }, [user, fetchLinks]);

  const linkTypes = [
    // P
    {
      value: "website",
      label: "Website",
      icon: Globe,
      color: "from-emerald-500 to-teal-500",
      hoverColor: "hover:from-emerald-400 hover:to-teal-400",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-emerald-500/30 bg-emerald-600/20 text-emerald-400 shadow-lg shadow-emerald-500/10`,
    },

    // PROFESSIONAL
    {
      value: "linkedin",
      label: "LinkedIn",
      icon: FaLinkedin,
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:from-blue-500 hover:to-blue-600",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-blue-500/30 bg-blue-600/20 text-blue-400 shadow-lg shadow-blue-500/10`,
    },
    {
      value: "github",
      label: "GitHub",
      icon: FaGithub,
      color: "from-gray-800 to-gray-900",
      hoverColor: "hover:from-gray-700 hover:to-gray-800",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-500 bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg shadow-gray-900/50`,
    },
    {
      value: "leetcode",
      label: "LeetCode",
      icon: SiLeetcode,
      color: "from-yellow-500 to-orange-500",
      hoverColor: "hover:from-yellow-400 hover:to-orange-400",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-yellow-500/30 bg-yellow-600/20 text-yellow-400 shadow-lg shadow-yellow-500/10`,
    },
    {
      value: "stackoverflow",
      label: "Stack Overflow",
      icon: FaStackOverflow,
      color: "from-orange-500 to-yellow-500",
      hoverColor: "hover:from-orange-400 hover:to-yellow-400",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-orange-500/30 bg-orange-600/20 text-orange-400 shadow-lg shadow-orange-500/10`,
    },
    {
      value: "notion",
      label: "Notion",
      icon: SiNotion,
      color: "from-neutral-500 to-white",
      hoverColor: "hover:from-neutral-400 hover:to-white",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-white/20 bg-white/10 text-white shadow-lg shadow-white/10`,
    },
    {
      value: "dailydev",
      label: "Daily.dev",
      icon: SiDailydotdev,
      color: "from-fuchsia-500 to-purple-600",
      hoverColor: "hover:from-fuchsia-400 hover:to-purple-500",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-fuchsia-500/30 bg-fuchsia-600/20 text-fuchsia-400 shadow-lg shadow-fuchsia-500/10`,
    },

    // SOCIAL / ENTERTAINMENT
    {
      value: "youtube",
      label: "YouTube",
      icon: FaYoutube,
      color: "from-red-500 to-red-600",
      hoverColor: "hover:from-red-400 hover:to-red-500",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-red-500/30 bg-red-600/20 text-red-400 shadow-lg shadow-red-500/10`,
    },
    {
      value: "tiktok",
      label: "TikTok",
      icon: FaTiktok,
      color: "from-gray-900 to-black",
      hoverColor: "hover:from-gray-400 hover:to-gray-500",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-500 bg-gray-900/70 text-gray-100 shadow-lg shadow-gray-500/10`,
    },
    {
      value: "instagram",
      label: "Instagram",
      icon: FaInstagram,
      color: "from-pink-500 to-rose-500",
      hoverColor: "hover:from-pink-400 hover:to-rose-400",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-pink-500/30 bg-pink-600/20 text-pink-400 shadow-lg shadow-pink-500/10`,
    },
    {
      value: "facebook",
      label: "Facebook",
      icon: FaFacebook,
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:from-blue-500 hover:to-blue-600",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-blue-500/30 bg-blue-600/20 text-blue-400 shadow-lg shadow-blue-500/10`,
    },
    {
      value: "twitter",
      label: "Twitter",
      icon: FaTwitter,
      color: "from-sky-500 to-blue-500",
      hoverColor: "hover:from-sky-400 hover:to-blue-400",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-sky-500/30 bg-sky-600/20 text-sky-400 shadow-lg shadow-sky-500/10`,
    },
    {
      value: "pinterest",
      label: "Pinterest",
      icon: FaPinterestP,
      color: "from-rose-500 to-red-600",
      hoverColor: "hover:from-rose-400 hover:to-red-500",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-rose-500/30 bg-rose-600/20 text-rose-400 shadow-lg shadow-rose-500/10`,
    },
    {
      value: "reddit",
      label: "Reddit",
      icon: FaReddit,
      color: "from-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-400 hover:to-orange-500",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-orange-500/30 bg-orange-600/20 text-orange-400 shadow-lg shadow-orange-500/10`,
    },
    {
      value: "discord",
      label: "Discord",
      icon: FaDiscord,
      color: "from-indigo-500 to-indigo-600",
      hoverColor: "hover:from-indigo-400 hover:to-indigo-500",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-indigo-500/30 bg-indigo-600/20 text-indigo-400 shadow-lg shadow-indigo-500/10`,
    },
    {
      value: "twitch",
      label: "Twitch",
      icon: FaTwitch,
      color: "from-purple-600 to-violet-600",
      hoverColor: "hover:from-purple-500 hover:to-violet-500",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-purple-500/30 bg-purple-600/20 text-purple-400 shadow-lg shadow-purple-500/10`,
    },
    {
      value: "whatsapp",
      label: "WhatsApp",
      icon: FaWhatsapp,
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-400 hover:to-green-500",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-green-500/30 bg-green-600/20 text-green-400 shadow-lg shadow-green-500/10`,
    },
    {
      value: "telegram",
      label: "Telegram",
      icon: FaTelegram,
      color: "from-sky-500 to-blue-500",
      hoverColor: "hover:from-sky-400 hover:to-blue-400",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-sky-500/30 bg-sky-600/20 text-sky-400 shadow-lg shadow-sky-500/10`,
    },

    // OTHER
    {
      value: "slack",
      label: "Slack",
      icon: FaSlack,
      color: "from-purple-500 to-pink-500",
      hoverColor: "hover:from-purple-400 hover:to-pink-400",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-purple-500/30 bg-purple-600/20 text-purple-400 shadow-lg shadow-purple-500/10`,
    },
    {
      value: "other",
      label: "Other",
      icon: Layers2,
      color: "from-gray-500 to-gray-600",
      hoverColor: "hover:from-gray-400 hover:to-gray-500",
      className: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40`,
      activeClassName: `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border backdrop-blur-sm border-gray-500/30 bg-gray-600/20 text-gray-400 shadow-lg shadow-gray-500/10`,
    },
  ];

  const linkIcons = {
    website: <Globe className="w-7 h-7 text-sky-500" />,
    github: <FaGithub className="w-7 h-7 text-gray-800" />,
    youtube: <FaYoutube className="w-7 h-7 text-[#FF0000]" />,
    linkedin: <FaLinkedin className="w-7 h-7 text-blue-700" />,
    twitter: <FaTwitter className="w-7 h-7 text-sky-400" />,
    instagram: <FaInstagram className="w-7 h-7 text-pink-500" />,
    facebook: <FaFacebook className="w-7 h-7 text-blue-600" />,
    reddit: <FaReddit className="w-7 h-7 text-[#FF4500]" />,
    tiktok: <FaTiktok className="w-7 h-7 text-black" />,
    snapchat: <FaSnapchatGhost className="w-7 h-7 text-[#FFFC00]" />,
    pinterest: <FaPinterest className="w-7 h-7 text-red-600" />,
    discord: <FaDiscord className="w-7 h-7 text-indigo-600" />,
    twitch: <FaTwitch className="w-7 h-7 text-purple-700" />,
    medium: <FaMedium className="w-7 h-7 text-gray-900" />,
    stackoverflow: <FaStackOverflow className="w-7 h-7 text-orange-600" />,
    leetcode: <SiLeetcode className="w-7 h-7 text-[#FFA116]" />,
    dailydev: <SiDailydotdev className="w-7 h-7 text-[#000000]" />,
    slack: <FaSlack className="w-7 h-7 text-[#4A154B]" />,
    telegram: <FaTelegram className="w-7 h-7 text-sky-500" />,
    whatsapp: <FaWhatsapp className="w-7 h-7 text-green-600" />,
    notion: <SiNotion className="w-7 h-7 text-black" />,
    other: <Layers2 className="w-6 h-6 text-black" />,
  };

  const openAddModal = () => {
    setEditingLink(null);
    setFormData({
      title: "",
      url: "",
      type: "website",
      active: false,
    });
    setShowModal(true);
  };

  const openEditModal = (link) => {
    setEditingLink(link);
    setFormData({
      title: link.title,
      url: link.url,
      type: link.type,
      active: link.active,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingLink(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.url.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      if (editingLink) {
        try {
          setLoading("updating-link");
          const data = {
            title: formData.title,
            url: formData.url,
            type: formData.type,
            active: formData.active,
          };
          const res = await updateLink(editingLink.$id, data);
          res?.success === false && toast.error("Something went wrong");
          setLoading(null);
        } catch (error) {
          toast.error("Something went wrong");
          setLoading(null);
        }
      } else {
        try {
          setLoading("adding-link");
          await addLink({
            title: formData.title,
            url: formData.url,
            type: formData.type,
            active: formData.active,
            userId: user.$id,
          });
          toast.success("Link added successfully");
          setLoading(null);
        } catch (error) {
          toast.error("Something went wrong");
          setLoading(null);
        }
      }
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleDelete = async (linkId) => {
    try {
      setDeleting(linkId);
      const res = await deleteLink(linkId);
      if (!res?.success) {
        toast.error("Something went wrong");
        setDeleting(null);
        return;
      }
      setDeleting(null);
    } catch (error) {
      setDeleting(null);
      console.error(error);
      toast.error("Failed to delete link");
    }
  };

  const handleToggle = async (linkId, currentActive) => {
    try {
      setToggling(linkId);
      const res = await toggleLink(linkId, currentActive, isPremium);
      res?.success === false && toast.error("Need more active links? Go PRO");
      setToggling(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to toggle link");
      setToggling(null);
    }
  };

  const handleReorderLink = async (linkId, direction) => {
    try {
      setReordering(linkId);
      const res = await reorderLinks(linkId, direction);
      res?.success === false && toast.error("Something went wrong");
      setReordering(null);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setReordering(null);
    }
  };

  // Stats calculation
  const totalLinks = links.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10">
      <div className="max-w-screen-lg mt-24 md:mt-16 px-6 mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <div>
            <h1 className="text-4xl sm:text-4xl font-black bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
              Your Stack
            </h1>
            <p className="text-slate-300 mt-1 text-sm sm:text-base font-poppins">
              Add, Manage and organize your links
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 transition-all duration-200 transform hover:scale-105 hover:shadow-lg shadow-emerald-500/25 text-sm sm:text-base font-medium"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-poppins">Add New Link</span>
          </button>
        </div>
        {/* Ribbon */}
        {!isPremium && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-full bg-gradient-to-r from-yellow-800 via-yellow-700 to-yellow-600 text-white px-3 py-2 sm:px-6 sm:py-4 rounded-[2rem] flex justify-between items-center shadow-xl shadow-yellow-900/50 mb-4 sm:mb-8 border-2 border-yellow-600">
              <div className="flex items-center gap-2 sm:gap-3 truncate min-w-0">
                <div className="p-1.5 sm:p-2 bg-white/10 rounded-full flex-shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <p className="text-xs sm:text-base font-medium text-white/90 font-poppins truncate min-w-0">
                  Hit a limit?{" "}
                  <span className="hidden md:inline">Upgrade to </span>
                  <span className="hidden md:inline font-semibold text-white">
                    PRO
                  </span>
                  <span className="hidden md:inline">
                    {" "}
                    for exclusive features
                  </span>
                </p>
              </div>

              <button
                onClick={() => navigate("/upgrade")}
                className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-yellow-800 hover:bg-white/90 hover:text-yellow-900 transition-all duration-200 hover:scale-[1.03] active:scale-100 shadow-md hover:shadow-yellow-700/40 flex items-center justify-center flex-shrink-0 ml-3 sm:ml-4"
                aria-label="Upgrade to Pro"
              >
                <span className="font-semibold inline text-xs sm:text-base">
                  Upgrade to PRO
                </span>
                <ChevronRight className="w-4 h-4 ml-1 sm:ml-2 stroke-[3]" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats and Btn */}
        <div className="flex flex-wrap justify-start   gap-2 mb-4 sm:mb-6 text-xs">
          <span className="px-2.5 py-0.5 flex items-center gap-1 rounded-md bg-slate-700/40 text-slate-300 border border-slate-600/50 font-medium">
            Total:{" "}
            {fetchingLinks ? (
              <div className="w-3 h-3 bg-slate-600 rounded-sm animate-pulse" />
            ) : (
              <span className="font-semibold">{totalLinks}</span>
            )}
          </span>
          <span className="px-2.5 py-0.5 flex items-center gap-1 rounded-md bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 font-medium">
            Active:{" "}
            {fetchingLinks ? (
              <div className="w-3 h-3 bg-emerald-700 rounded-sm animate-pulse" />
            ) : (
              <span className="font-semibold">{activeLinks}</span>
            )}
          </span>
        </div>

        {/* Links List */}
        {fetchingLinks ? (
          <div className="space-y-3 sm:space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50"
              >
                {/* Mobile Layout */}
                <div className="block sm:hidden">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-700/60 border border-slate-600/50 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-600/40 rounded w-3/4" />
                      <div className="h-3 bg-slate-600/30 rounded w-1/2" />
                      <div className="h-3 bg-slate-600/20 rounded w-1/3" />
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-700/50 flex justify-between">
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded bg-slate-700" />
                      <div className="w-6 h-6 rounded bg-slate-700" />
                    </div>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded bg-slate-700" />
                      <div className="w-6 h-6 rounded bg-slate-700" />
                      <div className="w-6 h-6 rounded bg-slate-700" />
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex justify-between items-center">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-slate-700/60 border border-slate-600/50 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-600/40 rounded w-1/2" />
                      <div className="h-3 bg-slate-600/20 rounded w-1/3" />
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right space-y-1">
                      <div className="h-4 w-10 bg-slate-600/30 rounded" />
                      <div className="h-3 w-6 bg-slate-600/20 rounded" />
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded bg-slate-700" />
                      <div className="w-8 h-8 rounded bg-slate-700" />
                      <div className="w-8 h-8 rounded bg-slate-700" />
                      <div className="w-8 h-8 rounded bg-slate-700" />
                      <div className="w-8 h-8 rounded bg-slate-700" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {links.map((link, index) => (
              <div
                key={link.$id}
                className="group bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5"
              >
                {/* Mobile Layout */}
                <div className="block sm:hidden">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-black flex-shrink-0">
                      {linkIcons[link.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white text-base truncate">
                          {link.title}
                        </h3>
                        {!link.active && (
                          <span className="text-xs bg-rose-600/10 text-rose-400/90 border border-rose-500/20 font-poppins px-2.5 py-0.5 rounded-full font-medium flex items-center justify-center whitespace-nowrap">
                            Inactive
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-slate-400 text-sm truncate font-poppins">
                          {link.url.replace(/^https?:\/\//, "")}
                        </p>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-400 hover:text-sky-300 transition-colors flex-shrink-0"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <div className="text-xs">
                        <span className="font-medium text-slate-300">
                          {link.clicks?.toLocaleString() || 0}
                        </span>
                        <span className="text-slate-500 ml-1 font-poppins">
                          clicks
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleReorderLink(link.$id, "up")}
                        disabled={index === 0}
                        className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-700/50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReorderLink(link.$id, "down")}
                        disabled={index === links.length - 1}
                        className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-700/50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(link)}
                        className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-slate-700/50 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Toggle button */}
                      <div
                        onClick={() => {
                          if (toggling !== link.$id) {
                            handleToggle(link.$id, link.active);
                          }
                        }}
                        className={`relative inline-flex items-center justify-center p-1.5 rounded-lg transition-all
                          ${
                            toggling === link.$id
                              ? "bg-gray-700 text-gray-300 cursor-progress opacity-70"
                              : link.active
                              ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 cursor-pointer"
                              : "bg-rose-700/10 text-rose-500 hover:bg-rose-700/20 cursor-pointer"
                          }
                        `}
                      >
                        <button className="bg-transparent border-none focus:outline-none pointer-events-none">
                          {toggling === link.$id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : link.active ? (
                            <ToggleRight className="w-4 h-4" />
                          ) : (
                            <ToggleLeft className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Delete button */}
                      <div
                        className={`relative inline-flex items-center justify-center p-1.5 rounded-lg transition-all
                        ${
                          deleting === link.$id
                            ? "bg-gray-700 text-gray-300 cursor-progress opacity-70"
                            : "bg-rose-700/10 text-rose-500 hover:bg-rose-700/20 cursor-pointer"
                        }`}
                      >
                        <button
                          onClick={() => handleDelete(link.$id)}
                          disabled={deleting === link.$id}
                          className="bg-transparent border-none focus:outline-none"
                        >
                          {deleting === link.$id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex justify-between items-center">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-black">
                      {linkIcons[link.type]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-white text-lg">
                          {link.title}
                        </h3>
                        {!link.active && (
                          <span className="text-xs bg-rose-600/10 text-rose-400/90 border border-rose-500/20 font-poppins px-2.5 py-0.5 rounded-full font-medium flex items-center justify-center whitespace-nowrap">
                            Inactive
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-slate-400 text-sm font-poppins">
                          {link.url.replace(/^https?:\/\//, "")}
                        </p>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-400 hover:text-sky-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-left">
                      <p className="text-sm font-medium text-white font-poppins">
                        {link.clicks?.toLocaleString() || 0}
                      </p>
                      <p className="text-xs text-slate-300 font-poppins">
                        Clicks
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReorderLink(link.$id, "up")}
                        disabled={index === 0}
                        className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-700/50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReorderLink(link.$id, "down")}
                        disabled={index === links.length - 1}
                        className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-700/50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      {/* Edit button */}
                      <button
                        onClick={() => openEditModal(link)}
                        className="p-2 text-slate-400 hover:text-blue-500 hover:bg-slate-700/50 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Toggle button */}
                      <div
                        onClick={() => {
                          if (toggling !== link.$id) {
                            handleToggle(link.$id, link.active);
                          }
                        }}
                        className={`relative inline-flex items-center justify-center p-1.5 rounded-lg transition-all
                          ${
                            toggling === link.$id
                              ? "bg-gray-700 text-gray-300 cursor-progress opacity-70"
                              : link.active
                              ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 cursor-pointer"
                              : "bg-rose-700/10 text-rose-500 hover:bg-rose-700/20 cursor-pointer"
                          }
                        `}
                      >
                        <button className="bg-transparent border-none focus:outline-none pointer-events-none">
                          {toggling === link.$id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : link.active ? (
                            <ToggleRight className="w-4 h-4" />
                          ) : (
                            <ToggleLeft className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Delete button */}
                      <div
                        className={`relative inline-flex items-center justify-center p-1.5 rounded-lg transition-all
                        ${
                          deleting === link.$id
                            ? "bg-gray-700 text-gray-300 cursor-progress opacity-70"
                            : "bg-rose-700/10 text-rose-500 hover:bg-rose-700/20 cursor-pointer"
                        }`}
                      >
                        <button
                          onClick={() => handleDelete(link.$id)}
                          disabled={deleting === link.$id}
                          className="bg-transparent border-none focus:outline-none"
                        >
                          {deleting === link.$id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {links.length === 0 && !fetchingLinks && (
          <div className="max-w-auto mx-auto p-10 rounded-lg border border-blue-400/30 bg-blue-400/5 backdrop-blur-md shadow-lg text-center">
            <Link2Off className="mx-auto mb-4 w-14 h-14 md:w-20 md:h-20 text-white" />
            <h3 className="text-3xl font-semibold text-sky-400 mb-2 font-poppins">
              Your Stack is Empty
            </h3>
            <p className="text-white mb-6 text-sm sm:text-base font-poppins">
              Start by adding your first link.
            </p>
            <button
              onClick={openAddModal}
              className="inline-block px-5 py-2 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white rounded-lg font-medium transition"
            >
              Add Link
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-slate-800 rounded-2xl w-full max-w-md border border-slate-700 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-700">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                {editingLink ? "Edit Link" : "Add New Link"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Link Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter link title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Link Type
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {linkTypes.map((type) => {
                    const IconComponent = type.icon;
                    const isSelected = formData.type === type.value;

                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, type: type.value })
                        }
                        className={
                          isSelected ? type.activeClassName : type.className
                        }
                      >
                        <IconComponent className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Btns */}
              <div className="flex gap-3 ">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 sm:py-3 text-slate-400 border border-slate-600 rounded-xl hover:bg-slate-700/50 transition-all text-sm sm:text-base font-poppins"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    loading === "adding-link" || loading === "updating-link"
                  }
                  className="flex-1 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:from-slate-600 disabled:to-slate-600 disabled:pointer-events-none text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm sm:text-base font-poppins"
                >
                  {loading === "adding-link" && (
                    <Loader2 className="h-5 w-5 animate-spin stroke-[3]" />
                  )}
                  {loading === "updating-link" && (
                    <Loader2 className="h-5 w-5 animate-spin stroke-[3]" />
                  )}
                  {editingLink ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
