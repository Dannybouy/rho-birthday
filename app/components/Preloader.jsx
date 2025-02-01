"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Preloader({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const preloaderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 60) {
          return Math.min(prev + 0.5, 60);
        }
        clearInterval(interval);
        return 60;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (counter === 60) {
      setTimeout(() => {
        // Animate preloader up
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            setIsVisible(false);
            onComplete();
          },
        });
      }, 1000); // Wait 1 second after reaching 60 before sliding up
    }
  }, [counter, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={preloaderRef}
      className="z-10 flex flex-col items-start justify-center bg-[#333333] text-white min-h-screen px-40"
    >
      <h2 className="font-everett text-[55px] uppercase mb-20">
        Reverend Helen Oyegoke
      </h2>

      <div>
        <p className="font-everett text-2xl">LOADING...</p>
        <h1 className="font-merchant text-[200px]">{Math.floor(counter)}!</h1>
      </div>
    </div>
  );
}
