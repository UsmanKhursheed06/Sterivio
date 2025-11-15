'use client';

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const productCategories = [
  {
    title: "Surgical Instruments",
    description: "Precision-engineered surgical tools crafted from medical-grade stainless steel, designed for optimal performance in veterinary procedures.",
  },
  {
    title: "Grooming Tools",
    description: "Professional-grade grooming instruments featuring ergonomic designs and razor-sharp edges for superior pet care and styling.",
  },
  {
    title: "Diagnostic Equipment",
    description: "Advanced diagnostic instruments that deliver accurate results, helping veterinary professionals make informed decisions.",
  },
  {
    title: "Dental Instruments",
    description: "Specialized dental tools engineered for precision cleaning, scaling, and oral care in veterinary dentistry.",
  },
];

const popularProducts = [
  {
    quote: "Premium surgical scissors featuring ultra-sharp blades and ergonomic handles for precise cutting in veterinary procedures.",
    name: "Surgical Scissors",
    designation: "Surgical Instruments",
    src: "/plasticsec.jpg",
  },
  {
    quote: "Professional grooming shears with razor-sharp edges and comfortable grip for superior pet styling and coat maintenance.",
    name: "Grooming Shears",
    designation: "Grooming Tools",
    src: "/vetsec.jpg",
  },
//   {
//     quote: "Medical-grade forceps set designed for secure grip and precise handling during surgical and diagnostic procedures.",
//     name: "Forceps Set",
//     designation: "Surgical Instruments",
//     src: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=3540&auto=format&fit=crop",
//   },
//   {
//     quote: "Stainless steel nail clippers with safety guards and sharp cutting edges for safe and efficient pet nail trimming.",
//     name: "Professional Nail Clippers",
//     designation: "Grooming Tools",
//     src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=3464&auto=format&fit=crop",
//   },
//   {
//     quote: "Precision dental scalers and explorers for comprehensive oral care and plaque removal in veterinary dentistry.",
//     name: "Dental Instrument Set",
//     designation: "Dental Instruments",
//     src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2592&auto=format&fit=crop",
//   },
];

export default function Products() {
  return (
    <section className="relative w-full bg-background py-24 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4">
            Our Products
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-chart-2 to-chart-3 mx-auto rounded-full" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {productCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group relative bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:border-primary/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative">
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side - Popular Products with Animated Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="sticky top-24">
              {/* Popular Products Header */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-serif font-bold text-foreground mb-2">
                  Popular Products
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
              </div>

              {/* Animated Products Showcase */}
              <div className="bg-card/50 border border-border rounded-3xl p-6 shadow-xl">
                <AnimatedTestimonials 
                  testimonials={popularProducts} 
                  autoplay={true}
                  className="!p-0 !py-0"
                />
              </div>

              {/* Decorative Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 text-center"
              >
                <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary/10 via-chart-2/10 to-chart-3/10 border border-primary/30 rounded-full">
                  <p className="text-sm font-semibold text-primary">
                    ✨ 200+ Premium Instruments
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* CTA Button - Centered at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(245, 158, 11, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-5 bg-gradient-to-r from-primary via-chart-2 to-chart-3 text-primary-foreground font-bold text-lg rounded-full shadow-xl overflow-hidden transition-all duration-300"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-chart-3 via-chart-2 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Button Content */}
            <div className="relative flex items-center gap-3">
              <Download className="w-6 h-6 group-hover:animate-bounce" />
              <span>Download Catalog</span>
            </div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.button>
        </motion.div>

        {/* Bottom decorative text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-6 text-sm text-muted-foreground"
        >
          Explore our complete range of veterinary and grooming instruments
        </motion.p>
      </div>
    </section>
  );
}
