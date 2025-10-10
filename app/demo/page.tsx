"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { Eye, Brain, Zap, AlertTriangle, CheckCircle } from "lucide-react";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "marquee", label: "Marquee" },
  { id: "numbers", label: "Numbers" },
  { id: "offset", label: "Offset" },
  { id: "tracking", label: "Tracking" },
  { id: "noise", label: "Noise" },
  { id: "reveal", label: "Text Reveal" },
];

export default function Demo() {
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Cursor tracking
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  // Parallax scroll
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 100]);

  return (
    <div className="relative min-h-screen bg-[#FAFAF9] overflow-hidden">
      {/* Custom cursor with magnetic effect */}
      <motion.div
        className="fixed w-6 h-6 bg-gold rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: -12,
          y: -12,
        }}
      />

      {/* Mouse spotlight gradient */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(193, 127, 74, 0.05), transparent 80%)`,
        }}
      />

      {/* Sticky section indicators - RIGHT SIDE */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => {
              document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative flex items-center gap-3"
          >
            {/* Dot */}
            <motion.div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === index ? "bg-gold w-3 h-3" : "bg-text-soft"
              }`}
              whileHover={{ scale: 1.5 }}
            />
            {/* Label on hover */}
            <span className="absolute right-6 text-xs font-semibold uppercase tracking-wider text-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {section.label}
            </span>
          </button>
        ))}
      </div>

      {/* Hero Section with Parallax */}
      <section id="hero" className="relative min-h-screen flex items-center py-32">
        {/* Background shapes with parallax */}
        <motion.div
          style={{ y: y2 }}
          className="absolute top-[20%] right-[10%] opacity-10"
        >
          <Brain className="w-32 h-32 text-gold" strokeWidth={1} />
        </motion.div>
        
        <motion.div
          style={{ y: y1 }}
          className="absolute bottom-[20%] left-[10%] opacity-10"
        >
          <Zap className="w-28 h-28 text-gold" strokeWidth={1} fill="currentColor" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-8 w-full">
          {/* Interactive headline with hover scale */}
          <motion.h1
            className="text-[clamp(3rem,10vw,10rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            INTERACTIVE
            <br />
            DEMO SITE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-lg text-text-muted max-w-[60ch]"
          >
            Hover over elements to see magnetic effects. Notice the custom cursor and spotlight.
          </motion.p>

          {/* Magnetic buttons */}
          <div className="flex gap-4 mt-12">
            <MagneticButton>Magnetic Button 1</MagneticButton>
            <MagneticButton secondary>Magnetic Button 2</MagneticButton>
          </div>
        </div>
      </section>

      {/* Feature 4: Marquee Scrolling Text */}
      <section id="marquee" className="relative py-20 bg-gold/5 overflow-hidden">
        <MarqueeText />
      </section>

      {/* Feature 9: Staggered Section Numbers */}
      <section id="numbers" className="relative py-40 bg-white overflow-hidden">
        <SectionWithNumber number="01" title="MASSIVE SECTION NUMBERS">
          <p className="text-lg text-text-muted max-w-[60ch] mt-8">
            Huge outline numbers create visual anchors. Notice how the number sits behind the content with low opacity.
          </p>
        </SectionWithNumber>
      </section>

      {/* Feature 6: Offset Section Alternation */}
      <section id="offset" className="relative py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-black mb-12">ALTERNATING OFFSETS</h2>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 space-y-20">
          <motion.div className="bg-white p-12 rounded-2xl" initial={{ x: 0 }} whileInView={{ x: 0 }}>
            <h3 className="text-2xl font-bold">Section Flush Left</h3>
            <p className="text-text-muted mt-4">This section is aligned normally.</p>
          </motion.div>
          
          <motion.div className="bg-white p-12 rounded-2xl ml-[10%]" initial={{ x: 0 }} whileInView={{ x: 0 }}>
            <h3 className="text-2xl font-bold">Section Offset 10% Right</h3>
            <p className="text-text-muted mt-4">This section is pushed right by 10%.</p>
          </motion.div>
          
          <motion.div className="bg-white p-12 rounded-2xl" initial={{ x: 0 }} whileInView={{ x: 0 }}>
            <h3 className="text-2xl font-bold">Section Flush Left Again</h3>
            <p className="text-text-muted mt-4">Back to normal alignment.</p>
          </motion.div>
        </div>
      </section>

      {/* Feature 7: Tighter Letter Spacing */}
      <section id="tracking" className="relative py-40 bg-white">
        <div className="max-w-7xl mx-auto px-8 space-y-12">
          <div>
            <p className="text-xs uppercase tracking-wider text-text-soft mb-4">Normal Tracking</p>
            <h2 className="text-6xl font-black tracking-tight">STANDARD TEXT</h2>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-text-soft mb-4">Aggressive Tracking</p>
            <h2 className="text-6xl font-black tracking-[-0.05em]">COMPRESSED TEXT</h2>
          </div>
        </div>
      </section>

      {/* Feature 8: Noise Texture */}
      <section id="noise" className="relative py-40 bg-black text-white overflow-hidden">
        <NoiseTexture />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <h2 className="text-5xl font-black mb-8">NOISE TEXTURE OVERLAY</h2>
          <p className="text-lg text-white/70 max-w-[60ch]">
            Subtle grain adds tactile premium feel. Notice the film-like texture over this section.
          </p>
        </div>
      </section>

      {/* Feature 10: Text Reveal Animation */}
      <section id="reveal" className="relative py-40 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-black mb-12">TEXT REVEAL ON SCROLL</h2>
          <ScrambleText text="Watch this text snap into place as you scroll" />
        </div>
      </section>

      {/* Horizontal Scroll Section */}
      <section id="services" className="relative py-40">
        <div className="max-w-7xl mx-auto px-8 mb-12">
          <h2 className="text-5xl font-black">DRAG TO SCROLL</h2>
        </div>
        
        <HorizontalScroll />
      </section>

      {/* Contact with Hover Effects */}
      <section id="contact" className="relative py-40 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            className="text-5xl font-black mb-12 cursor-pointer"
            whileHover={{ scale: 1.02, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            INTERACTIVE HEADLINE
          </motion.h2>
          
          <p className="text-lg text-text-muted max-w-[60ch]">
            Notice how headlines scale on hover. Buttons have magnetic effects. The cursor has a custom design.
          </p>
        </div>
      </section>
    </div>
  );
}

