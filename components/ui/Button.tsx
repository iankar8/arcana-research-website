"use client";

import { motion, useReducedMotion, MotionProps } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef, useState } from "react";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", children, className = "", ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const baseStyles = "px-8 py-4 rounded-full font-normal text-[16px] leading-[24px] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent relative overflow-hidden group";

    const variants: Record<string, string> = {
      primary: "bg-[#0A0A0A] text-[#FAFAF9] shadow-[0_4px_16px_rgba(10,10,10,0.12)] hover:shadow-[0_12px_32px_rgba(193,127,74,0.4)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#C17F4A] before:to-[#E8CDB5] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200",
      secondary: "border-2 border-[var(--border-gold)] text-[#0A0A0A] hover:border-[#C17F4A] hover:bg-[#F4E8DC] backdrop-blur-sm shadow-[0_2px_8px_rgba(10,10,10,0.06)] hover:shadow-[0_6px_20px_rgba(193,127,74,0.2)]",
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (shouldReduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
      setPosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    };

    const motionProps = shouldReduceMotion
      ? {}
      : {
          whileHover: { scale: 1.02, y: -2 },
          whileTap: { scale: 0.98 },
        };

    return (
      <motion.button
        ref={ref}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        animate={{
          x: isHovered ? position.x : 0,
          y: isHovered ? position.y : 0,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...motionProps}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
