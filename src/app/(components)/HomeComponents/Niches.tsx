"use client";
import { motion } from "framer-motion";
import Image from "next/image";

// Grid icons linking to sections below
const niches = [
  { icon: "/vet.png", label: "Veterinary Instruments", link: "#veterinary-surgical-instruments" },
  { icon: "/implant.png", label: "Dental Instruments", link: "#dental-surgical-instruments" },
  { icon: "/face-marking.png", label: "Plastic Surgery Instruments", link: "#plastic-surgery-instruments" },
  { icon: "/scalpel.png", label: "General Surgery Instruments", link: "#general-surgery-instruments" },
  { icon: "/bone.png", label: "Orthopedic Surgery Instruments", link: "#orthopedic-surgery-instruments" },
];

export default function NichesSection() {
  return (
    <section className="relative py-20 bg-white text-gray-900">
      <div className="mx-auto max-w-7xl px-6 text-center">
        
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12"
        >
          Our Niches
        </motion.h2>

        {/* Grid of Niches */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {niches.map((niche, index) => (
            <motion.a
              key={niche.label}
              href={niche.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-md bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
            >
              <Image
                src={niche.icon}
                alt={niche.label}
                width={60}
                height={60}
                className="mb-3"
              />
              <span className="text-lg font-medium">{niche.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
