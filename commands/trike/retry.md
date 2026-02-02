---
name: trike:retry
description: Retry the current step (start over from beginning)
allowed-tools:
  - Read
  - Write
  - Bash
---

<objective>
Restart the current step from the beginning.

Useful when:
- Something went wrong during execution
- User wants to see the build process again
- Code got messed up and needs clean rebuild
- User wasn't paying attention and wants to redo
</objective>

<process>

## Step 1: Load Current State

```bash
if [ ! -f .trike/progress.json ]; then
  echo "No progress found. Run /trike:start first!"
  exit 1
fi

PROGRESS=$(cat .trike/progress.json)
CURRENT_MILESTONE=$(echo "$PROGRESS" | grep -oP '"currentMilestone":\s*\K\d+')
CURRENT_STEP=$(echo "$PROGRESS" | grep -oP '"currentStep":\s*\K\d+')
CURRENT_PHASE=$(echo "$PROGRESS" | grep -oP '"currentPhase":\s*"\K[^"]+')
```

## Step 2: Confirm Intent

Ask user why they want to retry:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 RETRY CURRENT STEP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You're currently on:
**Milestone [N]:** [Name]
**Step [X]:** [Name]
**Phase:** [Current phase or "not started"]

Retrying will restart this step from the beginning.

Why do you want to retry?
1. Something went wrong
2. Want to see the build process again
3. Code got messed up
4. Want to pay closer attention this time
5. Other reason

This helps me tailor the retry.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Wait for response.

## Step 3: Determine Retry Approach

Based on their reason:

### Reason: "Something went wrong" / "Code got messed up"
```
Let's fix it!

First, let me check what files were affected in this step...

[List files that were created/modified in this step]

I'll:
1. Revert these files to before the step
2. Walk through the build again
3. Make sure it works this time

Ready?
```

Action:
```bash
# Revert to previous git commit (before this step)
# Or: delete/restore affected files
git reset --hard [commit-before-this-step]
```

### Reason: "Want to see the build process again"
```
Good idea - watching the build helps understanding!

This time, I'll:
1. Explain each action as I do it
2. Pause between major steps
3. Show you what's changing

The code already exists, so I'll delete it first
and rebuild from scratch.

Ready?
```

Action:
```bash
# Delete files created in this step
# Will rebuild them during retry
```

### Reason: "Want to pay closer attention"
```
Smart! Understanding is key.

This time:
1. I'll go slower
2. Ask you to predict what happens next
3. Make sure you can explain each piece

Ready to retry with focus?
```

### Reason: "Other"
```
Tell me more - what do you want to get out of the retry?
```

## Step 4: Reset Progress

Update progress to beginning of current step:
```bash
cat > .trike/progress.json << EOF
{
  "currentStage": "[CURRENT_STAGE]",
  "currentMilestone": $CURRENT_MILESTONE,
  "currentStep": $CURRENT_STEP,
  "currentPhase": null,
  [... other fields ...]
}
EOF
```

## Step 5: Clean Slate

If needed, revert code changes:
```bash
# Option 1: Git reset to before this step
git reset --hard [appropriate-commit]

# Option 2: Delete specific files
rm [files-created-in-this-step]

# Option 3: Keep files but will rebuild (for demo purposes)
```

## Step 6: Start Retry

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ RESET TO START OF STEP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Milestone [N]:** [Name]
**Step [X]:** [Name]

Reset complete. Clean slate.

▶ NEXT UP

/trike:next — Start the step again

[Based on their reason, add specific guidance]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

</process>

<retry_modes>

## Mode 1: Full Reset (Code Broken)
- Revert code to previous state
- Run full teaching cycle: Discuss → Plan → Execute → Explain → Verify
- Watch for what went wrong before
- Fix it this time

## Mode 2: Demo Retry (Want to Watch Again)
- Delete files
- Focus on Execute phase (show the build)
- Narrate heavily
- Can fast-forward through Discuss/Plan if they remember

## Mode 3: Deep Understanding Retry
- Keep existing code
- Focus on Explain + Verify phases
- Make them predict what each piece does
- Test understanding more rigorously

</retry_modes>

<teaching_notes>

**Why retry matters:**
- Repetition solidifies learning
- Watching build process twice helps understanding
- Clean slate helps after mistakes
- Gives user control over their pace

**When to suggest retry:**
- User seems confused during verify phase
- Something broke during execute
- User admits they weren't paying attention
- User wants deeper understanding

**How to make retry valuable:**
- Don't just repeat exactly the same
- Adjust based on why they're retrying
- Add more explanation if they were confused
- Go faster if they just want to see it again
- Make them more active in the process

</teaching_notes>

<difference_from_other_commands>

**vs /trike:back:**
- /trike:back → Go to PREVIOUS step
- /trike:retry → Redo CURRENT step

**vs /trike:update-roadmap:**
- /trike:update-roadmap → Change the plan
- /trike:retry → Redo with same plan

**vs /trike:next (after gap):**
- /trike:retry → Intentional redo
- Getting stuck and asking to continue → Different flow

</difference_from_other_commands>

<success_criteria>
- User's reason for retry understood
- Code state reset appropriately
- Progress reset to beginning of current step
- Clear path forward (/trike:next)
- Retry will be more valuable than first attempt
</success_criteria>
