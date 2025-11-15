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
    <footer className="relative bg-card border-t border-border text-muted-foreground py-14 mt-1">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo / About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold font-serif text-primary">Sterivio</h2>
          <p className="mt-4 text-sm leading-6 font-sans">
            Premium quality surgical instruments trusted by professionals worldwide.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold font-sans text-foreground mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <button onClick={() => scrollToSection("hero")} className="hover:text-primary transition font-sans">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("about")} className="hover:text-primary transition font-sans">
                Why Us?
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("products")} className="hover:text-primary transition font-sans">
                Products
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("quote")} className="hover:text-primary transition font-sans">
                Request Quote
              </button>
            </li>
          </ul>
        </motion.div>

        {/* Our Niches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold font-sans text-foreground mb-4">Our Niches</h3>
          <ul className="space-y-2">
            <li className="text-sm font-sans leading-relaxed">
              <span className="font-semibold text-foreground">Veterinary:</span> Specialized surgical instruments and grooming tools for veterinary professionals, crafted from medical-grade stainless steel for optimal performance in animal care.
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold font-sans text-foreground mb-4 ml-10">Contact Us</h3>
          <ul className="space-y-3 text-sm font-sans ml-10">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" /> info@sterivio.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" /> +92 300 1234567
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Sialkot, Pakistan
            </li>
          </ul>

          {/* Social Links */}
          <div className="flex gap-4 mt-6 ml-10">
            <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border mt-10 pt-6 text-center text-sm font-sans text-muted-foreground">
        © {new Date().getFullYear()} Sterivio. All rights reserved.
      </div>
    </footer>
  );
}
