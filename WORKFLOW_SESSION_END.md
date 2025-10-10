# Session-End Documentation Workflow

**Purpose:** Ensure all design decisions, learnings, and new patterns are captured after every work session.

**Trigger:** AI assistant detects session is ending based on user signals.

---

## 🎯 Workflow Overview

```
Work Session → Detect End Signal → Analyze Changes → Update Docs → Commit
```

---

## 📋 Step-by-Step Process

### **Step 1: Detect Session End**

AI watches for these signals:

**Positive Conclusions:**
- "ok cool" / "awesome" / "perfect" / "thanks" / "looks good"
- "that works" / "nice" / "great"

**Explicit Wrap-Ups:**
- "that's all" / "done for today" / "let's stop here"
- "i'm good" / "that's it for now"

**Natural Pauses:**
- Feature completion + no immediate next task
- Topic switch away from active coding
- User becomes less responsive (suggesting they're done)

**Action:** When detected, proceed to Step 2.

---

### **Step 2: Analyze Session**

AI reviews conversation history and identifies:

#### **What Was Built:**
- [ ] New components created
- [ ] Existing components modified
- [ ] Features added/removed
- [ ] Design patterns applied

#### **Decisions Made:**
- [ ] Feature approvals ("I like this")
- [ ] Feature rejections ("too gimmicky")
- [ ] Specification changes ("increase to 15%")
- [ ] Usage rules established ("only 3 sections max")

#### **Learnings Captured:**
- [ ] What worked well
- [ ] What didn't work
- [ ] Why decisions were made
- [ ] Preferences revealed

---

### **Step 3: Prompt User**

AI presents this summary:

```markdown
🤖 Before we wrap up, let's update the docs:

📊 This Session Summary:
• [List 3-5 key accomplishments]

💡 Key Decisions Made:
• [List approvals with specs]
• [List rejections with reasons]
• [List learnings/changes]

📝 Doc Updates Needed:

DESIGN_SYSTEM.md:
→ [Specific section to update]
→ [What to add/change]

LESSONS_LEARNED.md:
→ [Specific section to update]
→ [What to add/change]

.cursorrules:
→ [Only if workflow/preferences changed]

Want me to draft these updates now? [y/n]
```

**Wait for user response.**

---

### **Step 4: Draft Updates**

If user says **YES**, AI drafts exact markdown:

#### **For DESIGN_SYSTEM.md:**

```markdown
[Provide complete section with:]
- Component/pattern name
- Purpose and use case
- Technical specifications
- Code example
- Usage rules (when/when not)
- Related patterns
```

#### **For LESSONS_LEARNED.md:**

```markdown
[Provide complete entry with:]
- What was tried
- Outcome (approved/rejected)
- Reasoning
- Context/date
- Key takeaway
```

#### **For .cursorrules:**

```markdown
[Only update if:]
- New workflow established
- Preference changed
- Pattern becomes standard
```

---

### **Step 5: Apply Updates**

AI uses tools to update files:

```tsx
// Option A: Show user the edits
"Here are the exact updates I'll make:

File: DESIGN_SYSTEM.md
Line: 347
Add: [markdown content]

Should I apply these? [y/n/edit]"

// Option B: Apply directly (if user gave blanket approval)
"✅ Updated DESIGN_SYSTEM.md (added SectionNumber spec)
✅ Updated LESSONS_LEARNED.md (added opacity learning)

Ready to commit?"
```

---

### **Step 6: Commit Changes**

AI suggests git workflow:

```bash
🤖 Suggested Commit:

Message: "feat(ui): section numbers, noise texture, text reveal

- Add SectionNumber component (15% opacity)
- Add NoiseTexture overlay (Hero only)  
- Add ScrambleText reveal (WhyNow only)
- Update design system docs
- Document learnings and preferences"

Files to commit:
✓ components/SectionNumber.tsx
✓ components/NoiseTexture.tsx
✓ components/ScrambleText.tsx
✓ components/Hero.tsx
✓ components/WhyNow.tsx
✓ DESIGN_SYSTEM.md
✓ LESSONS_LEARNED.md

Commands:
[1] Commit code + docs together
[2] Just commit docs (save code for later)
[3] Edit commit message first
[4] Skip commit (save for next session)

Your choice? [1/2/3/4]
```

**Execute based on user choice.**

---

### **Step 7: Confirm Completion**

AI provides final summary:

```markdown
✅ Session Complete!

Committed:
• Code: 5 files changed (+387 lines)
• Docs: 2 files updated (+94 lines)
• Message: "feat(ui): section numbers, noise texture..."

📚 Documentation Status:
✓ DESIGN_SYSTEM.md - Updated with 3 new patterns
✓ LESSONS_LEARNED.md - Added 2 key learnings
✓ .cursorrules - No changes needed

🚀 Next Steps:
• Push to GitHub: git push
• Deploy: npm run deploy
• Or just close - everything is saved!

Great work today! 🎯
```

---

## 🎨 Workflow Variations

### **Quick Mode** (< 2min)
User says "yes" to everything, AI:
1. Drafts updates
2. Applies directly
3. Commits with suggested message
4. Done

### **Review Mode** (5min)
User wants to review, AI:
1. Shows all proposed changes
2. User approves/edits each
3. Applies approved changes
4. User writes commit message
5. Commits

### **Skip Mode** (instant)
User says "skip" or "not now", AI:
1. Saves summary to `.session-notes/[date].md`
2. Reminds next session
3. Done

---

## 🧪 Example Workflows

### **Example 1: Feature Complete**

```
User: "ok cool, the section numbers look good now"

AI: [Detects: positive conclusion + feature complete]
    🤖 Before we wrap up, let's update the docs:
    
    📊 This Session Summary:
    • Added SectionNumber component
    • Applied to WhyNow, Services, Principles
    • Increased opacity from 8% to 15% (visibility fix)
    
    💡 Key Decisions:
    • Approved: Section numbers at 15% opacity
    • Learning: 8% was too subtle on beige background
    • Rule: Max 3 section numbers per page
    
    📝 Update DESIGN_SYSTEM.md with SectionNumber spec?
    
User: "yes"

AI: [Drafts complete markdown section]
    [Uses Edit tool to add to file]
    ✅ DESIGN_SYSTEM.md updated
    
    Commit message: "feat(ui): add section numbers with visibility fix"
    Commit now? [y/n]
    
User: "y"

AI: ✅ Committed! Great work today.
```

---

### **Example 2: Multiple Features**

```
User: "perfect, that's it for today"

AI: 🤖 Big session! Let's document everything:
    
    📊 This Session (3 features):
    • Section numbers (SectionNumber.tsx)
    • Noise texture (NoiseTexture.tsx)
    • Text reveal (ScrambleText.tsx)
    
    💡 Key Decisions:
    ✅ Section numbers: 15% opacity, 3 max
    ✅ Noise texture: 2.5% opacity, Hero only
    ✅ Text reveal: ONE section only (WhyNow)
    ❌ Rejected: Alternating offsets (unclear purpose)
    ❌ Rejected: Marquee text (too distracting)
    
    📝 Updates needed:
    • DESIGN_SYSTEM.md: Add all 3 components
    • LESSONS_LEARNED.md: Add 2 rejections + learnings
    
    This will take ~2min to draft. Continue? [y/n]
    
User: "y"

AI: [Drafts all updates]
    [Shows preview]
    
    DESIGN_SYSTEM.md: +127 lines
    LESSONS_LEARNED.md: +48 lines
    
    Look good? [y/edit/n]
    
User: "y"

AI: [Applies edits]
    ✅ Both files updated
    
    Commit: "feat(ui): interactive elements system
    
    - Section numbers, noise texture, text reveal
    - Document specs and usage rules
    - Document rejected patterns"
    
    Commit? [y/n]

User: "y"

AI: ✅ Done! Pushed to main.
```

---

### **Example 3: Just Exploring**

```
User: "ok that's enough experimenting"

AI: 🤖 Detected: Work on /demo only (no main changes)
    
    Should I:
    [1] Document new patterns anyway (for future reference)
    [2] Skip - just exploring
    
User: "2"

AI: 👍 Skipped. Notes saved to .session-notes/2025-10-09.md
    (Can reference later if needed)
```

---

## ⚙️ Configuration

### **Sensitivity Settings**

**Aggressive Mode:** (Prompt after every feature)
```
Trigger: Any positive conclusion
Frequency: Multiple times per session
Best for: Learning phase, new projects
```

**Balanced Mode:** (Prompt at natural breaks) ⭐ **Recommended**
```
Trigger: Major feature completion or explicit wrap-up
Frequency: 1-2 times per session
Best for: Regular workflow
```

**Minimal Mode:** (Only when explicitly asked)
```
Trigger: User says "update docs" or "commit"
Frequency: Only on command
Best for: Experienced users, established projects
```

---

## 📊 Success Metrics

Track these over time:

- **Doc Coverage:** % of features documented
- **Update Frequency:** Days since last doc update
- **Session Capture:** % of sessions with doc updates
- **Time Saved:** Avg time per doc update (should decrease)
- **Quality:** % of updates requiring revision

**Goal:** 80%+ of sessions result in doc updates, taking < 2min each.

---

## 🔄 Continuous Improvement

### **After Each Session:**
- Was the prompt timely? (not too early/late)
- Were the suggested updates accurate?
- Did it save time vs manual updates?

### **Weekly Review:**
- Are patterns being captured consistently?
- Are docs staying current?
- Is the workflow feeling natural?

### **Adjust:**
- Tune sensitivity settings
- Refine prompt templates
- Update detection signals

---

## 🚨 Important Rules

### **ALWAYS:**
- ✅ Wait for user approval before updating files
- ✅ Show what will be changed
- ✅ Provide option to skip
- ✅ Make it quick (< 2min total)

### **NEVER:**
- ❌ Update docs without user knowledge
- ❌ Auto-commit without confirmation
- ❌ Be too aggressive (don't nag)
- ❌ Update for trivial changes

---

## 🎯 Quick Reference

```
Session End Signal → Analyze → Prompt → Draft → Apply → Commit → Done

Timing: 30-120 seconds total
Frequency: 1-2x per session
Approval: Always required
Skip option: Always available
```

---

**Remember:** The goal is to make documentation effortless, not burdensome. Keep it fast, accurate, and always optional.
