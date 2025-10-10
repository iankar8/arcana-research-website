# AI Assistant Context & Training Guide

**Purpose:** Help AI systems understand this project's unique requirements, aesthetic preferences, and design philosophy to provide better assistance.

---

## 🤖 For AI Assistants: Read This First

If you're an AI assistant working on this project, here's how to be maximally helpful:

---

## 📖 Required Reading Order

1. **START HERE:** Read this file completely
2. **THEN:** Read [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) in full
3. **THEN:** Read [LESSONS_LEARNED.md](./LESSONS_LEARNED.md) in full
4. **REFERENCE:** [DESIGN_DOCS_README.md](./DESIGN_DOCS_README.md) for quick lookups
5. **FOLLOW:** [.cursorrules](./.cursorrules) for all development work

**DO NOT skip this. These docs contain critical project context.**

---

## 🎯 Project Quick Facts

### **What This Is**
- B2B SaaS landing page for AI-powered fraud detection
- Target audience: Financial services CTOs and compliance officers
- Tech stack: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- Design philosophy: "Bold Typography + Subtle Interactions"

### **What Makes This Different**
This is NOT a typical landing page. The human has **very specific preferences**:

1. **Professional First** - No gimmicks, ever
2. **Bold Typography** - Compressed tracking, massive headlines
3. **Purposeful Interactions** - Every feature needs a reason
4. **Subtle Effects** - Users shouldn't consciously notice
5. **Quality Over Quantity** - Fewer features, done perfectly

### **The Core Tension**
The human wants:
- ✅ Modern, aggressive design
- ✅ Interactive, engaging experience
- ❌ But NOT gimmicky or distracting
- ❌ But NOT "cool effects for cool's sake"

**Your job:** Navigate this tension by being bold with type, subtle with motion.

---

## 🧠 Understanding the Human's Preferences

### **What the Human Likes**
Based on feedback patterns:

✅ **Typography-focused design**
- Compressed letter spacing
- Massive, bold headlines
- Clear hierarchy

✅ **Subtle, purposeful interactions**
- Magnetic buttons (barely noticeable pull)
- Hover scale (1.01-1.02x only)
- Smooth, spring-based physics

✅ **Premium finishing touches**
- Film grain texture (2-3% opacity)
- Section numbers (large, low opacity)
- Gold accents on black/beige

✅ **Performance & accessibility**
- Reduced motion support
- Keyboard navigation
- Smooth 60fps

### **What the Human Dislikes**
Based on rejected features:

❌ **Gimmicky effects**
- Custom cursors ("too much")
- Marquee text ("distracting")
- Over-animation ("gimmicky")

❌ **Unclear purposes**
- Alternating offsets ("when would we use this?")
- Decorative elements without function
- Features that don't enhance message

❌ **Overuse of good ideas**
- Text reveal everywhere (approved for ONE section only)
- Section numbers on every section (approved for 3 max)
- Effects that lose impact through repetition

### **Decision Patterns**

The human will typically:
1. **Ask to see it first** - Build on /demo before main site
2. **Evaluate tastefully** - "Do I like this? Is it too much?"
3. **Apply selectively** - "Only use this in X places"
4. **Document decisions** - Wants to learn from choices

**Your strategy:**
- Propose features on /demo first
- Explain purpose clearly
- Suggest limited application
- Reference past decisions

---

## 💡 How to Make Better Suggestions

### **The Decision Framework**

Before suggesting ANYTHING, ask yourself:

1. **Is it in DESIGN_SYSTEM.md?**
   - If YES: Follow the exact spec
   - If NO: Propose with full justification

2. **Was it tried in LESSONS_LEARNED.md?**
   - If APPROVED: Use the documented pattern
   - If REJECTED: Don't suggest it again
   - If SIMILAR: Note the difference

3. **Does it pass the 5 Questions?**
   ```
   ✅ Purpose?        (not just decorative)
   ✅ Tasteful?       (not gimmicky)
   ✅ Non-distracting? (enhances, not competes)
   ✅ Accessible?     (reduced motion, keyboard)
   ✅ On-brand?       (professional B2B)
   ```

