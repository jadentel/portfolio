import { links } from "./data";
import { ReactNode } from "react";
import { StaticImageData } from "next/image";

export type SectionName = (typeof links)[number]["name"];

export interface ExperienceItem {
  title: string;
  location: string;
  description: string | string[];
  date: string;
  icon?: ReactNode;
  iconImage?: StaticImageData;
}