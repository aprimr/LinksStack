import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProBadge = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate("/upgrade")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden max-w-fit cursor-pointer rounded-full"
    >
      {/* Main badge content */}
      <motion.div
        className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide relative z-10"
        style={{
          background:
            "linear-gradient(45deg, rgba(180, 83, 9, 0.3), rgba(245, 158, 11, 0.4), rgba(180, 83, 9, 0.3))",
          color: "#fbbf24",
          boxShadow: "0 0 12px rgba(245, 158, 11, 0.3)",
          textShadow: "0 0 8px rgba(245, 158, 11, 0.5)",
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </motion.div>
        <span className="leading-none font-bold">PRO</span>
      </motion.div>

      {/* Shimmer */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{
          x: ["-100%", "200%", "200%"],
          opacity: [0, 0.8, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: [0.4, 0, 0.2, 1],
          },
        }}
        className="absolute inset-0 z-20 pointer-events-none rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.7), transparent)",
          transform: "skewX(-20deg)",
        }}
      />

      {/* Glow pulse */}
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute inset-0 z-0 pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(245, 158, 11, 0.4), transparent 80%)",
        }}
      />
    </motion.div>
  );
};

export default ProBadge;