4. **How much is too much?**
   - Suggest LIMITED application
   - "Use on 2-3 sections" not "everywhere"
   - Quality over quantity

### **Suggestion Template**

When proposing features, use this structure:

```markdown
## Feature: [Name]

**Purpose:** [Why it exists, what problem it solves]

**Specification:**
- Technical details
- Implementation approach
- Dependencies

**Usage Rules:**
- When to use: [specific contexts]
- When NOT to use: [anti-patterns]
- Frequency: [how often/where]

**Example from project:** [relate to existing patterns]

**Alternatives considered:** [what else was evaluated]
```

This shows you've thought it through.

---

## 🎨 Internalizing the Aesthetic

### **Visual Language Cheat Sheet**

**Colors:**
```
Background: Warm beige (#FAFAF9) - NEVER pure white
Text: Black (#0A0A0A) - Bold, confident
Accent: Gold (#C17F4A) - Premium, sparingly used
```

**Typography:**
```
Headlines: tracking-[-0.05em] - Compressed, aggressive
Body: 16-22px, 1.65-1.7 line-height - Readable
Weights: 900 (headlines), 600 (emphasis), 400 (body)
```

**Motion:**
```
Speed: 200-300ms - Quick but not rushed
Physics: Spring (200/20) - Natural, bouncy feel
Distance: 1-2% scale, 8-10px lift - Subtle
Trigger: IntersectionObserver - Performance-friendly
```

**Space:**
```
Sections: py-40 (160px) - Generous breathing room
Content: max-w-[60-68ch] - Optimal readability
Icons: 24-36px on desktop - Clear but not dominant
```

### **The "Bold but Tasteful" Balance**

Think of it like this:

```
TOO SUBTLE          JUST RIGHT         TOO MUCH
─────────────────────────────────────────────────
opacity: 5%    →   opacity: 15%   →   opacity: 50%
scale: 1.001   →   scale: 1.01    →   scale: 1.1
move: 2px      →   move: 8px      →   move: 50px
duration: 100ms →  duration: 300ms →  duration: 1s
```

**Aim for "JUST RIGHT"** - noticeable on inspection, invisible in use.

---

## 🔄 Learning from Interactions

### **Feedback Interpretation**

When the human says... | They mean... | Your response...
---|---|---
"Too gimmicky" | Effect is distracting | Reduce intensity or remove
"I like this" | Fits aesthetic | Document pattern, apply selectively
"When would we use this?" | Unclear purpose | Rethink or remove
"Make it more visible" | Opacity/contrast too low | Increase by 5-10%
"Not everywhere" | Overused | Limit to 2-3 instances
"Build it on demo first" | Want to see before committing | Test in isolation

### **Pattern Recognition**

After 3+ sessions, you should recognize:
- ✅ Which features get immediate approval (align with aesthetic)
- ✅ Which need iteration (good idea, wrong execution)
- ❌ Which get rejected (wrong direction entirely)

**Use this to propose better ideas faster.**

---

## 🧪 The /demo Strategy

### **Why /demo Exists**

The `/demo` page is your testing ground:
- Test features in isolation
- Show before implementing on main site
- Iterate quickly without breaking production
- Build confidence before commitment

### **How to Use /demo**

1. **Build new features here first**
   ```tsx
   // Add section to /app/demo/page.tsx
   <section id="new-feature">
     {/* Test implementation */}
   </section>
   ```

2. **Show all variations**
   - Normal vs compressed text
   - Different opacity levels
   - Various animation speeds

3. **Provide comparison**
   - Show "before" and "after"
   - Explain the difference
   - Let human decide

4. **After approval**
   - Extract to reusable component
   - Apply to main site selectively
   - Document in DESIGN_SYSTEM.md

---

## 🎯 Success Indicators

### **You're Doing Well When:**

1. **First-time approval rate increases**
   - Suggestions align with aesthetic
   - Referenced docs appropriately
   - Applied patterns correctly

2. **Less "too gimmicky" feedback**
   - Internalized subtle > flashy
   - Propose appropriate intensity
   - Suggest limited application

3. **Human says "exactly what I wanted"**
   - Understood requirements
   - Matched expectations
   - Anticipated needs

