"use client";

import SectionHeading from "./SectionHeading";
import { motion, useReducedMotion } from "framer-motion";
import { Brain, CheckCircle, Zap, ShieldCheck, ScrollText, Cpu } from "lucide-react";
import SectionNumber from "./SectionNumber";

const offerings = [
  {
    title: "For Individuals",
    description:
      "Get smarter about AI in banking. Learn how to use AI tools effectively in your daily work and stay ahead of industry developments.",
    icon: Brain,
  },
  {
    title: "For Teams",
    description:
      "Run product sprints and experimentation cycles with us. We help you quickly test AI ideas, iterate on what works, and build momentum.",
    icon: Zap,
  },
  {
    title: "For Organizations",
    description:
      "High-level AI strategy and exploration. From building your own models to AI investment decisions—we help you think through the big moves.",
    icon: CheckCircle,
  },
];

export default function Services() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
      <SectionNumber number="02" />
      {/* Background icons */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: shouldReduceMotion ? 0.08 : 0.12 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-[10%] left-[5%] z-0 pointer-events-none"
      >
        <Brain className="w-28 h-28 lg:w-36 lg:h-36 text-gold" strokeWidth={1} />
      </motion.div>
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: shouldReduceMotion ? 0.08 : 0.12 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-[50%] right-[8%] z-0 pointer-events-none"
      >
        <Zap className="w-24 h-24 lg:w-32 lg:h-32 text-gold" strokeWidth={1} fill="currentColor" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: shouldReduceMotion ? 0.08 : 0.12 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-[15%] left-[10%] z-0 pointer-events-none"
      >
        <CheckCircle className="w-20 h-20 lg:w-28 lg:h-28 text-gold" strokeWidth={1} />
      </motion.div>

      <div className="section-shell space-y-20 relative z-10">
        <SectionHeading kicker="Who We Serve—" title="Built for everyone" />

        <motion.p
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[68ch] text-xl leading-relaxed text-text-muted"
        >
          Whether you're learning individually, running experiments as a team, or making strategic decisions for your organization—we meet you where you are.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-6 md:grid-cols-3"
        >
          {offerings.map((offering) => {
            const Icon = offering.icon;
            return (
              <div
                key={offering.title}
                className="rounded-2xl border border-border-subtle/60 bg-white/70 p-6 shadow-[0_12px_35px_-25px_rgba(12,12,12,0.45)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_18px_45px_-20px_rgba(12,12,12,0.45)]"
              >
                <div className="flex items-center gap-3 text-text-strong">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15">
                    <Icon className="h-6 w-6 text-gold" strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.08em]">
                    {offering.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">
                  {offering.description}
                </p>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="/services"
            className="inline-flex items-center gap-2 text-base text-text-muted hover:text-gold transition-colors group"
          >
            <span>See detailed services</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
