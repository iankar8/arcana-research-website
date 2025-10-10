"use client";

import { track } from "@/lib/analytics";
import SectionHeading from "./SectionHeading";
import Button from "./ui/Button";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, Zap } from "lucide-react";

const sectors = [
  "Fraud Detection",
  "AML Monitoring",
  "KYC & Onboarding",
  "Third Party Risk",
  "Customer Support",
  "Credit Underwriting",
];

const BOOK_LINK = "https://cal.com/arcana-advisors/intro";

export default function UseCasesSimple() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="use-cases" className="relative py-40 hairline hairline-bottom overflow-hidden">
      {/* Background icons */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: shouldReduceMotion ? 0.08 : 0.12 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-[20%] right-[10%] z-0 pointer-events-none"
      >
        <Eye className="w-28 h-28 lg:w-36 lg:h-36 text-gold" strokeWidth={1} />
      </motion.div>
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: shouldReduceMotion ? 0.08 : 0.12 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-[25%] left-[8%] z-0 pointer-events-none"
      >
        <Zap className="w-24 h-24 lg:w-32 lg:h-32 text-gold" strokeWidth={1} fill="currentColor" />
      </motion.div>

      <div className="section-shell space-y-20 relative z-10">
        <SectionHeading
          kicker="Where We Work—"
          title="AI for every critical function"
        />

        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[68ch] text-[20px] leading-[1.7] text-text-muted font-normal"
        >
          We deploy production AI across fraud, compliance, and risk—wherever false positives 
          cost you money and regulators demand explainability.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                }}
                className="relative group cursor-default"
              >
                <span className="text-[clamp(1rem,2.5vw,1.75rem)] font-black uppercase tracking-tight text-text-strong break-words">
                  {sector}
                </span>
                {/* Animated gold underline on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gold-dark origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-5 pt-6"
        >
          <Button
            variant="primary"
            onClick={() => {
              track("cta_book_call", { source: "use_cases" });
              window.open(BOOK_LINK, "_blank", "noopener,noreferrer");
            }}
          >
            Book a call
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              track("cta_view_by_sector", { source: "use_cases" });
              document.getElementById("research")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            View by sector
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
