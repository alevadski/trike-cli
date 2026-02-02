---
name: trike:back
description: Go back one step to review
allowed-tools:
  - Read
  - Write
  - Bash
---

<objective>
Go back to the previous step for review.

Useful when:
- User wants to review what they just learned
- Something didn't make sense and they want to revisit
- They want to see the explanation again
</objective>

<process>

## Step 1: Load Current State

```bash
if [ ! -f .trike/progress.json ]; then
  echo "No progress found. Run /trike:start first!"
  exit 1
fi

PROGRESS=$(cat .trike/progress.json)
CURRENT_STAGE=$(echo "$PROGRESS" | grep -oP '"currentStage":\s*"\K[^"]+')
CURRENT_MILESTONE=$(echo "$PROGRESS" | grep -oP '"currentMilestone":\s*\K\d+')
CURRENT_STEP=$(echo "$PROGRESS" | grep -oP '"currentStep":\s*\K\d+')
```

## Step 2: Check if Can Go Back

If currently on step 1 of milestone 1:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You're at the very beginning of your build.
There's nothing to go back to yet!

▶ OPTIONS

/trike:next - Continue forward
/trike:progress - See where you are
/trike:help - See all commands
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
Stop here.

## Step 3: Go Back One Step

If CURRENT_STEP > 1:
```bash
# Go back one step in current milestone
NEW_STEP=$((CURRENT_STEP - 1))
NEW_MILESTONE=$CURRENT_MILESTONE
```

If CURRENT_STEP == 1 and CURRENT_MILESTONE > 1:
```bash
# Go back to last step of previous milestone
NEW_MILESTONE=$((CURRENT_MILESTONE - 1))

# Load learning path to find how many steps in previous milestone
ROADMAP=$(cat .trike/learning-path.md)
# Parse to find step count for milestone NEW_MILESTONE
NEW_STEP=[last step number of that milestone]
```

## Step 4: Update Progress

```bash
# Update progress.json
cat > .trike/progress.json << EOF
{
  "currentStage": "$CURRENT_STAGE",
  "currentMilestone": $NEW_MILESTONE,
  "currentStep": $NEW_STEP,
  "currentPhase": null,
  [... keep other fields ...]
}
EOF
```

## Step 5: Load Previous Step Details

Read the roadmap to get details about the step we're going back to.

## Step 6: Display

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GOING BACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Moving back to:
**Milestone [NEW_MILESTONE]:** [Name]
**Step [NEW_STEP]:** [Name]

**What this step covered:**
[Brief description]

**What you built:**
[Deliverable]

**Concepts taught:**
• [Concept 1]
• [Concept 2]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▶ NEXT UP

/trike:next — Review this step

This will go through the full teaching cycle again.
The code already exists, so I'll focus on explaining.

If you just wanted to review and are ready to move forward:
/trike:skip-to [next milestone/step] — Skip ahead
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

</process>

<teaching_notes>
When user goes back and runs /trike:next:
- Code already exists (was built before)
- Focus on EXPLAIN and VERIFY phases
- Skip EXECUTE phase (already done)
- Maybe show: "Code already exists, let me explain how it works..."
- Can offer to rebuild from scratch if they want: "Want me to delete and rebuild to see it again?"
</teaching_notes>

<use_cases>
**When users should use this:**
- "Wait, I don't think I understood that last part"
- "Can you explain that authentication step again?"
- "I want to review what we just built"

**vs /trike:retry:**
- /trike:back → Go to previous step
- /trike:retry → Redo current step

**vs /trike:back-to:**
- /trike:back → Go back one step
- /trike:back-to [milestone] → Jump back to specific milestone
</use_cases>

<success_criteria>
- Progress updated to previous step
- User understands what step they're going back to
- Clear indication of what to run next
- Code state preserved (we're reviewing, not rebuilding yet)
</success_criteria>
