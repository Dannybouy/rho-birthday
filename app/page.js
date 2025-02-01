"use client";

import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HeroSectionText from "./components/hero-section-text";
import Preloader from "./components/Preloader";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const heroImages = [
    "/bg_img_2.jpg",
    "/bg_img2.png",
    "/bg_img3.png",
    "/bg_img4.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000); // Change image every 5 seconds

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

  // Add this function to handle intersection observer
  const useInView = (options = {}) => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setIsInView(entry.isIntersecting);
      }, options);

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [options]);

    return [ref, isInView];
  };

  const sixtyRef = useRef(null);
  const redDressGridRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    // Animate "60!" text
    gsap.fromTo(
      sixtyRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      }
    );

    // Animate red dress grid
    gsap.fromTo(
      redDressGridRef.current.children,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: redDressGridRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []); // Add empty dependency array

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <main
        className={`min-h-screen text-white bg-black scroll-smooth ${
          isLoading ? "hidden" : ""
        }`}
      >
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
                rgba(0, 0, 0, 0) ${isMobile ? "50%" : "40%"}, 
                rgba(0, 0, 0, 1) ${isMobile ? "80%" : "90%"}
              )`,
            }}
          ></div>

          <div className="absolute top-4 md:top-8 left-4 md:left-8 z-10">
            <Image
              src="/logo3.png"
              alt="60th Anniversary Logo"
              width={200}
              height={200}
              className="w-16 h-16 md:w-24 md:h-24"
              priority
              quality={95}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-start justify-end px-28 max-w-full">
            <div className="overflow-hidden">
              <h1
                ref={sixtyRef}
                className="text-[#f6f6f6] font-merchant text-[100px] md:text-[150px] lg:text-[250.58px] leading-none"
              >
                60!
              </h1>
            </div>
            <h1 className="text-[#f6f6f6] font-merchant text-[100px] md:text-[150px] lg:text-[230px] leading-none pb-14">
              Aah! Ogaju!
            </h1>
          </div>
        </div>

        <section className="px-4 md:px-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center relative">
            <HeroSectionText />
            <Image
              src="/Group_6.svg"
              alt="circle text"
              width={100}
              height={100}
              className="lg:absolute static mt-8 lg:mt-0 lg:top-0 lg:right-5 w-80 md:w-48 lg:w-auto"
              quality={90}
              style={spinningStyle}
            />
          </div>

          {/* Crown and Images Section */}
          <div className="lg:mt-24 mt-10">
            <Image
              src="/crown.png"
              alt="crown vector"
              width={200}
              height={200}
              className="mx-auto lg:mb-16 mb-8 w-32 md:w-48 lg:w-auto"
              quality={90}
            />
            {/* Red Dress Images */}
            <div className="overflow-hidden">
              <div
                ref={redDressGridRef}
                className="grid lg:grid-cols-3 grid-cols-1 gap-4 lg:gap-5"
              >
                {redDressImg.map((pic) => (
                  <div
                    key={pic.id}
                    className="relative aspect-[3/4] overflow-hidden"
                  >
                    <Image
                      src={pic.img}
                      alt="red dress"
                      fill
                      sizes="100vw"
                      className="object-contain"
                      quality={95}
                    />
                  </div>
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
            <h2 className="font-merchant text-4xl md:text-6xl lg:text-[5.5rem] mb-5 text-[#fff5e1] text-balance">
              How has Mummy Helen's life blessed you?
            </h2>
            <p className="font-medium font-neue-montreal text-lg md:text-xl lg:text-[2rem] mb-8 leading-relaxed lg:leading-[48px] text-balance">
              Mummy has been a blessing to us in many ways, we believe only the
              Lord can work this! Tell us, how have you been blessed by mummy
            </p>
            <button className="bg-[#F6B32B] hover:bg-orange-600 transition-colors duration-300 text-white px-6 md:px-8 py-4 md:py-6 rounded-full font-merchant text-lg md:text-xl lg:text-[2rem]">
              Tell me about it
            </button>
          </div>
        </section>

        <section className="my-10 md:my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-10">
          <div className="space-y-12 md:space-y-24 mt-10 md:mt-20">
            <div className="relative mx-auto">
              <Image
                src="/Group_6.svg"
                alt="circle text"
                width={300}
                height={300}
                className="mx-auto relative"
                quality={90}
                style={spinningStyle}
              />
              <Image
                src="/logo3.png"
                alt="60th Anniversary Logo"
                width={100}
                height={100}
                className="size-24 md:w-24 md:h-24 absolute  md:top-8 md:left-8"
                priority
                quality={95}
              />
            </div>
            <div className="relative aspect-[3/4]">
              <Image
                src="/4.png"
                alt="red dress"
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
                quality={95}
              />
            </div>
          </div>

          <div className="mt-10 md:mt-40">
            <div className="relative aspect-[3/4]">
              <Image
                src="/5.png"
                alt="red dress"
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
                quality={95}
              />
            </div>
          </div>

          <div className="space-y-4 md:space-y-10">
            <div className="relative aspect-[3/4]">
              <Image
                src="/6.png"
                alt="red dress"
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
                quality={95}
              />
            </div>
            <div className="relative aspect-[3/4]">
              <Image
                src="/7.png"
                alt="red dress"
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
                quality={95}
              />
            </div>
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
