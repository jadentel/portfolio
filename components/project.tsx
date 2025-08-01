"use client";

import { useRef } from "react";
import {tagLogos } from "@/lib/data";
import Image, { StaticImageData } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithubSquare } from "react-icons/fa";

interface ProjectProps {
  title: string;
  description: string;
  tags: readonly string[];
  imageUrl: StaticImageData;
  gitHubUrl?: string;
}


export default function Project({
  title,
  description,
  tags,
  imageUrl,
  gitHubUrl,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section className="bg-gray-100 max-w-[55rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[30rem] hover:bg-gray-200 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
        <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[60%] flex flex-col h-full sm:group-even:ml-[18rem]">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
            {description}
          </p>
          <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
            {tags.map((tag, index) => (
              <li
                className="flex items-center gap-2 bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                key={index}
              >
                {tagLogos[tag] && (
                  <Image src={tagLogos[tag]} alt={'${tag} logo'} width={16} height={16}></Image>
                )}
                {tag}
              </li>
            ))}
          </ul>
        <motion.div
        className="flex flex-col pt-3 sm:flex-row items-start justify-start gap-2 text-lg font-medium sm:mt-auto"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <a
          className="bg-white p-2 text-gray-700 flex items-center gap-1 text-[0.9rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href={gitHubUrl}
          target="_blank"
        >
          <FaGithubSquare />
          GitHub
        </a>
      </motion.div>
        </div>
        <Image
          src={imageUrl}
          alt="Project I worked on"
          quality={95}
          className="absolute hidden md:block top-3 -right-35 w-[28.25rem] rounded-t-lg shadow-2xl
        transition 
        group-hover:scale-[1.04]
        group-hover:-translate-x-3
        group-hover:translate-y-3
        group-hover:-rotate-2

        group-even:group-hover:translate-x-3
        group-even:group-hover:translate-y-3
        group-even:group-hover:rotate-2

        group-even:right-[initial] group-even:-left-40"
        />
      </section>
    </motion.div>
  );
}