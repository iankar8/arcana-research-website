"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Research from "@/components/Research";
import Principles from "@/components/Principles";
import Compliance from "@/components/Compliance";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="relative z-10">
        <Header />
        <Hero />
        <Services />
        <Research />
        <Principles />
        <Compliance />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
