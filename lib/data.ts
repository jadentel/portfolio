import rmtdevImg from "@/public/rmtdev.png";
import leaningTechImg from "@/public/leaningTechImg.png"
import DissertationImg from "@/public/dissertation.png"
import pythonLogo from "@/public/python.png"
import ReactLogo from "@/public/react.png"
import TypeScriptLogo from "@/public/typescript.png"
import TailWindLogo from "@/public/tailwind.png"
import NextJSLogo from "@/public/nextjs.png"
import DockerLogo from "@/public/docker.png"
import webvmImg from "@/public/webvm.png";
import reconstructionImg from "@/public/reconstruction.png";
import { StaticImageData } from "next/image";
import type { ExperienceItem } from "./types";
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

export const tagLogos: Record<string, StaticImageData> = {
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
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Skills",
    hash: "#skills",
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

export const experiencesData: ExperienceItem[] = [
  {
    title: "Intern Software Engineer – Developer Experience & Relations",
    location: "Leaning Technologies · Leeds",
    description: [
      "Built and maintained developer-facing websites, moderated the developer Discord, curated technical content, and organised community events to improve developer engagement with Leaning Technologies’ tools.",
      "BrowserPod Workshop — Designed and delivered a technical workshop for Leeds AI Society built around a Tetris scaffold: attendees completed five BrowserPod API tasks to produce a working game with a shareable Portal URL and QR code. Built the entire thing independently, including repo scaffolding and student guide. The scaffold was subsequently adopted as part of the official BrowserPod demo.",
      "AI-IN-THE-BOX Hackathon — Organised and built the infrastructure for a 60+ person in-person hackathon: Astro/Tailwind landing page, registration and submission portal with Google Sheets integration. Co-hosted the event with Leeds AI Society.",
    ],
    iconImage: leaningTechImg,
    date: "2024 – Present",
  },
  {
    title: "3rd Place – Linux Challenge Terminal · LeaningTech Hackathon 2025",
    location: "Nexus, Leeds",
    description:
      "Built an interactive web-based Linux learning platform using CheerpX, xterm.js, and Claude AI. The app delivers a full Linux terminal in the browser, letting users complete real-time challenges with AI-driven guidance and persistent environments. Integrated Claude for intelligent bash command support, and used Tailwind and Next.js for a responsive UI.",
    iconImage: webvmImg,
    date: "2024",
  },

] as const;

export const projectsData = [
  {
    title: "3D Reconstruction using Hybrid Depth and Tracking [Group Project]",
    description:
      "Built a modular monocular 3D reconstruction pipeline combining Depth Anything V3 for dense metric depth estimation, CoTracker3 for long-range 2D point tracking, IRLS rigidity filtering, and Huber-robust global bundle adjustment with Open3D TSDF volumetric fusion — producing textured meshes and coloured point clouds from a single smartphone video. Benchmarked on Replica, ScanNet, and Tanks and Temples, achieving F-Score@5cm of 71.0%, 35.8%, and 51.7% respectively.",
    tags: ["Python", "PyTorch", "Computer Vision", "Open3D"],
    imageUrl: reconstructionImg,
    detailUrl: "/projects/reconstruction",
    detailLabel: "Explore pipeline →",
  },
  {
    title: "Protein Folding Prediction with Genetic Algorithms & Bayesian Inference [Dissertation]",
    description:
      "Developed a protein folding simulator using a Genetic Algorithm enhanced with Bayesian Optimization. Applied the 2D HP lattice model with custom mutation operators and tuned hyperparameters to improve folding accuracy, energy efficiency, and structural diversity.",
    tags: ["React", "Python", "Next.js", "Machine Learning", "A.I"],
    imageUrl: DissertationImg,
    detailUrl: "/projects/protein-folding",
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

];

export const skillsData = {
  "Machine Learning": [
    { name: "PyTorch" },
    { name: "Deep Learning" },
    { name: "Computer Vision" },
    { name: "CNNs" },
    { name: "RNNs" },
    { name: "Bayesian Optimisation" },
  ],
  Backend: [
    { name: "TypeScript" },
    { name: "Python" },
    { name: "Node.js" },
    { name: "C#" },
    { name: "PHP" },
    { name: "MySQL" },
    { name: "REST APIs" },
    { name: "MPI" },
  ],
  Frontend: [
    { name: "React" },
    { name: "Next.js" },
    { name: "Astro" },
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