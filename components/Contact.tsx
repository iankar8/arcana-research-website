"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import SectionHeading from "./SectionHeading";
import Button from "./ui/Button";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [comingSoonEmail, setComingSoonEmail] = useState("");
  const [comingSoonSubmitted, setComingSoonSubmitted] = useState(false);

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background icon */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: shouldReduceMotion ? 0.08 : 0.12 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-[15%] right-[10%] z-0 pointer-events-none"
      >
        <CheckCircle className="w-32 h-32 lg:w-40 lg:h-40 text-gold" strokeWidth={1} />
      </motion.div>

      <div className="section-shell space-y-16 relative z-10">
        <SectionHeading kicker="Coming Soon—" title="Intelligence Briefing & Research" />

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="border-l-4 border-gold bg-gold/5 pl-8 pr-8 py-10 space-y-6"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-text-strong">Get notified when we launch</h3>
            <p className="max-w-[64ch] text-lg leading-relaxed text-text-muted">
              We're preparing monthly intelligence briefings and proprietary research on AI transformation in banking. Be the first to know when we launch.
            </p>
          </div>

          {!comingSoonSubmitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                track("coming_soon_signup", { source: "contact" });
                setComingSoonSubmitted(true);
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-[600px]"
            >
              <input
                type="email"
                required
                value={comingSoonEmail}
                onChange={(e) => setComingSoonEmail(e.target.value)}
                placeholder="your@bank.com"
                className="flex-1 border-0 border-b-2 border-text-soft bg-transparent px-0 py-3 text-base text-text-strong transition-colors duration-200 focus:outline-none focus:border-gold placeholder:text-text-soft"
              />
              <Button type="submit" variant="primary" className="sm:w-auto">
                Notify Me
              </Button>
            </form>
          ) : (
            <div className="flex items-center gap-3 text-gold">
              <CheckCircle className="w-6 h-6" />
              <p className="text-lg font-medium">You're on the list! We'll notify you when we launch.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
