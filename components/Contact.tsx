"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import SectionHeading from "./SectionHeading";
import Button from "./ui/Button";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const fields = [
  { id: "name", label: "Name", type: "text", autoComplete: "name" },
  { id: "email", label: "Work email", type: "email", autoComplete: "email" },
];

const roleOptions = [
  "Head of Fraud",
  "AML/BSA Officer",
  "Chief Risk Officer",
  "CTO/CIO",
  "Compliance Officer",
  "Other",
];

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    track("form_submit", { source: "contact" });
    setSubmitted(true);
    setFormData({ name: "", email: "", company: "", role: "", message: "" });
  };

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
        <SectionHeading kicker="Learn More—" title="Explore our research" />

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-text-strong">Looking to learn more about our research?</h3>
            <p className="max-w-[64ch] text-lg leading-relaxed text-text-muted">
              Subscribe to our weekly AI intelligence briefing or explore our latest banking AI research and case studies.
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              variant="primary"
              onClick={() => {
                track("cta_intelligence_briefing", { source: "contact_hero" });
                window.location.href = "/intelligence-briefing";
              }}
            >
              Intelligence Briefing
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                track("cta_research", { source: "contact_hero" });
                window.location.href = "/research";
              }}
            >
              Research
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="border-l-4 border-gold/30 pl-8 space-y-4 pt-8"
        >
          <h4 className="text-lg font-bold text-text-strong">Want to work with us?</h4>
          <p className="text-base leading-relaxed text-text-muted max-w-[60ch]">
            Reach out directly at <a href="mailto:hello@arcanaadvisors.com" className="text-gold hover:underline">hello@arcanaadvisors.com</a> or book a <a href="https://cal.com/arcana-advisors/intro" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">quick intro call</a>.
          </p>
        </motion.div>

        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[64ch] text-base leading-relaxed text-text-muted pt-12"
        >
          Or send us a message directly:
        </motion.p>

        <motion.form
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {fields.map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <label htmlFor={field.id} className="text-[16px] font-semibold text-text-muted uppercase tracking-[0.12em]">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  required
                  value={formData[field.id as keyof typeof formData] as string}
                  onChange={handleChange(field.id as keyof typeof formData)}
                  className="border-0 border-b-2 border-text-soft bg-transparent px-0 py-4 text-base text-text-strong transition-colors duration-200 focus:outline-none focus:border-gold placeholder:text-text-soft"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="text-[16px] font-semibold text-text-muted uppercase tracking-[0.12em]">
              Role
            </label>
            <select
              id="role"
              required
              value={formData.role}
              onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
              className="rounded-[14px] border-2 border-[var(--border-gold)] bg-transparent px-4 py-3 text-[16px] text-text-strong transition-all duration-300 focus:outline-none focus:border-gold focus:shadow-[0_0_0_4px_rgba(193,127,74,0.15)] focus:ring-0"
            >
              <option value="" disabled>
                Select your role
              </option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-[16px] font-semibold text-text-muted uppercase tracking-[0.12em]">
              What's your biggest pain point?
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange("message")}
              className="border-0 border-b-2 border-text-soft bg-transparent px-0 py-4 text-base text-text-strong transition-colors duration-200 focus:outline-none focus:border-gold placeholder:text-text-soft resize-none"
            />
          </div>

          <div className="flex flex-col gap-6 pt-8">
            <Button type="submit" variant="primary" className="w-full py-6 text-base font-bold uppercase tracking-wider">
              Book Threat Assessment
            </Button>
            <a
              href="mailto:hello@arcanaadvisors.com"
              className="no-underline group inline-flex items-center gap-2 text-[14px] text-text-muted hover:text-text-light"
            >
              <span>or email us directly</span>
              <span className={shouldReduceMotion ? "" : "transition-transform duration-200 group-hover:translate-x-1"}>{"\u2192"}</span>
            </a>
          </div>

          {submitted && (
            <p className="text-[14px] text-text-muted">
              Thanks—we'll get back within one business day.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
