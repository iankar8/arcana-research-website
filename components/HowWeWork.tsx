"use client";

import SectionHeading from "./SectionHeading";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, FileCheck, Code, Users } from "lucide-react";
import SectionNumber from "./SectionNumber";

const principles = [
  {
    icon: CheckCircle,
    title: "Easy to work with",
    description: "We navigate your security processes and compliance requirements—you focus on the work",
  },
  {
    icon: FileCheck,
    title: "Clear deliverables",
    description: "Every engagement has defined outputs and end dates—no endless consulting",
  },
  {
    icon: Code,
    title: "Hands-on, not hands-off",
    description: "We work alongside your team, not just send reports from a distance",
  },
  {
    icon: Users,
    title: "Fixed timelines",
    description: "Sprints measured in weeks, not years—nothing drags on",
  },
];

export default function HowWeWork() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-16 sm:py-24 md:py-32 lg:py-40 hairline-bottom overflow-hidden">
      <SectionNumber number="03" />

      <div className="section-shell space-y-20 relative z-10">
        <SectionHeading kicker="How We Work—" title="Built to move fast" />

        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[68ch] text-lg leading-relaxed text-text-muted"
        >
          Banks have tight security processes and procurement requirements. We make it easy to work within those constraints while still moving quickly.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={principle.title}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 25
                }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10">
                  <Icon className="w-6 h-6 text-gold" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-text-strong">
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {principle.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
