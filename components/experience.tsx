"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import Image from "next/image";

export default function Experience() {
  const { ref } = useSectionInView("Experience");

  // New state to track system dark mode preference
  const [isSystemDark, setIsSystemDark] = useState(false);

  useEffect(() => {
    // Check on mount
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsSystemDark(mediaQuery.matches);

    // Listen for changes in system theme
    const handler = (e: MediaQueryListEvent) => setIsSystemDark(e.matches);
    mediaQuery.addEventListener("change", handler);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>

      <VerticalTimeline lineColor="">
        {experiencesData.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background: isSystemDark ? "rgba(255, 255, 255, 0.05)" : "#f3f4f6",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                textAlign: "left",
                padding: "1.3rem 2rem",
              }}
              contentArrowStyle={{
                borderRight: isSystemDark
                  ? "0.4rem solid rgba(255, 255, 255, 0.5)"
                  : "0.4rem solid #9ca3af",
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
                      objectFit="cover"
                      priority={true}
                    />
                  </div>
                ) : (
                  item.icon
                )
              }
              iconStyle={{
                background: isSystemDark ? "#1f2937" : "white",
                fontSize: "1.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h3 className="font-semibold capitalize">{item.title}</h3>
              <p className="font-normal !mt-0">{item.location}</p>
              <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>

    </section>
  );
}
