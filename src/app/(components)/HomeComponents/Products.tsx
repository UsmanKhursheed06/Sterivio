'use client';

import { motion } from "framer-motion";
import { memo } from "react";
import { DestinationCard } from "@/components/ui/card-21";

const Products = memo(function Products() {
  return (
    <section id="products" className="relative w-full bg-white py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 uppercase tracking-tight">
            Our Products
          </h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mb-4" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of professional veterinary and grooming products
          </p>
        </motion.div>

        {/* Two Product Category Cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[380px] h-[500px]"
          >
            <DestinationCard
              imageUrl="/Veterinary card.jpg"
              location="Veterinary Products"
              flag=""
              stats="12 complete categories • 100+ products"
              href="/vet-products"
              themeColor="210 100% 45%"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-[380px] h-[500px]"
          >
            <DestinationCard
              imageUrl="/Grooming card.jpg"
              location="Grooming Products"
              flag=""
              stats="14 complete categories • 100+ products"
              href="/grooming-products"
              themeColor="185 75% 40%"
            />
          </motion.div>
        </div>

        {/* Bottom decorative text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-sm text-gray-600 uppercase tracking-wide font-semibold"
        >
          Explore our complete range of professional instruments
        </motion.p>
      </div>
    </section>
  );
});

export default Products;
