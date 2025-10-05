"use client";

import SectionHeading from "./SectionHeading";
import Button from "./ui/Button";
import { track } from "@/lib/analytics";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const fields = [
  { id: "name", label: "Name", type: "text", autoComplete: "name" },
  { id: "email", label: "Work email", type: "email", autoComplete: "email" },
  { id: "company", label: "Company", type: "text", autoComplete: "organization" },
];

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
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
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <section id="contact" className="py-32">
      <div className="section-shell space-y-12">
        <SectionHeading kicker="Contact—" title="Tell us what you're building" />

        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[52ch] text-[16px] leading-[1.7] text-text-muted"
        >
          Share your stack and targets—we'll scope a 2-week proof fast.
        </motion.p>

        <motion.form
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <label htmlFor={field.id} className="text-[14px] font-medium text-text-muted uppercase tracking-[0.12em]">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  required
                  value={formData[field.id as keyof typeof formData] as string}
                  onChange={handleChange(field.id as keyof typeof formData)}
                  className="rounded-[14px] border border-[#11111122] bg-transparent px-4 py-3 text-[15px] text-[#111111] focus-visible:border-[#11111166]"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-[14px] font-medium text-text-muted uppercase tracking-[0.12em]">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange("message")}
              className="rounded-[14px] border border-[#11111122] bg-transparent px-4 py-3 text-[15px] text-[#111111] focus-visible:border-[#11111166]"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              Book intro
            </Button>
            <a
              href="mailto:hello@arcanaadvisors.com"
              className="no-underline group inline-flex items-center gap-2 text-[14px] text-text-muted hover:text-text-light"
            >
              <span>or email us</span>
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
