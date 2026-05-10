"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
} from "framer-motion";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {items.map((item) => (
        <div
          className="-mr-3 relative group"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ zIndex: hoveredIndex === item.id ? 50 : 1 }}
        >
          <motion.div
            animate={{
              scale: hoveredIndex === item.id ? 1.15 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          >
            <Image
              height={100}
              width={100}
              src={item.image}
              alt={item.name}
              className="object-cover !m-0 !p-0 object-top rounded-full h-7 w-7 border-2 border-white dark:border-zinc-900 relative transition duration-500"
            />
          </motion.div>
        </div>
      ))}
    </>
  );
};
