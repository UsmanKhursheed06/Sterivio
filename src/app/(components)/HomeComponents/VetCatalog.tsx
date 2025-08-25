"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Sections with IDs matching niche links
const sections = [
  {
    id: "veterinary-surgical-instruments",
    bg: "/vetsec.jpg",
    punchline: "Veterinary Surgical Instruments",
    button: "View Catalog",
  },
  {
    id: "dental-surgical-instruments",
    bg: "/dentsec.jpg",
    punchline: "Dental Surgical Instruments",
    button: "View Catalog",
  },
  {
    id: "plastic-surgery-instruments",
    bg: "/plasticsec.jpg",
    punchline: "Plastic Surgery Instruments",
    button: "View Catalog",
  },
  {
    id: "general-surgery-instruments",
    bg: "/gensec.jpg",
    punchline: "General Surgery Instruments",
    button: "View Catalog",
  },
  {
    id: "orthopedic-surgery-instruments",
    bg: "/orthosec.jpg",
    punchline: "Orthopedic Surgery Instruments",
    button: "View Catalog",
  },
];

export default function VetCatalog() {
  return (
    <div className="w-full">
      {sections.map((sec, index) => (
        <section
          id={sec.id}
          key={sec.id}
          className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden scroll-mt-20"
        >
          {/* Background Image with Parallax effect */}
          <motion.div
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={sec.bg}
              alt={sec.punchline}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Slanted Overlay */}
          <div
            className={`absolute inset-0 ${
              index % 2 === 0
                ? "bg-gradient-to-tr from-black/70 via-black/40 to-transparent"
                : "bg-gradient-to-tl from-black/70 via-black/40 to-transparent"
            }`}
            style={{
              transform: "skewY(-4deg)", // diagonal cut
              transformOrigin: "top left",
            }}
          />

          {/* Content */}
          <div
            className={`relative z-10 max-w-3xl px-6 ${
              index % 2 === 0 ? "text-left" : "text-right"
            }`}
          >
            {/* Punchline */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
            >
              {sec.punchline}
            </motion.h2>

            {/* Button */}
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#000",
                color: "#fff",
              }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 inline-flex items-center gap-2 px-8 py-3 text-lg font-semibold rounded-full bg-white text-black shadow-xl transition-all"
            >
              {sec.button}
              <ArrowRight className="w-6 h-6" />
            </motion.a>
          </div>
        </section>
      ))}
    </div>
  );
}
