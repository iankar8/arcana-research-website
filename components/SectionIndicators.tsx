"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Top" },
  { id: "why-now", label: "Why Now" },
  { id: "services", label: "Services" },
  { id: "use-cases", label: "Use Cases" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
];

export default function SectionIndicators() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observers = sections.map((section, index) => {
      const element = document.getElementById(section.id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setActiveSection(index);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => {
            document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group relative flex items-center justify-end gap-3"
          aria-label={`Go to ${section.label}`}
        >
          {/* Label on hover */}
          <span className="absolute right-6 text-xs font-bold uppercase tracking-wider text-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {section.label}
          </span>
          
          {/* Dot */}
          <motion.div
            className={`rounded-full transition-all duration-300 ${
              activeSection === index 
                ? "bg-gold w-3 h-3" 
                : "bg-text-soft w-2 h-2"
            }`}
            whileHover={{ scale: 1.5 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      ))}
    </div>
  );
}
