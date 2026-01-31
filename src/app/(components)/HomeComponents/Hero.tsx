'use client';

import { memo, useEffect, useRef, useState } from "react";

const Hero = memo(function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollToQuote = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement | number, options?: { offset?: number; duration?: number }) => void } }).lenis;
    
    if (window.scrollY < 10) {
      const expandFunc = (window as unknown as { expandHeroAndNavigate?: (callback: () => void) => void }).expandHeroAndNavigate;
      if (expandFunc) {
        expandFunc(() => {
          setTimeout(() => {
            const element = document.getElementById("quote");
            if (element) {
              if (lenis) {
                lenis.scrollTo(element, { offset: -100, duration: 1.5 });
              } else {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }
          }, 100);
        });
        return;
      }
    }
    
    setTimeout(() => {
      const element = document.getElementById("quote");
      if (element) {
        if (lenis) {
          lenis.scrollTo(element, { offset: -100, duration: 1.5 });
        } else {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.muted = true;
        await video.play();
        console.log("Video playing successfully");
      } catch (error) {
        console.error("Error playing video:", error);
      }
    };

    // Try to play immediately
    playVideo();

    // Also try on loadeddata event
    video.addEventListener('loadeddata', () => {
      setIsLoaded(true);
      playVideo();
    });

    // And on user interaction
    const handleUserInteraction = () => {
      playVideo();
      document.removeEventListener('click', handleUserInteraction);
    };
    document.addEventListener('click', handleUserInteraction, { once: true });

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
      >
        <source src="https://res.cloudinary.com/dwxitwxzh/video/upload/v1769883421/Veterinary_Instrument_Video_Generation_bp4hj5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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
          <button 
            onClick={scrollToQuote}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm md:text-base px-10 py-4 rounded shadow-lg transition-all duration-200 hover:shadow-xl uppercase tracking-wide"
          >
            CONTACT US TODAY
          </button>
        </div>
      </div>
    </div>
  );
});

export default Hero;
