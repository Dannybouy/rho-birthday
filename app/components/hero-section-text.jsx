"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function HeroSectionText({
  arrayOfText,
  className = "", // Default empty string for className
  containerClassName = "", // Container class name
  textWrapperClassName = "", // Wrapper for each text item
}) {
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
    <div ref={body} className={containerClassName}>
      {arrayOfText.map((text, index) => {
        return (
          <div
            key={index}
            className={`overflow-hidden m-0 ${textWrapperClassName}`}
          >
            <motion.p
              custom={index}
              variants={animation}
              initial="initial"
              animate={isInView ? "enter" : "initial"}
              className={className}
            >
              {text}
            </motion.p>
          </div>
        );
      })}
    </div>
  );
}
