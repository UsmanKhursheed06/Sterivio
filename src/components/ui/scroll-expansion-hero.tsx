
"use client";
import { useScroll, motion, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useEffect } from "react";


interface ScrollExpandMediaProps {
  mediaSrc: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
}

const  ScrollExpandMedia = ({mediaSrc, bgImageSrc, title, date, scrollToExpand, textBlend} : ScrollExpandMediaProps) => {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // When section starts entering viewport to when it fully exits
  });

  // TODO: set appropriate background opacity based on scroll position later
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [1, 1, 0, 0]
  );
  // TODO: modify for mobile later
  const textTranslateX = useTransform(scrollYProgress, [0.33, 0.66], [0, 150]);
  const textTranslateXvw = useTransform(textTranslateX, (v) => `${v}vw`);
  const textTranslateXvwNeg = useTransform(textTranslateX, (v) => `-${v}vw`);

  const mediaWidth = useTransform(scrollYProgress, [0.33, 0.66], [300, 1550]);
  const mediaHeight = useTransform(scrollYProgress, [0.33, 0.66], [400, 800]);

  useEffect(() => {
    console.log("textTranslateX:", textTranslateX.get()); // Log the initial value
  }, [textTranslateX]);

  useEffect(() => {
    // Subscribe to changes
    const unsubscribe = scrollYProgress.on("change", (v) => {
      // console.log("Section progress:", v); // 0 to 1
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-white text-black h-[300vh]"
    >
      <div className="sticky inset-0 z-0 flex items-center justify-center h-screen overflow-hidden">
        {/* background Image */}
        <motion.div
          className="absolute inset-0 z-0 h-full"
          initial={{ opacity: 0 }}
          style={{ opacity: bgOpacity }}
          // animate={{ opacity: bgOpacity }}
          transition={{ duration: 0.1 }}
        >
          <Image
            src={bgImageSrc}
            alt="Background"
            width={1920}
            height={1080}
            className="w-screen h-screen"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
          <motion.div
            className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl"
            style={{
              width: mediaWidth, // change
              height: mediaHeight, // change
              maxWidth: "95vw",
              maxHeight: "85vh",
              boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="relative w-full h-full">
              <video
                src={mediaSrc}
                // poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover rounded-xl"
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
              />

              <div
                className="absolute inset-0 z-10"
                style={{ pointerEvents: "none" }}
              ></div>
              {/* <Image
                src={
                  "/images/hero-bg.jpg" // change
                } // change
                alt={"Dynamic Image Showcase"} // change
                width={1280}
                height={720}
                className="w-full h-full object-cover rounded-xl"
              /> */}

              {/* <motion.div
                                className='absolute inset-0 bg-black/50 rounded-xl'
                                initial={{ opacity: 0.7 }}
                                animate={{ opacity: 0.7 - scrollYProgress * 0.3 }}
                                transition={{ duration: 0.2 }}
                              /> */}
            </div>

            <div className="flex flex-col items-center text-center relative z-10 mt-4 transition-none">
              {date && (
                <motion.p
                  className="text-2xl text-primary"
                  style={{ x: textTranslateXvwNeg }}
                >
                  {date}
                </motion.p>
              )}
              {scrollToExpand && (
                <motion.p
                  className="text-primary font-medium text-center"
                  style={{ x: textTranslateXvw }}
                >
                  {scrollToExpand}
                </motion.p>
              )}
            </div>
          </motion.div>

          <div
            className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${
              textBlend ? "mix-blend-difference" : "mix-blend-normal"
            }`}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary transition-none"
              style={{ x: textTranslateXvwNeg }}
            >
              {firstWord}
            </motion.h2>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-primary transition-none"
              style={{ x: textTranslateXvw }}
            >
              {restOfTitle}
            </motion.h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollExpandMedia;