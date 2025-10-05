"use client";

import SectionHeading from "./SectionHeading";
import { motion, useReducedMotion } from "framer-motion";

const PRINCIPLES = [
  "Small & narrow scope",
  "Detail > quantity",
  "Latency is a product problem",
];

export default function Principles() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-32 hairline-bottom">
      <div className="section-shell space-y-10">
        <SectionHeading kicker="Principles—" title="Operating beliefs" />

        <motion.ul
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-3 text-[18px] leading-[1.6] text-text-muted md:flex-row md:flex-wrap md:items-baseline"
        >
          {PRINCIPLES.map((principle, index) => (
            <li key={principle} className="flex items-center gap-3">
              {index > 0 && <span aria-hidden className="text-[20px] text-text-muted/70">·</span>}
              <span>{principle}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
