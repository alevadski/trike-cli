---
name: trike:start
description: Begin your vibecoding journey
allowed-tools:
  - Read
  - Write
  - Bash
  - AskUserQuestion
---

<objective>
Orientation - Step 1: Welcome

Read the orientation guide and present a welcoming introduction to Trike.
Keep output brief (~20 lines) and end with clear navigation.

If progress already exists, ask user if they want to continue or start fresh.
</objective>

<process>

## Step 1: Check if Already Started

```bash
if [ -f .trike/progress.json ]; then
  STAGE=$(cat .trike/progress.json | grep -oP '"currentStage":\s*"\K[^"]+')
  ORIENTATION_STEP=$(cat .trike/progress.json | grep -oP '"orientationStep":\s*\K\d+' || echo "null")
  NEXT_UP=$(cat .trike/progress.json | grep -oP '"nextUp":\s*"\K[^"]+')
  PROJECT_GOAL=$(cat .trike/progress.json | grep -oP '"projectGoal":\s*"\K[^"]+' || echo "")

  # Set flag that existing progress was found
  echo "EXISTING_PROGRESS=true"
  echo "CURRENT_STAGE=$STAGE"
  echo "ORIENTATION_STEP=$ORIENTATION_STEP"
  echo "NEXT_UP=$NEXT_UP"
  echo "PROJECT_GOAL=$PROJECT_GOAL"
fi
```

If EXISTING_PROGRESS is true, show what they were working on and ask what to do:

**Display current progress info:**
- If in orientation: "You're in orientation (step X of 5)"
- If in planning: "You're planning your project"
- If in build: "You're building: [PROJECT_GOAL]"
- Show next command: "Your next step: [NEXT_UP]"

**Then use AskUserQuestion:**
```
question: "What would you like to do?"
header: "Existing Progress"
multiSelect: false
options:
  - label: "Continue where I left off"
    description: "Pick up your learning journey from where you stopped"
  - label: "Start fresh (backs up old progress)"
    description: "Begin a new project - your current progress will be saved as a backup"
```

**If user chooses "Continue where I left off":**

Show welcome back message:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Welcome back to Trike! 🚲

[Brief reminder of where they are - 2-3 lines based on stage]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▶ NEXT

[NEXT_UP command] — Continue your journey

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Then exit - do NOT proceed to welcome screen or initialize new progress.

**If user chooses "Start fresh":**

Backup existing progress:
```bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
cp .trike/progress.json .trike/progress.backup.$TIMESTAMP.json
echo "✓ Backed up your progress to .trike/progress.backup.$TIMESTAMP.json"
```

Then proceed to Step 2 (read orientation guide and show welcome).

**If no existing progress found:**

Proceed directly to Step 2.

## Step 2: Read Orientation Guide

Read the step 1 reference file:
```bash
cat ~/.claude/trike/references/orientation-step1.md
```

Use this as context for creating your welcome message.

## Step 3: Present Welcome

Based on the orientation guide, create a welcoming introduction that:

**Includes:**
- Brief header with Trike name
- What Trike is (training wheels for building with AI)
- Key benefits in bullet form (4-5 points max)
- Training wheels metaphor
- Clear navigation options

**Format:**
- Use decorative lines (━) for visual separation
- Keep total output under 25 lines
- End with ▶ NEXT section showing navigation

**Perspective:**
- Trike is speaking (first person for Trike)
- Refer to Claude Code in third person when mentioning it
- Example: "Claude Code will build the code while Trike guides you"

**Navigation to include:**
- /trike:next — Continue orientation
- /trike:plan — Skip to planning (if already familiar with Claude Code)
- /trike:help — See all commands

## Step 4: Initialize Progress

```bash
mkdir -p .trike

cat > .trike/progress.json << 'EOF'
{
  "currentStage": "orientation",
  "orientationStep": 1,
  "currentMilestone": null,
  "currentStep": null,
  "currentPhase": null,
  "completedStages": [],
  "completedMilestones": [],
  "completedSteps": [],
  "lastCommand": "/trike:start",
  "lastActive": "$(date -Iseconds)",
  "nextUp": "/trike:next",
  "projectGoal": null,
  "projectV1Scope": null,
  "learningPath": [],
  "learningStyle": null,
  "userGoals": null,
  "reviewMode": false,
  "previousMilestone": null,
  "skippedMilestones": []
}
EOF
```

</process>

<guidance>
Remember:
- Keep it brief and inviting
- No jargon or technical terms
- Make them excited to continue
- Clear what happens next
</guidance>
