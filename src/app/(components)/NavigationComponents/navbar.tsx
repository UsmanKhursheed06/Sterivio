"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { rafThrottle } from "@/lib/performance-utils";

const navItems = [
  { href: "#hero", label: "Home", section: "hero" },
  { href: "#about", label: "Why Us?", section: "about" },
  { href: "#products", label: "Products", section: "products" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const sectionsRef = useRef<{ id: string; offsetTop: number; offsetHeight: number }[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    if (pathname !== "/") {
      const target = sectionId === "hero" ? "/" : `/#${sectionId}`;
      router.push(target);
      setIsOpen(false);
      return;
    }

    const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement | number, options?: { offset?: number; duration?: number }) => void } }).lenis;
    
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
      const expandFunc = (window as unknown as { expandHeroAndNavigate?: (callback: () => void) => void }).expandHeroAndNavigate;
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
    if (pathname !== "/") {
      router.push("/#quote");
      setIsOpen(false);
      return;
    }

    const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement | number, options?: { offset?: number; duration?: number }) => void } }).lenis;
    
    // If we're at the top and hero is not expanded, expand it first
    if (window.scrollY < 10) {
      const expandFunc = (window as unknown as { expandHeroAndNavigate?: (callback: () => void) => void }).expandHeroAndNavigate;
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
    if (pathname !== "/") {
      return;
    }

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
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/70 shadow-lg backdrop-blur-md border-b border-gray-200/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
        >
          <Link
            href="/"
            className="text-3xl font-black text-gray-900 tracking-tight transition-all duration-300 hover:text-gray-700 uppercase"
          >
            Sterivio
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-2 items-center">
          {navItems.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => scrollToSection(item.section)}
                  className={`px-5 py-2.5 rounded-md text-sm font-bold uppercase tracking-wide transition-all duration-300 
                    ${
                      isActive
                        ? "bg-gray-900 text-white shadow-md"
                        : "bg-transparent text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {item.label}
                </button>
              </motion.div>
            );
          })}
          
          {/* Request Quote Button */}
          <motion.button
            onClick={scrollToQuote}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4 px-8 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm rounded-md shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-wide"
          >
            Request Quote
          </motion.button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-900 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} strokeWidth={2.5} /> : <Menu size={32} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden flex flex-col items-center gap-3 py-6 bg-white border-b border-gray-200 shadow-lg"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.section)}
                className={`w-11/12 text-center px-5 py-3 rounded-md text-base font-bold uppercase tracking-wide transition-all duration-300
                  ${
                    isActive
                      ? "bg-gray-900 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
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
            className="w-11/12 px-8 py-3.5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-base rounded-md shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-wide"
          >
            Request Quote
          </motion.button>
        </motion.nav>
      )}
    </header>
  );
}
