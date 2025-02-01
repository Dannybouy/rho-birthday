"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { heroSectionTexts } from "../utils";

export default function HeroSectionText() {
  const body = useRef(null);
  const isInView = useInView(body, {
    once: true,
    amount: 0.2,
    margin: "-100px",
  });

  const animation = {
    initial: { y: "100%" },
    enter: (i) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
  };

  return (
    <div ref={body} className="text-[3vw] mt-20 font-everett ">
      {heroSectionTexts.map((text, index) => {
        return (
          <div key={index} className="overflow-hidden m-0">
            <motion.p
              custom={index}
              variants={animation}
              initial="initial"
              animate={isInView ? "enter" : "initial"}
              className="m-0 text-2xl md:text-4xl lg:text-[50px] leading-tight lg:leading-[72px] lg:max-w-[1200px] uppercase text-center lg:text-left "
            >
              {text}
            </motion.p>
          </div>
        );
      })}
    </div>
  );
}
