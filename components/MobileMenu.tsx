"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { track } from "@/lib/analytics";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ href: string; label: string }>;
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-background-light z-50 shadow-2xl md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-subtle">
              <span className="text-base font-semibold uppercase tracking-tight">Menu</span>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-text-muted hover:text-text-strong transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-6 space-y-1">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    track("nav_click", { target: link.href.replace("#", ""), source: "mobile_menu" });
                    onClose();
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="block py-3 px-4 text-base text-text-strong hover:bg-gold/10 hover:text-gold rounded-lg transition-all duration-200"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border-subtle">
              <p className="text-xs text-text-muted">
                © 2025 Arcana Advisors
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
