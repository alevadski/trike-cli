---
name: trike:debug-why
description: Analyze why Claude Code results weren't what you expected
allowed-tools: [Read, AskUserQuestion]
---

<objective>
Post-graduation utility command.

When Claude Code doesn't give good results, help users understand why
and how to get better results next time.

Debugging prompts, context, tool selection - not code bugs.
</objective>

<process>

## Step 1: What Went Wrong?

Ask user to describe the issue:

```json
{
  "question": "What happened that you didn't expect?",
  "header": "The Issue",
  "multiSelect": false,
  "options": [
    {
      "label": "Response was generic/unhelpful",
      "description": "Answer didn't apply to my specific situation"
    },
    {
      "label": "Wrong approach suggested",
      "description": "Solution doesn't match my project's patterns"
    },
    {
      "label": "Incomplete or vague answer",
      "description": "Missing details or didn't fully address the question"
    },
    {
      "label": "Code doesn't work",
      "description": "Suggested code has errors or bugs"
    },
    {
      "label": "Forgot previous context",
      "description": "Seems to have lost track of our conversation"
    }
  ]
}
```

## Step 2: Diagnostic Questions

Based on their issue, ask follow-up:

### For "Generic/Unhelpful"

**Most likely causes:**
1. Context issue - Claude doesn't understand your project
2. Prompt too vague
3. Missing CLAUDE.md or poor CLAUDE.md

**Ask:**
- "Do you have a CLAUDE.md file in your project?"
- "Did you mention your framework/stack in the prompt?"
- "How much of your project is in context?"

**Diagnosis:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 DIAGNOSIS: CONTEXT PROBLEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generic responses usually mean Claude doesn't understand
your specific project well enough.

**What's happening:**
Without project context, I can only give general programming
advice. I don't know your framework, your patterns, your
constraints - so answers are generic.

**How to fix:**
1. Create CLAUDE.md describing your project:
   • Tech stack
   • Architecture patterns
   • Code conventions
   • Common patterns in your codebase

2. Mention framework in prompts:
   "In my React project, how should I..."

3. Include relevant files in context:
   Use /add-context to include related files

**Try again with:**
[Rewrite their prompt with framework/context mentioned]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### For "Wrong Approach"

**Most likely causes:**
1. Claude doesn't know your project patterns
2. Missing constraints in prompt
3. Wrong files in context

**Diagnosis:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 DIAGNOSIS: PATTERN MISMATCH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The approach suggested doesn't match your project's patterns.

**What's happening:**
I suggested a valid solution, but not one that fits YOUR
codebase conventions or architecture.

**How to fix:**
1. Document patterns in CLAUDE.md:
   "We use custom hooks for state management"
   "API calls use the apiClient wrapper"
   "Components follow atomic design"

2. Reference existing examples:
   "Use the same pattern as components/UserList.tsx"

3. State constraints upfront:
   "Don't use Redux, we use Context API"
   "Must work with our existing auth system"

**Try again with:**
[Rewrite their prompt mentioning patterns/examples]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### For "Incomplete/Vague"

**Most likely causes:**
1. Question was too broad
2. Ambiguous requirements
3. Multiple valid approaches exist

**Diagnosis:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 DIAGNOSIS: SCOPE TOO BROAD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The question was too open-ended for a specific answer.

**What's happening:**
When requirements are ambiguous, I have to either:
• Ask clarifying questions, or
• Give a general overview

Both can feel incomplete.

**How to fix:**
Break it down into specific sub-questions:

Instead of: "How do I add authentication?"
Try:
1. "Should I use JWT or sessions for my REST API?"
2. "Where should I store the auth token in my React app?"
3. "How do I protect routes in Next.js?"

**Try again with:**
[Rewrite as specific, focused questions]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### For "Code Doesn't Work"

**Most likely causes:**
1. Context missing (Claude doesn't see dependency versions)
2. Project-specific config not mentioned
3. Environment differences

**Diagnosis:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 DIAGNOSIS: ENVIRONMENT MISMATCH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The code works in general but not in YOUR environment.

**What's happening:**
Without seeing package.json, tsconfig, or your setup,
I suggested code that works generically but may not
match your specific versions/configuration.

**How to fix:**
1. Include package.json in context:
   Shows versions I should target

2. Mention relevant config:
   "We use TypeScript strict mode"
   "Next.js 14 with app router"

3. Share the actual error:
   Error messages are goldmines for debugging

**Try again with:**
[Rewrite with environment details and error]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### For "Forgot Context"

**Most likely causes:**
1. Conversation too long (context limit hit)
2. Relevant info in old messages
3. Context was never explicit

**Diagnosis:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 DIAGNOSIS: CONTEXT LOSS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The conversation got too long or context wasn't maintained.

**What's happening:**
Long conversations can hit token limits, causing older
messages to drop out of context.

**How to fix:**
1. Use /remember for important facts:
   Stores info persistently across sessions

2. Start fresh when switching topics:
   New conversation for new problems

3. Re-state context in each prompt:
   "In my React app (the one using Redux)..."

4. Use CLAUDE.md for project facts:
   Permanent project context

**Best practice:**
Each Claude Code session should have a focused goal.
Start new sessions for new tasks.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 3: Action Plan

After diagnosis, provide concrete next steps:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 YOUR ACTION PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Immediate fix:**
[Specific action for this problem]

**Long-term improvement:**
[Setup changes to prevent future issues]

**Try this prompt:**
[Improved version of their original prompt]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Need more help?
• /trike:prompt-help — Learn prompting patterns
• /trike:setup-check — Audit your project setup

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

</process>

<debugging_framework>

Most Claude Code issues fall into these categories:

**Context Problems (60% of issues):**
- Missing CLAUDE.md
- Wrong files in context
- .claudeignore excluding important files
- Project patterns not documented

**Prompt Problems (25% of issues):**
- Too vague
- Missing constraints
- No examples referenced
- Framework not mentioned

**Tool Selection (10% of issues):**
- Using chat when should use /plan
- Not using /search to find examples
- Not using skills for specialized tasks

**Environment (5% of issues):**
- Version mismatches
- Config not mentioned
- Dependencies not in context

</debugging_framework>
