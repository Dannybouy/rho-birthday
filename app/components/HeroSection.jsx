"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
const heroImages = [
  "/bg_img1.png",
  "/bg_img2.png",
  "/bg_img3.png",
  "/bg_img4.png",
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`Hero image ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
            quality={90}
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent/0 via-transparent/0 to-black to-80%"
      ></div>

      <div className="absolute top-4 md:top-8 left-4 md:left-8 z-10">
        <Image
          src="/logo3.png"
          alt="60th Anniversary Logo"
          width={300}
          height={300}
          className="size-24 md:size-32"
          priority
          quality={95}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end items-center pb-20 lg:pb-0">
        <h1 className="text-[#f6f6f6] font-merchant text-[72px] md:text-[140px] lg:text-[190px] text-center tracking-tight lg:max-w-max max-w-xl leading-none">
          <span className="block lg:inline">60!;</span>
          <span className="block lg:inline"> Aah! Ogaju!</span>
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