4. **Proactive pattern recognition**
   - "This is like X we did before"
   - "Based on LESSONS_LEARNED.md..."
   - "Following DESIGN_SYSTEM.md spec for..."

### **Red Flags You're Off Track:**

1. **Repeated rejections of similar features**
   - Not learning from feedback
   - Ignoring documented preferences
   - Suggesting rejected patterns

2. **"Check the docs" reminders**
   - Not reading before proposing
   - Missing established patterns
   - Reinventing existing solutions

3. **"Too much" or "too gimmicky" feedback**
   - Overdesigning
   - Missing subtle > flashy principle
   - Not respecting aesthetic

4. **Confusion about purpose**
   - Features without clear rationale
   - Decorative over functional
   - Style over substance

---

## 📚 Continuous Improvement

### **After Each Session**

1. **Update relevant docs** if:
   - New pattern established → DESIGN_SYSTEM.md
   - Feature rejected → LESSONS_LEARNED.md
   - Design philosophy evolved → Both docs

2. **Review decisions made**
   - What was approved? Why?
   - What was rejected? Why?
   - What patterns emerged?

3. **Refine understanding**
   - How can I suggest better next time?
   - What should I have referenced?
   - Where did I miss the mark?

### **Building Institutional Knowledge**

The docs are not static. They should:
- ✅ Grow with the project
- ✅ Capture new learnings
- ✅ Document evolving preferences
- ✅ Prevent repeated mistakes

**Your role:** Suggest doc updates when significant decisions are made.

---

## 🎓 Advanced: Anticipating Needs

Once you understand the aesthetic, you can:

### **Proactively Suggest**
- "Based on the compressed tracking pattern, I'd suggest..."
- "Following the 'subtle interactions' principle..."
- "This aligns with the section number usage rules..."

### **Preemptively Address**
- "I'm keeping this at 1.01x scale to avoid gimmicky feel..."
- "Using this only on the Hero section per LESSONS_LEARNED..."
- "Respecting reduced motion with conditional animations..."

### **Connect Patterns**
- "This is similar to the magnetic button pattern but applied to..."
- "Like the section numbers, we should limit this to 2-3 instances..."
- "Following the noise texture precedent, keeping opacity at 2-3%..."

This shows deep understanding and builds trust.

---

## 💬 Communication Best Practices

### **DO:**
- ✅ Reference specific docs: "Per DESIGN_SYSTEM.md section 3..."
- ✅ Explain reasoning: "This fits because..."
- ✅ Show alternatives: "We could also..."
- ✅ Acknowledge constraints: "Within the tasteful interaction guideline..."
- ✅ Cite precedents: "Like the approved section numbers..."

### **DON'T:**
- ❌ Suggest without context
- ❌ Ignore established patterns
- ❌ Repeat rejected ideas
- ❌ Over-explain obvious things
- ❌ Under-explain new concepts

### **Tone:**
- Direct and confident (not tentative)
- Professional (B2B project context)
- Educational when relevant (explain the "why")
- Collaborative (partner, not servant)

---

## 🎯 TL;DR for AI Systems

If you only remember 5 things:

1. **ALWAYS read the docs first** (DESIGN_SYSTEM, LESSONS_LEARNED)
2. **Bold typography, subtle interactions** (core philosophy)
3. **Purpose over decoration** (no gimmicks)
4. **Build on /demo first** (test before implementing)
5. **Less is more** (quality over quantity)

Follow these and you'll provide 10x better assistance.

---

## 🚀 Getting Started Checklist

For a new AI session on this project:

- [ ] Read DESIGN_SYSTEM.md completely
- [ ] Read LESSONS_LEARNED.md completely
- [ ] Skim DESIGN_DOCS_README.md for structure
- [ ] Review .cursorrules for dev standards
- [ ] Understand current feature set
- [ ] Check /demo for latest experiments
- [ ] Review recent git commits for context
- [ ] Identify any open questions

**Only then** are you ready to make suggestions.

---

**Remember:** The goal isn't just to build features. It's to build features that feel like they belong, that enhance without distracting, that are bold yet tasteful. That's the standard.
