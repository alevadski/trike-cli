---
name: trike:back-to
description: Go back to a specific milestone for review
allowed-tools:
  - Read
  - Write
  - Bash
---

<objective>
Jump back to a specific milestone for review.

Useful when:
- User wants to review earlier concept
- Found a gap in understanding
- Want to rebuild something from scratch
- Need to refresh memory before advancing
</objective>

<process>

## Step 1: Parse Target

User will specify like:
- `/trike:back-to milestone 2`
- `/trike:back-to [milestone-name]`

Extract which milestone they want to go back to.

## Step 2: Load Current State

```bash
PROGRESS=$(cat .trike/progress.json)
CURRENT_MILESTONE=$(echo "$PROGRESS" | grep -oP '"currentMilestone":\s*\K\d+')
CURRENT_STEP=$(echo "$PROGRESS" | grep -oP '"currentStep":\s*\K\d+')

ROADMAP=$(cat .trike/learning-path.md)
# Parse roadmap to find target milestone details
```

## Step 3: Validate Target

If target is current milestone:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You're already on Milestone [X]!

To review current milestone from start:
/trike:retry

To go back one step within this milestone:
/trike:back

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
Stop here.

If target is ahead of current position:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Milestone [X] is ahead of you.

You're currently on Milestone [Y].

To skip ahead:
/trike:skip-to milestone [X]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
Stop here.

If target is behind current position (valid use case):
Continue...

## Step 4: Explain What's Happening

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GO BACK TO MILESTONE [X]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You're currently: Milestone [Y], Step [Z]
Going back to: Milestone [X]

**Milestone [X]: [Name]**
• [Brief description]
• Taught: [Concepts]
• Built: [Deliverables]

Why are you going back?
1. Want to review the concepts
2. Found a gap in understanding
3. Want to rebuild something
4. Just curious / refreshing memory

This helps me tailor the review.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Wait for response.

## Step 5: Determine Review Mode

Based on their reason:

### Reason: "Review concepts"
```
Got it - concept review.

When we go back, I'll:
• Focus on EXPLAIN phase (concepts and architecture)
• Skip the building (code already exists)
• Make sure you can explain how it works
• Quick verify before letting you continue

Sound good?
```

### Reason: "Found a gap"
```
Good catch! Better to fill gaps now than get confused later.

What specifically is unclear?
[Let them explain the gap]

When we go back, I'll:
• Focus on [unclear concept]
• Explain it differently this time
• Show you where it appears in the code
• Make sure you really get it before moving forward
```

### Reason: "Want to rebuild"
```
Want to see the build process again?

I'll:
• Delete the code from Milestone [X]
• Walk through the full build again
• Explain as I go
• You'll see the pieces come together

Ready for a rebuild?
```

### Reason: "Just curious / refreshing"
```
Smart - refreshing your memory helps!

I'll give you a quick recap:
• What was built
• Key concepts
• How it fits in your project

Then you can continue where you left off.
```

## Step 6: Update Progress

```bash
cat > .trike/progress.json << EOF
{
  "currentStage": "build",
  "currentMilestone": [TARGET_MILESTONE],
  "currentStep": 1,
  "currentPhase": null,
  "previousMilestone": $CURRENT_MILESTONE,
  "previousStep": $CURRENT_STEP,
  "reviewMode": true,
  [... other fields ...]
}
EOF
```

## Step 7: Begin Review

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ BACK TO MILESTONE [X]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Milestone [X]: [Name]**

[Show brief overview of what this milestone covers]

**Your code from this milestone:**
[List files that were created]

▶ NEXT UP

/trike:next — Review Milestone [X]

[Based on review mode, explain what will happen]

When done reviewing:
/trike:back-to milestone [Y] - Return to where you were

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

</process>

<review_modes>

## Mode 1: Concept Review
- Code already exists
- Focus on: Explain + Verify phases
- Skip: Execute phase
- Goal: Refresh understanding

## Mode 2: Gap Filling
- Code already exists
- Focus on: Deep explanation of gap
- Interactive verification
- Goal: Fill specific understanding gap

## Mode 3: Full Rebuild
- Delete existing code
- Full teaching cycle: Discuss → Plan → Execute → Explain → Verify
- Goal: See build process again

## Mode 4: Quick Recap
- Just summarize
- Don't run full cycle
- Show key points
- Goal: Quick memory refresh

</review_modes>

<teaching_notes>

**Track review context:**
- Remember where they came from (currentMilestone before back-to)
- Set reviewMode flag
- Offer easy return: /trike:back-to milestone [previous]

**Adjust teaching in review mode:**
- Less hand-holding (they've learned this before)
- Focus on what they're reviewing for
- Don't re-teach everything, target the gap
- Make it quick and focused

**After review complete:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ REVIEW COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You reviewed: Milestone [X]
Gap filled: [What they learned]

▶ CONTINUE JOURNEY

/trike:back-to milestone [Y] - Return to where you were

OR

/trike:next - Continue from here (if you want to redo forward path)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

</teaching_notes>

<difference_from_other_commands>

**vs /trike:back:**
- /trike:back → Go back ONE step
- /trike:back-to [M] → Jump to specific MILESTONE

**vs /trike:retry:**
- /trike:retry → Redo CURRENT step
- /trike:back-to [M] → Go to PREVIOUS milestone

**vs /trike:skip-to:**
- /trike:skip-to [M] → Jump FORWARD
- /trike:back-to [M] → Jump BACKWARD

</difference_from_other_commands>

<success_criteria>
- Target milestone identified correctly
- Review mode determined based on user's reason
- Progress updated with reviewMode flag
- Code state appropriate for review type
- Clear path forward and back
- User knows how to return to previous position
</success_criteria>
