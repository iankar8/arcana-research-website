"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { track } from "@/lib/analytics";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

const links = [
  { href: "/services", label: "Services" },
  { href: "/research", label: "Research" },
  { href: "/intelligence-briefing", label: "Intelligence" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={shouldReduceMotion ? undefined : { y: -20, opacity: 0 }}
      animate={shouldReduceMotion ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition ${
        isScrolled ? "backdrop-blur-sm bg-background-light/85" : "bg-transparent"
      }`}
    >
      <div className="section-shell flex items-center justify-between py-6">
        <div className="text-[18px] tracking-tight uppercase">Arcana Advisors</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-[14px] uppercase tracking-[0.12em] text-text-muted">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => track("nav_click", { target: link.href.replace("#", "") })}
              className="transition-colors hover:text-text-light"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden p-2 -mr-2 text-text-muted hover:text-text-strong transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={links}
      />

      <div className="hairline-bottom" />
    </motion.header>
  );
}
