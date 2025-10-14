"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { Mail, TrendingUp, Database, Shield } from "lucide-react";
import { track } from "@/lib/analytics";

const tiers = [
  {
    name: "Individual",
    price: "$1,000",
    period: "/month",
    annualPrice: "$10,000/year",
    savings: "Save $2,000",
    features: [
      "Monthly deep-dive analysis (10-15 pages)",
      "Quarterly executive Q&A sessions",
      "Searchable intelligence archive",
      "Proprietary research library access",
    ],
  },
  {
    name: "Team",
    price: "$1,500",
    period: "/month",
    annualPrice: "$15,000/year",
    savings: "Save $3,000",
    features: [
      "All Individual features, plus:",
      "Team license (3-5 seats)",
      "Shared intelligence archive",
      "Priority access in Q&A sessions",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$2,500",
    period: "/month",
    annualPrice: "$25,000/year",
    savings: "Save $5,000",
    features: [
      "All Team features, plus:",
      "Enterprise-wide access",
      "Quarterly custom analysis request",
      "Dedicated advisory support",
    ],
  },
];

export default function IntelligenceBriefingPage() {
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSampleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    track("briefing_sample_request", { source: "briefing_page" });
    setSubmitted(true);
    setEmail("");
  };

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
              className="space-y-8 text-center"
            >
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-tight text-text-strong">
                AI Intelligence Briefing
              </h1>
              <p className="text-xl lg:text-2xl leading-relaxed text-text-muted font-normal max-w-[600px] mx-auto">
                Strategic intelligence on AI developments in financial services. Monthly deep-dive analyses and curated insights for senior banking executives.
              </p>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="flex flex-col gap-3">
                <TrendingUp className="w-8 h-8 text-gold" strokeWidth={2} />
                <h3 className="text-base font-bold text-text-strong">Monthly Deep Dive</h3>
                <p className="text-sm text-text-muted">Vendor landscape, use cases, regulation</p>
              </div>
              <div className="flex flex-col gap-3">
                <Database className="w-8 h-8 text-gold" strokeWidth={2} />
                <h3 className="text-base font-bold text-text-strong">Proprietary Data</h3>
                <p className="text-sm text-text-muted">Coming Soon</p>
              </div>
              <div className="flex flex-col gap-3">
                <Shield className="w-8 h-8 text-gold" strokeWidth={2} />
                <h3 className="text-base font-bold text-text-strong">Vendor-Neutral</h3>
                <p className="text-sm text-text-muted">No sales agenda, just insights</p>
              </div>
            </motion.div>

            {/* Pricing */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-text-strong text-center">Pricing</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tiers.map((tier, index) => (
                  <motion.div
                    key={tier.name}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className={`rounded-2xl p-8 space-y-6 ${
                      tier.highlighted
                        ? "bg-gold/10 border-2 border-gold"
                        : "bg-white border-2 border-border-subtle"
                    }`}
                  >
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-text-strong">{tier.name}</h3>
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black text-text-strong">{tier.price}</span>
                          <span className="text-base text-text-muted">{tier.period}</span>
                        </div>
                        <div className="text-sm text-text-muted">
                          {tier.annualPrice} <span className="text-gold font-semibold">({tier.savings})</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-text-muted">
                          <div className="flex-shrink-0 w-1.5 h-1.5 bg-gold mt-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={tier.highlighted ? "primary" : "secondary"}
                      className="w-full"
                      onClick={() => {
                        track("cta_subscribe", { tier: tier.name, source: "briefing_page" });
                        window.open("https://cal.com/arcana-advisors/intro", "_blank");
                      }}
                    >
                      Subscribe
                    </Button>
                  </motion.div>
                ))}
              </div>

              <p className="text-sm text-text-muted text-center max-w-[600px] mx-auto">
                Founding member offer: First 10 subscribers receive 25% annual discount ($7,500/year for Individual tier). Contact us to secure your membership.
              </p>
            </motion.div>

            {/* Back Link */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-center"
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
        </div>
      </section>

      <Footer />
    </main>
  );
}
