"use client";

import { track } from "@/lib/analytics";
import SectionHeading from "./SectionHeading";
import Button from "./ui/Button";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { AlertTriangle, Eye, UserCheck, CheckCircle, Building2, MessageSquare, Zap } from "lucide-react";

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
    id: "third-party-risk",
    title: "Third Party Fintech Risk",
    icon: Building2,
    problem: "You rely on 20+ fintech vendors (payment processors, lending platforms, data providers). Each one is a regulatory liability. Manual vendor reviews happen once per year—risk changes daily.",
    whatAiDoes: [
      "Monitors vendor security posture, compliance status, and financial health 24/7",
      "Flags regulatory changes affecting your vendors before examiners do",
      "Tracks data flow and API access across your fintech stack",
      "Alerts on breach notifications, enforcement actions, and adverse media",
    ],
    businessImpact: [
      "Continuous vendor monitoring vs annual audits",
      "Catch third-party risks before they cascade to you",
      "Reduce vendor onboarding from 90 days to 2 weeks",
    ],
    proofPoint: "Automated monitoring of 47 fintech vendors. Caught 3 material compliance issues before examiners flagged them. Reduced TPRM overhead by 60%.",
  },
  {
    id: "customer-comms",
    title: "Customer Communications",
    icon: Zap,
    problem: "Your customer communications team handles 10,000+ routine inquiries per month. Wait times are climbing. Agents waste time on \"what's my balance\" while complex cases queue up.",
    whatAiDoes: [
      "Handles tier-1 queries (balances, transaction history, password resets)",
      "Escalates intelligently when it detects confusion or fraud concerns",
      "Operates 24/7 in multiple languages",
      "Logs every interaction for quality assurance",
    ],
    businessImpact: [
      "Deflect 40-60% of tier-1 calls",
      "Reduce average handle time by 3-5 minutes",
      "Improve CSAT scores (customers prefer instant answers)",
      "Reallocate agents to revenue-generating activities",
    ],
    proofPoint: "Instant answers at 2am. No hold music. Seamless handoff to humans when needed. Better than your current IVR.",
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

export default function Research() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    track("sector_tab_click", { sector: useCases[index].title });
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" && index < useCases.length - 1) {
      setActiveTab(index + 1);
    } else if (e.key === "ArrowLeft" && index > 0) {
      setActiveTab(index - 1);
    }
  };

  const activeCase = useCases[activeTab];
  const Icon = activeCase.icon;

  return (
    <section id="research" className="py-16 sm:py-24 md:py-32 lg:py-40 hairline-bottom">
      <div className="section-shell space-y-16">
        <SectionHeading
          kicker="Use Cases—"
          title="AI impact by function"
        />

        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[68ch] text-xl leading-relaxed text-text-muted"
        >
          Banking teams ask us to explore what AI can actually do across fraud detection, AML monitoring, KYC, compliance, and credit underwriting. We stay on top of the latest approaches, test them safely, and share what proves out.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {useCases.slice(0, 5).map((useCase) => {
            const Icon = useCase.icon;
            return (
              <div key={useCase.id} className="flex flex-col items-center gap-3 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10">
                  <Icon className="w-8 h-8 text-gold" strokeWidth={2} />
                </div>
                <h3 className="text-sm font-bold text-text-strong">
                  {useCase.title}
                </h3>
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
            href="/use-cases"
            className="inline-flex items-center gap-2 text-base text-text-muted hover:text-gold transition-colors group"
          >
            <span>Explore all use cases</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
