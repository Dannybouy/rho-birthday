"use client";

import CircleTextLogo from "@/app/components/circletextlogo";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import HeroSectionText from "./components/hero-section-text";
import HeroSection from "./components/HeroSection";
import Preloader from "./components/Preloader";
import {
  heroSectionTexts,
  testimoniesHeaderText,
  testimonyText,
} from "./utils";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const audioRef = useRef(null);

  // Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      smoothScroll: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100); // Change position after 100px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Modify the audio playing useEffect
  useEffect(() => {
    if (!isLoading) {
      audioRef.current = new Audio("/audio.mp3");
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isLoading]);

  // Add effect to control body scroll
  useEffect(() => {
    if (showOverlay && !isLoading) {
      // Prevent scrolling
      document.body.style.overflow = "hidden";
      // Store current scroll position
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Re-enable scrolling
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.overflow = "";
      // Restore scroll position
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [showOverlay, isLoading]);

  const redDressImg = [
    {
      id: 1,
      img: "/2a.png",
    },
    {
      id: 2,
      img: "/2b.png",
    },
    {
      id: 3,
      img: "/2c.png",
    },
  ];

  // Add a CSS class for the spinning animation
  const spinningStyle = {
    animation: "spin 10s linear infinite",
  };

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  const handleMusicClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        // Only remove overlay on first play
        if (showOverlay) {
          setShowOverlay(false);
          // Scrolling will be re-enabled by the useEffect above
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div className="min-h-screen text-white bg-black relative">
        {/* Overlay */}
        <AnimatePresence>
          {!isLoading && showOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-40 flex items-center justify-center"
            >
              <div className="text-center text-white text-3xl font-neue-montreal px-5">
                Click the play Music button <br /> to start the celebration
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Music Control Button */}
        {!isLoading && (
          <div
            className={`fixed z-50 ${
              isScrolled ? "bottom-6" : "top-10"
            } right-6`}
          >
            <motion.button
              onClick={handleMusicClick}
              className="relative bg-[#F6B32B] hover:bg-[#b4831f] text-black px-4 py-2 rounded-full font-merchant transition-all duration-300 flex items-center gap-2"
            >
              {/* Pulsing ring effect - only show when overlay is visible */}
              {showOverlay && (
                <span className="absolute inset-0 rounded-full animate-ping bg-[#F6B32B]/40"></span>
              )}

              {isPlaying ? (
                <>
                  <span className="text-lg relative z-10">Pause Music</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="relative z-10"
                  >
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                </>
              ) : (
                <>
                  <span className="text-lg relative z-10">Play Music</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="relative z-10"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </>
              )}
            </motion.button>
          </div>
        )}

        {/* Hero Section */}
        <HeroSection />
        <section>
          <div className="flex flex-col lg:flex-row items-center justify-between px-4 md:px-10">
            <HeroSectionText
              arrayOfText={heroSectionTexts}
              containerClassName="text-[5vw] mt-20 font-everett"
              className="text-2xl md:text-4xl lg:text-[50px] leading-tight lg:leading-[72px] lg:max-w-[1200px] uppercase text-left text-balance"
            />

            <Image
              src="/Group_6.svg"
              alt="circle text"
              width={100}
              height={100}
              className="mt-8 lg:mt-0 lg:top-0 lg:right-5 w-80 md:w-48 lg:w-auto mx-auto lg:mx-0"
              quality={90}
              style={spinningStyle}
            />
          </div>

          {/* Crown and Images Section */}
          <div className="lg:mt-24 mt-20">
            <Image
              src="/crown.png"
              alt="crown vector"
              width={300}
              height={300}
              className="mx-auto lg:mb-16 mb-8 w-48 md:w-52"
              quality={90}
            />
            {/* Red Dress Images */}
            <div className="px-3">
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 lg:gap-5">
                {redDressImg.map((pic, index) => (
                  <motion.div
                    key={pic.id}
                    className="relative aspect-[3/4] overflow-hidden group"
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{
                      once: true,
                      amount: 0.3,
                      margin: "-50px",
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 0.5,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                  >
                    <Image
                      src={pic.img}
                      alt="red dress"
                      fill
                      sizes="100vw"
                      quality={95}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="my-8 lg:my-10">
          <div className="aspect-video relative">
            <Image
              src="/3.png"
              alt="crown vector"
              fill
              sizes="100vw"
              className="object-cover"
              quality={95}
            />
          </div>
          <div className="lg:my-[140px] md:my-[100px] my-10 px-4 lg:max-w-5xl mx-auto">
            <HeroSectionText
              arrayOfText={testimoniesHeaderText}
              containerClassName="text-center mb-5"
              className="font-merchant text-[2rem] md:text-6xl lg:text-[5.5rem] text-[#fff5e1]"
            />
            <HeroSectionText
              arrayOfText={testimonyText}
              containerClassName="text-center"
              className="font-medium font-neue-montreal text-lg md:text-xl lg:text-[2rem] text-balance md:mb-10"
            />

            <div className="flex items-center justify-center gap-4 lg:mt-20 mt-10">
              <a href="/view-testimonies">
                <button className="border border-[#F6B32B] transition-colors duration-300 text-[#F6B32B] px-3 md:px-8 py-2.5 md:py-6 rounded-full font-merchant text-base md:text-xl lg:text-[2rem]">
                  View testimonies
                </button>
              </a>
              <Link href="/testimony">
                <button className="bg-[#F6B32B] hover:bg-[#b4831f] transition-colors duration-300 px-3 md:px-8 py-2.5 md:py-6 rounded-full font-merchant text-base md:text-xl lg:text-[2rem]">
                  Share your testimony
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="my-10 md:my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-10">
          <div className="space-y-12 md:space-y-24 mt-10 md:mt-20 z-10">
            <div className="flex items-center justify-center">
              <CircleTextLogo />
            </div>
            <motion.div
              className="relative aspect-[3/4]  "
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              <Image
                src="/4.png"
                alt="red dress"
                fill
                sizes="100vw"
                className="object-cover"
                quality={95}
              />
            </motion.div>
          </div>

          <div className="md:mt-40 z-10">
            <motion.div
              className="relative aspect-[3/4]"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              <Image
                src="/5.png"
                alt="red dress"
                fill
                sizes="100vw"
                className="object-cover"
                quality={95}
              />
            </motion.div>

            <motion.div
              className="relative aspect-[3/4]"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              <Image
                src="/8.png"
                alt="red dress"
                width={1000}
                height={1000}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="space-y-4 md:space-y-10 z-10">
            <motion.div
              className="relative aspect-[3/4]"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              <Image
                src="/6.png"
                alt="red dress"
                fill
                sizes="100vw"
                className="object-cover"
                quality={95}
              />
            </motion.div>
            <motion.div
              className="relative aspect-[3/4]"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              <Image
                src="/7.png"
                alt="red dress"
                fill
                sizes="100vw"
                className="object-cover"
                quality={95}
              />
            </motion.div>
          </div>
        </section>

        <div className="relative overflow-hidden w-full py- border-t border-white border-dashed font-merchant text-neutral-100/70 text-[2.5rem] md:text-[5.2rem] lg:text-[9.9rem]">
          <Marquee autoFill={true}>Mummy Helen @ 60</Marquee>
        </div>
      </div>
    </>
  );
}
