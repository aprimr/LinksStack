import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Layers2,
  Settings,
  ChartSpline,
  ChevronRight,
  Share2,
  CheckCircle,
  Zap,
  ArrowRight,
  FerrisWheel,
  CheckCheck,
} from "lucide-react";
import {
  FaTiktok,
  FaTwitch,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaDiscord,
  FaPinterest,
  FaGithub,
} from "react-icons/fa";
import useAuthStore from "../store/authStore";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function LandingPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const userDetails = useAuthStore((state) => state.userDetails);
  const isPremium = useAuthStore((state) => state.isPremium);

  const features = [
    {
      title: "Unified Link Management",
      desc: "All your socials and content combined into a single link.",
      icon: Layers2,
    },
    {
      title: "Effortless Customization",
      desc: "Personalize your page with colors, fonts, and layouts.",
      icon: Settings,
    },
    {
      title: "Insightful Analytics",
      desc: "Track engagement and grow your audience with data.",
      icon: ChartSpline,
    },
    {
      title: "Easy Sharing",
      desc: "Share your StackLinks easily across platforms and profiles.",
      icon: Share2,
    },
  ];

  const faqItems = [
    {
      q: "Is LinksStack free?",
      a: "Yes! You can start with our free plan, which lets you add up to 3 links. Upgrade anytime to PRO for unlimited links, custom URLs, themes, and advanced analytics.",
    },
    {
      q: "Can I use my own domain?",
      a: "Absolutely—PRO users can connect a custom domain or subdomain to their LinksStack profile via the Domain Settings panel.",
    },
    {
      q: "Can I customize my LinksStack page?",
      a: "Yes! All users can upload a profile picture or logo. PRO users unlock full customization.",
    },
    {
      q: "Do I get analytics?",
      a: "Yes! The free plan includes basic click and view counts. PRO users get advanced insights like referral sources, geolocation, and date-range filters.",
    },
    {
      q: "Is my data secure?",
      a: "We use end-to-end encryption for all data, encrypt user passwords and critical data and store securely.",
    },
    {
      q: "Which platforms can I link or embed?",
      a: "LinksStack supports all major social platforms— Instagram, TikTok, YouTube, Discord, and more.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-gray-900 text-white font-sans overflow-y-hidden">
      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="py-16 pt-20 px-4 sm:py-20 sm:px-6 md:py-24 md:px-6 mt-14 sm:mt-16 md:mt-20"
      >
        <div className="max-w-screen-lg mx-auto text-center px-2">
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{
              scale: 1.05,
              rotate: -2,
              transition: { duration: 0.2 },
            }}
            className="inline-flex items-center justify-center mb-8 cursor-default"
          >
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-5 bg-white/5 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-3.5 rounded-full border border-white/10 w-fit text-white">
              {/* Social Icons */}
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <FaGithub className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                <FaInstagram className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                <FaLinkedinIn className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              </div>

              {/* Arrow */}
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-gray-400" />

              {/* App Icon + Link */}
              <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
                <Layers2 className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-gray-200" />
                <span className="text-sm sm:text-base lg:text-lg font-medium font-poppins truncate">
                  {user
                    ? `linksstack.com/${userDetails?.profileSlug}`
                    : `linksstack.com/aT7bU9zP`}
                </span>
              </div>
            </div>
          </motion.div>

          <h1 className="text-6xl md:text-7xl text-balance font-extrabold bg-clip-text text-transparent bg-gradient-to-br sm:bg-gradient-to-r  from-pink-500  via-purple-600 to-indigo-500 brightness-150 mb-6 leading-tight">
            All Your Socials, Streamlined in One Link
          </h1>

          <p className="w-full text-[15px] sm:text-lg md:text-xl text-balance text-gray-300 max-w-4xl mx-auto mb-6 leading-relaxed font-poppins">
            LinksStack organizes all your social profile links into one sleek,
            shareable hub — making it easier than ever to connect your audience
            to everything you do online.absolute
          </p>

          <br />

          {user ? (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 2 }}
              transition={{ duration: 0.02 }}
              onClick={() => navigate("/home")}
              className="inline-flex items-center px-12 sm:px-16 py-3 sm:py-4 bg-gradient-to-r from-orange-400 via-rose-500 to-pink-600 rounded-full text-neutral-900 font-black shadow-lg brightness-200 transition text-base sm:text-lg md:text-xl"
            >
              GO to Home
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 stroke-[4]" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 2 }}
              transition={{ duration: 0.02 }}
              onClick={() => navigate("/signup")}
              className="inline-block px-12 sm:px-16 py-3 sm:py-4 bg-gradient-to-r from-orange-400 via-rose-500 to-pink-600 rounded-full text-neutral-900 font-black shadow-lg brightness-200 transition text-base sm:text-lg md:text-xl"
            >
              Get Started For Free
            </motion.button>
          )}
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-16 text-white"
      >
        <div className="max-w-screen-lg mx-auto text-center px-4 sm:px-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-br sm:bg-gradient-to-r  from-pink-500  via-purple-600 to-indigo-500 brightness-125  leading-tight">
            Features Designed to Elevate Your Online Presence
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-screen-md mx-auto mb-14 leading-relaxed tracking-wide font-poppins">
            Easily manage, customize, and track your social links. With
            LinksStack, your online identity is seamless, stylish, and
            unforgettable.
          </p>
        </div>

        <div className="max-w-screen-lg mx-auto grid gap-10 sm:grid-cols-2 px-4 sm:px-6">
          {features.map(({ title, desc, icon: Icon }, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-xl p-8 flex items-center bg-gradient-to-br from-gray-900 via-gray-950 to-black shadow-2xl cursor-pointer overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Big faded icon */}
              <Icon
                className="absolute top-3 right-0 w-36 h-36 text-gray-500 opacity-10 pointer-events-none select-none"
                aria-hidden="true"
              />

              {/* Content */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex flex-col items-start max-w-[70%]">
                  <h3 className="text-2xl font-extrabold mb-3 text-white tracking-wide font-inter">
                    {title}
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed font-poppins">
                    {desc}
                  </p>
                </div>
                <div className="flex-shrink-0 ml-6 flex items-center justify-center w-20 h-20 rounded-full bg-white/5 backdrop-blur-md shadow-xl">
                  <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-24 text-white"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="mb-16">
            <h2 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-br sm:bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 brightness-150">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 text-xl sm:text-2xl max-w-2xl mx-auto">
              Start for free and upgrade when you need more.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-stretch">
            {/* Free Plan */}
            <motion.div className="w-full max-w-xs rounded-xl border border-gray-800 bg-gradient-to-br from-gray-800 via-gray-950 to-gray-950 p-6 flex flex-col transition-all">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-amber-500/10 p-2 rounded-lg">
                    <FerrisWheel className="text-amber-400 h-6 w-6" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Free</h3>
                </div>
                <ul className="space-y-3 text-lg text-gray-300 mb-6">
                  {[
                    "Up to 3 active links",
                    "Basic support",
                    "Basic analytics",
                    "Basic Theme",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-green-400 mt-1 flex-shrink-0 h-5 w-5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {!user && (
                <NavLink
                  to="/signup"
                  className="mt-auto bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-base"
                >
                  Get Started
                </NavLink>
              )}
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ scale: 1.06 }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-xs rounded-xl bg-gradient-to-tr from-gray-900 via-gray-950 to-amber-900/50 p-6 border-2 border-amber-600 shadow-lg shadow-amber-900/30 flex flex-col"
            >
              {/* Top Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 border-2 border-amber-600 text-white bg-gradient-to-br from-amber-900 via-gray-950 to-amber-900 text-sm font-semibold px-3 py-1 rounded-full tracking-wider font-poppins">
                LIFETIME
              </div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-gradient-to-tl from-amber-950 via-gray-900 to-gray-800 p-2 rounded-lg">
                    <Zap className="text-amber-300 h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-3xl font-bold text-white">Pro</h3>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 text-lg text-amber-50 mb-6">
                  {[
                    "Unlimited links",
                    "Custom domains",
                    "Advanced analytics",
                    "Premium themes",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-white mt-1 flex-shrink-0 h-5 w-5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Price Display */}
                {!isPremium && (
                  <div className="text-center mb-6">
                    <p className="font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-amber-400 via-rose-500 to-fuchsia-600 text-4xl tracking-tight font-sans">
                      रु 299
                    </p>
                    <p className="text-sm text-amber-50/60 font-medium mt-1">
                      One-time payment
                    </p>
                  </div>
                )}
              </div>

              {isPremium ? (
                <button
                  disabled
                  className="mt-auto flex justify-center items-center bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-gray-300 font-semibold py-3 px-6 rounded-lg cursor-not-allowed opacity-80 text-base"
                >
                  SUBSCRIBED <CheckCheck className=" ml-2 h-5 w-5" />
                </button>
              ) : (
                <NavLink
                  to={user ? "/upgrade" : "/signup"}
                  className="mt-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-125 text-gray-900 font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-amber-500/20 text-base"
                >
                  Upgrade Now
                </NavLink>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-12 px-4 sm:px-6 md:py-16 md:px-6"
      >
        <div className="max-w-screen-lg mx-auto px-2">
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br sm:bg-gradient-to-r  from-pink-500  via-purple-600 to-indigo-500 brightness-125  leading-tight  text-center mb-10 sm:mb-16">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {faqItems.map(({ q, a }, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.01 }}
                className="bg-gray-850 border border-gray-700 bg-gray-950 p-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-pink-400 text-lg sm:text-2xl font-semibold mb-2">
                  {q}
                </h3>
                <p className="text-pink-50 text-sm sm:text-base leading-relaxed font-poppins">
                  <ChevronRight className="inline-block mr-2 h-4 w-4" />
                  {a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Social */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-12 px-4 sm:px-6 md:py-16 md:px-6"
      >
        <div className="max-w-screen-lg mx-auto text-center px-2">
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br sm:bg-gradient-to-r  from-pink-500  via-purple-600 to-indigo-500 brightness-125  leading-tight  text-center mb-10 sm:mb-16">
            Showcase All Your Social Profiles
          </h2>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-10 text-white transition-colors duration-300 max-w-full">
            {[
              FaInstagram,
              FaDiscord,
              FaTiktok,
              FaTwitter,
              FaGithub,
              FaYoutube,
              FaLinkedinIn,
              FaFacebook,
              FaTwitch,
              FaPinterest,
            ].map((Icon, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.5, rotate: 5 }}
                transition={{ duration: 0.15 }}
                className="cursor-pointer"
              >
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
              </motion.div>
            ))}
          </div>
          <p className="mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 via-vlue-200 to-blue-500 brightness-125 font-poppins text-sm sm:text-base">
            and many more...
          </p>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="pt-20 px-4 sm:px-6 md:pt-32 md:px-6"
      >
        <div className="max-w-screen-lg mx-auto text-center bg-gradient-to-tr from-pink-700 via-purple-800 to-indigo-900 rounded-t-3xl brightness-150 p-12 sm:p-20 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 sm:mb-8 drop-shadow-lg leading-tight">
            Start Building Your LinksStack Today
          </h2>
          <p className="text-gray-200 mb-8 sm:mb-12 max-w-3xl mx-auto text-base sm:text-lg font-poppins">
            Make it easier for your fans to find you. One link, endless
            possibilities.
          </p>

          {user ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/dashboard")}
              className="bg-white text-pink-600 font-bold px-12 sm:px-20 py-4 rounded-full shadow-lg uppercase tracking-wider hover:brightness-105 transition text-sm sm:text-base"
            >
              View Your LinksStack
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/signup")}
              className="bg-white text-pink-600 font-bold px-10 sm:px-20 py-4 rounded-full shadow-lg uppercase tracking-wider hover:brightness-105 transition text-sm sm:text-base"
            >
              Create Your LinksStack
            </motion.button>
          )}
        </div>
      </motion.section>
    </main>
  );
}
