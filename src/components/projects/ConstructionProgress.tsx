"use client";

import { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Loader2, Construction, Calendar, CheckCircle2 } from "lucide-react";

interface ProgressItem {
  id: string;
  title?: string;
  description: string;
  imageUrl: string;
  section: string;
  createdAt: any;
}

const STAGES = [
  { id: "basement-level", name: "Basement Level" },
  { id: "lintel-level", name: "Lintel Level" },
  { id: "sill-level-concrete", name: "Sill Level" },
  { id: "still-level-concrete", name: "Still Level" },
];

export const ConstructionProgress = () => {
  const [activeStage, setActiveStage] = useState(STAGES[0].id);
  const [items, setItems] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "progress"),
          where("section", "==", activeStage),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ProgressItem[];
        setItems(data);
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [activeStage]);

  return (
    <div className="py-20 md:py-32 bg-charcoal text-off-white min-h-[600px]">
      <div className="container mx-auto px-6 md:px-12">
        {/* Stage Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {STAGES.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`px-6 py-3 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] transition-all duration-500 border
                ${activeStage === stage.id 
                  ? "bg-gold text-charcoal border-gold shadow-lg shadow-gold/20 scale-105" 
                  : "bg-white/5 text-off-white/40 border-white/5 hover:border-gold/30 hover:text-gold"}`}
            >
              {stage.name}
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 gap-4"
              >
                <Loader2 className="animate-spin text-gold" size={48} />
                <span className="text-xs uppercase tracking-[0.3em] text-gold/60 font-serif italic">Accessing Live Data</span>
              </motion.div>
            ) : items.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 bg-white/5 rounded-[40px] border border-white/10"
              >
                <Construction className="mx-auto text-gold/20 mb-6" size={64} />
                <h3 className="text-2xl font-serif text-white/40 italic">Updates arriving soon</h3>
                <p className="text-xs uppercase tracking-widest text-white/20 mt-4">This stage is in the final stages of engineering preparation</p>
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
              >
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      transition: { delay: index * 0.1, duration: 0.6, ease: "easeOut" } 
                    }}
                    className="group relative"
                  >
                    {/* Shading/Inner Glow Effect */}
                    <div className="absolute -inset-[1px] bg-gradient-to-tr from-gold/20 via-transparent to-white/10 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[2px]" />
                    
                    <div className="relative bg-[#1a1a1a] rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
                      {/* Image Wrapper */}
                      <div className="relative h-72 overflow-hidden">
                        <Image 
                          src={item.imageUrl} 
                          alt={item.title || "Progress Update"} 
                          fill 
                          className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60" />
                        
                        {/* Status Badge */}
                        <div className="absolute top-6 left-6 flex items-center gap-2 bg-charcoal/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                          <CheckCircle2 size={12} className="text-gold" />
                          <span className="text-[10px] uppercase font-bold tracking-widest text-off-white">Verified</span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-6 text-gold/40">
                          <Calendar size={14} />
                          <span className="text-[10px] uppercase font-bold tracking-widest leading-none">
                            {new Date(item.createdAt?.seconds * 1000).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>

                        <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-gold transition-colors duration-500">
                          {item.title || "Site Progress Update"}
                        </h3>
                        
                        <p className="text-off-white/50 text-sm leading-relaxed mb-8 line-clamp-3 font-light italic">
                          "{item.description}"
                        </p>

                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                           <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                             <span className="text-[8px] uppercase tracking-widest font-bold text-white/20">Live Sync</span>
                           </div>
                           <span className="text-[8px] uppercase tracking-widest font-extrabold text-gold opacity-40 group-hover:opacity-100 transition-opacity">Engineering Log</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
