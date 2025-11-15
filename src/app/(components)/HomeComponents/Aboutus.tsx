'use client';

import { motion, useMotionValue, useTransform, MotionValue } from "framer-motion";
import { CheckCircle, ClipboardCheck, Globe, FileText, MessageSquareQuote } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { rafThrottle } from "@/lib/performance-utils";

const Features = [
  {
    title: "Quality Engineering",
    description: "Crafted from medical-grade stainless steel, Sterivio's veterinary and grooming instruments deliver precise performance and long-term durability trusted by professionals worldwide.",
    Icon: CheckCircle,
  },
  {
    title: "Precision Assurance",
    description: "Each instrument undergoes a multi-stage inspection and quality-control process to ensure accuracy, balance, and consistency before shipment.",
    Icon: ClipboardCheck,
  },
  {
    title: "Global Fulfillment",
    description: "With U.S.-based distribution and worldwide export capability, Sterivio guarantees reliable delivery and compliance for clinics, hospitals, and grooming facilities.",
    Icon: Globe,
  },
];

export default function Aboutus() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Internal progress that we control (0 -> 1) using IntersectionObserver instead of scroll hijacking
  const progress = useMotionValue(0);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    const handleResize = rafThrottle(checkMobile);
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Map internal progress to icon positions - memoized
  const icon1X = useTransform(progress, [0, 0.33, 0.66, 1], [-140, 160, -100, -140]);
  const icon1Y = useTransform(progress, [0, 0.33, 0.66, 1], [-90, -15, 140, -90]);

  const icon2X = useTransform(progress, [0, 0.33, 0.66, 1], [160, -100, -140, 160]);
  const icon2Y = useTransform(progress, [0, 0.33, 0.66, 1], [-15, 140, -90, -15]);

  const icon3X = useTransform(progress, [0, 0.33, 0.66, 1], [-100, -140, 160, -100]);
  const icon3Y = useTransform(progress, [0, 0.33, 0.66, 1], [140, -90, -15, 140]);

  // Update active feature based on scroll position using IntersectionObserver
  useEffect(() => {
    if (isMobile || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Calculate progress based on visibility
            const visibleRatio = entry.intersectionRatio;
            const scrollProgress = Math.max(0, Math.min(1, visibleRatio * 1.5));
            
            progress.set(scrollProgress);
            
            // Update active index
            if (scrollProgress < 0.33) setActiveIndex(0);
            else if (scrollProgress < 0.66) setActiveIndex(1);
            else setActiveIndex(2);
          }
        });
      },
      {
        threshold: Array.from({ length: 20 }, (_, i) => i * 0.05), // 20 checkpoints
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [isMobile, progress]);

  const activeFeature = useMemo(() => Features[activeIndex], [activeIndex]);

  return (
    <section id="about" ref={sectionRef} className={isMobile ? "relative min-h-screen" : "relative h-[100vh]"}>
      <div className={isMobile ? "w-full bg-background py-12" : "sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-background"}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full md:h-auto flex items-center">
          <div className="relative mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center justify-center w-full">
            {/* Central Circle */}
            <div
              className="relative mx-auto rounded-full w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 shadow-2xl p-5 sm:p-6 md:p-10 flex flex-col items-center justify-center flex-shrink-0"
              style={{
                background: `radial-gradient(circle at center, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)`,
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, var(--primary), var(--chart-2), var(--chart-3), var(--chart-4), var(--primary))`,
                  padding: "3px",
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `radial-gradient(circle at center, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)`,
                  }}
                />
              </div>

              {/* Central Typography */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="relative space-y-1 sm:space-y-2">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-serif tracking-tight text-primary"
                  >
                    Why Choose
                  </motion.h2>
                  <motion.h3
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-serif tracking-tighter text-primary drop-shadow-sm"
                  >
                    STERIVIO
                  </motion.h3>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "auto" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-12 sm:w-16 md:w-20 h-0.5 md:h-1 bg-primary mx-auto rounded-full opacity-80"
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-[10px] sm:text-xs font-medium font-sans text-accent-foreground tracking-wide uppercase"
                  >
                    Precision Instruments
                  </motion.p>
                </div>
              </div>

              {/* Floating Icons */}
              <FloatingIcon
                Icon={Features[0].Icon}
                x={icon1X}
                y={icon1Y}
                isActive={activeIndex === 0}
              />
              <FloatingIcon
                Icon={Features[1].Icon}
                x={icon2X}
                y={icon2Y}
                isActive={activeIndex === 1}
              />
              <FloatingIcon
                Icon={Features[2].Icon}
                x={icon3X}
                y={icon3Y}
                isActive={activeIndex === 2}
              />
            </div>

            {/* Desktop: Show animated card */}
            <div className="hidden md:block space-y-6">
              <FeatureCard
                title={activeFeature.title}
                description={activeFeature.description}
              />
              
              {/* CTA Buttons */}
              <motion.div
                key={`buttons-${activeIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(245, 158, 11, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-6 py-3 bg-gradient-to-r from-primary via-chart-2 to-chart-3 text-primary-foreground font-bold text-sm rounded-full shadow-xl overflow-hidden transition-all duration-300"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-chart-3 via-chart-2 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Button Content */}
                  <div className="relative flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5 group-hover:animate-bounce" />
                    <span>View Catalog</span>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(245, 158, 11, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-6 py-3 bg-gradient-to-r from-primary via-chart-2 to-chart-3 text-primary-foreground font-bold text-sm rounded-full shadow-xl overflow-hidden transition-all duration-300"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-chart-3 via-chart-2 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Button Content */}
                  <div className="relative flex items-center justify-center gap-2">
                    <MessageSquareQuote className="w-5 h-5 group-hover:animate-bounce" />
                    <span>Request a Quote</span>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.button>
              </motion.div>
            </div>

            {/* Mobile: Show all features */}
            <div className="md:hidden space-y-4 w-full">
              {Features.map((feature, index) => (
                <MobileFeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FloatingIcon = ({ Icon, x, y, isActive }: { Icon: React.ElementType; x: MotionValue<number>; y: MotionValue<number>; isActive: boolean }) => (
  <motion.div
    style={{ x, y }}
    className="absolute z-20 hidden md:block"
    whileHover={{ scale: 1.15, rotate: 5 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className="relative group cursor-pointer">
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
      <motion.div
        className="relative bg-gradient-to-br from-background to-accent rounded-full w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 shadow-xl border-2 border-border flex items-center justify-center"
        animate={{
          boxShadow: isActive
            ? "0 20px 50px -12px rgba(245, 158, 11, 0.5)"
            : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          scale: isActive ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-6 h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 text-primary" />
      </motion.div>
    </div>
  </motion.div>
);

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <motion.div
    key={title}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.5 }}
    className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg max-w-xl"
  >
    <h3 className="text-xl md:text-2xl font-bold font-sans text-foreground mb-3 md:mb-4">{title}</h3>
    <motion.p 
      className="text-sm md:text-base font-sans text-muted-foreground leading-relaxed"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {description}
    </motion.p>
  </motion.div>
);

const MobileFeatureCard = ({ feature, index }: { feature: typeof Features[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-card rounded-xl p-4 border border-border shadow-md"
  >
    <div className="flex items-start gap-3">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        className="flex-shrink-0 bg-accent rounded-full p-2.5 shadow-md border border-border"
      >
        <feature.Icon className="w-6 h-6 text-primary" />
      </motion.div>
      <div className="flex-1">
        <motion.h3
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
          className="text-lg font-bold font-sans text-foreground mb-1.5"
        >
          {feature.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          className="text-xs leading-relaxed font-sans text-muted-foreground"
        >
          {feature.description}
        </motion.p>
      </div>
    </div>
  </motion.div>
);
