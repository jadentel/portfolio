"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData, tagLogos } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";

export default function Skills() {
  const { ref } = useSectionInView("Skills");
  const entries = Object.entries(skillsData);

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-24 w-full max-w-[56rem] scroll-mt-28 sm:mb-32"
    >
      <SectionHeading>Skills</SectionHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {entries.map(([category, skills], index) => (
          <motion.div
            key={category}
            className={clsx(
              "p-5 rounded-2xl bg-white dark:bg-[#141414] border border-black/5 dark:border-white/5 hover:border-[#ff6b2b]/40 transition-all duration-300",
              index === entries.length - 1 && entries.length % 2 !== 0 && "sm:col-span-2"
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-4 bg-[#ff6b2b] rounded-full" />
              <h3 className="text-[0.7rem] font-mono uppercase tracking-widest text-gray-700 dark:text-gray-500">
                {category}
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 text-gray-800 dark:text-gray-300 border border-[#ff6b2b]/30 dark:border-white/5"
                >
                  {tagLogos[skill.name] && (
                    <Image
                      src={tagLogos[skill.name]}
                      alt={`${skill.name} logo`}
                      width={14}
                      height={14}
                    />
                  )}
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
