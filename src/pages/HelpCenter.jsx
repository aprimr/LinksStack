import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  User,
  Link2,
  Settings,
  ChevronDown,
  Zap,
  Crown,
  CreditCard,
  Sliders,
  Shield,
} from "lucide-react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openQuestion, setOpenQuestion] = useState(null);

  const navigate = useNavigate();

  const userDetails = useAuthStore((state) => state.userDetails);
  const isPremium = useAuthStore((state) => state.isPremium);

  const faqs = {
    general: [
      {
        question: "What is LinksStack?",
        answer:
          "LinksStack is a lightweight web app that lets users create a personalized profile by adding and organizing their social media links. Share your LinksStack profile with others using a single URL.",
      },
      {
        question: "Who is LinksStack for?",
        answer:
          "LinksStack is designed for everyone — from creators and influencers to businesses and professionals who want to share their online presence in one place.",
      },
      {
        question: "Is LinksStack web-based or do I need to install anything?",
        answer:
          "LinksStack is completely web-based. No installation is needed — just sign up and start building your profile from your browser.",
      },
      {
        question: "Does LinksStack offer analytics?",
        answer:
          "Yes, LinksStack provides analytics so you can track link clicks and user engagement. PRO users get access to advanced insights.",
      },
      {
        question: "Can I customize my LinksStack profile?",
        answer:
          "Yes! All users can upload a profile picture or logo. PRO users can unlock advanced customization including themes, fonts, and button styles.",
      },
      {
        question: "Is there a free trial of PRO?",
        answer:
          "Currently, there is no free trial for PRO, but you can upgrade at any time directly from your dashboard.",
      },
    ],
    account: [
      {
        question: "I forgot my password. How can I reset it?",
        answer:
          "Click 'Forgot Password' on the login page. We'll send a reset link to your email address.",
      },
      {
        question: "Can I change my email address?",
        answer:
          "No, changing the email address associated with your account is not currently supported.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "Navigate to Account Settings > Delete Account. This will permanently remove all your data. Deleted accounts cannot be recovered.",
      },
      {
        question: "Can I use social login like Google or Apple?",
        answer:
          "Not currently. You can sign up and log in using your email and password.",
      },
      {
        question: "Can I change my profile URL?",
        answer:
          "By default, your profile link looks like: linksstack.com/a9gde933. PRO users can fully customize this URL and change it as many times as they like.",
      },
      {
        question: "Are usernames unique?",
        answer:
          "Yes, each profile URL is unique. If a custom URL is available, PRO users can claim and use it.",
      },
      {
        question: "Can I temporarily deactivate my account?",
        answer:
          "No, currently you can only permanently delete your account. Temporary deactivation is not supported.",
      },
      {
        question: "Does LinksStack support two-factor authentication (2FA)?",
        answer:
          "Not at the moment. We're planning security upgrades in the future.",
      },
    ],
    links: [
      {
        question: "How many links can I add?",
        answer:
          "Free users can add up to 3 links. PRO users get unlimited links and advanced customization options.",
      },
      {
        question: "Can I customize the URL of my LinksStack profile?",
        answer:
          "Yes! PRO users can customize their profile URL to a unique, personalized link. Free users get an auto-generated URL.",
      },
      {
        question: "Can I reorder my links?",
        answer:
          "Only PRO users can reorder their links by clicking to move them up or down in the dashboard. Free users cannot reorder links.",
      },
      {
        question: "Are there any limits on link clicks?",
        answer:
          "No, LinksStack does not limit how many times your links can be clicked. All clicks are tracked in your analytics dashboard.",
      },
      {
        question: "Can I upload a profile picture or logo?",
        answer:
          "Yes! Every user can upload a profile picture or logo to personalize their LinksStack profile.",
      },
    ],
    troubleshooting: [
      {
        question: "My LinksStack profile isn't loading properly",
        answer:
          "Try clearing your browser cache, disabling ad blockers, or using a different browser.",
      },
      {
        question: "I'm getting a 404 error when accessing my profile",
        answer:
          "This usually means the profile URL was changed or deleted. Verify your profile settings or contact support if the problem continues.",
      },
      {
        question: "Analytics data isn't updating",
        answer:
          "Analytics update every 24 hours. If you don’t see recent data after this time, please reach out to support with your account details.",
      },
      {
        question: "My LinksStack profile looks different on mobile",
        answer:
          "Profiles are responsive and adapt to screen size. Layout adjustments are made automatically for better mobile usability.",
      },
      {
        question: "My profile picture isn't loading",
        answer:
          "Ensure your uploaded image meets the size and format requirements. If it’s not showing, try re-uploading the file or refreshing your browser.",
      },
    ],
    billing: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept popular digital wallets like eSewa and Khalti for users in Nepal. International wallet options will be added soon.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "No, since LinksStack PRO is a one-time subscription, refunds are not available.",
      },
      {
        question: "Can I cancel my subscription?",
        answer:
          "No, the PRO subscription is a one-time purchase and cannot be canceled or refunded.",
      },
      {
        question: "Are there any additional taxes or fees?",
        answer:
          "No, there are no additional taxes or hidden fees added to your subscription.",
      },
      {
        question: "Can I get an invoice for my subscription?",
        answer:
          "Yes. Invoices are available under your Billing Settings after each successful payment.",
      },
    ],
    security: [
      {
        question: "Is my data secure?",
        answer:
          "Yes, user passwords and other crucial data are encrypted. We follow industry best practices and use HTTPS for all communication.",
      },
      {
        question: "What personal data does LinksStack collect?",
        answer:
          "We collect only necessary information such as your name and email address to provide our services. We do not sell your data to third parties.",
      },
      {
        question: "Can I export my data before deleting my account?",
        answer:
          "No, currently users cannot export their data before account deletion.",
      },
      {
        question: "How are profile images stored?",
        answer:
          "Profile images are securely stored in an Appwrite storage bucket with proper access controls.",
      },
      {
        question: "Can I delete my data permanently?",
        answer:
          "Yes. When you delete your account, all associated data is immediately and permanently removed from our servers and cannot be recovered.",
      },
      {
        question: "Are my payment details secure?",
        answer:
          "Yes. We process payments through a PCI-compliant payment gateway API, so your payment details are never stored on our servers.",
      },

      {
        question: "How often should I change my password?",
        answer:
          "We recommend updating your password every 3–6 months and using a password manager to keep it secure and unique.",
      },
    ],
  };

  const categories = [
    { id: "general", name: "General", icon: HelpCircle },
    { id: "account", name: "Account", icon: User },
    { id: "links", name: "Links", icon: Link2 },
    { id: "troubleshooting", name: "Troubleshooting", icon: Settings },
    { id: "billing", name: "Billing", icon: CreditCard },
    { id: "security", name: "Security", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-gray-950 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 pt-32 sm:pt-28 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-5xl md:text-6xl text-balance font-extrabold bg-clip-text text-transparent bg-gradient-to-br sm:bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 brightness-150 mb-3 leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            Help Center
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto "
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          >
            Get support, find answers, and resolve common issues easily.
          </motion.p>
        </div>

        {/*Category Chips */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-8 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all duration-300 backdrop-blur-sm border ${
                  activeCategory === category.id
                    ? "border-indigo-500/30 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 shadow-lg shadow-indigo-500/10"
                    : "border-gray-700/50 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40"
                }`}
                onClick={() => {
                  setActiveCategory(category.id);
                  setOpenQuestion(null);
                }}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium font-poppins">
                  {category.name}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* FAQ List */}
        <motion.div
          layout
          className="bg-gray-800/50 rounded-xl overflow-hidden shadow-xl backdrop-blur-sm border border-gray-700/30"
        >
          <AnimatePresence>
            {faqs[activeCategory].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-b border-gray-700/30 last:border-b-0"
              >
                <button
                  className="w-full px-5 py-4 text-left flex justify-between items-center hover:bg-gray-750/30 transition-colors"
                  onClick={() =>
                    setOpenQuestion(openQuestion === index ? null : index)
                  }
                >
                  <h3 className="font-medium text-gray-100 text-sm sm:text-base">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openQuestion === index ? 180 : 0 }}
                    className="text-gray-400 ml-2"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openQuestion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 text-gray-400 text-sm sm:text-base font-poppins">
                        {item.answer.split("\n").map((paragraph, i) => (
                          <p key={i} className="mb-2 last:mb-0">
                            {paragraph}
                          </p>
                        ))}
                        {index === 0 &&
                          activeCategory === "troubleshooting" && (
                            <div className="mt-4 bg-gray-750/30 rounded-lg p-4 border border-gray-700/20">
                              <h4 className="font-medium text-gray-200 mb-2">
                                Quick fixes to try first:
                              </h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-400">
                                <li>
                                  Refresh the page (Ctrl+F5 for hard refresh)
                                </li>
                                <li>Check your internet connection</li>
                                <li>Try incognito/private browsing mode</li>
                                <li>Restart your device</li>
                              </ul>
                            </div>
                          )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Premium Contact Section */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative my-12"
          >
            <div className="relative bg-gradient-to-br from-gray-950 via-amber-800/10 to-amber-700/20 rounded-2xl px-6 py-8 sm:px-8 sm:py-10 border border-yellow-600/20  overflow-hidden">
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="p-3 rounded-lg bg-yellow-600/10 border border-yellow-500/20">
                    <Crown className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-yellow-300 mb-1">
                      Upgrade to PRO
                    </h3>
                    <p className="text-gray-200 text-sm sm:text-base font-poppins">
                      Get exclusive features and priority support
                    </p>
                  </div>
                </div>

                {/* Button */}
                <motion.button
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/upgrade")}
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-gray-900 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="text-sm sm:text-base">Upgrade Now</span>
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default HelpCenter;
