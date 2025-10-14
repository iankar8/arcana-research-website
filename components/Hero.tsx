"use client";

import { track } from "@/lib/analytics";
import { motion, useReducedMotion, LayoutGroup } from "framer-motion";
import Button from "./ui/Button";
import { useState, useMemo, useRef } from "react";
import NoiseTexture from "./NoiseTexture";

const BOOK_LINK = "https://cal.com/arcana-advisors/intro";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredWord, setHoveredWord] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Pre-calculate indices for performance
  const wordsWithIndices = useMemo(() => [
    { text: "AI", line: 0, globalIdx: 0 },
    { text: "powered", line: 0, globalIdx: 1 },
    { text: "banking", line: 0, globalIdx: 2 },
    { text: "is", line: 0, globalIdx: 3 },
    { text: "here.", line: 0, globalIdx: 4 },
    { text: "Is", line: 1, globalIdx: 5 },
    { text: "your", line: 1, globalIdx: 6 },
    { text: "bank", line: 1, globalIdx: 7 },
    { text: "ready?", line: 1, globalIdx: 8 }
  ], []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[85vh] md:min-h-screen flex items-center py-20 sm:py-24 md:py-32 overflow-hidden"
    >
      <NoiseTexture opacity={0.025} />

      <div className="section-shell relative z-10">
        <div className="max-w-[90rem] mx-auto space-y-16">
          {/* Massive headline - full width */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="cursor-default"
          >
            <LayoutGroup>
              <h1 className="font-black uppercase leading-[0.9] tracking-[-0.05em]">
              {[0, 1, 2].map((lineNum) => (
                <div key={lineNum} className="block">
                  {wordsWithIndices
                    .filter(w => w.line === lineNum)
                    .map((word) => (
                      <motion.span
                        key={word.globalIdx}
                        initial={shouldReduceMotion ? {} : { opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: word.globalIdx * 0.1,
                          type: "spring",
                          stiffness: 200,
                          damping: 25
                        }}
                        onHoverStart={() => setHoveredWord(word.globalIdx)}
                        onHoverEnd={() => setHoveredWord(null)}
                        className="inline-block mr-[0.25em] lg:mr-[0.3em] relative cursor-default text-[clamp(2rem,5vw,5rem)] text-text-strong"
                        style={{ willChange: hoveredWord === word.globalIdx ? 'transform' : 'auto' }}
                      >
                        {hoveredWord === word.globalIdx && (
                          <motion.span
                            layoutId={`word-highlight-${word.globalIdx}`}
                            className="absolute inset-0 -z-10 bg-gold"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                        {word.text}
                      </motion.span>
                    ))}
                </div>
              ))}
            </h1>
            </LayoutGroup>
          </motion.div>

          {/* Subheading */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="max-w-[70ch] space-y-6"
          >
            <p className="text-xl lg:text-2xl leading-relaxed text-text-muted font-normal">
              Learn, strategize, experiment, and roll out AI projects fast and compliantly. Our team helps you every step along the way: from integrating AI into your daily workflow to helping test and launch new features for your team and customers.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="pt-8"
          >
            <Button
              variant="primary"
              onClick={() => {
                track("cta_contact", { source: "hero" });
                window.location.href = "mailto:ian@iankar.com?subject=AI%20Implementation%20Inquiry&body=Hi%20Ian%2C%0A%0AI'm%20interested%20in%20discussing%20AI%20implementation%20for%20our%20organization.%0A%0AHere%20are%20some%20times%20that%20work%20for%20me%3A%0A-%20%5BYour%20available%20time%201%5D%0A-%20%5BYour%20available%20time%202%5D%0A-%20%5BYour%20available%20time%203%5D%0A%0AAlternatively%2C%20you%20can%20book%20directly%3A%20https%3A%2F%2Fcal.com%2Farcana-advisors%2Fintro%0A%0AName%3A%20%0AOrganization%3A%20%0ARole%3A%20%0A%0ABest%2C";
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
