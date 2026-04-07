"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300 ${
          scrolled || isOpen ? "bg-charcoal/90 backdrop-blur-xl shadow-glass py-3" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        <Link href="/" className="flex items-center gap-4 group z-50">
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-gold/30 bg-white p-1 transition-transform duration-500 group-hover:scale-110 shadow-lg shadow-gold/10">
            <Image 
              src="/logo.png" 
              alt="Sri Hari Builder Logo" 
              fill
              className="object-contain p-0 scale-[1.7]"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-2xl font-serif font-bold tracking-tighter text-gold leading-none">SRI HARI</span>
            <span className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] text-white/40 leading-none mt-1">Builders & Promoters</span>
          </div>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10 text-sm font-sans uppercase tracking-widest text-off-white/80">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-gold transition-colors relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4 z-50">
          <Link 
            href="/contact" 
            className="hidden md:flex items-center gap-2 px-6 py-2 border border-gold text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-all duration-300"
          >
            Consult Now
          </Link>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gold transition-transform active:scale-95"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center space-y-10 md:hidden pt-20"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <Image 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" 
                alt="Bg" 
                fill
                className="object-cover"
              />
            </div>
            
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx + 0.3 }}
              >
                <Link 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-serif text-white hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-10 flex flex-col items-center gap-6"
            >
              <Link 
                href="/contact" 
                onClick={() => setIsOpen(false)}
                className="px-10 py-4 bg-gold text-charcoal font-bold uppercase tracking-widest text-xs"
              >
                Consult Now
              </Link>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-gold/60 text-sm">
                <Phone size={16} />
                +91 98765 43210
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
