"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement | number, options?: { offset?: number; duration?: number }) => void } }).lenis;
    
    // If we're at the top and hero is not expanded, expand it first
    if (window.scrollY < 10 && sectionId !== "hero") {
      const expandFunc = (window as unknown as { expandHeroAndNavigate?: (callback: () => void) => void }).expandHeroAndNavigate;
      if (expandFunc) {
        expandFunc(() => {
          setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
              if (lenis) {
                lenis.scrollTo(element, { offset: -100, duration: 1.5 });
              } else {
                const offset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - offset;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                });
              }
            }
          }, 100);
        });
        return;
      }
    }
    
    // Normal scroll
    if (sectionId === "hero") {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        if (lenis) {
          lenis.scrollTo(element, { offset: -100, duration: 1.5 });
        } else {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }, 100);
  };
  
  return (
    <footer className="relative bg-white border-t-2 border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo / About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Sterivio</h2>
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Premium quality surgical instruments trusted by professionals worldwide.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-tight">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <button onClick={() => scrollToSection("hero")} className="text-sm text-gray-700 hover:text-cyan-500 transition font-semibold">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("about")} className="text-sm text-gray-700 hover:text-cyan-500 transition font-semibold">
                Why Us?
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("products")} className="text-sm text-gray-700 hover:text-cyan-500 transition font-semibold">
                Products
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("quote")} className="text-sm text-gray-700 hover:text-cyan-500 transition font-semibold">
                Request Quote
              </button>
            </li>
          </ul>
        </motion.div>

        {/* Our Niches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-tight">Our Niches</h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-700 leading-relaxed">
              <span className="font-bold text-gray-900">Veterinary:</span> Specialized surgical instruments and grooming tools for veterinary professionals.
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-tight">Contact Us</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-500" /> info@sterivio.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-500" /> <a href="tel:+19293995026" className="hover:text-cyan-500 transition">+1(929) 399-5026</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-500" /> New York, United States
            </li>
          </ul>

          {/* Social Links */}
          <div className="flex gap-3 mt-6">
            <a href="https://www.facebook.com/share/18kyzYAZoE/" target="_blank" rel="noreferrer" aria-label="Sterivio on Facebook" className="p-2 bg-gray-100 hover:bg-cyan-500 hover:text-white rounded-lg transition-colors duration-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/sterivio?igsh=ejhtcGJ6N3lkamh0" target="_blank" rel="noreferrer" aria-label="Sterivio on Instagram" className="p-2 bg-gray-100 hover:bg-cyan-500 hover:text-white rounded-lg transition-colors duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/sterivio/" target="_blank" rel="noreferrer" aria-label="Sterivio on LinkedIn" className="p-2 bg-gray-100 hover:bg-cyan-500 hover:text-white rounded-lg transition-colors duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-gray-200 mt-10 pt-6 text-center text-sm font-semibold text-gray-700 max-w-7xl mx-auto px-6">
        © {new Date().getFullYear()} Sterivio. All rights reserved.
      </div>
    </footer>
  );
}
