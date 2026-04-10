"use client";

import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ProjectShowcase } from "@/components/home/ProjectShowcase";
import { Services } from "@/components/home/Services";
import { VideoMarquee } from "@/components/home/VideoMarquee";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ScrollReveal variant="fadeInUp">
        <AboutPreview />
      </ScrollReveal>
      <ScrollReveal variant="revealLeft">
        <Services />
      </ScrollReveal>
      <ScrollReveal variant="revealRight">
        <ProjectShowcase />
      </ScrollReveal>
      <ScrollReveal variant="fadeInUp">
        <VideoMarquee />
      </ScrollReveal>
      <ScrollReveal variant="scaleUp">
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal variant="fadeInUp">
        <CTA />
      </ScrollReveal>
    </main>
  );
}
