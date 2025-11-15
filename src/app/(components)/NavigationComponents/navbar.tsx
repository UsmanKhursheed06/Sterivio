"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";
import { rafThrottle } from "@/lib/performance-utils";

const navItems = [
  { href: "#hero", label: "Home", section: "hero" },
  { href: "#about", label: "Why Us?", section: "about" },
  { href: "#products", label: "Products", section: "products" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const sectionsRef = useRef<{ id: string; offsetTop: number; offsetHeight: number }[]>([]);

  const scrollToSection = (sectionId: string) => {
    const lenis = (window as any).lenis;
    
    // If clicking hero, just scroll to top
    if (sectionId === "hero") {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setActiveSection(sectionId);
      setIsOpen(false);
      return;
    }
    
    // If we're at the top and hero is not expanded, expand it first
    if (window.scrollY < 10) {
      const expandFunc = (window as any).expandHeroAndNavigate;
      if (expandFunc) {
        expandFunc(() => {
          // After expansion, navigate to section
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
              setActiveSection(sectionId);
              setIsOpen(false);
            }
          }, 100);
        });
        return;
      }
    }
    
    // Normal scroll if not at top
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
        setActiveSection(sectionId);
        setIsOpen(false);
      }
    }, 100);
  };

  const scrollToQuote = () => {
    const lenis = (window as any).lenis;
    
    // If we're at the top and hero is not expanded, expand it first
    if (window.scrollY < 10) {
      const expandFunc = (window as any).expandHeroAndNavigate;
      if (expandFunc) {
        expandFunc(() => {
          // After expansion, navigate to quote section
          setTimeout(() => {
            const element = document.getElementById("quote");
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
              setIsOpen(false);
            }
          }, 100);
        });
        return;
      }
    }
    
    // Normal scroll if not at top
    setTimeout(() => {
      const element = document.getElementById("quote");
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
        setIsOpen(false);
      }
    }, 100);
  };

  // Track active section on scroll - optimized with RAF throttling
  useEffect(() => {
    // Cache section positions on mount and window resize
    const cacheSectionPositions = () => {
      const sections = ["hero", "about", "products", "quote"];
      sectionsRef.current = sections.map(id => {
        const element = document.getElementById(id);
        if (element) {
          return {
            id,
            offsetTop: element.offsetTop,
            offsetHeight: element.offsetHeight
          };
        }
        return null;
      }).filter(Boolean) as { id: string; offsetTop: number; offsetHeight: number }[];
    };

    cacheSectionPositions();

    const handleScroll = rafThrottle(() => {
      const scrollPosition = window.scrollY + 150;

      for (const section of sectionsRef.current) {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    });

    const handleResize = rafThrottle(cacheSectionPositions);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background/10 shadow-md backdrop-blur-md border-b border-border/30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{
            scale: 1.2,
            rotate: 2,
            transition: { duration: 0.3 },
          }}
        >
          <Link
            href="/"
            className="text-3xl font-serif text-primary transition-all duration-300 hover:text-primary/80"
          >
            Sterivio
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4 items-center">
          {navItems.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => scrollToSection(item.section)}
                  className={`px-4 py-2 rounded-full text-sm font-medium font-sans transition-colors duration-300 
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                >
                  {item.label}
                </button>
              </motion.div>
            );
          })}
          
          {/* Request Quote Button - Highlighted */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(245, 158, 11, 0.3)",
                "0 0 30px rgba(245, 158, 11, 0.5)",
                "0 0 20px rgba(245, 158, 11, 0.3)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <button
              onClick={scrollToQuote}
              className="group relative px-6 py-2 bg-gradient-to-r from-primary via-chart-2 to-chart-3 text-primary-foreground font-bold text-sm rounded-full shadow-xl overflow-hidden transition-all duration-300"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-chart-3 via-chart-2 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="relative">Request Quote</span>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </button>
          </motion.div>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-foreground focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden flex flex-col items-center gap-4 py-6 bg-card backdrop-blur-md border-b border-border"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.section)}
                className={`w-full text-center px-4 py-2 rounded-md text-lg font-medium font-sans transition-colors duration-300
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
              >
                {item.label}
              </button>
            );
          })}
          
          {/* Mobile Request Quote Button */}
          <motion.button
            onClick={scrollToQuote}
            whileTap={{ scale: 0.95 }}
            className="group relative w-full px-6 py-3 bg-gradient-to-r from-primary via-chart-2 to-chart-3 text-primary-foreground font-bold text-lg rounded-full shadow-xl overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-chart-3 via-chart-2 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative">Request Quote</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </motion.button>
        </motion.nav>
      )}
    </header>
  );
}
