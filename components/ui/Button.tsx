"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", children, className = "", ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const baseStyles = "px-8 py-3 rounded-full font-medium text-[15px] leading-[22px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-light";

    const variants: Record<string, string> = {
      primary: "bg-[#111111] text-white hover:bg-[#1b1b1b]",
      secondary: "border border-[#11111126] text-[#111111d9] hover:border-[#11111166]",
    };

    const motionProps = shouldReduceMotion
      ? {}
      : {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
        };

    return (
      <motion.button
        ref={ref}
        transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
