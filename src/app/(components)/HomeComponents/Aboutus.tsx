'use client';

import { CheckCircle, ClipboardCheck, Globe, FileText, MessageSquareQuote } from "lucide-react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";

const Features = [
  {
    title: "Quality Engineering",
   // description: "Crafted from medical-grade stainless steel, Sterivio's veterinary and grooming instruments deliver precise performance and long-term durability trusted by professionals worldwide.",
    Icon: CheckCircle,
  },
  {
    title: "Precision Assurance",
    //description: "Each instrument undergoes a multi-stage inspection and quality-control process to ensure accuracy, balance, and consistency before shipment.",
    Icon: ClipboardCheck,
  },
  {
    title: "Global Fulfillment",
    //description: "With U.S.-based distribution and worldwide export capability, Sterivio guarantees reliable delivery and compliance for clinics, hospitals, and grooming facilities.",
    Icon: Globe,
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
];

export default function Aboutus() {
  const scrollToSection = (sectionId: string) => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement | number, options?: { offset?: number; duration?: number }) => void } }).lenis;
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        if (lenis) {
          lenis.scrollTo(element, { offset: -100, duration: 1.5 });
        } else {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100);
  };

  return (
    <section id="about" className="relative w-full bg-white py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm md:text-base font-bold text-gray-600 tracking-widest mb-3 uppercase">
            Why Choose
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight mb-4 uppercase">
            STERIVIO
          </h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mb-4" />
          <p className="text-sm md:text-base font-semibold text-gray-600 tracking-wide uppercase">
            Precision Instruments
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-5 gap-8 items-stretch mb-16">
          {/* Left Side - Features (Takes 2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6 flex flex-col"
          >
            {Features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-cyan-500 transition-colors duration-300 flex-1"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 bg-gray-100 rounded-lg w-16 h-16 flex items-center justify-center">
                    <feature.Icon className="w-8 h-8 text-cyan-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-gray-900 mb-3 uppercase tracking-tight">
                      {feature.title}
                    </h3>
                    {/* <p className="text-base text-gray-700 leading-relaxed">
                      {feature.description}
                    </p> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side - Featured Products (Takes 3 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 flex"
          >
            <div className="sticky top-24 w-full h-fit">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-cyan-500 transition-colors duration-300 shadow-sm h-full">
                <div className="text-center mb-8">
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 uppercase tracking-tight">
                    Featured Products
                  </h3>
                  <div className="w-20 h-1 bg-cyan-500 mx-auto" />
                </div>
                
                <AnimatedTestimonials 
                  testimonials={popularProducts} 
                  autoplay={true}
                  className="!px-0 !py-0 !max-w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
         
          <button 
            onClick={() => scrollToSection('quote')}
            className="px-10 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm rounded-md shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-wide flex items-center gap-3"
          >
            <MessageSquareQuote className="w-5 h-5" />
            Request a Quote
          </button>
        </div>
      </div>
    </section>
  );
}
