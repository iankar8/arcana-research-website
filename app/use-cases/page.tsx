"use client";

import { track } from "@/lib/analytics";
import Button from "@/components/ui/Button";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { AlertTriangle, Eye, UserCheck, CheckCircle, Building2, MessageSquare, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BOOK_LINK = "https://cal.com/arcana-advisors/intro";

const useCases = [
  {
    id: "fraud-detection",
    title: "Fraud Detection",
    icon: AlertTriangle,
    problem: "Your team manually reviews 40,000+ alerts per month. 95%+ are false positives. Real fraud hides in the noise while analysts burn out.",
    whatAiDoes: [
      "Cuts false positives 20-90% by learning patterns your rules miss (verified at JPMorgan, HSBC, DBS)",
      "Works 24/7 flagging anomalies the second they appear",
      "Explains every decision with audit-ready reasoning",
      "Learns from your analysts without replacing them",
    ],
    businessImpact: [
      "Reduce cost-per-alert from $57 to $4-8",
      "Free up 8-12 analyst FTEs for complex cases",
      "Catch fraud your current system misses",
      "Deploy in 6-8 weeks, not 2 years",
    ],
    proofPoint: "HSBC: 60% false positive reduction, 2-4x more crime detected. DBS: 90% reduction in false positives, 75% faster investigations.",
  },
  {
    id: "aml-monitoring",
    title: "AML Monitoring",
    icon: Eye,
    problem: "Your rule-based system flags outdated patterns. Sophisticated money laundering schemes slip through. Your SAR backlog grows every quarter.",
    whatAiDoes: [
      "Spots novel patterns your static rules never programmed for",
      "Prioritizes SARs by actual risk, not just rule triggers",
      "Maintains complete audit trails for every escalation",
      "Adapts to new schemes without waiting for quarterly rule updates",
    ],
    businessImpact: [
      "Reduce SAR investigation time by 75% (verified at DBS Bank)",
      "Catch layering and structuring patterns earlier",
      "Cut your alert queue by half",
      "Stay ahead of typology updates",
    ],
    proofPoint: "What regulators want to see: Documented model validation, explainable risk scores, and proof you're catching what your old system missed.",
  },
  {
    id: "kyc-onboarding",
    title: "KYC & Onboarding",
    icon: UserCheck,
    problem: "Customer onboarding takes 5-14 days. Manual document review creates bottlenecks. Good customers abandon, fraudsters get creative with fake docs.",
    whatAiDoes: [
      "Extracts and validates ID documents in seconds",
      "Cross-checks 40+ data sources automatically",
      "Flags inconsistencies humans miss in fatigue",
      "Escalates edge cases with full context for reviewers",
    ],
    businessImpact: [
      "Cut onboarding time from days to hours",
      "Reduce abandonment by 30-45%",
      "Catch synthetic identity fraud earlier",
      "Scale without adding headcount",
    ],
    proofPoint: "87% of KYC checks fully automated. 4.2 hour avg onboarding (down from 6 days). 99.3% accuracy on document validation.",
  },
  {
    id: "compliance-monitoring",
    title: "Compliance Monitoring",
    icon: CheckCircle,
    problem: "You monitor millions of customer interactions (chat, email, calls) for compliance violations. Sampling misses risks. Full review is impossible.",
    whatAiDoes: [
      "Scans 100% of interactions, not just samples",
      "Flags policy violations in real-time (market abuse, suitability, licensing)",
      "Catches subtle patterns like aggressive sales tactics or misrepresentation",
      "Creates audit logs with full conversation context",
    ],
    businessImpact: [
      "Monitor every interaction without hiring 50 analysts",
      "Catch issues before they become FINRA violations",
      "Reduce regulatory fines and consent orders",
      "Prove supervisory oversight in exams",
    ],
    proofPoint: "Real-time alerts, full transcripts, clear violation categories, and documentation that survives audit scrutiny.",
  },
  {
    id: "credit-underwriting",
    title: "Credit Underwriting",
    icon: Building2,
    problem: "Manual underwriting bottlenecks your loan pipeline. Thin-file applicants get auto-declined. You're leaving good business on the table while competitors move faster.",
    whatAiDoes: [
      "Assesses alternative data (cash flow, payments, employment) beyond FICO",
      "Flags risk patterns in bank statements and income docs",
      "Provides explainable scores that satisfy fair lending requirements",
      "Processes applications 10x faster than manual review",
    ],
    businessImpact: [
      "Approve more thin-file customers (10-20% lift in approvals)",
      "Reduce time-to-decision from days to minutes",
      "Maintain or improve default rates",
      "Meet ECOA explainability requirements",
    ],
    proofPoint: "Built-in adverse action notices, disparate impact testing, and model governance documentation.",
  },
];

export default function UseCasesPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    track("use_case_click", { useCase: useCases[index].title });
  };

  const activeCase = useCases[activeTab];
  const Icon = activeCase.icon;

  return (
    <main className="relative min-h-screen">
      <Header />
      
      <section className="py-32">
        <div className="section-shell space-y-16">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-tight text-text-strong">
              AI Impact by Function
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed text-text-muted font-normal max-w-[70ch]">
              See how we've implemented AI across fraud, AML, underwriting, and compliance.
            </p>
          </motion.div>

          {/* Horizontal Scroll Use Cases */}
          <div className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing -mx-6 px-6">
            <div className="flex gap-6 pb-8">
              {useCases.map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <motion.div
                    key={useCase.id}
                    className={`flex-shrink-0 w-[400px] lg:w-[480px] rounded-2xl p-8 space-y-6 transition-all duration-300 ${
                      activeTab === index
                        ? "bg-gold/10 border-2 border-gold"
                        : "bg-white border-2 border-border-subtle hover:border-gold/50"
                    }`}
                    whileHover={{ scale: 1.02, y: -8 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleTabChange(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleTabChange(index);
                      }
                    }}
                  >
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10">
                      <Icon className="w-8 h-8 text-gold-dark" strokeWidth={2} />
                    </div>

                    <h3 className="text-2xl font-black uppercase text-text-strong">
                      {useCase.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-text-muted line-clamp-3">
                      {useCase.problem}
                    </p>

                    <div className="text-xs uppercase tracking-wider font-bold text-gold">
                      {activeTab === index ? "Selected" : "Click to view"}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="tabpanel"
            className="space-y-12 min-h-[600px]"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10">
              <Icon className="w-8 h-8 text-gold-dark" strokeWidth={2} />
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-text-soft">
                The Problem
              </h3>
              <p className="text-xl leading-relaxed text-text-strong max-w-[65ch] font-normal">
                {activeCase.problem}
              </p>
            </div>

            <div className="space-y-5">
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-text-soft">
                What AI Does
              </h3>
              <ul className="space-y-3">
                {activeCase.whatAiDoes.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 text-sm leading-relaxed text-text-muted">
                    <span className="flex-shrink-0 w-2 h-2 bg-gold mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-text-soft">
                Business Impact
              </h3>
              <ul className="space-y-3">
                {activeCase.businessImpact.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 text-sm leading-relaxed text-text-muted font-medium">
                    <span className="flex-shrink-0 w-2 h-2 bg-gold mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-l-4 border-gold bg-gold/5 pl-6 pr-6 py-6">
              <p className="text-base leading-relaxed text-text-strong font-medium">
                {activeCase.proofPoint}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="primary"
                onClick={() => {
                  track("cta_book_call", { source: "use_cases", useCase: activeCase.title });
                  window.open(BOOK_LINK, "_blank", "noopener,noreferrer");
                }}
              >
                Discuss this use case
              </Button>
            </div>
          </motion.div>

          {/* Back Link */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center pt-8"
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-gold transition-colors"
            >
              <span>←</span>
              <span>Back to home</span>
            </a>
          </motion.div>
        </div>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>

      <Footer />
    </main>
  );
}
