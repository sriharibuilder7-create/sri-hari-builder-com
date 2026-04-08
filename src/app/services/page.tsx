import { motion } from "framer-motion";
import { Services as ServicesSection } from "@/components/home/Services";

export default function ServicesPage() {
  return (
    <main className="bg-charcoal min-h-screen pt-20">
      <div className="relative h-[40vh] md:h-[60vh] py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Our <span className="text-gold italic">Services</span></h1>
        <p className="text-off-white/90 max-w-2xl mx-auto uppercase tracking-widest text-sm">Comprehensive architectural and construction solutions.</p>
      </div>
      <ServicesSection />
    </main>
  );
}
