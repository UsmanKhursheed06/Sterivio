"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-gray-300 py-14 mt-1">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo / About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white">Sterivio</h2>
          <p className="mt-4 text-sm leading-6">
            Premium quality surgical instruments trusted by professionals worldwide.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/catalog" className="hover:text-white transition">Catalog</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </motion.div>

        {/* Our Niches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Our Niches</h3>
          <ul className="space-y-2">
            <li><a href="#veterinary-surgical-instruments" className="hover:text-white transition">Veterinary</a></li>
            <li><a href="#dental-surgical-instruments" className="hover:text-white transition">Dental</a></li>
            <li><a href="#plastic-surgery-instruments" className="hover:text-white transition">Plastic Surgery</a></li>
            <li><a href="#general-surgery-instruments" className="hover:text-white transition">General Surgery</a></li>
            <li><a href="#orthopedic-surgery-instruments" className="hover:text-white transition">Orthopedic</a></li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" /> info@sterivio.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" /> +92 300 1234567
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" /> Sialkot, Pakistan
            </li>
          </ul>

          {/* Social Links */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Sterivio. All rights reserved.
      </div>
    </footer>
  );
}
