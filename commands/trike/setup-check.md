---
name: trike:setup-check
description: Audit any project's Claude Code setup and get optimization recommendations
allowed-tools:
  - Read
  - Bash
  - Task
---

<objective>
Audit project's Claude Code setup and provide brief, actionable recommendations with grade.
</objective>

<process>

## Step 1: Project Selection

Ask: "Which project should I audit? (current directory or specify path)"

Wait for response.

## Step 2: Analyze Setup

Check:
- CLAUDE.md quality
- .claudeignore presence
- .claude/ directory
- Project size

## Step 3: Calculate Grade

A = Excellent, B = Good, C = Basic, D = Minimal, F = None

## Step 4: Present Report (Brief!)

```
Setup Grade: [A-F]

Current Setup:
[✅/⬜] CLAUDE.md - [quality rating]
[✅/⬜] .claudeignore
[✅/⬜] Skills installed
[✅/⬜] MCPs configured

Top Recommendations:
1. [Highest priority fix]
2. [Second priority]
3. [Third priority]

Recommended Skills: [2-3 skills]
Recommended MCPs: [2-3 MCPs]
```

Keep it actionable and scannable.

## Step 5: Offer Help

Ask: "Want me to generate optimized setup files?"

If yes: spawn `trike-setup-optimizer` agent.

</process>
