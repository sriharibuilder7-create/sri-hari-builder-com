"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useState } from "react";
import { ProjectShowcase } from "@/components/home/ProjectShowcase";
import { ConstructionProgress } from "@/components/projects/ConstructionProgress";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<"portfolio" | "progress">("portfolio");

  return (
    <main className="bg-charcoal min-h-screen pt-20">
      {/* Header */}
      <div className="py-20 text-center container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Our <span className="text-gold italic">Legacy</span>
          </h1>
          <p className="text-off-white/90 max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold leading-relaxed">
            From iconic landmarks to real-time site updates. <br /> Explore the engineering excellence of Sri Hari Builders.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`px-8 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${
                activeTab === "portfolio" ? "bg-gold text-charcoal shadow-lg shadow-gold/20" : "text-white/40 hover:text-white"
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setActiveTab("progress")}
              className={`px-8 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${
                activeTab === "progress" ? "bg-gold text-charcoal shadow-lg shadow-gold/20" : "text-white/40 hover:text-white"
              }`}
            >
              Live Progress
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === "portfolio" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeTab === "portfolio" ? 20 : -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {activeTab === "portfolio" ? <ProjectShowcase /> : <ConstructionProgress />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