// Magnetic Button Component
function MagneticButton({ children, secondary = false }: { children: React.ReactNode; secondary?: boolean }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPosition({ x, y });
  };

  return (
    <motion.button
      className={`px-8 py-4 rounded-full font-semibold relative ${
        secondary
          ? "border-2 border-gold text-text-strong"
          : "bg-text-strong text-white"
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }}
      animate={{
        x: isHovered ? position.x : 0,
        y: isHovered ? position.y : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.button>
  );
}

// Count Up Stat Component
function CountUpStat({ end, prefix = "", suffix = "", label }: { end: number; prefix?: string; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1500;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`stat-${label}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [end, hasAnimated, label]);

  return (
    <div id={`stat-${label}`} className="space-y-4">
      <div className="text-[clamp(3rem,6vw,5rem)] font-black text-text-strong">
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm uppercase tracking-wider text-text-muted font-semibold">
        {label}
      </div>
    </div>
  );
}

// Horizontal Scroll Component
function HorizontalScroll() {
  const items = [
    { icon: AlertTriangle, title: "Fraud Detection", color: "bg-red-50" },
    { icon: Eye, title: "AML Monitoring", color: "bg-blue-50" },
    { icon: CheckCircle, title: "Compliance", color: "bg-green-50" },
    { icon: Brain, title: "AI Intelligence", color: "bg-purple-50" },
    { icon: Zap, title: "Fast Deploy", color: "bg-yellow-50" },
  ];

  return (
    <div className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing">
      <div className="flex gap-8 px-8 pb-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={`flex-shrink-0 w-[400px] h-[500px] ${item.color} rounded-2xl p-12 flex flex-col justify-between`}
            whileHover={{ scale: 1.02, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <item.icon className="w-16 h-16 text-gold" strokeWidth={1.5} />
            <h3 className="text-4xl font-black">{item.title}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Feature 4: Marquee Scrolling Text Component
function MarqueeText() {
  const text = "FRAUD DETECTION + AML MONITORING + KYC & ONBOARDING + COMPLIANCE + THIRD PARTY RISK + ";
  
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[...Array(3)].map((_, i) => (
          <span key={i} className="text-4xl font-black uppercase text-gold/20 mr-8">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Feature 9: Section With Number Component  
function SectionWithNumber({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-8 relative">
      {/* Massive outline number */}
      <div 
        aria-hidden="true"
        className="absolute -left-4 lg:-left-8 top-0 text-[clamp(8rem,15vw,12rem)] font-black leading-none tracking-tighter text-transparent pointer-events-none select-none"
        style={{
          WebkitTextStroke: '2px rgba(193, 127, 74, 0.08)'
        } as React.CSSProperties}
      >
        {number}
      </div>
      
      {/* Content overlays number */}
      <div className="relative z-10 pt-20">
        <h2 className="text-5xl font-black mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

// Feature 8: Noise Texture Component
function NoiseTexture() {
  return (
    <div 
      className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
}

// Feature 10: Scramble Text Component
function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true });
  
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
  
  return (
    <p ref={ref} className="text-4xl font-black uppercase tracking-tight">
      {displayText}
    </p>
  );
}
