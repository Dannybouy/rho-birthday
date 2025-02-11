"use client";

import CircleTextLogo from "@/app/components/circletextlogo";
import { motion } from "framer-motion";
import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeroSectionText from "./components/hero-section-text";
import Preloader from "./components/Preloader";
import {
  heroSectionTexts,
  testimoniesHeaderText,
  testimonyText,
} from "./utils";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const heroImages = [
    "/bg_img1.png",
    "/bg_img2.png",
    "/bg_img3.png",
    "/bg_img4.png",
  ];

  // hero image change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <main className="min-h-screen text-white bg-black">
        {/* Hero Section */}
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
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, 
                rgba(0, 0, 0, 0) ${isMobile ? "30%" : "40%"}, 
                rgba(0, 0, 0, 1) ${isMobile ? "80%" : "90%"}
              )`,
            }}
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
          <div className="relative z-10 h-full flex flex-col justify-end px-4 md:px-8 lg:px-28">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="text-[#f6f6f6] font-merchant text-[100px] md:text-[150px] lg:text-[250.58px] leading-none flex lg:justify-left"
              >
                60!
              </motion.h1>
            </div>
            <h1 className="text-[#f6f6f6] font-merchant text-[100px] md:text-[150px] lg:text-[230px] leading-none pb-14 text-center">
              Aah! Ogaju!
            </h1>
          </div>
        </div>

        <section className="px-4 md:px-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center relative">
            <HeroSectionText
              arrayOfText={heroSectionTexts}
              containerClassName="text-[3vw] mt-20 font-everett"
              className="m-0 text-2xl md:text-4xl lg:text-[50px] leading-tight lg:leading-[72px] lg:max-w-[1200px] uppercase text-center lg:text-left"
            />
            <Image
              src="/Group_6.svg"
              alt="circle text"
              width={100}
              height={100}
              className="lg:absolute mt-8 lg:mt-0 lg:top-0 lg:right-5 w-80 md:w-48 lg:w-auto mx-auto lg:mx-0"
              quality={90}
              style={spinningStyle}
            />
          </div>

          {/* Crown and Images Section */}
          <div className="lg:mt-24 mt-10">
            <Image
              src="/crown.png"
              alt="crown vector"
              width={300}
              height={300}
              className="mx-auto lg:mb-16 mb-8 w-48 md:w-52"
              quality={90}
            />
            {/* Red Dress Images */}
            <div className="overflow-hidden">
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
                      className="object-contain"
                      quality={95}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="my-10 md:my-20">
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
          <div className="mx-auto lg:my-[140px] my-10 text-center px-4 lg:max-w-5xl">
            <HeroSectionText
              arrayOfText={testimoniesHeaderText}
              containerClassName=""
              className="font-merchant text-4xl md:text-6xl lg:text-[5.5rem] mb-5 text-[#fff5e1] text-balance"
            />
            <HeroSectionText
              arrayOfText={testimonyText}
              containerClassName=""
              className="font-medium font-neue-montreal text-lg md:text-xl lg:text-[2rem] mb-8 leading-relaxed text-balance"
            />

            <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
              <Link href="/view-testimonies">
                <button className="border border-[#F6B32B] transition-colors duration-300 text-[#F6B32B] px-6 md:px-8 py-4 md:py-6 rounded-full font-merchant text-lg md:text-xl lg:text-[2rem]">
                  View testimonies
                </button>
              </Link>
              <Link href="/testimony">
                <button className="bg-[#F6B32B] hover:bg-[#b4831f] transition-colors duration-300 px-6 md:px-8 py-4 md:py-6 rounded-full font-merchant text-lg md:text-xl lg:text-[2rem]">
                  Tell me about it
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="my-10 md:my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-10">
          <div className="space-y-12 md:space-y-24 mt-10 md:mt-20">
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

          <div className="md:mt-40">
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
          </div>

          <div className="space-y-4 md:space-y-10">
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

        <div className="relative overflow-hidden w-full py-4 border-t border-white border-dashed">
          <div className="animate-marquee whitespace-nowrap font-merchant opacity-80 text-neutral-100/70 text-[2.5rem] md:text-[5.2rem] lg:text-[9.9rem]">
            <span className="mx-4">Mummy Helen @ 60</span>
            <span className="mx-4">Mummy Helen @ 60</span>
            <span className="mx-4">Mummy Helen @ 60</span>
            <span className="mx-4">Mummy Helen @ 60</span>
          </div>
        </div>
      </main>
    </>
  );
}
