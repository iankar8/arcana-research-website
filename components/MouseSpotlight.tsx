"use client";

import { useState, useEffect } from "react";

export default function MouseSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10"
      style={{
        background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(193, 127, 74, 0.04), transparent 70%)`,
      }}
    />
  );
}
