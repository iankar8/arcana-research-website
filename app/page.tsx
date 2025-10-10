"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyNow from "@/components/WhyNow";
import Services from "@/components/Services";
import Research from "@/components/Research";
import HowWeWork from "@/components/HowWeWork";
import Contact from "@/components/Contact";
import Citations from "@/components/Citations";
import Footer from "@/components/Footer";
import SectionIndicators from "@/components/SectionIndicators";
import MouseSpotlight from "@/components/MouseSpotlight";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <MouseSpotlight />
      <SectionIndicators />
      <div className="relative z-10">
        <Header />
        <Hero />
        <WhyNow />
        <Services />
        <Research />
        <HowWeWork />
        <Contact />
        <Citations />
        <Footer />
      </div>
    </main>
  );
}
