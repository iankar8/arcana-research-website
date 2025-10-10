"use client";

import SectionHeading from "./SectionHeading";
import { motion, useReducedMotion } from "framer-motion";

export default function Compliance() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-40 hairline-bottom">
      <div className="section-shell space-y-16">
        <SectionHeading kicker="Compliance—" title="Authorized testing only" />

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 25
          }}
          className="border-l-4 border-gold bg-gold/5 pl-8 py-8"
        >
          <p className="text-lg leading-relaxed text-text-strong font-medium max-w-[65ch]">
            We perform authorized red-team drills only; CAPTCHA/OTP work happens strictly inside approved pentest scopes. PII minimized and logged.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
