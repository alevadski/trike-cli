---
name: trike:progress
description: Show your current progress and what to do next
allowed-tools:
  - Read
  - Bash
---

<objective>
This is THE RECOVERY COMMAND. Use it anytime to:
- See where you are in the learning journey
- Understand what you've completed
- Know exactly what to do next

Never let the user feel lost.
</objective>

<process>

## Step 1: Load Progress

Read progress file with error handling:
```bash
if [ ! -f .trike/progress.json ]; then
  PROGRESS_EXISTS="false"
else
  PROGRESS_EXISTS="true"
fi
```

## Step 2: Display Based on State

### If No Progress File

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 WELCOME TO TRIKE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You haven't started your learning journey yet.

Trike teaches you to code using AI-native development.
You'll build real projects and actually understand what you're building.

▶ START YOUR JOURNEY

/trike:start — Learn terminal and Claude Code basics

This takes about 30 minutes and teaches you:
• How to use the terminal
• How to work with Claude Code
• What slash commands do

Ready? Run /trike:start when you are.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Stop here. Do NOT continue.

### If Progress Exists

Read and parse progress:
```bash
PROGRESS=$(cat .trike/progress.json)
CURRENT_STAGE=$(echo "$PROGRESS" | grep -oP '"currentStage":\s*"\K[^"]+')
COMPLETED_STAGES=$(echo "$PROGRESS" | grep -oP '"completedStages":\s*\[\K[^\]]+' | tr -d '"' | tr ',' '\n')
COMPLETED_COUNT=$(echo "$COMPLETED_STAGES" | grep -v '^$' | wc -l)
TOTAL_STAGES=6
NEXT_UP=$(echo "$PROGRESS" | grep -oP '"nextUp":\s*"\K[^"]+')
```

Calculate progress percentage:
```bash
PROGRESS_PERCENT=$(( COMPLETED_COUNT * 100 / TOTAL_STAGES ))
```

Display current status:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 YOUR LEARNING PROGRESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Current Stage:** [stage name from CURRENT_STAGE]

**Overall Progress:** [PROGRESS_PERCENT]%
[progress bar: ████████░░░░░░░░]

**Completed Stages:**
[list completed stages with ✓]

**What You've Learned:**
[Based on completed stages, list key learnings]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▶ NEXT UP

[NEXT_UP] — [description of what this command does]

[Contextual message about what to expect]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Lost or confused? Type /trike:help to see all commands.
Need help? Type /trike:stuck to get unstuck.
```

## Step 3: Stage-Specific Context

Based on current stage, provide specific guidance:

**If in "orientation":**
"You're learning the basics of terminal and Claude Code. This is quick - just follow along!"

**If in "foundations":**
"You're building your dashboard. This is where real learning happens. Take your time, practice, and ask questions."

**If in "direction":**
"Time to choose what you want to build! Think about what excites you."

**If in "project":**
"Building your project! Remember: never accept code you can't explain. Ask questions!"

**If in "ship":**
"Almost there! Time to deploy your project and show it to the world."

**If "graduated":**
"You've completed Trike! You can now use Claude Code independently. The training wheels are off! 🎉"

</process>

<success_criteria>
- User knows exactly where they are
- User knows exactly what to do next
- User feels oriented, not lost
- Clear next command is provided
</success_criteria>
