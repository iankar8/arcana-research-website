"use client";

import SectionHeading from "./SectionHeading";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Eye } from "lucide-react";
import CountUpStat from "./CountUpStat";
import SectionNumber from "./SectionNumber";

const stats = [
  {
    from: 0,
    to: 360,
    suffix: "K",
    label: "Hours saved annually",
    context: "JPMorgan COiN platform",
    citation: "[1]",
    direction: "up",
  },
  {
    from: 0,
    to: 91,
    suffix: "%",
    label: "Of bank boards endorsed AI",
    context: "Market urgency is real",
    citation: "[2]",
    direction: "up",
  },
  {
    from: 0,
    to: 58,
    suffix: "M",
    label: "Interactions per month",
    context: "Bank of America Erica",
    citation: "[3]",
    direction: "up",
  },
  {
    from: 95,
    to: 35,
    suffix: "%",
    label: "Drop in false positives",
    context: "HSBC & JPMorgan systems",
    citation: "[4,5]",
    direction: "down",
  },
  {
    from: 1,
    to: 4,
    suffix: "x",
    label: "More fraud detected",
    context: "HSBC Dynamic Risk Assessment",
    citation: "[4]",
    direction: "up",
  },
];

export default function WhyNow() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="why-now" className="relative py-16 sm:py-24 md:py-32 lg:py-40 hairline hairline-bottom overflow-hidden">
      <SectionNumber number="01" />
      {/* Background icons */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: shouldReduceMotion ? 0.08 : 0.12 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-[15%] right-[8%] z-0 pointer-events-none"
      >
        <AlertTriangle className="w-24 h-24 lg:w-32 lg:h-32 text-gold" strokeWidth={1} />
      </motion.div>
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: shouldReduceMotion ? 0.08 : 0.12 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-[20%] left-[5%] z-0 pointer-events-none"
      >
        <Eye className="w-20 h-20 lg:w-28 lg:h-28 text-gold" strokeWidth={1} />
      </motion.div>

      <div className="section-shell space-y-20 relative z-10">
        <SectionHeading kicker="The Gap—" title="The AI gap" />

        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[68ch] text-[22px] leading-[1.65] text-text-muted font-normal"
        >
          Big banks are moving full speed ahead into AI—devoting billions of dollars and thousands of engineers. And they're already seeing results.
        </motion.p>

        <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16 sm:mt-24 md:mt-32">
          {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
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
                className="flex flex-col items-center text-center gap-6"
              >
                {/* Animated value */}
                <div className="text-[clamp(2.5rem,10vw,6rem)] font-black leading-[0.85] tracking-tight text-gold">
                  <CountUpStat
                    start={stat.from}
                    end={stat.to}
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                  className="h-1 w-16 bg-gold origin-center"
                />

                {/* Label */}
                <div className="text-sm font-bold uppercase tracking-[0.2em] text-text-strong">
                  {stat.label}
                </div>

                {/* Context */}
                <div className="text-xs leading-relaxed text-text-muted max-w-[18rem]">
                  {stat.context} <span className="text-gold/70">{stat.citation}</span>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
