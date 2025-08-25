"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // install lucide-react if not installed

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/niches", label: "Niches" },
  { href: "/certifications", label: "Certifications" },
  { href: "/quote", label: "Request Quote" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-transparent shadow-md backdrop-blur-sm">
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
            className="text-3xl font-serif text-white transition-all duration-300 hover:text-black"
          >
            Sterivio
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 
                    ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-transparent text-white hover:bg-white/20"
                    }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
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
          className="md:hidden flex flex-col items-center gap-4 py-6 bg-black/80 backdrop-blur-md"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`w-full text-center px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300
                  ${
                    isActive
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/20"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </motion.nav>
      )}
    </header>
  );
}
