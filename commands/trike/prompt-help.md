---
name: trike:prompt-help
description: Get suggestions for improving your Claude Code prompts and interactions
allowed-tools:
  - Read
---

<objective>
Help users improve their prompting with brief, specific feedback. No lengthy explanations.
</objective>

<process>

## Step 1: Understand Need

Ask: "What do you need help with?"

Options:
1. Improve a specific prompt
2. General prompting tips
3. Debug unexpected response
4. Make responses more project-specific

Wait for choice.

## Step 2: Provide Targeted Help

### Option 1: Improve Specific Prompt

Ask: "Share your prompt."

Then show:
```
Issues:
• [Problem 1]
• [Problem 2]

Improved version:
[Better prompt]

Why this works better:
[Brief explanation - 1-2 sentences]
```

### Option 2: General Tips

Show 5 core principles (brief!):
1. Be specific, not vague
2. Provide context upfront
3. Use examples
4. State your goal
5. Iterate on responses

### Option 3: Debug Response

Ask: "What did you ask, and what did you get?"

Then: "Here's why + how to fix it" (brief!)

### Option 4: Context Optimization

Run mini setup audit, suggest CLAUDE.md improvements.

Keep all responses concise and actionable.

</process>
