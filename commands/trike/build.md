---
name: trike:build
description: Start building your project (begins Milestone 1)
allowed-tools:
  - Read
  - Write
  - Bash
  - Task
---

<objective>
Stage 3: Build

Transition user from planning to building.
Load their roadmap and start Milestone 1.
</objective>

<process>

## Step 1: Verify Prerequisites

Check they completed planning:
```bash
if [ ! -f .trike/progress.json ]; then
  echo "Run /trike:start first!"
  exit 1
fi

if [ ! -f .trike/learning-path.md ]; then
  echo "Run /trike:plan first to create your roadmap!"
  exit 1
fi

COMPLETED=$(cat .trike/progress.json | grep -q '"plan"' && echo "yes" || echo "no")

if [ "$COMPLETED" != "yes" ]; then
  echo "Complete planning first: /trike:plan"
  exit 1
fi
```

## Step 2: Load Roadmap

Read their learning path:
```bash
cat .trike/learning-path.md
```

Extract first milestone details.

## Step 3: Welcome to Building

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 LET'S BUILD!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You've planned [their project].
Now we're going to build it, step by step.

Your roadmap:
[Show milestone names and brief descriptions]

We'll start with Milestone 1 and work our way up.
Each milestone gets you closer to your goal.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 4: Milestone 1 Preview

Show first milestone:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 MILESTONE 1: [Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**What you'll build:**
[Deliverable description]

**What you'll learn:**
• [Concept 1]
• [Concept 2]
• [Concept 3 if exists]

**Success criteria:**
• [Criterion 1]
• [Criterion 2]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 5: Set Expectations

Explain the process:
```
Here's how building works:

1. **I'll explain** what we're building and why
2. **We'll plan** the approach together
3. **I'll execute** - writing the code while explaining
4. **I'll explain** what I built and how it works
5. **You verify** - tell me what you understand

If you can't explain it, we'll go deeper until you can.

**Core rule:** Never accept code you can't explain.

Ready to start?
```

## Step 6: Update Progress

Update state:
```bash
# Update progress.json to mark build stage started, currently on milestone 1
cat > .trike/progress.json << EOF
{
  "currentStage": "build",
  "currentMilestone": 1,
  "currentStep": 1,
  "currentPhase": null,
  "completedStages": ["orientation", "plan"],
  "completedMilestones": [],
  "completedSteps": [],
  "lastCommand": "/trike:build",
  "lastActive": "$(date -Iseconds)",
  "nextUp": "/trike:next",
  "projectGoal": "[from previous progress.json]",
  "projectV1Scope": "[from previous progress.json]",
  "learningPath": [list of milestone IDs]
}
EOF
```

## Step 7: Explain and Initialize Git (if needed)

Check if git repository exists:
```bash
if [ ! -d .git ]; then
  echo "GIT_NEEDS_INIT=true"
fi
```

If GIT_NEEDS_INIT is true, explain git to the user in beginner-friendly terms:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ONE MORE THING: SAVING YOUR PROGRESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before we start building, I'm going to set up something
called "version control" for your project.

**What is it?**
Think of it like a save button in a video game - but better.
Every time we complete a step, we'll create a "checkpoint"
of your code.

**Why do we need it?**
• You can see what changed at each step
• If something breaks, we can go back to a working version
• You can experiment without fear of breaking things
• It's how professional developers work

**What you'll see:**
After each step, I'll save a checkpoint with a message like
"Step 1: Built the homepage". You don't need to do anything -
it happens automatically.

**The tool:** It's called "Git" (you might've heard of GitHub).
Don't worry about learning Git commands right now - that comes
later if you want it. For now, it just quietly saves your work.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Setting up version control...
```

Initialize git repository:
```bash
git init
echo "✓ Version control ready!"
echo ""
```

Create initial commit:
```bash
git add .
git commit -m "Initialize project: $(cat .trike/progress.json | grep -oP '"projectGoal":\s*"\K[^"]+')"
echo "✓ First checkpoint created"
echo ""
```

If git already exists, skip this step silently.

## Step 8: Launch First Lesson

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ BUILD STAGE STARTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Starting Milestone 1: [Name]

▶ NEXT UP

/trike:next — Begin first step

This starts the build process. Let's go!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

</process>

<teaching_principles>
- Make the transition from planning to building feel exciting
- Clearly explain how the process works
- Set expectations about the teaching approach
- Show them the full roadmap so they see the journey
- Emphasize understanding over just writing code
</teaching_principles>

<success_criteria>
- User sees their full roadmap
- User understands how the teaching loop works
- User knows to run /trike:next to start building
- Progress updated to build stage, milestone 1
- User feels excited and ready, not overwhelmed
</success_criteria>
