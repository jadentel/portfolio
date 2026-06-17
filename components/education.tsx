"use client";

import { useSectionInView } from "@/lib/hooks";
import React from "react";
import Image from "next/image";
import UoLLogo from "@/public/leeds.jpg";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";

const modules = [
  "Software Engineering",
  "Machine Learning",
  "Artificial Intelligence",
  "Algorithms",
  "Web Design",
];

export default function Education() {
  const { ref } = useSectionInView("Education");

  return (
    <section id="education" className="scroll-mt-28 mb-24 w-full max-w-[56rem] sm:mb-32" ref={ref}>
      <SectionHeading>Education</SectionHeading>

      <motion.div
        className="bg-white dark:bg-[#141414] rounded-2xl border border-black/5 dark:border-white/5 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center hover:border-[#ff6b2b]/40 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex-shrink-0 bg-white rounded-xl p-3 shadow-sm">
          <Image
            src={UoLLogo}
            alt="University of Leeds Logo"
            width={120}
            height={120}
            className="rounded-md object-contain"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white">
            MEng/BSc Computer Science
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-0.5">
            University of Leeds
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            September 2023 – June 2026
          </p>

          <div className="mt-4">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-2">
              Relevant Modules
            </p>
            <div className="flex flex-wrap gap-2">
              {modules.map((mod) => (
                <span
                  key={mod}
                  className="px-3 py-1 text-xs bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-[#ff6b2b]/30 dark:border-white/5 rounded-lg"
                >
                  {mod}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
