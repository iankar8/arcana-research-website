"use client";

import SectionHeading from "./SectionHeading";
import { motion, useReducedMotion } from "framer-motion";

export default function Compliance() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-32 hairline-bottom">
      <div className="section-shell space-y-10">
        <SectionHeading kicker="Compliance—" title="Authorized testing only" />

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[14px] border border-[#1111111f] bg-white/60 p-8 shadow-[0_1px_3px_rgba(17,17,17,0.04)]"
        >
          <p className="text-[16px] leading-[1.7] text-text-muted">
            We perform authorized red-team drills only; CAPTCHA/OTP work happens strictly inside approved pentest scopes. PII minimized and logged.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
