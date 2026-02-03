---
name: trike:help
description: Show all Trike commands and current progress
---

<objective>
Display the complete Trike command reference with user's current position in the learning journey.
</objective>

<process>

## Step 1: Check Progress

Read progress file:
```bash
PROGRESS=$(cat .trike/progress.json 2>/dev/null || echo "none")
```

If progress exists, extract current stage:
```bash
CURRENT_STAGE=$(echo "$PROGRESS" | grep -oP '"currentStage":\s*"\K[^"]+' || echo "not-started")
NEXT_COMMAND=$(echo "$PROGRESS" | grep -oP '"nextUp":\s*"\K[^"]+' || echo "/trike:start")
```

## Step 2: Display Help

Present the command reference with their current position highlighted:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 TRIKE COMMANDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Training wheels for Claude Code
Stop typing. Start vibing. 100x your Claude Code game.

## Your Journey

[If CURRENT_STAGE != "not-started", show:]
**Current Stage:** [stage name]
**Next Command:** [NEXT_COMMAND]

[Otherwise:]
**Status:** Not started
**Begin with:** /trike:start

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Navigation Commands

**`/trike:progress`**
Where am I? What's next?
Use this anytime you're lost or want to see your progress.

**`/trike:help`**
Show this help (you're here!)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Learning Journey

**Stage 1: Orientation**
`/trike:start` - Learn terminal, Claude Code, slash commands

**Stage 2: Plan**
`/trike:plan` - Plan what YOU want to build
Get a personalized learning path for YOUR project

**Stage 3: Build**
`/trike:build` - Start building your project
`/trike:next` or `/trike:lesson` - Continue to next step
Each step follows: Discuss → Plan → Execute → Explain → Verify

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Navigation Commands

**`/trike:back`**
Go back one step to review

**`/trike:back-to [milestone]`**
Jump back to specific milestone for review

**`/trike:skip-to [milestone]`**
Skip ahead (with understanding verification)

**`/trike:retry`**
Redo current step from beginning

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Learning Support

**`/trike:stuck`**
Get help when confused

**`/trike:explain [topic]`**
Deep dive on any concept

**`/trike:gaps`**
Check for understanding gaps

**`/trike:update-roadmap`**
Modify your learning path

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Philosophy

Like training wheels on a bike, Trike:
• Enables what you couldn't do alone
• Teaches you gradually
• Comes off when you're ready

**Core principle:** Never accept code you can't explain.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[If they haven't started:]
▶ READY TO START?

/trike:start — Begin your coding journey

[Otherwise:]
▶ CONTINUE YOUR JOURNEY

[NEXT_COMMAND] — [description based on what's next]

</process>
