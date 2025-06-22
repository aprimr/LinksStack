import { easeInOut, motion } from "framer-motion";
import {
  ShieldCheck,
  DollarSign,
  Info,
  Users,
  Rocket,
  Mail,
  Link as LinkIcon,
  MessageSquare,
  BarChart2,
  Palette,
  Code,
  Globe,
  Zap,
} from "lucide-react";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  const featureCards = [
    {
      icon: <LinkIcon className="w-5 h-5" />,
      title: "Link Management",
      description: "Organize all your important links in one place",
    },
    {
      icon: <BarChart2 className="w-5 h-5" />,
      title: "Analytics",
      description: "Track clicks and visitor engagement",
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Customization",
      description: "Personalize colors, fonts, and layouts",
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Custom CSS",
      description: "Advanced styling for PRO users",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Custom Domains",
      description: "Use your own domain with PRO",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Instant Setup",
      description: "Get started in minutes",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-gray-950 text-gray-100 py-16 pt-24 sm:pt-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-screen-lg mx-auto space-y-20"
      >
        {/* Hero Section */}
        <motion.header className="text-center pt-10" variants={itemVariants}>
          <motion.h1
            className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About LinksStack
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Your all-in-one profile link solution — crafted for creators,
            influencers, and professionals who want to share their online
            presence beautifully.
          </motion.p>
        </motion.header>

        {/* Feature Highlights */}
        <motion.section variants={itemVariants}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/40 backdrop-blur-sm hover:border-indigo-500/30 transition-all"
                whileHover={{ y: -5 }}
                variants={itemVariants}
                custom={index}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Main Content Sections */}
        <div className="space-y-6">
          {[
            {
              icon: <Users className="w-6 h-6" />,
              title: "Our Mission",
              content:
                "At LinksStack, we empower creators, influencers, businesses, and professionals to share their online presence seamlessly. Our platform helps you consolidate all your important links into one personalized, shareable profile that represents your brand.",
            },
            {
              icon: <Info className="w-6 h-6" />,
              title: "Who We Are",
              content:
                "LinksStack is a lightweight, web-based tool for building beautiful profile pages with social links, media embeds, and websites — no installation needed. Start with our free plan and upgrade to PRO anytime for advanced features.",
            },
            {
              icon: <Rocket className="w-6 h-6" />,
              title: "Key Features",
              content: (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700/30">
                      <h4 className="font-medium text-indigo-400 mb-2">
                        Free Plan
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                        <li>Up to 3 links</li>
                        <li>Basic customization</li>
                        <li>Essential analytics</li>
                      </ul>
                    </div>
                    <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800/30">
                      <h4 className="font-medium text-purple-400 mb-2">
                        PRO Plan
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                        <li>Unlimited links</li>
                        <li>Advanced customization</li>
                        <li>Detailed analytics</li>
                        <li>Custom domains</li>
                        <li>Premium support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              icon: <ShieldCheck className="w-6 h-6" />,
              title: "Security & Privacy",
              content:
                "Your security is our priority. We protect your data with HTTPS encryption, secure password hashing, and regular security audits. Payment processing is handled by PCI-compliant services — we never store your payment information on our servers.",
            },
            {
              icon: <DollarSign className="w-6 h-6" />,
              title: "Billing & Payments",
              content:
                "LinksStack PRO offers flexible payment options with a one-time payment model (no subscriptions). We accept payments through eSewa, Khalti (for Nepal), and international credit/debit cards. Our pricing is transparent with no hidden fees.",
            },
          ].map((section, idx) => (
            <motion.section
              key={idx}
              className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/40 backdrop-blur-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={itemVariants}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                  {section.icon}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {section.title}
                </h2>
              </div>
              <div className="text-gray-300 text-base leading-relaxed space-y-4 pl-16">
                {section.content}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer */}
        <motion.footer
          className="text-center text-gray-500 text-sm"
          variants={itemVariants}
        >
          <p>
            &copy; {new Date().getFullYear()} LinksStack. All rights reserved.
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default About;
