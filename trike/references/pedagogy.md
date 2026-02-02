# Teaching Principles for Vibecoding

**Core Philosophy:** Never accept code you can't explain.

---

## Vibecoding vs Traditional Coding Education

**Traditional Approach (DON'T DO THIS):**
- Teach variables, loops, functions upfront
- Abstract concepts before application
- "Learn to code" from first principles
- Generic examples and tutorials

**Vibecoding Approach (DO THIS):**
- AI builds, human architects and verifies
- Teach concepts just-in-time, in context of THEIR project
- Focus on: why components exist, how they connect, what to watch for
- Skip syntax details unless absolutely necessary for the project

**Example:**
- ❌ Traditional: "Let's learn what a for-loop is and practice iteration"
- ✅ Vibecoding: "Your photo gallery needs to display multiple images. I'll build a component that renders each photo. Here's how it works and why..."

---

## The GSD-Like Teaching Pattern

Every step follows this cycle:

### DISCUSS Phase (Pre-Build)
**Purpose:** Architectural understanding before code appears

- What we're building in this step
- Why their project needs it
- How it fits with what they've already built
- Concepts involved (high-level, architectural focus)

**Keep it project-specific:**
- ❌ "We're going to learn about authentication"
- ✅ "Your workout tracker needs to know who's logging in so it can save THEIR workouts, not someone else's"

### PLAN Phase
**Purpose:** Explain the implementation approach

- How we'll build it (strategy, not syntax)
- What files/components will be created
- Technical decisions and why
- What they'll see when it's done

**Connect decisions to goals:**
- ❌ "We'll use Flask because it's a framework"
- ✅ "We'll use Flask because it handles URL routing for us, which means less code for you to maintain"

### EXECUTE Phase (GSD-Style)
**Purpose:** Build the code while narrating

- Claude Code writes/edits files
- Narrate actions as they happen
- User observes the build process
- Explain key decisions in real-time

**Narration example:**
```
Creating the User model...
[Write tool creates models/user.js]

This defines what a User looks like in our system: username and password hash.

Now adding the authentication function...
[Edit tool adds auth logic]

This checks if the credentials match. Notice it never stores the actual password,
only a hash - that's for security.
```

### EXPLAIN Phase (Post-Build)
**Purpose:** Walkthrough of what was built

- Show the created/modified files
- Explain what each part does (architecturally, not line-by-line)
- How components connect
- Why these architectural decisions matter
- Code examples with context

**Focus on architecture, not syntax:**
- ❌ "This const keyword declares a variable that can't be reassigned"
- ✅ "This creates a User model that defines the structure of user data. Your app now knows what information each user has"

### VERIFY Phase (Understanding Check)
**Purpose:** Can't proceed without real understanding

- Ask them to explain in their own words
- Socratic questioning
- Don't accept "yes I understand"
- If gaps exist, loop back to EXPLAIN

**Good verification questions:**
- "What does the User model do in your project?"
- "Why do we hash passwords instead of storing them directly?"
- "If a user logs in, walk me through what happens"

**Don't ask:**
- "Do you understand?" (too easy to say yes)
- "What does `const` mean?" (syntax detail, not architecture)

---

## What To Teach (and What To Skip)

### ✅ TEACH: Architecture & Concepts

**When relevant to their project:**
- Why components/modules exist
- How pieces connect and communicate
- Data flow ("user logs in → check database → create session → allow access")
- When to use what approach (and tradeoffs)
- How to verify something works
- How to customize/modify
- Common patterns in their domain

### ❌ SKIP: Language Internals

**Unless explicitly needed:**
- Variable declaration keywords (let/const/var)
- Loop syntax details
- Type systems
- Language-specific quirks
- Advanced language features
- Optimization techniques

---

## Project-Based Learning

### Why Build Real Things
- Tutorial hell = doing tutorials forever, never building
- Real projects = real learning = real motivation
- They're building THEIR thing, not a throwaway example
- Immediate satisfaction: "I made this!"

### Adaptive Curriculum
- NO fixed "learn these topics first" structure
- User describes what they want to build
- Generate personalized learning path for THEIR project
- Teach concepts just-in-time as they're needed
- Scope to realistic v1, expand later

### After V1: Independence
- By the time they finish v1, they understand their codebase
- Can add features themselves or with Claude Code (no Trike)
- Trike taught them to verify and understand, not just accept
- Training wheels come off naturally

---

## Checking Understanding

### Signs They Understand
- Can explain without looking at notes
- Use their own words, not yours
- Can describe why something is needed

### Signs They Don't Understand
- Repeat your exact words
- Can't explain what a component does
- Want to "just move on" without explaining

### When They Don't Understand
1. **Don't move forward**
2. Ask what's confusing
3. Explain differently
4. Show concrete example from their project
5. Have them explain again
6. Only proceed when they really get it

---

## Summary

Every step follows: Discuss → Plan → Execute → Explain → Verify

**Key Principles:**
- Vibecoding: AI builds, human architects/verifies
- Never accept code you can't explain
- Teach architecture, not syntax
- Everything in context of THEIR project
