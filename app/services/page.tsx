"use client";

import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { Shield, Code, FileCheck } from "lucide-react";
import { track } from "@/lib/analytics";

const BOOK_LINK = "https://cal.com/arcana-advisors/intro";

const services = [
  {
    icon: Shield,
    title: "For Risk & Fraud Teams",
    description:
      "AI systems that cut false positives 20-90% (verified at JPMorgan, HSBC, DBS) while catching more fraud. Audit-ready from day one.",
    details: [
      "Save 360K+ hours annually like JPMorgan COiN",
      "Reduce false positives by 60-90% like HSBC & DBS",
      "Free up 8-12 analyst FTEs for complex cases",
      "Explainable decisions with full audit trails",
    ],
  },
  {
    icon: FileCheck,
    title: "For Compliance & Legal",
    description:
      "Model risk documentation, explainable decisions, and regulatory compliance built into every deployment.",
    details: [
      "SR 11-7 compliant model risk documentation",
      "Complete audit trails for every AI decision",
      "Regulatory-ready explainability",
      "Continuous validation in production",
    ],
  },
  {
    icon: Code,
    title: "For Technology Teams",
    description:
      "Integrates with your existing stack. No rip-and-replace. We work with your codebase and processes.",
    details: [
      "Works with your existing tech stack",
      "API-first integration approach",
      "Your data stays in your environment",
      "Defined scope and timeline from day one",
    ],
  },
];

export default function ServicesPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="relative min-h-screen">
      <Header />
      
      <section className="relative py-32">
        <div className="section-shell">
          <div className="max-w-[900px] mx-auto space-y-20">
            {/* Headline */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-tight text-text-strong">
                Built for your entire team
              </h1>
              <p className="text-xl lg:text-2xl leading-relaxed text-text-muted font-normal">
                AI implementation that speaks to every stakeholder in the buying process.
              </p>
            </motion.div>

            {/* Services */}
            <div className="space-y-16">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="border-l-4 border-gold bg-gold/5 pl-8 pr-8 py-8 space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gold/20">
                        <Icon className="w-6 h-6 text-gold" strokeWidth={2} />
                      </div>
                      <h2 className="text-2xl font-bold text-text-strong">{service.title}</h2>
                    </div>

                    <p className="text-lg leading-relaxed text-text-muted">
                      {service.description}
                    </p>

                    <ul className="space-y-3">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3 text-base text-text-muted">
                          <div className="flex-shrink-0 w-1.5 h-1.5 bg-gold mt-2.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col items-center gap-6 pt-8"
            >
              <Button
                variant="primary"
                onClick={() => {
                  track("cta_book_assessment", { source: "services_page" });
                  window.open(BOOK_LINK, "_blank", "noopener,noreferrer");
                }}
              >
                Book Assessment
              </Button>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-gold transition-colors"
              >
                <span>←</span>
                <span>Back to home</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
