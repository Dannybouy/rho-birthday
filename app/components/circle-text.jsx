import React from "react";
import Image from "next/image";
const CircleText = () => {
  return (
    <div>
      <Image
        src="/Group_6.svg"
        alt="circle text"
        width={300}
        height={300}
        className="mx-auto relative"
        quality={90}
      />
    </div>
  );
};

export default CircleText;
