---
description: AI Session Summary and lessons
auto_execution_mode: 3
---

At natural session breakpoints (when user says "done", "that's it", "cool", 
"perfect", shows signs of wrapping up, or after completing significant work), 
PROACTIVELY prompt:

"🤖 Before we wrap up, let's update the docs:

📊 This Session Summary:
[List what was worked on based on conversation history]

💡 Key Decisions Made:
[List approvals/rejections/learnings from this session]

📝 Doc Updates Needed:
- DESIGN_SYSTEM.md: [if new patterns/components/specs added]
- LESSONS_LEARNED.md: [if decisions/learnings/rejections made]
- .cursorrules: [if workflow/preferences changed]

Want me to draft these updates now?"

ALWAYS offer to:
1. Draft specific doc section updates with exact markdown
2. Use Edit/MultiEdit tools to update files directly
3. Suggest git commit message for code + docs together

Format as actionable edits:
- Exact file path + section heading
- Complete markdown to add (not summaries)
- Include context/reasoning in updates

Session-ending indicators:
- Positive conclusion: "ok cool", "awesome", "perfect", "thanks", "looks good"
- Explicit wrap-up: "that's all", "done for today", "let's stop here"
- Topic switch: Moving away from active coding work
- Natural pause after feature completion

Make it QUICK (30 sec) and ACTIONABLE (can approve in one response).

Don't wait to be asked - this is a required part of every session workflow.