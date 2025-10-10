# Arcana Advisors Design System

**Version:** 1.0  
**Last Updated:** October 2025  
**Purpose:** Comprehensive guide to design aesthetic, interactive patterns, and implementation standards

---

## 🎨 Visual Identity

### **Color Palette**

#### **Primary Colors**
```css
--bg-light: #FAFAF9      /* Main background - warm off-white */
--bg-cream: #F5F5F4      /* Secondary background */
--bg-warm: #EFEEEC       /* Tertiary background */

--text-strong: #0A0A0A   /* Headlines, primary text */
--text-muted: #525252    /* Body text, descriptions */
--text-soft: #737373     /* Captions, metadata */

--gold: #C17F4A          /* Primary accent */
--gold-light: #E8CDB5    /* Hover states, highlights */
--gold-dark: #A8691F     /* Active states, emphasis */
--gold-subtle: #F4E8DC   /* Backgrounds, tints */
```

#### **Usage Guidelines**
- **Backgrounds:** Always use beige tones, never pure white
- **Text Hierarchy:** Strong → Muted → Soft (3-level system)
- **Accents:** Gold is premium - use sparingly for emphasis
- **Borders:** `rgba(10, 10, 10, 0.08)` for subtle dividers

---

## 📐 Typography

### **Font Stack**
```css
--font-inter: 'Inter', sans-serif;           /* UI, body, headings */
--font-dm-serif: 'DM Serif Display', serif;  /* Optional decorative */
```

### **Type Scale**

#### **Headlines (H1-H6)**
```css
h1: clamp(2rem, 5vw, 5rem)      /* Hero headlines */
h2: clamp(2rem, 4vw, 3.5rem)    /* Section titles */
h3: clamp(1.5rem, 3vw, 2rem)    /* Subsections */
```

#### **Body Text**
```css
body: 16px / 1.65            /* Standard reading */
large: 20-22px / 1.7         /* Intros, emphasis */
small: 14px / 1.5            /* Captions, metadata */
```

### **Typography Principles**

#### **1. Compressed Headlines** ⭐
```css
tracking: -0.05em    /* All h1, h2 elements */
```
- Makes text feel modern and aggressive
- Especially effective on uppercase
- Never use on body text

#### **2. Font Weights**
```
Regular: 400   /* Body text only */
Medium: 500    /* Rare, avoid */
Semibold: 600  /* Subheadings, emphasis */
Bold: 700      /* Buttons, labels */
Black: 900     /* Headlines, impact */
```

#### **3. Text Rendering**
```css
font-feature-settings: "rlig" 1, "calt" 1;
letter-spacing: -0.01em;    /* Base, subtle tightening */
-webkit-font-smoothing: antialiased;
```

---

## 🎭 Visual Effects

### **1. Section Numbers** ⭐

#### **Implementation**
```tsx
<SectionNumber number="01" />
```

#### **Specifications**
- **Size:** `clamp(8rem, 15vw, 12rem)`
- **Position:** Absolute, top-left (-left-4 lg:-left-8)
- **Opacity:** 15% (visible on beige)
- **Stroke:** `2px rgba(193, 127, 74, 0.15)`
- **Z-index:** 0 (behind content)

#### **Usage Rules**
✅ Use on major sections only (3-4 max per page)  
✅ Sequential numbering (01, 02, 03)  
❌ Don't use on every section  
❌ Don't use on dark backgrounds without adjusting

---

### **2. Noise Texture** ⭐

#### **Implementation**
```tsx
<NoiseTexture opacity={0.025} />
```

#### **Specifications**
- **Opacity:** 2-3% max
- **Blend Mode:** overlay
- **Type:** Fractal noise SVG
- **Z-index:** 0 (behind content)

#### **Usage Rules**
✅ Use on Hero section  
✅ Use on dark sections for depth  
❌ Don't overuse - 1-2 sections max  
❌ Don't exceed 3% opacity

---

### **3. Parallax Scrolling** ⭐

#### **Specifications**
```tsx
// Different speeds for depth
y1: [0, -150px]   /* Fast upward */
y2: [0, 150px]    /* Fast downward */
y3: [0, -100px]   /* Medium upward */
```

#### **Usage Rules**
✅ Use on background icons only  
✅ Opposite directions for contrast  
✅ Respect reduced motion preferences  
❌ Don't parallax primary content  
❌ Don't exceed ±200px movement

