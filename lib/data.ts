import React, { ReactNode } from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap, LuLaptop } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";
import DissertationImg from "@/public/dissertation.png"
import pythonLogo from "@/public/python.png"
import ReactLogo from "@/public/react.png"
import TypeScriptLogo from "@/public/typescript.png"
import TailWindLogo from "@/public/tailwind.png"
import NextJSLogo from "@/public/nextjs.png"
import DockerLogo from "@/public/docker.png"
import webvmImg from "@/public/webvm.png";
import vodafoneImg from "@/public/vodafone.png"
import LinuxImg from "@/public/LinuxImg.png"
import { StaticImageData } from "next/image";
import ClaudeLogo from "@/public/Claude.png"
import xtermjsLogo from "@/public/xterm.png"
import cheerpxLogo from "@/public/cheerpx.png"
import flaskLogo from "@/public/flask.png"
import stripeLogo from "@/public/stripe.jpg"
import csharpLogo from "@/public/csharp.png"
import githubLogo from "@/public/github.png"
import linuxLogo from "@/public/linux.png"
import nodejsLogo from "@/public/nodejs.png"
import awsLogo from "@/public/aws.png"
import mysqlLogo from "@/public/mysql.png"

export const tagLogos: { [key:string]:any } = {
  "Python": pythonLogo,
  React: ReactLogo,
  TypeScript: TypeScriptLogo,
  "Tailwind": TailWindLogo,
  "Next.js": NextJSLogo,
  "Docker": DockerLogo,
  "Claude": ClaudeLogo,
  "xterm.js": xtermjsLogo,
  "Cheerpx": cheerpxLogo,
  "Flask": flaskLogo,
  "Stripe": stripeLogo,
  "C#": csharpLogo,
  "GitHub": githubLogo,
  "Linux": linuxLogo,
  "Node.js": nodejsLogo,
  "AWS": awsLogo,
  "MySQL": mysqlLogo,
} as const;

export const links = [
  {
    name: "Home",
    hash: "#home",
  },

  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Education",
    hash: "#education",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

interface ExperienceItem {
  title: string;
  location: string;
  description: string;
  date: string;
  icon?: ReactNode;
  iconImage?: StaticImageData;
}

export const experiencesData: ExperienceItem[] = [
  {
    title: "Linux Challenge Terminal – LeaningTech Hackathon 2024",
    location: "Nexus, Leeds",
    description:
      "Built an interactive web-based Linux learning platform using CheerpX, xterm.js, and Claude AI. The app delivers a full Linux terminal in the browser, letting users complete real-time challenges with AI-driven guidance and persistent environments. Integrated Claude for intelligent bash command support, and used Tailwind and Next.js for a responsive UI.",
    iconImage: webvmImg,
    date: "2024",
  },

  {
    title: "Vodafone Intern",
    location: "Remote, UK",
    description:
      "Designed and prototyped an IoT device while collaborating in a cross-functional team to align user needs with technical constraints, gaining hands-on experience in user-centered design and product development.",
    iconImage: vodafoneImg,
    date: "Feb",
  },
] as const;

export const projectsData = [
  {
    title: "Protein Folding Prediction with Genetic Algorithms & Bayesian Inference [Dissertation]",
    description:
      "Developed a protein folding simulator using a Genetic Algorithm enhanced with Bayesian Optimization. Applied the 2D HP lattice model with custom mutation operators and tuned hyperparameters to improve folding accuracy, energy efficiency, and structural diversity.",
    tags: ["React", "Python", "Next.js","Machine Learning","A.I"],
    imageUrl: DissertationImg,
    gitHubUrl: "https://github.com/jadentel/GeneticAlgorithm-2.0",
  },
  {
    title: "Forza – Full-Stack Fitness Tracking App",
    description:
      "Built a full-stack fitness tracker with Flask and Next.js, enabling users to log GPX activities, manage subscriptions with Stripe, and connect socially through friend features. Implemented a secure REST API with CSRF protection, plan-based upload limits, and containerized deployment via Docker Compose.",
    tags: ["Next.js", "React", "Flask", "Docker", "Stripe"],
    imageUrl: rmtdevImg,
    gitHubUrl: "https://github.com/jadentel/Forza-portfolio"
  },

  {
  title: "Linux Challenge Terminal – LeaningTech Hackathon 2025",
  description:
    "Built an interactive Linux learning platform using CheerpX, xterm.js, and the Claude API, enabling users to complete real-time shell challenges in a full browser-based terminal with AI-driven assistance, persistent environments, and a responsive UI via Tailwind and Next.js.",
  tags: ["Next.js", "Cheerpx", "xterm.js", "Claude", "Tailwind"],
  imageUrl: LinuxImg,
  gitHubUrl: "https://github.com/jadentel/webvm",
  },

];

// lib/data.ts
export const skillsData = {
  Backend: [
    { name: "TypeScript" },
    { name: "PHP" },
    { name: "C#" },
    { name: "Python" },
    { name: "Node.js" },
    { name: "MySQL" },
    { name: "REST APIs" },
  ],
  Frontend: [
    { name: "React" },
    { name: "Next.js" },
    { name: "Redux" },
    { name: "Tailwind" },
    { name: "Responsive Design" },
  ],
  DevOps: [
    { name: "AWS" },
    { name: "Docker" },
    { name: "Linux" },
    { name: "CI/CD" },
  ],
  Practices: [
    { name: "Database design" },
    { name: "Event-driven architecture" },
    { name: "Agile" },
    { name: "Scrum" },
    { name: "Object Oriented Programming (OOP)" },
    { name: "Test Driven Development (TDD)" },
  ],
  Tools: [
    { name: "GitHub" },
  ],
};