"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");
  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        I’m currently a <span className="font-medium">final-year Computer Science student at the University of Leeds</span>, where I’ve combined my passion for software development with real-world problem solving. My programming journey started from a genuine curiosity about how technology can make a difference, leading me to work on diverse projects—from building social fitness tracking apps like <span className="italic">Forza</span> to conducting <span className="italic">AI-driven research</span> in protein folding.
      </p>
      <p className="mb-3">
        I thrive on <span className="italic">solving complex problems</span> and translating ideas into practical, user-focused products. My core technical stack revolves around <span className="font-medium">React (Next.js), Node.js, and TypeScript</span>, with experience in data visualization and backend development. I’m always eager to learn new technologies and frameworks that help me build efficient, accessible, and performant applications.
      </p>
    </motion.section>

  )
}
