"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const CTA = () => {
  return (
    <section className="py-24 md:py-48 bg-gold relative overflow-hidden flex flex-col items-center justify-center text-center px-6">
      {/* Decorative Text in Background */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none opacity-10">
        <span className="text-[200px] md:text-[400px] font-serif uppercase tracking-[1em] whitespace-nowrap text-charcoal">
          SHB BUILDERS
        </span>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10"
      >
        <span className="text-charcoal uppercase tracking-[0.5em] text-xs font-bold mb-6 inline-block">
          Elevate Your Living
        </span>
        <h2 className="text-5xl md:text-8xl font-serif text-charcoal leading-tight mb-12 max-w-4xl">
          Crafting Your Vision into <span className="italic">Iconic Architecture</span>.
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <Link href="/contact" className="px-12 py-5 bg-charcoal text-off-white font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:scale-105 hover:bg-black">
            Get a Private Consultation
          </Link>
          <Link href="/projects" className="px-12 py-5 border border-charcoal/30 text-charcoal font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-charcoal hover:text-off-white hover:border-charcoal">
            Download Portfolio
          </Link>
        </div>
      </motion.div>

      {/* Subtle Bottom Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-charcoal/20 to-transparent" />
    </section>
  );
};
