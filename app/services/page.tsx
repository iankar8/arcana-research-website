"use client";

import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { User, Users, Building2, Target } from "lucide-react";
import { track } from "@/lib/analytics";

const BOOK_LINK = "https://cal.com/arcana-advisors/intro";

const engagementLevels = [
  {
    icon: User,
    title: "For Individuals",
    description:
      "Develop strategic fluency in AI-enabled banking. Access proprietary research, regulatory intelligence, and best-practice frameworks to navigate the evolving landscape and drive informed decision-making.",
    details: [
      "Weekly intelligence briefs tailored to banking",
      "Access to our research library and case studies",
      "Monthly deep dives on vendors and implementations",
      "Join our research panel and influence our work",
    ],
  },
  {
    icon: Users,
    title: "For Teams",
    description:
      "Accelerate innovation velocity through structured experimentation frameworks. We enable rapid-cycle validation of AI use cases, facilitating iterative refinement and organizational learning without protracted analysis cycles.",
    details: [
      "Everything in Individual, plus team access",
      "Guided experimentation frameworks",
      "Vendor evaluation and due diligence",
      "Quarterly strategy sessions",
    ],
  },
  {
    icon: Building2,
    title: "For Organizations",
    description:
      "Architect enterprise-scale AI transformation initiatives. From proprietary model development to strategic investment decisions—we design comprehensive programs that deliver sustainable competitive advantage and measurable business impact.",
    details: [
      "Everything in Team, plus org-wide access",
      "Custom analysis and strategic planning",
      "Executive briefings and board presentations",
      "Dedicated advisor and priority support",
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
                How we engage with you
              </h1>
              <p className="text-xl lg:text-2xl leading-relaxed text-text-muted font-normal">
                Tailored engagement models designed to match your organizational maturity—from individual capability building to enterprise-wide transformation.
              </p>
            </motion.div>

            {/* Why We're Doing This */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-l-4 border-gold bg-gold/5 pl-8 pr-8 py-8 space-y-4"
            >
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-gold" strokeWidth={2} />
                <h2 className="text-2xl font-bold text-text-strong">Why this matters now</h2>
              </div>
              <p className="text-lg leading-relaxed text-text-muted">
                AI has emerged as a strategic imperative in banking. However, our research reveals a significant implementation gap—organizations struggle to translate AI potential into measurable business value. The landscape remains largely unexplored beyond reactive deployments.
              </p>
              <p className="text-lg leading-relaxed text-text-muted">
                While most institutions adopt defensive postures—responding to regulatory pressures, competitive threats, and vendor offerings—significant value creation opportunities remain untapped. We enable organizations to shift from reactive compliance to proactive value capture through strategic AI initiatives that drive competitive differentiation and operational excellence.
              </p>
            </motion.div>

            {/* Engagement Levels */}
            <div className="space-y-16">
              {engagementLevels.map((level, index) => {
                const Icon = level.icon;
                return (
                  <motion.div
                    key={level.title}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                    className="border-l-4 border-gold bg-gold/5 pl-8 pr-8 py-8 space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gold/20">
                        <Icon className="w-6 h-6 text-gold" strokeWidth={2} />
                      </div>
                      <h3 className="text-2xl font-bold text-text-strong">{level.title}</h3>
                    </div>

                    <p className="text-lg leading-relaxed text-text-muted">
                      {level.description}
                    </p>

                    <ul className="space-y-3">
                      {level.details.map((detail) => (
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
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-col items-center gap-6 pt-8"
            >
              <Button
                variant="primary"
                onClick={() => {
                  track("cta_book_intro", { source: "services_page" });
                  window.open(BOOK_LINK, "_blank", "noopener,noreferrer");
                }}
              >
                Book Intro Call
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
