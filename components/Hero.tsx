"use client";

import { track } from "@/lib/analytics";
import { motion, useReducedMotion } from "framer-motion";
import Button from "./ui/Button";

const BOOK_LINK = "https://cal.com/arcana-advisors/intro";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const baseMotion = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative flex items-center pt-48 pb-32">
      <div className="section-shell text-left">
        <motion.h1
          {...baseMotion}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance font-normal tracking-[-0.02em]">
          <span className="block">AI,</span>
          <span className="block">built for</span>
          <span className="block">regulated finance.</span>
        </motion.h1>

        <motion.p
          {...baseMotion}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-[38ch] text-[18px] leading-[1.65] text-text-muted"
        >
          Custom agents, bank-grade evals, and compliant workflows—shipped fast, governed well.
        </motion.p>

        <motion.div
          {...baseMotion}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Button
            variant="primary"
            onClick={() => {
              track("cta_book_intro", { source: "hero" });
              window.open(BOOK_LINK, "_blank", "noopener,noreferrer");
            }}
          >
            Book intro
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              track("cta_how_we_work", { source: "hero" });
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            See how we work
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
