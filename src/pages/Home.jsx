import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Link as LinkIcon } from "lucide-react";

const Home = () => {
  const [links, setLinks] = useState([
    { id: 1, title: "Example Link 1", url: "https://example1.com" },
    { id: 2, title: "Example Link 2", url: "https://example2.com" },
    { id: 3, title: "Example Link 3", url: "https://example3.com" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        className="max-w-3xl mx-auto space-y-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            Link Stack
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Add, manage, and share your favorite links in one place.
          </p>
        </motion.div>

        {/* Add Link Button Styled Like a Form Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/30 border border-gray-700 rounded-2xl backdrop-blur-sm p-6 sm:p-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Add New Link
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Open the form to add a new link to your stack.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border backdrop-blur-sm border-indigo-500/30 bg-indigo-600/20 text-indigo-400 shadow-lg shadow-indigo-500/10 hover:bg-indigo-600/30">
              <Plus className="h-4 w-4" />
              Add Link
            </button>
          </div>
        </motion.div>

        {/* Link List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {links.map((link) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-between px-5 py-4 rounded-xl border border-gray-700 bg-gray-800/30 backdrop-blur-sm transition hover:bg-gray-700/40"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600/10 border border-indigo-500/20 rounded-full">
                  <LinkIcon className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{link.title}</h3>
                  <p className="text-sm text-gray-400 truncate max-w-[200px] sm:max-w-xs">
                    {link.url}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-indigo-400 hover:text-indigo-300 p-2 rounded-lg transition">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-400 hover:text-red-300 p-2 rounded-lg transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
