---
name: trike:skip-to
description: Skip ahead to a specific milestone or step
allowed-tools:
  - Read
  - Write
  - Bash
  - AskUserQuestion
---

<objective>
Allow users to skip ahead in their roadmap.

WARNING: Skipping can leave gaps in understanding.
This command should verify they're ready before allowing skip.
</objective>

<process>

## Step 1: Parse Target

User will specify like:
- `/trike:skip-to milestone 3`
- `/trike:skip-to step 5`
- `/trike:skip-to [milestone-name]`

Extract what they want to skip to.

## Step 2: Load Current State

```bash
PROGRESS=$(cat .trike/progress.json)
CURRENT_MILESTONE=$(echo "$PROGRESS" | grep -oP '"currentMilestone":\s*\K\d+')
CURRENT_STEP=$(echo "$PROGRESS" | grep -oP '"currentStep":\s*\K\d+')

ROADMAP=$(cat .trike/learning-path.md)
# Parse roadmap to find target milestone/step
```

## Step 3: Validate Skip

If trying to skip backward:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You're trying to go backwards.

Use these instead:
• /trike:back - Go back one step
• /trike:back-to [milestone] - Jump back to milestone

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
Stop here.

If trying to skip forward:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SKIP AHEAD?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You're currently: Milestone [X], Step [Y]
You want to skip to: Milestone [Z]

This means skipping:
• Milestone [X+1]: [Name] - [What they'd miss]
• Milestone [X+2]: [Name] - [What they'd miss]
• [etc.]

**Warning:** Skipping can leave gaps in understanding.
Later milestones build on earlier ones.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 4: Check Readiness

Ask verification questions about skipped content:

```
Before skipping, let's verify you understand the concepts
you'd be skipping:

From Milestone [X+1], explain:
1. [Key concept 1]
2. [Key concept 2]

[If they can explain:]
✓ You understand [Milestone X+1] concepts

[If they can't:]
○ Gap detected in [concept].

Skipping would make future milestones confusing.

Options:
1. Quick review of [concept] - then skip (recommended)
2. Skip anyway (not recommended - may cause confusion)
3. Don't skip, work through it properly

What makes sense?
```

Repeat for each milestone being skipped.

## Step 5: Handle Based on Results

### If they understand all skipped concepts:
```
✓ You understand the concepts from what you're skipping.

Looks like you may have:
• Learned this elsewhere
• Built something similar before
• Already understand these basics

Skipping makes sense in your case.

Should I:
1. Skip and mark as complete (assumes you know it)
2. Skip but mark as "fast-forwarded" (we can review later if needed)
```

### If they have gaps:
```
○ You have gaps in [concepts].

Skipping now would make [future milestone] very confusing
because it depends on [concept].

Better options:
1. Let me quickly teach [missing concepts] (~10 min)
2. Go through the skipped milestones but fast-tracked
3. Don't skip - work through properly

What works better?
```

### If they want to skip despite gaps:
```
I understand you want to move faster, but skipping without
understanding [concepts] will cause problems later.

Here's what will happen:
• [Future milestone] will be confusing
• You'll need to come back and learn [concept] anyway
• You might get stuck and frustrated

I strongly recommend option 2: Fast-tracked version
• Same content, less handholding
• Just the essentials
• 2-3x faster than full pace
• You still learn the foundations

Sound better than skipping entirely?
```

## Step 6: Execute Skip (if approved)

Update progress:
```bash
cat > .trike/progress.json << EOF
{
  "currentStage": "build",
  "currentMilestone": [TARGET_MILESTONE],
  "currentStep": 1,
  "currentPhase": null,
  "completedMilestones": [add skipped milestones],
  "completedSteps": [add skipped steps],
  "skippedMilestones": [track what was skipped],
  [... other fields ...]
}
EOF
```

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ SKIPPED TO MILESTONE [Z]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Milestone [Z]:** [Name]

**What you'll build:**
[Preview]

**What you'll learn:**
• [Concepts]

**Builds on:**
• [Skipped concepts they verified]

If you find yourself confused, you can:
• /trike:back-to [milestone] - Review skipped content
• /trike:explain [concept] - Deep dive on any concept
• /trike:stuck - Get help

▶ NEXT UP

/trike:next — Start Milestone [Z]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

</process>

<valid_reasons_to_skip>

**When skipping makes sense:**
1. User already knows the skipped concepts (from other learning)
2. User built something similar before
3. Roadmap was too conservative for their level
4. They want to jump to specific feature they care about

**When to discourage skipping:**
1. User is impatient but doesn't understand concepts
2. Concepts have dependencies on skipped content
3. User just wants "finished fast" without understanding
4. They're frustrated but skipping won't help

</valid_reasons_to_skip>

<alternative_to_skipping>

Instead of full skip, offer "fast-track mode":

```
How about fast-tracked instead of skipped?

**Fast-tracked:**
• I'll build it (you watch)
• I'll explain the key points
• Quick verify (not deep)
• 3x faster than full teaching pace
• You still learn the foundations

**vs Skipping:**
• Jump ahead with no learning
• Risk confusion later
• Gaps in understanding
• May need to come back

Fast-track lets you move faster while still learning.
Takes 20 minutes instead of 1 hour, but you won't have gaps.

Want to try fast-track mode?
```

</alternative_to_skipping>

<success_criteria>
- User's skip target identified
- Dependencies and gaps checked
- User verified understanding of skipped concepts
- If gaps exist, alternatives offered
- If approved, progress updated correctly
- User warned about potential confusion
- Path forward clear
</success_criteria>
