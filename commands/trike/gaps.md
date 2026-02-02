---
name: trike:gaps
description: Check what you skipped and suggest going back
allowed-tools:
  - Read
  - Bash
---

<objective>
Identify skipped milestones and offer to go back to fill those gaps.

This is NOT a comprehension quiz - it's a "what did you skip?" checker.
</objective>

<process>

## Step 1: Load Progress and Roadmap

```bash
PROGRESS=$(cat .trike/progress.json)
CURRENT_MILESTONE=$(echo "$PROGRESS" | grep -oP '"currentMilestone":\s*\K\d+')
COMPLETED_MILESTONES=$(echo "$PROGRESS" | grep -oP '"completedMilestones":\s*\[\K[^\]]+' | tr -d '"' | tr ',' ' ')
SKIPPED_MILESTONES=$(echo "$PROGRESS" | grep -oP '"skippedMilestones":\s*\[\K[^\]]+' | tr -d '"' | tr ',' ' ')
```

Read roadmap:
```bash
ROADMAP=$(cat .trike/learning-path.md)
```

## Step 2: Identify Gaps

Compare completed vs current position to find skipped milestones:

```bash
# For each milestone from 1 to CURRENT_MILESTONE-1
# Check if it's in COMPLETED_MILESTONES
# If not, it was skipped
```

Combine with explicit SKIPPED_MILESTONES from progress.json.

## Step 3: Display Results

### If No Gaps (Nothing Skipped)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GAP CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 No gaps! You didn't skip anything.

You've completed every milestone in order:
✓ Milestone 1
✓ Milestone 2
✓ Milestone 3
[... list all completed]

Your foundation is solid.

▶ NEXT

/trike:next — Continue building

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### If Gaps Exist (Skipped Milestones)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GAP CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You skipped [X] milestone(s):

```

For each skipped milestone, extract from roadmap and display:

```
⊘ Milestone [N]: [Name]

**What you missed:**
• [Concept 1 from that milestone]
• [Concept 2]
• [Concept 3]

**Why it matters:**
[Brief explanation from roadmap of what this milestone delivers]

**Go back:** /trike:back-to [N]

---
```

Then summarize:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Options:**

1. Go back and fill gaps
   Use /trike:back-to [milestone number] to revisit

2. Continue without them
   You can always come back later

3. Get a quick summary
   I can explain the skipped concepts briefly right now

Which would you prefer?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 4: Wait for User Choice

If they ask for quick summary, provide condensed explanations of skipped concepts.

If they choose to go back, remind them of the command:
```
To fill the gap:
/trike:back-to [milestone number]

For example: /trike:back-to 6
```

</process>

<teaching_principles>

## Why This Approach

**Old approach:** Quiz them on everything (annoying, feels like school)
**New approach:** Show what they skipped, let them decide

**Philosophy:**
- Skipping is OK if you know what you're doing
- But you should KNOW what you skipped
- Make it easy to go back and fill gaps

## When Users Skip

**Valid reasons to skip:**
- Already know the concept
- Want to see end result first, then loop back
- Topic not relevant to their specific project

**Red flags (gaps that will cause problems):**
- Skipped fundamental concepts
- Building on top of skipped material
- Multiple sequential skips

## Tone

- No judgment about skipping
- Matter-of-fact: "here's what you missed"
- Helpful: "easy to go back if you want"
- Encouraging: "you can always fill these later"

</teaching_principles>

<example>

User at Milestone 7, skipped Milestone 6:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GAP CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You skipped 1 milestone:

⊘ Milestone 6: Connect to Claude API (AI Post Generation)

**What you missed:**
• How APIs work: sending requests and receiving responses
• Async JavaScript: waiting for responses without freezing
• Error handling: gracefully handling API failures
• Working with API keys securely

**Why it matters:**
This is where your app actually talks to Claude to generate
posts. Right now you're using hardcoded content, but this
milestone makes it dynamic and AI-powered.

**Go back:** /trike:back-to 6

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Options:**

1. Go back and fill gaps
   Use /trike:back-to 6 to learn API integration

2. Continue without it
   Your app works with hardcoded content for now

3. Get a quick summary
   I can explain APIs and async briefly right now

Which would you prefer?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

</example>

<success_criteria>
- All skipped milestones identified accurately
- Clear summary of what each skipped milestone taught
- Easy navigation to go back (/trike:back-to commands)
- No judgment, just information
- User empowered to make informed choice about filling gaps
</success_criteria>
