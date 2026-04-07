"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassPanel = ({ children, className = "", hover = true }: GlassPanelProps) => {
  return (
    <motion.div
      className={`glass p-8 relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-glass ${className}`}
      whileHover={hover ? {
        scale: 1.02,
        borderColor: "rgba(212, 175, 55, 0.4)",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
      } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
};
