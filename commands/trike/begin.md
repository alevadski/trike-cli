---
name: trike:begin
description: Select your project and generate your personalized learning path
allowed-tools:
  - Read
  - Write
  - Bash
  - Task
  - AskUserQuestion
---

<objective>
Guide user through project selection, analyze project, generate setup files, create personalized curriculum, and launch first milestone - all with brief, interactive prompts.
</objective>

<process>

## Prerequisites

Read `.trike/progress.json` to get quiz answers.

## Step 1: Project Selection

Ask (brief): "Which project should we use for your learning journey?"

Options:
1. Current directory
2. Different project
3. Help me choose

Wait for response.

## Step 2: Verify Project

Check for project files in selected directory.

If found: "I see this is a [framework] project. Correct?"
If not: "No project files found. Try a different directory?"

Wait for confirmation.

## Step 3: Safety Check

If >10k files: "Large project - analysis might take longer. Continue?"
If .env files: "I'll exclude .env files from analysis."

## Step 4: Analyze Project

Say: "Analyzing your project..."

Use Task tool to spawn `trike-project-analyzer` agent.

## Step 5: Review Analysis

Present findings briefly:
```
Tech stack: [detected stack]
Skills recommended: [2-3 skills]
MCPs recommended: [2-3 MCPs]
```

Ask: "Look good? I'll generate your setup files next."

## Step 6: Generate Setup

Say: "Generating optimal Claude Code setup..."

Use Task tool to spawn `trike-setup-optimizer` agent.

## Step 7: Generate Curriculum

Say: "Creating your personalized learning path..."

Use Task tool to spawn `trike-curriculum-planner` agent.

**Wait for agent to complete and verify `.trike/learning-path.md` was created.**

## Step 8: Present Learning Path

Read `.trike/learning-path.md` to get milestone count and topics.

Show brief overview (match this format exactly):
```
✅ Your Learning Path

[X] milestones covering:
• [Topic 1 from learning-path.md]
• [Topic 2 from learning-path.md]
• [Topic 3 from learning-path.md]

Setup Status:
✅ CLAUDE.md created
✅ .claudeignore configured
[✅/⬜] Skills recommended
[✅/⬜] MCPs recommended
```

## Step 9: Navigation Block

End with:
```
---
Ready to start? Run /trike:next for Milestone 1
```

</process>
