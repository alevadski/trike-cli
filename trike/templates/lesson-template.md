# Step Template (GSD-Like with Teaching)

**Use this pattern for every step in the build stage**

This template shows how `/trike:next` executes each phase.

---

## DISCUSS Phase

**Purpose:** Teach architectural context before building

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 MILESTONE [N]: [Milestone Name]
 STEP [X]: [Step Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▶ DISCUSS: What We're Building

[Explain what this step accomplishes for THEIR project]

**Why YOUR [project] needs this:**
[Connect to their specific goal]

**What we'll create:**
• [Component/File 1]
• [Component/File 2]

**How it fits:**
[Show how this connects to what they already built]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Questions before we plan the implementation?
```

[Wait for user, answer questions]

---

## PLAN Phase

**Purpose:** Explain how we'll build it

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 STEP [X]: [Step Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▶ PLAN: How We'll Build It

**Approach:**
[Explain implementation strategy in plain English]

**What I'll do:**
1. [Create file X with Y]
2. [Add logic Z]
3. [Test with A]

**Key concepts:**
• [Concept 1] - [why needed]
• [Concept 2] - [why needed]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Make sense? Questions before I build?
```

[Wait for user]

---

## EXECUTE Phase

**Purpose:** Build the code (GSD-style with narration)

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 STEP [X]: [Step Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▶ EXECUTE: Building

Watch what I'm doing. I'll explain as I go.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Then execute with narration:
```
Creating [component X]...
[Use Write tool]

This [what it does and why].

Now adding [logic Y]...
[Use Edit tool]

This [what it does architecturally].

Testing it...
[Use Bash to run/test]

✓ Works! [What they should see]
```

Commit:
```bash
git add .
git commit -m "Step [X]: [What was built]"
```

---

## EXPLAIN Phase

**Purpose:** Walkthrough of what was built

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 STEP [X]: [Step Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▶ EXPLAIN: How It Works

**Files created/modified:**
• [file1.js] - [what it does]
• [file2.html] - [what it does]

**Let me walk through [main component]:**

[Show relevant code snippet]

**What this does:**
[Explain architecturally, not line-by-line]

**Why it matters:**
[Connect to their project's goals]

**How the pieces connect:**
1. [Component A] handles [X]
2. It talks to [Component B] which does [Y]
3. The result is [Z]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## VERIFY Phase

**Purpose:** Check understanding before proceeding

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 STEP [X]: [Step Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▶ VERIFY: Check Understanding

Tell me in your own words:

1. What did we just build?
2. Why does [your project] need this?
3. How does [component A] connect to [component B]?

**Core principle:** Never accept code you can't explain.

If anything is unclear, ask me to explain deeper.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

[Wait for their explanation]

**If they explain well:**
```
✓ Perfect! You've got it.

[Show completion message and next step]
```

**If explanation has gaps:**
```
You've got [X], but let me clarify [Y]...

[Re-explain the unclear part]

Try explaining [Y] again?
```

[Loop until understanding is solid]

---

## PRACTICE Phase (Milestones 4+ only, when practice exercise exists)

**Purpose:** User builds something themselves with coaching

**First, read the coaching guide:**
```bash
cat ~/.claude/trike/references/practice-coaching.md
```

Then execute the practice flow:

### 1. Present Exercise
```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 TIME TO PRACTICE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Now it's your turn to vibecode!

**Your task:** [Exercise from learning path]

**Success criteria:**
- [What should work when done]
- [How to test it]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2. Help Them Plan
```
Before you start coding, let's think:
- What needs to change?
- Where in the code will this go?
- What should happen when it works?
```

[Let them answer, give hints if stuck]

### 3. Guide Their Prompt
```
How would you ask Claude Code to build this?
```

[They write prompt, you review it]

**If vague:** "Good start! What else could you tell Claude Code?"
**If good:** "Perfect! Try running it!"

### 4. They Execute
[User runs their prompt with Claude Code directly]

### 5. Review Together
**If it worked:**
```
Nice! Let's verify:
- Does it do what you expected?
- Can you explain how it works?
```

**If bugs/issues:**
```
No problem - let's debug:
- What did you expect?
- What actually happened?
- How would you ask Claude Code to fix it?
```

### 6. Reflect
```
Great work! Quick reflection:
- What was easier than you thought?
- What was harder?
```

### 7. Completion
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ PRACTICE COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You just vibecoded that yourself!

▶ NEXT

/trike:next — Continue to next step

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**CRITICAL:** Coach, don't build. Let them struggle and figure it out.

---

## Completion Pattern

When step verified:

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ STEP [X] COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Great! You understand [what was taught].

**Progress:**
Milestone [N]: [X] of [Y] steps complete

▶ NEXT UP

/trike:next — Continue to step [X+1]

[Brief preview of next step]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Update progress.json:
```bash
# Increment currentStep
# Reset currentPhase to null
# Add step to completedSteps
# Update lastActive, nextUp
```

---

## Tips for Each Phase

**DISCUSS:**
- Focus on architectural WHY, not implementation HOW
- Connect to THEIR project specifically
- High-level concepts only

**PLAN:**
- Explain approach in plain English
- Set expectations for what they'll see
- Answer questions before building

**EXECUTE:**
- Narrate as you build
- Explain key decisions in real-time
- Show, don't just tell

**EXPLAIN:**
- Architecture over syntax
- How pieces connect
- Why decisions matter for their goals

**VERIFY:**
- Don't accept "yes I understand"
- Force explanation in their own words
- Loop back to EXPLAIN if needed
- Never proceed without understanding

**PRACTICE:** (Milestone 4+ only)
- COACH, don't build
- Guide their thinking with questions
- Review their prompts before they run them
- Let them struggle - it's learning
- Celebrate when they get it right
- Normalize mistakes and debugging
- Build independence gradually

---

**Remember:** This is vibecoding, not traditional programming education.
Teach architecture and verification, not syntax and language internals.

**Goal:** By the end, they can vibecode on their own - prompting, verifying, and iterating independently.
