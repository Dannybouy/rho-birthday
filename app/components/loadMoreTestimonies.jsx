"use client";

import { Query } from "appwrite";
import { motion } from "motion/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import db from "../appwrite/databases";
import TestimonyCard from "./TestimonyCard";

const LIMIT = 10;
const LoadMoreTestimonies = () => {
  const { ref, inView } = useInView();
  const [moreTestimonies, setMoreTestimonies] = useState([]);
  const [lastId, setLastId] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreTestimonies = async () => {
    if (!hasMore) return;

    try {
      const queries = [Query.orderDesc("createdAt"), Query.limit(LIMIT)];

      if (lastId) {
        queries.push(Query.cursorAfter(lastId));
      }

      const testimonies = await db.testimonies.list(queries);

      if (testimonies.documents.length < LIMIT) {
        setHasMore(false);
      }

      if (testimonies.documents.length > 0) {
        setLastId(testimonies.documents[testimonies.documents.length - 1].$id);
        setMoreTestimonies((prev) => [...prev, ...testimonies.documents]);
      }
    } catch (error) {
      console.error("Error fetching testimonies:", error);
    }
  };

  useEffect(() => {
    if (inView) {
      fetchMoreTestimonies();
    }
  }, [inView]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8, ease: "easeInOut", duration: 0.5 }}
        viewport={{ amount: 0.5 }}
        className="columns-1 md:columns-2 lg:columns-3 2xl:columns-4 gap-4 mx-auto max-w-7xl mt-32"
      >
        {moreTestimonies.map((testimony) => (
          <div
            key={testimony.$id}
            className="w-full max-w-[454px] break-inside-avoid mb-4"
          >
            <TestimonyCard testimony={testimony} />
          </div>
        ))}
      </motion.div>
      {hasMore && (
        <div ref={ref}>
          <Image src="/spinner.svg" alt="spinner" width={32} height={32} />
        </div>
      )}
    </>
  );
};

export default LoadMoreTestimonies;
