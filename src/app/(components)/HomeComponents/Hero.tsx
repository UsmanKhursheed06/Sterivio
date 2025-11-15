'use client';

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { memo } from "react";

const Hero = memo(function Hero() {
  return (
    <div id="hero">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/videos/Hailuo.mp4"
        bgImageSrc="/images/bg-vid2.png"
        textBlend={false}
        title="Precision-Crafted Instruments, Delivered Globally"
        scrollToExpand="Scroll to explore"
      />
    </div>
  );
});

export default Hero;
