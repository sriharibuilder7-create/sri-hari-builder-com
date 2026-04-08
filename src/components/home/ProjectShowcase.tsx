import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Construction } from "lucide-react";

export const ProjectShowcase = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "portfolio"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching portfolio:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-24 md:py-48 bg-off-white text-charcoal">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold">Showcase</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              Extraordinary <span className="text-gold italic">Creations</span>
            </h2>
          </div>
          <Link href="/projects" className="group px-8 py-3 mx-auto md:mx-0 border border-charcoal/20 text-xs uppercase tracking-widest font-bold hover:bg-charcoal hover:text-off-white transition-all duration-300">
            View All Projects 
            <span className="ml-4 inline-block transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin text-gold" size={48} />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 bg-charcoal/5 rounded-[40px] border border-charcoal/10">
            <Construction className="mx-auto text-gold/20 mb-6" size={64} />
            <h3 className="text-2xl font-serif text-charcoal/40 italic">New portfolio coming soon</h3>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="group relative cursor-pointer"
              >
                <div className="relative h-[450px] md:h-[550px] overflow-hidden rounded-3xl mb-8 shadow-2xl bg-charcoal/5 flex items-center justify-center">
                  <Image 
                    src={project.imageUrl} 
                    alt={project.title || "Project"} 
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                  />
                  
                  {/* Elegant Bottom Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-80 transition-opacity md:group-hover:opacity-100" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-8 transform transition-all duration-700 ease-out">
                    <div className="flex justify-between items-end">
                      <div className="flex-1 min-w-0 pr-4">
                        <span className="text-gold uppercase tracking-[0.4em] text-[8px] mb-2 block font-bold truncate">
                          {project.title || "Elite Landmark"}
                        </span>
                        <h3 className="text-white text-2xl font-serif leading-tight truncate">
                          {project.description}
                        </h3>
                        <p className="text-white/60 text-[8px] mt-1 uppercase tracking-widest font-bold">
                          Engineering Excellence by SHB
                        </p>
                      </div>
                      <Link 
                        href="/contact" 
                        className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-charcoal transform transition-transform hover:scale-110 flex-shrink-0"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
