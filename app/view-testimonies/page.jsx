"use client";

import { Query } from "appwrite";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import db from "../appwrite/databases";
import CircleTextLogo from "../components/circletextlogo";
import HeroSectionText from "../components/hero-section-text";
import TestimonyCard from "../components/TestimonyCard";
import { testimonyText, viewTestimoniesHeaderText } from "../utils";

const ViewTestimonies = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTestimonies = async () => {
    setLoading(true);
    try {
      const testimonies = await db.testimonies.list([
        Query.orderDesc("createdAt"),
      ]);
      setTestimonies((prev) => [...prev, ...testimonies.documents]);
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
          <Link href="/">
            <Image
              src="/logo3.png"
              alt="60th Anniversary Logo"
              width={300}
              height={300}
              className="size-24 md:size-32"
              priority
              quality={95}
            />
          </Link>
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
        {/* <HeroSectionText
          arrayOfText={viewTestimoniesHeaderText}
          containerClassName="px-4 text-center"
          className="font-merchant text-4xl md:text-6xl lg:text-[5.5rem] mb-5 text-[#fff5e1] text-balance"
        />
        <HeroSectionText
          arrayOfText={testimonyText}
          containerClassName="px-4 text-center"
          className="font-medium font-neue-montreal text-lg md:text-xl lg:text-[2rem] mb-8 leading-relaxed text-balance"
        /> */}
      </header>

      <div className="relative px-4 md:px-8 lg:px-12 mb-10">
        <div className="fixed top-2/3 transform -translate-y-[60%] -translate-x-[10%] -z-10 ">
          <CircleTextLogo />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-4 mx-auto max-w-[1400px] place-items-center mt-44">
          {testimonies.map((testimony) => (
            <div key={testimony.$id} className="w-full max-w-[454px]">
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
