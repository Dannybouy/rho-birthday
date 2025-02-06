"use client";

import { Query } from "appwrite";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import db from "../appwrite/databases";
import CircleTextLogo from "../components/circletextlogo";
import HeroSectionText from "../components/hero-section-text";
import TestimonyCard from "../components/TestimonyCard";
import { testimonyText, viewTestimoniesHeaderText } from "../utils";

const ViewTestimonies = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const observer = useRef(null);

  const fetchTestimonies = async () => {
    setLoading(true);
    try {
      const testimonies = await db.testimonies.list([
        Query.orderDesc("createdAt"),
      ]);
      setTestimonies((prev) => [...prev, ...testimonies.documents]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching testimonies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonies();
  }, []);
  return (
    <main className="min-h-screen">
      <header className="flex flex-col items-center justify-center mt-44">
        <div className="absolute top-4 md:top-8 left-4 md:left-8 z-10">
          <Image
            src="/logo3.png"
            alt="60th Anniversary Logo"
            width={300}
            height={300}
            className="w-16 h-16 md:size-32"
            priority
            quality={95}
          />
        </div>
        <HeroSectionText
          arrayOfText={viewTestimoniesHeaderText}
          containerClassName=""
          className="font-merchant text-4xl md:text-6xl lg:text-[5.5rem] mb-5 text-[#fff5e1] text-balance text-center"
        />
        <HeroSectionText
          arrayOfText={testimonyText}
          containerClassName=""
          className="font-medium font-neue-montreal text-lg md:text-xl lg:text-[2rem] mb-8 leading-relaxed text-balance"
        />
      </header>

      <div className="relative">
        <div className="fixed top-1/2 transform -translate-y-1/6 -z-10">
          <CircleTextLogo />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-8 lg:px-12 mx-auto max-w-[1400px] z-10 mt-44">
          {testimonies.map((testimony, index) => (
            <div key={testimony.$id} className="relative">
              <TestimonyCard testimony={testimony} />
            </div>
          ))}
        </div>

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-400">Loading...</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ViewTestimonies;
