"use client";

import SectionHeading from "./SectionHeading";
import { motion, useReducedMotion } from "framer-motion";

const services = [
  {
    title: "Agents for Customer Insight",
    description:
      "One task per agent. Detailed prompts, tool access, recovery paths. Narrow scope, explicit guardrails, evals from day one.",
  },
  {
    title: "Evals that Matter",
    description:
      "Bank-specific harnesses (KYC parsing, fraud alerts, chat compliance) measuring accuracy, cost, and latency.",
  },
  {
    title: "Monitoring & Controls",
    description:
      "On-demand dashboards, incident playbooks, and audit logs aligned to model-risk expectations.",
  },
];

export default function Services() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="py-32 hairline hairline-bottom">
      <div className="section-shell space-y-16">
        <SectionHeading kicker="Services—" title="What we do" />

        <motion.dl
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : index * 0.08 }}
              className="space-y-3"
            >
              <dt className="text-[18px] tracking-[-0.015em]">{service.title}</dt>
              <dd className="max-w-[62ch] text-[16px] leading-[1.7] text-text-muted">
                {service.description}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
