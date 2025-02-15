"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CircleTextLogo from "../components/circletextlogo";
import LoadMoreTestimonies from "../components/loadMoreTestimonies";

const ViewTestimonies = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const audioRef = useRef(null);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/audio.mp3");
    audioRef.current.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Music Control Button */}
      <button
        onClick={toggleAudio}
        className={`fixed z-50 bg-[#F6B32B] hover:bg-[#b4831f] text-black px-4 py-2 rounded-full font-merchant transition-all duration-300 flex items-center gap-2
          ${isScrolled ? "bottom-6 right-6" : "top-10 right-6"}`}
      >
        {isPlaying ? (
          <>
            <span className="text-lg">Pause Music</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </>
        ) : (
          <>
            <span className="text-lg">Play Music</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </>
        )}
      </button>

      <header className="flex flex-col items-center justify-center mt-44">
        <div className="absolute top-4 md:top-8 left-4 md:left-8 z-10">
          <a href="/">
            <Image
              src="/logo3.png"
              alt="60th Anniversary Logo"
              width={300}
              height={300}
              className="size-24 md:size-32"
              priority
              quality={95}
            />
          </a>
        </div>
        <div className="px-4 text-center mx-auto">
          <p className="font-merchant text-4xl md:text-6xl lg:text-[5.5rem] mb-5 text-[#fff5e1] text-balance max-w-screen-xl">
            Read Testimonies about Mummy Helen
          </p>

          <p className="font-medium font-neue-montreal text-lg md:text-xl lg:text-3xl mb-8 leading-8 text-balance max-w-screen-xl mx-auto">
            Mummy has been a blessing to us in many ways, we believe only the
            Lord can work this! Tell us, how have you been blessed by mummy
          </p>
        </div>
      </header>
      <div className="relative px-4 md:px-8 lg:px-12 mb-10">
        <div className="fixed top-2/3 transform -translate-y-[50%]  -z-10">
          <CircleTextLogo />
        </div>
        <div className="flex flex-col items-center justify-center">
          <LoadMoreTestimonies />
        </div>
      </div>
    </main>
  );
};

export default ViewTestimonies;
