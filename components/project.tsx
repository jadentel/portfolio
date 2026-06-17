"use client";

import React, { useRef } from "react";
import { tagLogos } from "@/lib/data";
import Image, { StaticImageData } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithubSquare } from "react-icons/fa";

interface ProjectProps {
  title: string;
  description: string;
  tags: readonly string[];
  imageUrl: StaticImageData;
  gitHubUrl?: string;
  detailUrl?: string;
  detailLabel?: string;
  index: number;
  viewer?: React.ReactNode;
}

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  gitHubUrl,
  detailUrl,
  detailLabel = "Explore project →",
  index,
  viewer,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="mb-4 last:mb-0"
    >
      <section className={`group relative bg-white dark:bg-[#141414] border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden hover:border-[#ff6b2b]/40 transition-all duration-300 sm:flex ${viewer ? "sm:h-[28rem]" : "sm:h-[22rem]"}`}>
        {/* Left: content */}
        <div className="p-6 sm:p-8 flex flex-col sm:w-[55%]">
          {/* Number + title */}
          <div className="flex items-start gap-4 mb-3">
            <span className="font-black text-4xl text-[#ff6b2b] leading-none select-none tabular-nums">
              {num}
            </span>
            <h3 className="font-bold text-xl leading-snug text-gray-900 dark:text-white mt-1">
              {title}
            </h3>
          </div>

          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-400 flex-1">
            {description}
          </p>

          {/* Tags */}
          <ul className="flex flex-wrap gap-1.5 mt-4">
            {tags.map((tag) => (
              <li
                key={tag}
                className="flex items-center gap-1.5 bg-white dark:bg-white/5 border border-[#ff6b2b]/30 dark:border-white/5 px-2.5 py-1 text-[0.68rem] uppercase tracking-wider text-gray-700 dark:text-gray-400 rounded-lg"
              >
                {tagLogos[tag] && (
                  <Image
                    src={tagLogos[tag]}
                    alt={`${tag} logo`}
                    width={12}
                    height={12}
                  />
                )}
                {tag}
              </li>
            ))}
          </ul>

          {/* Links */}
          <div className="flex flex-wrap gap-3 mt-4">
            {detailUrl && (
              <a
                href={detailUrl}
                className="inline-flex items-center gap-1.5 text-sm text-[#ff6b2b] hover:text-[#ff6b2b]/80 transition-colors w-fit font-medium"
              >
                {detailLabel}
              </a>
            )}
            {gitHubUrl && (
              <a
                href={gitHubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-500 hover:text-[#ff6b2b] transition-colors w-fit"
              >
                <FaGithubSquare className="text-base" />
                View on GitHub
              </a>
            )}
          </div>
        </div>

        {/* Right: viewer or image */}
        <div className="hidden sm:block sm:w-[45%] relative overflow-hidden">
          {viewer ? (
            viewer
          ) : (
            <>
              <Image
                src={imageUrl}
                alt={title}
                fill
                quality={90}
                className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.04] group-hover:-translate-y-1"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-[#141414] to-transparent w-12" />
            </>
          )}
        </div>
      </section>
    </motion.div>
  );
}
