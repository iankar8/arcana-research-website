"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.footer
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="hairline py-12"
    >
      <div className="section-shell text-[14px] text-text-muted">
        © 2025 Arcana Advisors — Production AI for regulated finance. Authorized testing only; PII minimized and logged.
      </div>
    </motion.footer>
  );
}
