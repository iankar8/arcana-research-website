"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  kicker: string;
  title: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeading({ kicker, title, align = "left", className = "" }: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const baseMotion = shouldReduceMotion
    ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
    : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <motion.div
      {...baseMotion}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-3 ${
        align === "center" ? "text-center items-center" : align === "right" ? "text-right items-end" : "text-left"
      } ${className}`}
    >
      <span className="kicker">{kicker}</span>
      <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-light tracking-[-0.02em] text-balance">{title}</h2>
    </motion.div>
  );
}
