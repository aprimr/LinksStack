import { useState } from "react";
import { easeInOut, motion } from "framer-motion";
import {
  Shield,
  FileText,
  Mail,
  BarChart2,
  Users,
  Lock,
  Server,
  Cookie,
  CreditCard,
} from "lucide-react";

const TermsAndPrivacy = () => {
  const [activeTab, setActiveTab] = useState("terms");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeInOut,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-gray-950 text-gray-100 py-16 pt-24 sm:pt-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-screen-lg mx-auto space-y-8"
      >
        {/* Header */}
        <motion.header className="text-center pt-10" variants={itemVariants}>
          <motion.h1
            className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Legal Center
          </motion.h1>
          <motion.p
            className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Transparency and trust are at the core of LinksStack
          </motion.p>
        </motion.header>

        <motion.div
          className="flex overflow-x-auto pb-1 scrollbar-hide"
          variants={itemVariants}
        >
          <div className="inline-flex border-b border-gray-700 bg-gray-800/50 rounded-t-xl">
            <button
              onClick={() => setActiveTab("terms")}
              className={`px-4 py-2 text-sm sm:text-base font-medium flex items-center gap-2 transition rounded-tl-xl ${
                activeTab === "terms"
                  ? "text-white border-b-2 border-indigo-500 bg-gray-700/40"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              Terms of Service
            </button>
            <button
              onClick={() => setActiveTab("privacy")}
              className={`px-4 py-2 text-sm sm:text-base font-medium flex items-center gap-2 transition rounded-tr-xl ${
                activeTab === "privacy"
                  ? "text-white border-b-2 border-indigo-500 bg-gray-700/40"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              Privacy Policy
            </button>
          </div>
        </motion.div>

        <div className="space-y-6">
          {activeTab === "privacy" && (
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
              className="bg-gray-800/30 rounded-xl p-5 sm:p-6 border border-gray-700/40 backdrop-blur-sm"
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Privacy Policy
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Last Updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="space-y-6 pl-12 sm:pl-14">
                {[
                  {
                    icon: <Server className="w-5 h-5 text-indigo-400" />,
                    title: "Information We Collect",
                    content: (
                      <ul className="list-disc list-inside text-xs sm:text-sm text-gray-300 space-y-1">
                        <li>Basic account information (email, username)</li>
                        <li>Links you add to your profile</li>
                        <li>Aggregated analytics about profile visits</li>
                        <li>
                          Technical data (browser type, device information)
                        </li>
                      </ul>
                    ),
                  },
                  {
                    icon: <BarChart2 className="w-5 h-5 text-indigo-400" />,
                    title: "How We Use Your Information",
                    content: (
                      <ul className="list-disc list-inside text-xs sm:text-sm text-gray-300 space-y-1">
                        <li>Provide and maintain our service</li>
                        <li>Improve and personalize your experience</li>
                        <li>Communicate with you about your account</li>
                        <li>Ensure platform security and prevent abuse</li>
                      </ul>
                    ),
                  },
                  {
                    icon: <Lock className="w-5 h-5 text-indigo-400" />,
                    title: "Data Protection",
                    content: (
                      <ul className="list-disc list-inside text-xs sm:text-sm text-gray-300 space-y-1">
                        <li>HTTPS encryption for all data transfers</li>
                        <li>Regular security audits</li>
                        <li>Password hashing</li>
                        <li>Limited access to sensitive data</li>
                      </ul>
                    ),
                  },
                  {
                    icon: <Cookie className="w-5 h-5 text-indigo-400" />,
                    title: "Cookies",
                    content: (
                      <ul className="list-disc list-inside text-xs sm:text-sm text-gray-300 space-y-1">
                        <li>Authentication and security</li>
                        <li>Basic functionality</li>
                        <li>Analytics (anonymized)</li>
                      </ul>
                    ),
                  },
                  {
                    icon: <Lock className="w-5 h-5 text-indigo-400" />,
                    title: "Account & Data Deletion",
                    content: (
                      <>
                        <p className="text-xs sm:text-sm text-gray-300 mb-2">
                          Users may delete their account at any time. When an
                          account is deleted, all associated data is permanently
                          removed from our servers without delay.
                        </p>
                        <p className="text-xs sm:text-sm text-gray-300">
                          We do not retain any personally identifiable
                          information once the account is deleted.
                        </p>
                      </>
                    ),
                  },
                  {
                    icon: <Mail className="w-5 h-5 text-indigo-400" />,
                    title: "Contact Us",
                    content: (
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm text-gray-300">
                          For privacy concerns, contact our Data Protection
                          Officer at:
                        </p>
                        <a
                          href="mailto:privacy@linksstack.com"
                          className="text-xs sm:text-sm text-indigo-400 hover:underline flex items-center gap-1"
                        >
                          <Mail className="w-4 h-4" />
                          linksstack@gmail.com
                        </a>
                      </div>
                    ),
                  },
                ].map((section, idx) => (
                  <motion.div
                    key={idx}
                    className="space-y-2 sm:space-y-3"
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      {section.icon}
                      <h3 className="text-sm sm:text-base font-semibold text-white">
                        {section.title}
                      </h3>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-300 pl-7 sm:pl-8">
                      {section.content}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {activeTab === "terms" && (
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
              className="bg-gray-800/30 rounded-xl p-5 sm:p-6 border border-gray-700/40 backdrop-blur-sm"
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-6">
                <div className="p-2 sm:p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Terms of Service
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Last Updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="space-y-6 pl-12 sm:pl-14">
                {[
                  {
                    icon: <FileText className="w-5 h-5 text-indigo-400" />,
                    title: "Acceptance of Terms",
                    content: (
                      <p className="text-xs sm:text-sm text-gray-300">
                        By using LinksStack ("Service"), you agree to these
                        Terms. If you don't agree, don't use our Service.
                      </p>
                    ),
                  },
                  {
                    icon: <Users className="w-5 h-5 text-indigo-400" />,
                    title: "User Content",
                    content: (
                      <>
                        <p className="text-xs sm:text-sm text-gray-300 mb-2">
                          Users may upload a profile picture and add links to
                          their social media or other content. You retain full
                          ownership of your content.
                        </p>
                        <p className="text-xs sm:text-sm text-gray-300">
                          We do not claim rights over user-provided content.
                          Users are responsible for ensuring the legality of
                          their shared content.
                        </p>
                      </>
                    ),
                  },
                  {
                    icon: <Shield className="w-5 h-5 text-indigo-400" />,
                    title: "Account Termination",
                    content: (
                      <>
                        <p className="text-xs sm:text-sm text-gray-300 mb-2">
                          We reserve the right to suspend, remove verification,
                          or terminate accounts that violate our policies or
                          engage in harmful behavior.
                        </p>
                        <p className="text-xs sm:text-sm text-gray-300">
                          Termination may occur with or without prior notice,
                          depending on the severity of the violation.
                        </p>
                      </>
                    ),
                  },
                  {
                    icon: <BarChart2 className="w-5 h-5 text-indigo-400" />,
                    title: "Changes to the Service",
                    content: (
                      <p className="text-xs sm:text-sm text-gray-300">
                        LinksStack reserves the right to modify, add, or remove
                        features at any time without notice. Continued use of
                        the platform after changes constitutes acceptance.
                      </p>
                    ),
                  },
                  {
                    icon: <CreditCard className="w-5 h-5 text-indigo-400" />,
                    title: "PRO Subscription Policy",
                    content: (
                      <>
                        <p className="text-xs sm:text-sm text-gray-300 mb-2">
                          PRO is a one-time payment upgrade that grants access
                          to all current and future premium features.
                        </p>
                        <p className="text-xs sm:text-sm text-gray-300">
                          No trial period or refunds are offered, unless
                          required by local law.
                        </p>
                      </>
                    ),
                  },
                  {
                    icon: <Lock className="w-5 h-5 text-indigo-400" />,
                    title: "Governing Law",
                    content: (
                      <p className="text-xs sm:text-sm text-gray-300">
                        These Terms are governed by the laws of Nepal. Any
                        disputes will be resolved in the courts of Kathmandu.
                      </p>
                    ),
                  },
                ].map((section, idx) => (
                  <motion.div
                    key={idx}
                    className="space-y-2 sm:space-y-3"
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      {section.icon}
                      <h3 className="text-sm sm:text-base font-semibold text-white">
                        {section.title}
                      </h3>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-300 pl-7 sm:pl-8">
                      {section.content}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TermsAndPrivacy;
