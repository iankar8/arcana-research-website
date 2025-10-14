"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyNow from "@/components/WhyNow";
import Research from "@/components/Research";
import HowWeWork from "@/components/HowWeWork";
import Contact from "@/components/Contact";
import Citations from "@/components/Citations";
import Footer from "@/components/Footer";
import SectionIndicators from "@/components/SectionIndicators";
import MouseSpotlight from "@/components/MouseSpotlight";
import ASCIIBackground from "@/components/ASCIIBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ASCIIBackground variant="waves" opacity={0.5} speed={0.7} />
      <MouseSpotlight />
      <SectionIndicators />
      <div className="relative z-10">
        <Header />
        <Hero />
        <WhyNow />
        <Research />
        <HowWeWork />
        <Contact />
        <Citations />
        <Footer />
      </div>
    </main>
  );
}