---

## 🎮 Interactive Patterns

### **1. Magnetic Buttons** ⭐

#### **Implementation**
```tsx
const multiplier = 0.2;  // Subtle magnetic pull
const x = (mouseX - centerX) * multiplier;
const y = (mouseY - centerY) * multiplier;

// Spring physics
stiffness: 200
damping: 20
```

#### **Specifications**
- **Pull Distance:** 0.2-0.3x mouse offset
- **Hover Scale:** 1.02x
- **Lift:** -2px Y transform
- **Transition:** Spring physics

---

### **2. Hover Scale Headlines** ⭐

#### **Implementation**
```tsx
<motion.h2
  whileHover={{ scale: 1.01 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  className="cursor-default"
>
```

#### **Specifications**
- **Scale:** 1.01x (very subtle)
- **Duration:** 300ms
- **Easing:** easeOut
- **Cursor:** default (not pointer)

---

### **3. Animated Stat Counters** ⭐

#### **Implementation**
```tsx
<CountUpStat 
  end={95}
  prefix=""
  suffix="%"
  duration={1500}
/>
```

#### **Specifications**
- **Trigger:** IntersectionObserver at 50% visibility
- **Duration:** 1500ms
- **Once:** true (don't repeat)
- **Increment:** 16ms intervals

---

### **4. Text Reveal Animation** ⭐

#### **Implementation**
```tsx
<ScrambleText 
  text="Your important message here"
  className="text-lg"
  as="p"
/>
```

#### **Specifications**
- **Trigger:** IntersectionObserver, once:true
- **Interval:** 30ms
- **Iteration Speed:** 1/3 per frame
- **Characters:** A-Z, a-z (no numbers/symbols)

#### **Usage Rules**
✅ Use on ONE critical paragraph only  
✅ Reserve for urgent/important messages  
❌ Never use on multiple sections  
❌ Don't use on headlines (too distracting)

---

### **5. Mouse Spotlight** ⭐

#### **Specifications**
```css
radial-gradient(
  circle 600px at ${x}px ${y}px,
  rgba(193, 127, 74, 0.04),
  transparent 70%
)
```

- **Radius:** 600px
- **Opacity:** 4% gold
- **Falloff:** 70%
- **Z-index:** 10 (below indicators, above content)

---

### **6. Sticky Section Indicators** ⭐

#### **Specifications**
- **Position:** Fixed right-8, top-50%
- **Active Dot:** 3x3 (12px), gold
- **Inactive Dot:** 2x2 (8px), gray
- **Hover:** Label appears, scale 1.5x
- **Z-index:** 50

#### **Usage Rules**
✅ Show on desktop (lg: breakpoint)  
✅ Hide on mobile/tablet  
✅ Update on 50% section visibility  
❌ Don't use on short pages (<3 sections)

---

### **7. Horizontal Drag Scroll** ⭐

#### **Specifications**
```tsx
<div className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing">
  {/* Cards: w-[400px] lg:w-[480px] */}
  {/* Hover: scale(1.02) + translateY(-8px) */}
</div>
```

#### **Usage Rules**
✅ Use for 4-6 related items  
✅ Show partial next card for affordance  
✅ Selected state: gold border + bg  
❌ Don't use for <3 or >8 items  
❌ Don't hide scrollbar on mobile

---

## 🏗️ Layout Principles

### **Spacing System**
```
Base: 8px
Scale: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96
```

### **Section Padding**
```css
py-20  /* Small sections, mobile */
py-40  /* Standard desktop sections */
py-60  /* Generous breathing room */
py-80  /* Hero sections, major breaks */
```

### **Content Width**
```css
max-w-[60ch]   /* Body paragraphs */
max-w-[68ch]   /* Intro paragraphs */
max-w-7xl      /* Section shells */
max-w-[90rem]  /* Full-width sections */
```

### **Z-Index Layers**
```
0: Background elements (numbers, noise, icons)
10: Main content, spotlight
50: Navigation, indicators, tooltips
100: Modals, overlays
```

---

## 🎯 Component Patterns

### **Button Styles**

#### **Primary**
```css
bg: #0A0A0A (black)
text: #FAFAF9 (cream)
hover: Gold gradient overlay
shadow: 0 4px 16px rgba(10,10,10,0.12)
hover-shadow: 0 12px 32px rgba(193,127,74,0.4)
```

#### **Secondary**
```css
border: 2px gold
bg: transparent
text: black
hover-bg: gold-subtle
hover-border: gold
```

---

### **Card Styles**

#### **Standard Card**
```css
bg: white
border: 2px border-subtle
rounded: 2xl (16px)
padding: 8 (32px)
hover: border-gold, scale(1.02), y(-8px)
```

#### **Selected Card**
```css
bg: gold/10
border: 2px gold
```

---

### **Section Structure**
```tsx
<section id="section-id" className="relative py-40 overflow-hidden">
  <SectionNumber number="01" />           {/* Optional */}
  <NoiseTexture opacity={0.025} />        {/* Optional */}
  
  {/* Background icons (z-0) */}
  <motion.div className="absolute ... z-0" />
  
  {/* Main content (z-10) */}
  <div className="section-shell relative z-10">
    <SectionHeading kicker="Label—" title="Title" />
    {/* Content */}
  </div>
</section>
```

---

## ♿ Accessibility

### **Required Practices**

1. **Reduced Motion**
```tsx
const shouldReduceMotion = useReducedMotion();
// Disable animations when true
```

2. **Keyboard Navigation**
- All interactive elements must be focusable
- Focus indicators: `ring-2 ring-gold ring-offset-2`
- Logical tab order

3. **ARIA Labels**
```tsx
aria-hidden="true"      // Background decorations
aria-label="description" // Interactive elements
role="button"           // Custom interactive elements
```

4. **Color Contrast**
- Text on beige: WCAG AA minimum
- Gold accents: Decorative only, never sole indicator

---

## 📱 Responsive Breakpoints

```css
sm: 640px    /* Mobile landscape */
md: 768px    /* Tablet portrait */
lg: 1024px   /* Tablet landscape / Small desktop */
xl: 1280px   /* Desktop */
2xl: 1536px  /* Large desktop */
```

### **Responsive Rules**

1. **Hide on Mobile:**
   - Section indicators
   - Large background numbers
   - Parallax effects (optional)

2. **Adjust on Mobile:**
   - Font sizes (clamp values)
   - Padding (py-20 → py-40)
   - Horizontal scroll (keep enabled)

3. **Touch-Friendly:**
   - Min 44px touch targets
   - Larger tap areas for cards
   - No hover-only interactions

---

## 🚫 What NOT to Do

### **Visual Effects to Avoid**
❌ Custom cursors (accessibility issues)  
❌ Marquee scrolling text (distracting)  
❌ Multiple text reveals per page (gimmicky)  
❌ Alternating layouts without purpose  
❌ Pure white backgrounds (use beige)  
❌ Over 3% noise texture opacity  
❌ Section numbers on every section

### **Interaction Patterns to Avoid**
❌ Animations over 500ms (feels slow)  
❌ Parallax on content (only backgrounds)  
❌ Magnetic effects over 0.3x multiplier  
❌ Hover scale over 1.05x (too aggressive)  
❌ Auto-playing videos/animations  
❌ Modal popups on page load

---

## 🧪 Testing Checklist

### **Before Launch**
- [ ] Test all animations with reduced motion
- [ ] Verify section numbers on different backgrounds
- [ ] Test horizontal scroll on touch devices
- [ ] Check text reveal performance
- [ ] Verify parallax on low-end devices
- [ ] Keyboard navigation full flow
- [ ] Screen reader compatibility
- [ ] Color contrast validation (WCAG AA)
- [ ] Mobile viewport at 375px width
- [ ] Desktop at 1920px width

---

## 🎯 Design Philosophy Summary

**Core Principles:**
1. **Bold Typography Over Fancy Effects** - Type hierarchy matters most
2. **Purposeful, Not Decorative** - Every element needs a reason
3. **Subtle Interactions** - Users shouldn't consciously notice
4. **Professional First** - B2B finance requires trust
5. **Performance Matters** - Smooth 60fps on mid-range devices
6. **Accessible Always** - No user left behind

**Aesthetic Keywords:**
- Modern, aggressive, confident
- Minimalist, refined, premium
- Bold typography, tight tracking
- Subtle animations, spring physics
- Gold accents, beige backgrounds
- Film grain, tactile textures

---

**Remember:** The best design is invisible. Features should enhance the message, not distract from it.
