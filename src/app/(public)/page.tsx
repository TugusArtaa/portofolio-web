"use client";

import HeroSection from "@/components/Sections/HeroSection";
import AboutSection from "@/components/Sections/AboutSection";
import ProjectsSection from "@/components/Sections/ProjectsSection";
import ConnectSection from "@/components/Sections/ConnectSection";
import useHomePageAnimations from "@/hooks/useHomePageAnimations";

export default function HomePage() {
  const { heroRef, aboutRef, projectsRef, connectRef } =
    useHomePageAnimations();

  return (
    <>
      <HeroSection ref={heroRef} />
      <AboutSection ref={aboutRef} />
      <ProjectsSection ref={projectsRef} />
      <ConnectSection ref={connectRef} />
    </>
  );
}
