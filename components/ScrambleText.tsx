"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "span";
}

export default function ScrambleText({ text, className = "", as = "p" }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!isInView) return;
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );
      
      iteration += 1 / 3;
      
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [text, isInView]);
  
  const Component = as;
  
  return (
    <Component ref={ref as any} className={className}>
      {displayText}
    </Component>
  );
}
