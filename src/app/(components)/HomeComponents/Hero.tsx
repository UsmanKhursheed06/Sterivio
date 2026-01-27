'use client';

import { memo, useEffect, useRef } from "react";

const Hero = memo(function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, []);

  return (
    <div id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover scale-100"
        src="/videos/Veo.mp4"
      />

      {/* White Overlay Layer on Left Side */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />

      {/* Text Content - Left Side */}
      <div className="absolute inset-0 flex items-center">
        <div className="ml-12 md:ml-20 lg:ml-24 max-w-3xl">
          <p className="text-sm md:text-base font-semibold text-gray-700 tracking-widest mb-4">
            FOR ALL YOUR
          </p>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-none mb-8 tracking-tight">
            EQUIPMENT<br />NEEDS
          </h1>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm md:text-base px-10 py-4 rounded shadow-lg transition-all duration-200 hover:shadow-xl uppercase tracking-wide">
            CONTACT US TODAY
          </button>
        </div>
      </div>
    </div>
  );
});

export default Hero;
