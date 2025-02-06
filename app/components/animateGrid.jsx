import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedGrid = () => {
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    
    cards.forEach((card, index) => {
      // Create overlay for slide effect
      const overlay = card.querySelector('.overlay');
      
      gsap.fromTo(overlay,
        {
          yPercent: -100,
        },
        {
          yPercent: 0,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: card,
            start: "top 80%", // Triggers when card reaches 20% from bottom of viewport
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Animate the text
      const text = card.querySelector('.card-text');
      gsap.fromTo(text,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <div className=" bg-gray-100 p-8">
      {/* Grid Container */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {[1, 2, 3].map((item, index) => (
          <div
            key={item}
            ref={el => cardsRef.current[index] = el}
            className="relative  rounded-lg overflow-hidden h-[600px]"
          >
            {/* Overlay that slides up */}
            <div className="overlay absolute inset-0 bg-red-500 z-10"></div>
            
            {/* Content */}
            <div className="relative z-0 h-full flex items-center justify-center p-6 bg-white">
              <p className="card-text text-lg font-medium text-gray-800">
                Content for Card {item}
              </p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default AnimatedGrid;