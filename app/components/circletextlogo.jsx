import Image from "next/image";
import React from "react";

const spinningStyle = {
  animation: "spin 10s linear infinite",
};

const CircleTextLogo = () => {
  return (
    <div className="mx-auto relative inline-flex justify-center items-center">
      <Image
        src="/Group_6.svg"
        alt="circle text"
        width={300}
        height={300}
        quality={90}
        style={spinningStyle}
      />
      <Image
        src="/logo3.png"
        alt="60th Anniversary Logo"
        width={100}
        height={100}
        className="absolute size-32 transform -translate-x-1/6 -translate-y-1/6"
        priority
        quality={95}
      />
      
    </div>
  );
};

export default CircleTextLogo;
