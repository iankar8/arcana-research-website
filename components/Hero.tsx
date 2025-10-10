"use client";

import { track } from "@/lib/analytics";
import { motion, useReducedMotion, LayoutGroup, useScroll, useTransform } from "framer-motion";
import Button from "./ui/Button";
import { useState, useMemo, useRef } from "react";
import { Brain, CheckCircle, AlertTriangle, Eye, Zap } from "lucide-react";
import NoiseTexture from "./NoiseTexture";

const BOOK_LINK = "https://cal.com/arcana-advisors/intro";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredWord, setHoveredWord] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -100]);

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
      {/* Floating icons with parallax */}
      
      {/* Brain - Top Right (parallax down) */}
      <motion.div
        aria-hidden="true"
        style={{ y: y2 }}
        initial={{ opacity: 0, rotate: -15 }}
        animate={shouldReduceMotion ? { opacity: 0.15 } : { opacity: 0.2, rotate: [-15, 15, -15] }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[8%] right-[6%] md:top-[10%] md:right-[8%] lg:top-[15%] lg:right-[12%] z-0"
      >
        <Brain className="w-9 h-9 md:w-12 md:h-12 lg:w-16 lg:h-16 text-gold" strokeWidth={1.5} />
      </motion.div>

      {/* Eye - Top Left (parallax up) */}
      <motion.div
        aria-hidden="true"
        style={{ y: y1 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={shouldReduceMotion ? { opacity: 0.15 } : { opacity: 0.2, scale: [0.8, 1.1, 0.8] }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[22%] left-[4%] md:left-[5%] lg:left-[8%] z-0"
      >
        <Eye className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 text-gold" strokeWidth={1.5} />
      </motion.div>

      {/* Zap - Middle Right (parallax down, different speed) */}
      <motion.div
        aria-hidden="true"
        style={{ y: y3 }}
        initial={{ opacity: 0, y: 0 }}
        animate={shouldReduceMotion ? { opacity: 0.15 } : { opacity: 0.2 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[52%] right-[4%] md:right-[5%] lg:right-[10%] z-0"
      >
        <Zap className="w-9 h-9 md:w-11 md:h-11 lg:w-14 lg:h-14 text-gold" strokeWidth={1.5} fill="currentColor" />
      </motion.div>

      {/* AlertTriangle - Bottom Left (parallax up) */}
      <motion.div
        aria-hidden="true"
        style={{ y: y1 }}
        initial={{ opacity: 0, rotate: 0 }}
        animate={shouldReduceMotion ? { opacity: 0.15 } : { opacity: 0.2, rotate: [0, 10, -10, 0] }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[18%] left-[6%] md:left-[8%] lg:left-[12%] z-0"
      >
        <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gold" strokeWidth={1.5} />
      </motion.div>

      {/* CheckCircle - Bottom Right (parallax down) */}
      <motion.div
        aria-hidden="true"
        style={{ y: y2 }}
        initial={{ opacity: 0, rotate: 0 }}
        animate={shouldReduceMotion ? { opacity: 0.15 } : { opacity: 0.2, rotate: 360 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[32%] right-[12%] md:right-[15%] lg:right-[20%] z-0"
      >
        <CheckCircle className="w-7 h-7 md:w-9 md:h-9 lg:w-11 lg:h-11 text-gold" strokeWidth={1.5} />
      </motion.div>

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
              Research-backed AI implementation for banks. We stay on top of everything, test fast, and iterate faster than anyone else—so you deploy in weeks, not years.
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
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
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
