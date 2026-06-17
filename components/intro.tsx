"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import selfie from "@/public/image.png";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="mb-24 w-full max-w-[56rem] scroll-mt-[100rem]"
    >
      {/* Status badge */}
      <motion.div
        className="flex items-center gap-2.5 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b2b] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b2b]" />
        </span>
        <span className="text-xs font-mono uppercase tracking-widest text-gray-600 dark:text-gray-400">
          Graduating 2026 · Currently at Leaning Technologies · Open to opportunities
        </span>
      </motion.div>

      <div className="flex items-start justify-between gap-8">
        {/* Name block */}
        <div className="flex-1 min-w-0">
          <div className="overflow-hidden">
            <motion.h1
              className="font-black leading-[0.9] tracking-tighter"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="block text-[clamp(3.2rem,9vw,7rem)] text-gray-900 dark:text-white">
                Jaden
              </span>
              <span className="block text-[clamp(3.2rem,9vw,7rem)] text-[#ff6b2b]">
                Tellis.
              </span>
            </motion.h1>
          </div>
        </div>

        {/* Profile photo */}
        <motion.div
          className="relative hidden sm:block flex-shrink-0 mt-1"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Image
            src={selfie}
            alt="Jaden"
            width={192}
            height={192}
            quality={95}
            priority
            className="w-36 h-36 md:w-44 md:h-44 rounded-2xl object-cover border-2 border-[#ff6b2b]"
          />
          <div className="absolute -bottom-2 -right-2 w-full h-full rounded-2xl border-2 border-[#ff6b2b] opacity-20 -z-10" />
        </motion.div>
      </div>

      {/* Divider + role */}
      <motion.div
        className="flex items-center gap-4 mt-6 mb-5"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        <div className="h-px flex-1 bg-gray-300 dark:bg-white/10" />
        <span className="text-[0.7rem] font-mono uppercase tracking-widest text-gray-600 dark:text-gray-500 whitespace-nowrap">
          MEng Computer Science · University of Leeds
        </span>
        <div className="h-px flex-1 bg-gray-300 dark:bg-white/10" />
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-[42rem] leading-relaxed mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        MEng Computer Science student specialising in computer vision, deep
        learning, and full-stack web development — building everything from
        training-free 3D reconstruction pipelines and CNN/RNN image captioning
        models to React and Astro web applications, distributed MPI systems, and
        developer tooling for WebAssembly platforms. Comfortable across the full
        stack, from{" "}
        <span className="text-[#ff6b2b] font-medium">
          PyTorch model pipelines evaluated against state-of-the-art baselines
        </span>{" "}
        to TypeScript frontends shipped to real users.
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="flex flex-wrap items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        <Link
          href="#contact"
          className="flex items-center gap-2 bg-[#ff6b2b] text-black px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#e85a1e] transition-all hover:scale-105 active:scale-100"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Contact me{" "}
          <BsArrowRight className="group-hover:translate-x-1 transition" />
        </Link>

        <a
          href="/CV.pdf"
          download
          className="flex items-center gap-2 border border-gray-300 dark:border-white/15 text-gray-700 dark:text-gray-200 px-5 py-2.5 rounded-full font-semibold text-sm hover:border-[#ff6b2b] hover:text-[#ff6b2b] transition-all hover:scale-105 active:scale-100"
        >
          Download CV <HiDownload />
        </a>

        <a
          href="https://www.linkedin.com/in/jaden-t-864773207/"
          target="_blank"
          rel="noreferrer"
          className="border border-gray-300 dark:border-white/15 text-gray-600 dark:text-gray-400 p-2.5 rounded-full hover:border-[#ff6b2b] hover:text-[#ff6b2b] transition-all hover:scale-105"
        >
          <BsLinkedin />
        </a>

        <a
          href="https://github.com/jadentel"
          target="_blank"
          rel="noreferrer"
          className="text-[1.15rem] border border-gray-300 dark:border-white/15 text-gray-600 dark:text-gray-400 p-2.5 rounded-full hover:border-[#ff6b2b] hover:text-[#ff6b2b] transition-all hover:scale-105"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
}
