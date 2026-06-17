"use client";

import React from "react";
import dynamic from "next/dynamic";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import HPLatticeViewer from "./HPLatticeViewer";

const ReconstructionViewer = dynamic(
  () => import("./ReconstructionViewer"),
  { ssr: false }
);

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-24 w-full max-w-[56rem]">
      <SectionHeading>Projects</SectionHeading>
      <div className="flex flex-col gap-4">
        {projectsData.map((project, index) => (
          <Project
            key={index}
            {...project}
            index={index}
            viewer={
              index === 0 ? (
                <ReconstructionViewer
                  pcdUrl="/office0_pcd.ply"
                  meshUrl="/office0_mesh.ply"
                  videoSrc="/office0_video.mp4"
                  videoLabel="DA3 depth"
                  sceneLabel="Replica · office0"
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              ) : index === 1 ? (
                <HPLatticeViewer />
              ) : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}
