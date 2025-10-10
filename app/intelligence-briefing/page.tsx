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
      "Weekly AI intelligence brief (2-3 pages)",
      "Monthly deep dive report (10-15 pages)",
      "Quarterly live Q&A session",
      "Searchable archive of all past issues",
    ],
  },
  {
    name: "Team",
    price: "$1,500",
    period: "/month",
    annualPrice: "$15,000/year",
    savings: "Save $3,000",
    features: [
      "Everything in Individual, plus:",
      "Team license (3-5 people)",
      "Shared archive access",
      "Priority questions in Q&A",
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
      "Everything in Team, plus:",
      "Unlimited team access",
      "Custom analysis requests (1 per quarter)",
      "Dedicated advisor access",
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
                Stay informed on AI developments without drowning in noise. Weekly briefs + monthly deep dives for banking executives.
              </p>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <div className="flex flex-col gap-3">
                <Mail className="w-8 h-8 text-gold" strokeWidth={2} />
                <h3 className="text-base font-bold text-text-strong">Weekly Brief</h3>
                <p className="text-sm text-text-muted">Top AI + banking stories every Monday</p>
              </div>
              <div className="flex flex-col gap-3">
                <TrendingUp className="w-8 h-8 text-gold" strokeWidth={2} />
                <h3 className="text-base font-bold text-text-strong">Monthly Deep Dive</h3>
                <p className="text-sm text-text-muted">Vendor landscape, use cases, regulation</p>
              </div>
              <div className="flex flex-col gap-3">
                <Database className="w-8 h-8 text-gold" strokeWidth={2} />
                <h3 className="text-base font-bold text-text-strong">Proprietary Data</h3>
                <p className="text-sm text-text-muted">Track 200+ AI vendors and implementations</p>
              </div>
              <div className="flex flex-col gap-3">
                <Shield className="w-8 h-8 text-gold" strokeWidth={2} />
                <h3 className="text-base font-bold text-text-strong">Vendor-Neutral</h3>
                <p className="text-sm text-text-muted">No sales agenda, just insights</p>
              </div>
            </motion.div>

            {/* Sample Issue */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border-l-4 border-gold bg-gold/5 pl-8 pr-8 py-8 space-y-6"
            >
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-text-strong">See a sample issue</h2>
                <p className="text-base leading-relaxed text-text-muted">
                  Get a free sample of our weekly brief to see if it's right for you.
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSampleRequest} className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                      Email address
                    </label>
                    <div className="flex gap-3">
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="flex-1 border-0 border-b-2 border-text-soft bg-transparent px-0 py-3 text-base text-text-strong transition-colors duration-200 focus:outline-none focus:border-gold placeholder:text-text-soft"
                      />
                      <Button type="submit" variant="primary">
                        Send Sample
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="flex items-center gap-3 text-gold">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  <p className="text-base font-medium">Check your inbox—sample issue sent!</p>
                </div>
              )}
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
                Founding member discount: First 10 subscribers get 25% off ($7,500/year for Individual tier). Email us to claim.
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
