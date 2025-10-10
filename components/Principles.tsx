"use client";

import SectionHeading from "./SectionHeading";
import { motion, useReducedMotion } from "framer-motion";
import { Brain, AlertTriangle } from "lucide-react";
import SectionNumber from "./SectionNumber";

const PRINCIPLES = [
  "Small & narrow scope",
  "Detail > quantity",
  "Latency is a product problem",
];

export default function Principles() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-40 hairline-bottom overflow-hidden">
      <SectionNumber number="03" />
      {/* Background icons */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: shouldReduceMotion ? 0.08 : 0.12 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-[20%] left-[8%] z-0 pointer-events-none"
      >
        <Brain className="w-28 h-28 lg:w-36 lg:h-36 text-gold" strokeWidth={1} />
      </motion.div>
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: shouldReduceMotion ? 0.08 : 0.12 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-[15%] right-[12%] z-0 pointer-events-none"
      >
        <AlertTriangle className="w-24 h-24 lg:w-32 lg:h-32 text-gold" strokeWidth={1} />
      </motion.div>

      <div className="section-shell space-y-20 relative z-10">
        <SectionHeading kicker="Principles—" title="Operating beliefs" />

        <div className="space-y-32">
          {PRINCIPLES.map((principle, index) => (
            <motion.div
              key={principle}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 50 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 25
              }}
              className="relative"
            >
              {/* Massive outline number */}
              <div 
                aria-hidden="true"
                className="absolute -left-4 lg:-left-8 top-0 text-[clamp(6rem,12vw,10rem)] font-black leading-none tracking-tighter text-transparent pointer-events-none select-none"
                style={{
                  WebkitTextStroke: '2px rgba(193, 127, 74, 0.15)'
                } as React.CSSProperties}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
              
              {/* Principle text overlays number */}
              <div className="relative z-10 pt-16 lg:pt-20 pl-4">
                <p className="text-[clamp(1.25rem,2.5vw,2rem)] font-bold leading-tight text-text-strong max-w-[20ch]">
                  {principle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
