"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useState } from "react";
import { ProjectShowcase } from "@/components/home/ProjectShowcase";
import { ConstructionProgress } from "@/components/projects/ConstructionProgress";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsPage() {
  return (
    <main className="bg-charcoal min-h-screen pt-20 relative overflow-visible">
      {/* Header */}
      <div className="py-20 text-center container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Engineering <span className="text-gold italic">in Motion</span>
          </h1>
          <p className="text-off-white/90 max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold leading-relaxed">
            From the Foundation to the Finish. <br /> Explore the craft behind Sri Hari Builders across all stages.
          </p>
        </motion.div>
      </div>

      {/* Unified Master Component */}
      <ConstructionProgress />
    </main>
  );
}
