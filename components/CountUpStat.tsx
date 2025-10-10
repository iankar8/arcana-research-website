"use client";

import { useState, useEffect } from "react";

interface CountUpStatProps {
  start?: number;
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export default function CountUpStat({
  start = 0,
  end,
  duration = 1500,
  prefix = "",
  suffix = "",
  decimals = 0
}: CountUpStatProps) {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let current = start;
          const difference = end - start;
          const increment = difference / (duration / 16);
          
          const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Number(current.toFixed(decimals)));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`stat-${end}-${prefix}${suffix}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [end, hasAnimated, duration, prefix, suffix, decimals]);

  return (
    <span id={`stat-${end}-${prefix}${suffix}`}>
      {prefix}{count}{suffix}
    </span>
  );
}
