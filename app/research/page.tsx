"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { FileText, Github, Users } from "lucide-react";
import { track } from "@/lib/analytics";

export default function ResearchPage() {
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track("research_signup", { source: "research_page" });
    setSubmitted(true);
    setEmail("");
  };

  return (
    <main className="relative min-h-screen">
      <Header />
      
      <section className="relative min-h-[80vh] flex items-center py-32">
        <div className="section-shell">
          <div className="max-w-[800px] mx-auto space-y-16">
            {/* Headline */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[0.9] tracking-tight text-text-strong">
                Independent AI research for banking
              </h1>
              <p className="text-xl lg:text-2xl leading-relaxed text-text-muted font-normal">
                Rigorous quarterly analyses of AI adoption trends, vendor ecosystems, and validated implementation frameworks—published open source with independent peer review.
              </p>
            </motion.div>

            {/* Value Props */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="flex flex-col gap-3">
                <FileText className="w-8 h-8 text-gold" strokeWidth={2} />
                <h3 className="text-base font-bold text-text-strong">Quarterly Reports</h3>
                <p className="text-sm text-text-muted">Original research on AI in banking</p>
              </div>
              <div className="flex flex-col gap-3">
                <Github className="w-8 h-8 text-gold" strokeWidth={2} />
                <h3 className="text-base font-bold text-text-strong">Open Source</h3>
                <p className="text-sm text-text-muted">Raw data and methodology published</p>
              </div>
              <div className="flex flex-col gap-3">
                <Users className="w-8 h-8 text-gold" strokeWidth={2} />
                <h3 className="text-base font-bold text-text-strong">Peer Reviewed</h3>
                <p className="text-sm text-text-muted">Validated by industry experts</p>
              </div>
            </motion.div>

            {/* Coming Soon */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border-l-4 border-gold bg-gold/5 pl-8 pr-8 py-8 space-y-6"
            >
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-text-strong">Q1 2025: State of AI in Regional Banking</h2>
                <p className="text-base leading-relaxed text-text-muted">
                  Primary research across 200+ banking professionals examining AI adoption trajectories, implementation barriers, and capital allocation strategies. Comprehensive findings published February 2025.
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                      Get notified when published
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
                        Notify Me
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="flex items-center gap-3 text-gold">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  <p className="text-base font-medium">Confirmed. You will receive notification upon publication.</p>
                </div>
              )}
            </motion.div>

            {/* Participate - Free Membership Funnel */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="border-l-4 border-gold bg-gold/5 pl-8 pr-8 py-8 space-y-6"
            >
              <h3 className="text-2xl font-bold text-text-strong">Research panel—complimentary membership</h3>
              <p className="text-base leading-relaxed text-text-muted">
                We seek banking professionals to contribute to our ongoing research initiatives. Panel members receive complimentary access to our monthly intelligence briefing and advance access to all research publications.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-base text-text-muted">
                  <div className="flex-shrink-0 w-1.5 h-1.5 bg-gold mt-2.5" />
                  <span>Quarterly research surveys (5-10 minutes)</span>
                </li>
                <li className="flex items-start gap-3 text-base text-text-muted">
                  <div className="flex-shrink-0 w-1.5 h-1.5 bg-gold mt-2.5" />
                  <span>Optional qualitative interviews for in-depth insights</span>
                </li>
                <li className="flex items-start gap-3 text-base text-text-muted">
                  <div className="flex-shrink-0 w-1.5 h-1.5 bg-gold mt-2.5" />
                  <span>Data confidentiality maintained with optional attribution</span>
                </li>
                <li className="flex items-start gap-3 text-base text-text-muted">
                  <div className="flex-shrink-0 w-1.5 h-1.5 bg-gold mt-2.5" />
                  <span><strong className="text-gold">Complimentary Individual membership</strong> to our intelligence briefing ($10K annual value)</span>
                </li>
              </ul>
              <Button
                variant="primary"
                onClick={() => {
                  track("cta_participate_survey", { source: "research_page" });
                  window.location.href = "mailto:research@arcanaadvisors.com?subject=Join Research Panel - Free Membership";
                }}
              >
                Join Research Panel
              </Button>
            </motion.div>

            {/* Back Link */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
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
