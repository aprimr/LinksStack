import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  ArrowRight,
  Link as LinkIcon,
  Layers2,
  Palette,
  Check,
  ChevronDown,
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
import { Query } from "appwrite";
import themes from "../constants/themes";
import db from "../appwrite/databases";
import { useNavigate, useParams } from "react-router-dom";
import LinksStack from "../assets/logo.png";
import useAuthStore from "../store/authStore";

const ViewStack = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [userDetails, setUserDetails] = useState(null);
  const [links, setLinks] = useState([]);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("abyss");
  const [loading, setLoading] = useState(true);
  const [loadingLinks, setLoadingLinks] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user details and links in parallel
  const fetchData = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch user details
      const userRes = await db.userDetails.list([
        Query.equal("profileSlug", userId),
      ]);

      if (userRes.documents.length === 0) {
        throw new Error("No user found with this URL");
      }

      const userData = userRes.documents[0];
      setUserDetails(userData);

      // Set theme from user preferences if available
      if (userData.theme && themes[userData.theme]) {
        setSelectedTheme(userData.theme);
      }

      // Fetch links for the user
      setLoadingLinks(true);
      const linksRes = await db.links.list([
        Query.equal("userId", userData.userId),
        Query.equal("active", true),
        Query.orderAsc("index"),
      ]);
      setLinks(linksRes.documents);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
      setLoadingLinks(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const design = React.useMemo(
    () => ({
      colors: themes[selectedTheme]?.colors || themes.abyss.colors,
      typography: {
        name: "text-2xl sm:text-3xl font-bold font-sans",
        bio: "text-sm sm:text-base font-poppins",
        link: "text-sm sm:text-[15px] font-poppins",
      },
      spacing: {
        coverHeight: "h-[130px] md:h-[150px]",
        avatarSize: "w-28 h-28 sm:w-32 sm:h-32",
        avatarOffset: "-mt-16 sm:-mt-16",
        sectionPadding: "px-6 sm:px-8 py-6",
      },
      animations: {
        page: {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
        },
        avatar: {
          initial: { scale: 0.95, y: 10 },
          animate: { scale: 1, y: 0 },
          transition: { delay: 0.3, type: "spring" },
        },
        container: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
          },
        },
        item: {
          hidden: { y: 12, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
          },
        },
        link: {
          hover: {
            backgroundColor: "rgba(255,255,255,0.08)",
            translateX: 3,
          },
          tap: { scale: 0.98 },
        },
      },
    }),
    [selectedTheme]
  );

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-10 font-sans relative">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="rounded-xl shadow-2xl overflow-hidden bg-gray-800 border border-gray-700">
            {/* Skeleton content */}
            <div className="relative w-full h-40 bg-gray-700 animate-pulse" />
            <div className="relative flex justify-center -mt-16">
              <div className="w-32 h-32 rounded-full border-4 border-gray-800 bg-gray-600 shadow-xl" />
            </div>
            <div className="px-6 pt-4 pb-6 text-center space-y-3">
              <div className="h-8 w-3/4 mx-auto bg-gray-600 rounded animate-pulse" />
              <div className="h-4 w-5/6 mx-auto bg-gray-600 rounded animate-pulse" />
            </div>
            <div className="px-5 pb-6 space-y-2.5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-700 animate-pulse"
                >
                  <div className="w-5 h-5 bg-gray-600 rounded-full" />
                  <div className="h-4 flex-1 bg-gray-600 rounded" />
                  <div className="w-4 h-4 bg-gray-600 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-10 font-sans relative">
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-[100svh] ${design.colors.bg} flex items-center justify-center px-3 sm:px-4 py-8 sm:py-10 font-sans relative select-none`}
    >
      {/* Theme Selector */}
      {user?.$id === userDetails?.userId && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 font-poppins">
          <div className="relative">
            <button
              aria-label="Theme selector"
              aria-haspopup="true"
              aria-expanded={isThemeMenuOpen}
              className="flex items-center gap-1.5 sm:gap-2 bg-gray-900/80 hover:bg-gray-800/90 text-gray-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg backdrop-blur-sm border border-gray-700 text-xs sm:text-sm font-medium transition-all"
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            >
              <Palette size={16} className="text-gray-300" />
              <span className="truncate max-w-[80px] sm:max-w-none">
                {themes[selectedTheme].name}
              </span>
              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform duration-200 ${
                  isThemeMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isThemeMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 sm:w-56 rounded-lg shadow-xl bg-gray-900/95 backdrop-blur-md border border-gray-700 overflow-hidden text-sm sm:text-base">
                <div className="max-h-80 overflow-y-auto py-1">
                  {Object.keys(themes).map((themeKey) => (
                    <button
                      key={themeKey}
                      onClick={() => {
                        setSelectedTheme(themeKey);
                        setIsThemeMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 transition-colors flex items-center ${
                        selectedTheme === themeKey
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-200 hover:bg-gray-700"
                      }`}
                    >
                      {themes[themeKey].name}
                      {selectedTheme === themeKey && (
                        <Check size={16} className="ml-auto text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <motion.div
        initial="initial"
        animate="animate"
        variants={design.animations.page}
        className="w-full max-w-sm sm:max-w-md"
      >
        <div
          className={`rounded-xl shadow-2xl overflow-hidden ${design.colors.card}`}
        >
          {/* Cover Image */}
          <div
            className={`relative w-full ${design.spacing.coverHeight} bg-blue-50/10`}
          >
            <img
              src="https://fastly.picsum.photos/id/404/600/600.jpg?hmac=S_edsOiwR15KxsdOIoPsAYNMEuCJRmn09VAwg42aHFY"
              alt="Cover"
              className="w-full h-full object-cover"
            />
            {!userDetails.isPremium && (
              <div
                onClick={() => navigate("/")}
                className="absolute top-2 left-2 flex items-center space-x-1 text-base sm:text-lg font-medium text-white font-poppins"
              >
                <Layers2 className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[2]" />
                <span>LinksStack</span>
              </div>
            )}
            <div className={`absolute inset-0 ${design.colors.overlay}`} />
          </div>

          {/* Avatar */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={design.animations.avatar}
            className={`relative flex justify-center ${design.spacing.avatarOffset}`}
          >
            <img
              src={userDetails?.avatarUrl || LinksStack}
              alt={userDetails?.name || "Avatar"}
              className={`${design.spacing.avatarSize} rounded-full ${design.colors.avatarBorder} border-[3px] shadow-xl object-cover`}
            />
          </motion.div>

          {/* Profile Info */}
          <motion.div
            variants={design.animations.container}
            initial="hidden"
            animate="visible"
            className={`${design.spacing.sectionPadding} -mt-4 text-center space-y-1 px-4 sm:px-6`}
          >
            <motion.h1
              variants={design.animations.item}
              className={`text-3xl sm:text-3xl font-bold ${design.typography.name} ${design.colors.text}`}
            >
              {userDetails?.name || "Name"}
            </motion.h1>
            <motion.p
              variants={design.animations.item}
              className={`text-md sm:text-base ${design.typography.bio} ${design.colors.subtext} max-w-md mx-auto`}
            >
              {userDetails?.bio || "Bio"}
            </motion.p>
          </motion.div>

          {/* Links */}
          <motion.div
            variants={design.animations.container}
            initial="hidden"
            animate="visible"
            className="px-4 sm:px-5 pb-6 space-y-2"
          >
            {loadingLinks ? (
              [...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={design.animations.item}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-700 animate-pulse"
                >
                  <div className="w-5 h-5 bg-gray-600 rounded-full" />
                  <div className="h-4 flex-1 bg-gray-600 rounded" />
                  <div className="w-4 h-4 bg-gray-600 rounded-full" />
                </motion.div>
              ))
            ) : links.length > 0 ? (
              links.map((link) => (
                <motion.a
                  key={link.$id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={design.animations.item}
                  whileHover={design.animations.link.hover}
                  whileTap={design.animations.link.tap}
                  className={`flex items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl ${design.colors.link} ${design.colors.text} transition-all`}
                >
                  <div className="p-1.5 sm:p-2 rounded-md bg-white/90 flex-shrink-0">
                    {linkIcons[link.type]}
                  </div>
                  <span
                    className={`text-sm sm:text-base flex-1 truncate font-medium ${design.typography.link}`}
                  >
                    {link.title}
                  </span>
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight
                      size={16}
                      className={`transition-all duration-300 ${design.colors.subtext}`}
                    />
                  </motion.div>
                </motion.a>
              ))
            ) : (
              <motion.div
                variants={design.animations.item}
                className="px-4 py-3 text-center text-sm sm:text-base text-gray-400"
              >
                No links available
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs sm:text-sm mt-6 sm:mt-8 select-none"
        >
          <p
            onClick={() => navigate("/")}
            className={`flex justify-center items-center gap-1.5 cursor-pointer ${design.colors.subtext}`}
          >
            <Layers2 className="w-4 h-4" />
            <span>
              Built with <span className="font-medium">LinkStack</span>
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ViewStack;
