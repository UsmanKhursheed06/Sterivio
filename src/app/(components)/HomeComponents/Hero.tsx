'use client';

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { CheckCircle, ClipboardCheck, Globe } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

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

export default function Hero() {
  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc="/videos/Hailuo.mp4"
      bgImageSrc="/images/bg-vid2.png"
      textBlend={false}
      title="Precision-Crafted Instruments, Delivered Globally"
      scrollToExpand="Scroll to explore"
    >
      <FeaturesSection />
    </ScrollExpandMedia>
  );
}

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Internal progress that we control (0 -> 1) while the section captures scroll
  const progress = useMotionValue(0);
  const [internalProgress, setInternalProgress] = useState(0);
  const [capturing, setCapturing] = useState(false);
  const hasEnteredRef = useRef(false);
  const isWithinSectionRef = useRef(false);

  // Map internal progress to icon positions
  const icon1X = useTransform(progress, [0, 0.33, 0.66, 1], [-140, 160, -100, -140]);
  const icon1Y = useTransform(progress, [0, 0.33, 0.66, 1], [-90, -15, 140, -90]);

  const icon2X = useTransform(progress, [0, 0.33, 0.66, 1], [160, -100, -140, 160]);
  const icon2Y = useTransform(progress, [0, 0.33, 0.66, 1], [-15, 140, -90, -15]);

  const icon3X = useTransform(progress, [0, 0.33, 0.66, 1], [-100, -140, 160, -100]);
  const icon3Y = useTransform(progress, [0, 0.33, 0.66, 1], [140, -90, -15, 140]);

  useEffect(() => {
    // Update active feature based on internal progress
    if (internalProgress < 0.33) setActiveIndex(0);
    else if (internalProgress < 0.66) setActiveIndex(1);
    else setActiveIndex(2);
    progress.set(internalProgress);
  }, [internalProgress, progress]);

  useEffect(() => {
    const lastTouchYRef = { current: null as number | null };

    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Precise detection: section's top edge is above bottom of viewport 
      // AND section's bottom edge is below top of viewport
      const isInViewport = rect.top < windowHeight && rect.bottom > 0;
      
      // Update tracking ref
      isWithinSectionRef.current = isInViewport;
      
      // If not in viewport at all, ensure we're not capturing
      if (!isInViewport) {
        if (capturing) setCapturing(false);
        hasEnteredRef.current = false;
        return;
      }

      // Mark that we've entered the section
      if (isInViewport && !hasEnteredRef.current) {
        hasEnteredRef.current = true;
      }

      // Scrolling down: check if we're at the end
      if (e.deltaY > 0) {
        if (internalProgress >= 0.99) {
          // At the end, release and allow scroll
          if (capturing) setCapturing(false);
          return;
        }
      }
      
      // Scrolling up: check if we're at the beginning
      if (e.deltaY < 0) {
        if (internalProgress <= 0.01) {
          // At the beginning, release and allow scroll
          if (capturing) setCapturing(false);
          return;
        }
      }

      // Capture and animate
      if (!capturing) setCapturing(true);
      e.preventDefault();
      
      const factor = 0.004;
      const next = Math.max(0, Math.min(1, internalProgress + e.deltaY * factor));
      setInternalProgress(next);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        lastTouchYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!sectionRef.current || !e.touches || e.touches.length === 0) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isInViewport = rect.top < windowHeight && rect.bottom > 0;
      
      isWithinSectionRef.current = isInViewport;
      
      if (!isInViewport) {
        if (capturing) setCapturing(false);
        hasEnteredRef.current = false;
        return;
      }

      if (isInViewport && !hasEnteredRef.current) {
        hasEnteredRef.current = true;
      }

      const currentY = e.touches[0].clientY;
      const lastY = lastTouchYRef.current ?? currentY;
      const deltaY = lastY - currentY;
      lastTouchYRef.current = currentY;

      // Swiping up (deltaY > 0): check if at end
      if (deltaY > 0) {
        if (internalProgress >= 0.99) {
          if (capturing) setCapturing(false);
          return;
        }
      }
      
      // Swiping down (deltaY < 0): check if at beginning
      if (deltaY < 0) {
        if (internalProgress <= 0.01) {
          if (capturing) setCapturing(false);
          return;
        }
      }

      if (!capturing) setCapturing(true);
      e.preventDefault();
      
      const factor = 0.008;
      const next = Math.max(0, Math.min(1, internalProgress + deltaY * factor));
      setInternalProgress(next);
    };

    const handleTouchEnd = () => {
      lastTouchYRef.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel as any);
      window.removeEventListener("touchstart", handleTouchStart as any);
      window.removeEventListener("touchmove", handleTouchMove as any);
      window.removeEventListener("touchend", handleTouchEnd as any);
    };
  }, [capturing, internalProgress]);

  const activeFeature = useMemo(() => Features[activeIndex], [activeIndex]);

  return (
    <section ref={sectionRef} className="relative h-[100vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="relative mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center justify-center">
            {/* Central Circle */}
            <div
              className="relative mx-auto rounded-full w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center"
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
            <div className="hidden md:block">
              <FeatureCard
                title={activeFeature.title}
                description={activeFeature.description}
              />
            </div>

            {/* Mobile: Show all features */}
            <div className="md:hidden space-y-6 w-full">
              {Features.map((feature, index) => (
                <MobileFeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FloatingIcon = ({ Icon, x, y, isActive }: any) => (
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
    <p className="text-sm md:text-base font-sans text-muted-foreground leading-relaxed">
      {description.split(" ").map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.3,
            delay: wordIndex * 0.02,
          }}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </p>
  </motion.div>
);

const MobileFeatureCard = ({ feature, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-card rounded-xl p-6 border border-border shadow-md"
  >
    <div className="flex items-start gap-4">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        className="flex-shrink-0 bg-accent rounded-full p-3 shadow-md border border-border"
      >
        <feature.Icon className="w-8 h-8 text-primary" />
      </motion.div>
      <div className="flex-1">
        <motion.h3
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
          className="text-xl font-bold font-sans text-foreground mb-2"
        >
          {feature.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          className="text-sm font-sans text-muted-foreground leading-relaxed"
        >
          {feature.description}
        </motion.p>
      </div>
    </div>
  </motion.div>
);
