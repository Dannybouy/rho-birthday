"use client";

import confetti from "canvas-confetti";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Preloader({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const preloaderRef = useRef(null);

  const fireConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 30 * (timeLeft / duration);
      // Since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
          scalar: 1.5,
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
          scalar: 1.5,
        })
      );
    }, 250);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 60) {
          return Math.min(prev + 0.5, 60);
        }
        clearInterval(interval);
        return 60;
      });
    }, 5);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (counter === 60) {
      setTimeout(() => {
        // Then slide up the preloader after a small delay
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          delay: 0.1, // Small delay after text animation
          ease: "power4.inOut",
          onComplete: () => {
            setIsVisible(false);
            onComplete();
            fireConfetti();
          },
        });
      }, 1000);
    }
  }, [counter, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col justify-center items-left bg-[#333333] text-white px-10 lg:px-40 overflow-x-hidden"
    >
      <h2 className="font-everett text-[30px] md:text-[55px] uppercase mb-20 text-left">
        Reverend Helen Oyegoke
      </h2>
      <p className="font-everett text-2xl">LOADING...</p>

      <div className="overflow-x-hidden">
        <h1 className="font-merchant text-[150px]">{Math.floor(counter)}!</h1>
      </div>
    </div>
  );
}
