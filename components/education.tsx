"use client";

import SectionHeading from './section-heading';
import { useSectionInView } from '@/lib/hooks';
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import UoLLogo from '@/public/leeds.jpg';
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";

// Animation variants
const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut
    }
  }
};

const tagContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const tagItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export default function Education() {
  const { ref } = useSectionInView("Education");
  const [isSystemDark, setIsSystemDark] = useState(false);

  return (
    <section id="education" className="scroll-mt-28 mb-28 sm:mb-40" ref={ref}>
      <h2 className="text-3xl font-bold text-center mb-10">My Education</h2>

      <motion.div
        className="mx-auto max-w-4xl bg-gray-50 dark:bg-white/5 rounded-2xl shadow p-6 md:p-10 flex flex-col md:flex-row gap-6 items-center"
        variants={cardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="w-52 h-42 flex-shrink-0">
          <Image
            src={UoLLogo}
            alt="University of Leeds Logo"
            width={168}
            height={168}
            className="rounded-md object-contain"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold">MEng/BSc Computer Science</h3>
          <p className="text-gray-600 dark:text-gray-300">University of Leeds</p>
          <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
            September 2023 – Present
          </p>

          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Relevant Modules:
            </p>

            <motion.ul
              className="flex flex-wrap gap-2 mt-1"
              variants={tagContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                "Software Engineering",
                "Machine Learning",
                "Artificial Intelligence",
                "Algorithms",
                "Web Design",
              ].map((module, index) => (
                <motion.li
                  key={index}
                  className="px-3 py-1 text-xs bg-blue-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-full"
                  variants={tagItem}
                >
                  {module}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
