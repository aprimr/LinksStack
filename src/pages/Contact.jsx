import {
  Mail,
  MessageSquare,
  GitPullRequest,
  Code,
  Heart,
  Globe,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { easeInOut, motion } from "framer-motion";

const Contact = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeInOut,
      },
    },
  };

  const socialLinks = [
    {
      icon: FaGithub,
      name: "GitHub",
      url: "https://github.com/aprimr/LinksStack",
      iconClass: "text-gray-300",
      bgClass: "bg-gray-800",
    },
    {
      icon: FaDiscord,
      name: "Discord",
      url: "https://discord.com",
      iconClass: "text-gray-300",
      bgClass: "bg-gray-800",
    },
    // Developer
    {
      icon: Globe,
      name: "Website",
      url: "https://aprimregmi.com.np",
      iconClass: "text-gray-300",
      bgClass: "bg-gray-800",
    },
    {
      icon: FaLinkedin,
      name: "Linked In",
      url: "https://www.linkedin.com/in/aprimregmi/",
      iconClass: "text-gray-300",
      bgClass: "bg-gray-800",
    },
  ];

  const faqs = [
    {
      question: "How can I report a bug?",
      answer:
        "Open an issue on our GitHub repository with details about the problem.",
      icon: GitPullRequest,
      bgColor: "bg-purple-900/30",
      iconColor: "text-purple-400",
      borderColor: "border-purple-800/50",
      link: "https://github.com/aprimr/LinksStack/issues",
    },
    {
      question: "Where's the documentation?",
      answer: "Available in the GitHub repository's README and wiki pages.",
      icon: Code,
      bgColor: "bg-emerald-900/30",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-800/50",
      link: "https://github.com/aprimr/LinksStack#readme",
    },
    {
      question: "How to get support?",
      answer: "Email us or open a GitHub discussion for help.",
      icon: MessageSquare,
      bgColor: "bg-amber-900/30",
      iconColor: "text-amber-400",
      borderColor: "border-amber-800/50",
      link: "https://github.com/aprimr/LinksStack/discussions",
    },
    {
      question: "Can I contribute?",
      answer: "Absolutely! Check the GitHub repo for contribution guidelines.",
      icon: Heart,
      bgColor: "bg-rose-900/30",
      iconColor: "text-rose-400",
      borderColor: "border-rose-800/50",
      link: "https://github.com/aprimr/LinksStack",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-gray-950 text-gray-100 py-16 pt-24 sm:pt-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto space-y-16"
      >
        {/* Header */}
        <motion.header className="text-center pt-10" variants={itemVariants}>
          <motion.h1
            className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Contact
          </motion.h1>
          <motion.p
            className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Get in touch with us if you have any questions or feedback.
          </motion.p>
        </motion.header>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Email & Socials */}
          <motion.div
            variants={itemVariants}
            className="space-y-8 bg-gray-800/30 p-5 sm:p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-500/30">
                  <Mail className="text-indigo-400 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg sm:text-xl text-white">
                    Email Us
                  </h3>
                  <a
                    href="mailto:support@linksstack.com"
                    className="text-indigo-300 hover:text-indigo-200 transition font-medium"
                  >
                    linksstack@gmail.com
                  </a>
                  <p className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent mt-1 text-sm font-poppins">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="font-semibold text-lg sm:text-xl mb-3 text-white">
                  Find Us Online
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-2 p-3 rounded-xl ${social.bgClass} hover:bg-gray-700/50 transition-all border border-gray-700/50`}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`p-2 rounded-lg ${social.iconClass}`}>
                        <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="font-medium text-gray-200 text-sm sm:text-base">
                        {social.name}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* GitHub Section */}
          <motion.div
            variants={itemVariants}
            className="space-y-8 bg-gray-800/30 p-5 sm:p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/30">
                  <FaGithub className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg sm:text-xl text-white">
                    Report a Bug
                  </h3>
                  <p className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent mt-1 text-sm font-poppins">
                    Found a bug? Open an issue on our GitHub repository.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <motion.a
                  href="https://github.com/aprimr/LinksStack/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  whileHover={{ y: -3 }}
                >
                  <div className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all border border-gray-700/50 hover:border-purple-500/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                        <GitPullRequest className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="font-medium text-gray-200 text-sm sm:text-base">
                        Report an Issue
                      </span>
                    </div>
                    <p className="text-gray-400 mt-2 text-xs">
                      Found a bug? Open an issue on our GitHub repository.
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://github.com/aprimr/LinksStack/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  whileHover={{ y: -3 }}
                >
                  <div className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all border border-gray-700/50 hover:border-blue-500/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="font-medium text-gray-200 text-sm sm:text-base">
                        Join Discussions
                      </span>
                    </div>
                    <p className="text-gray-400 mt-2 text-xs">
                      Have questions? Join our GitHub discussions.
                    </p>
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div className="mt-12" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-center mb-8 text-white">
            Common Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {faqs.map((faq, index) => (
              <motion.a
                key={index}
                href={faq.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-5 sm:p-6 rounded-xl ${faq.bgColor} border ${faq.borderColor} backdrop-blur-sm hover:bg-opacity-50 transition-all`}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`p-2 rounded-lg ${faq.iconColor} bg-black/20`}
                  >
                    <faq.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-semibold text-white text-sm sm:text-base">
                    {faq.question}
                  </h3>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm pl-10 font-poppins">
                  {faq.answer}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
