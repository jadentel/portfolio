import Intro from "@/components/intro"
import SectionDivider from "@/components/section-divider";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Contact from "@/components/contact";
import Education from "@/components/education";

export default function Home() {
  return <main className="flex flex-col items-center px-4">
    <Intro/>
    <SectionDivider/>
    <Projects/>
    <Skills/>
    <Experience/>
    <Education/>
    <Contact/>
  </main>
}
