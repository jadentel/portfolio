"use client";

import React from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import Image from "next/image";

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-24 w-full max-w-[56rem] sm:mb-32">
      <SectionHeading>Experience</SectionHeading>

      <VerticalTimeline layout="1-column-left" lineColor={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}>
        {experiencesData.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            contentStyle={{
              background: isDark ? "#141414" : "#fff",
              boxShadow: "none",
              border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)",
              borderRadius: "1rem",
              textAlign: "left",
              padding: "1.3rem 2rem",
            }}
            contentArrowStyle={{
              borderRight: isDark
                ? "0.4rem solid rgba(255,255,255,0.08)"
                : "0.4rem solid rgba(0,0,0,0.08)",
            }}
            date={item.date}
            icon={
              item.iconImage ? (
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <Image
                    src={item.iconImage}
                    alt={item.title}
                    width={48}
                    height={48}
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
              ) : (
                item.icon
              )
            }
            iconStyle={{
              background: isDark ? "#1a1a1a" : "#fff",
              border: isDark ? "2px solid rgba(255,255,255,0.08)" : "2px solid rgba(0,0,0,0.05)",
              boxShadow: "none",
              fontSize: "1.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
            <p className="font-normal !mt-0.5 text-sm text-gray-600 dark:text-gray-500">{item.location}</p>
            {Array.isArray(item.description) ? (
              <ul className="!mt-2 space-y-2">
                {item.description.map((point, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700 dark:text-gray-400 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ff6b2b] flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="!mt-2 !font-normal text-sm text-gray-700 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  );
}
