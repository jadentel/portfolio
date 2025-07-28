// components/skills.tsx
"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData, tagLogos } from "@/lib/data"; // Make sure to import the updated skillsData
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import Image from 'next/image'

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-left sm:mb-40" // Changed to text-left for category titles
    >
      <SectionHeading>My skills</SectionHeading>

      {Object.entries(skillsData).map(([category, skills]) => (
        <div key={category} className="mb-8"> {/* Add margin-bottom for spacing between categories */}
          <h3 className="text-xl font-semibold mb-4 capitalize">{category}</h3> {/* Category title */}
          <ul className="flex flex-wrap gap-2 text-lg text-gray-800">
            {skills.map((skill, index) => (
              <motion.li
                className="bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80"
                key={index}
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
                custom={index}
              >
                {tagLogos[skill.name] && (
                <Image
                  src={tagLogos[skill.name]}
                  alt={`${skill.name} logo`}
                  width={20}
                  height={20}
                  className="inline mr-2"
                />
              )}
                {skill.name}
              </motion.li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}