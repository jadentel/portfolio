import Intro from "@/components/intro";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Contact from "@/components/contact";
import Education from "@/components/education";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <Projects />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </main>
  );
}
