"use client";

import Image from "next/image";
import React from "react";


const TestimonyCard = ({ testimony }) => {
  const { imageUrl, name, experience } = testimony;

  return (
    <div className="bg-white rounded-3xl p-10 w-[454px] max-w-[90%] ">
      <div className="flex items-center gap-4">
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className="rounded-full size-8 object-cover"
          priority
        />
        <h3 className="text-xl font-neue-montreal text-[#171717]">
          {name}
        </h3>
      </div>
      <p className="text-base font-neue-montreal-regular text-[#171717] text-balance">
        {experience}
      </p>
    </div>

  );
};

export default TestimonyCard;
