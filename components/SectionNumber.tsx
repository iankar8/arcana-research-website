"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionNumberProps {
  number: string;
}

export default function SectionNumber({ number }: SectionNumberProps) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div 
      aria-hidden="true"
      initial={shouldReduceMotion ? { opacity: 0.15 } : { opacity: 0 }}
      whileInView={{ opacity: 0.15 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="absolute -left-4 lg:-left-12 top-0 text-[clamp(8rem,15vw,12rem)] font-black leading-none tracking-tighter text-transparent pointer-events-none select-none z-0"
      style={{
        WebkitTextStroke: '2px rgba(193, 127, 74, 0.15)'
      } as React.CSSProperties}
    >
      {number}
    </motion.div>
  );
}
