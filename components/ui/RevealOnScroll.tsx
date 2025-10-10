"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function RevealOnScroll({ children, delay = 0, className = "" }: RevealOnScrollProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
