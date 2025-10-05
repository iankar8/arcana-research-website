"use client";

import { track } from "@/lib/analytics";
import SectionHeading from "./SectionHeading";
import { motion, useReducedMotion } from "framer-motion";

export default function Research() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="research" className="py-32 hairline-bottom">
      <div className="section-shell space-y-10">
        <SectionHeading kicker="Research—" title="Fine-tuning: parallel vs. sequential" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[52ch] text-[18px] leading-[1.6] text-text-muted"
          >
            Trade-offs in cost, stability, and drift management.
          </motion.p>

          <motion.a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              track("read_note", { source: "research" });
            }}
            className="no-underline group inline-flex items-center justify-end gap-2 self-start text-[15px] font-medium text-text-muted hover:text-text-light md:self-end"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Read note</span>
            <span
              className={`transition-transform duration-200 ${
                shouldReduceMotion ? "" : "group-hover:translate-x-1"
              }`}
            >
              {"\u2192"}
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
