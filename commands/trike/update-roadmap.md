---
name: trike:update-roadmap
description: Modify your learning path based on progress or goals
allowed-tools:
  - Read
  - Write
  - Task
  - AskUserQuestion
---

<objective>
Allow users to adjust their roadmap mid-journey.

Reasons to update:
- Current pace is too fast → Simplify, add intermediate steps
- Current pace is too slow → Combine steps, accelerate
- Goal changed → Add/remove features
- Want to skip something → Adjust scope
- Stuck on something → Break into smaller pieces
</objective>

<process>

## Step 1: Load Current Context

```bash
PROGRESS=$(cat .trike/progress.json)
ROADMAP=$(cat .trike/learning-path.md)

CURRENT_MILESTONE=$(echo "$PROGRESS" | grep -oP '"currentMilestone":\s*\K\d+')
CURRENT_STEP=$(echo "$PROGRESS" | grep -oP '"currentStep":\s*\K\d+')
PROJECT_GOAL=$(echo "$PROGRESS" | grep -oP '"projectGoal":\s*"\K[^"]+')
PROJECT_SCOPE=$(echo "$PROGRESS" | grep -oP '"projectV1Scope":\s*"\K[^"]+')
```

## Step 2: Understand the Change Request

Ask the user:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 UPDATE YOUR ROADMAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your current plan:
• Project: [PROJECT_GOAL]
• V1 Scope: [PROJECT_SCOPE]
• Progress: Milestone [X] of [Y]

What would you like to change?

Common requests:
• "This is too hard, simplify it"
• "This is too slow, speed it up"
• "I want to add [feature]"
• "I want to skip [thing]"
• "I want to focus more on [area]"

Tell me what you'd like to adjust.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Wait for their response.

## Step 3: Assess the Change

Based on their request, determine:

### Type A: Pace Adjustment (No Scope Change)
- Too fast → Break current/upcoming milestones into smaller steps
- Too slow → Combine upcoming milestones, reduce explanation depth
- Action: Modify milestone structure, keep same end goal

### Type B: Scope Expansion
- User wants to add features not in v1
- Risk: Overwhelming, losing focus
- Response:
  ```
  Adding [feature] is great, but let's think about timing.

  Option 1: Finish current v1, THEN add [feature] (recommended)
  Option 2: Add [feature] to v1 scope (extends timeline by ~X weeks)

  Which makes more sense?
  ```

### Type C: Scope Reduction
- User wants to simplify or skip something
- Risk: May break dependencies
- Response:
  ```
  We can simplify [X]. Let me check dependencies...

  [If no dependencies:]
  ✓ We can skip this! I'll adjust the roadmap.

  [If dependencies exist:]
  [Feature Y] depends on [X]. Options:
  1. Simplify [X] but keep basics needed for [Y]
  2. Skip both [X] and [Y]

  What works better?
  ```

### Type D: Direction Change
- User's goal changed
- May need new roadmap entirely
- Response:
  ```
  Sounds like your goal shifted from [old] to [new].

  Option 1: Keep current progress, pivot from here
  Option 2: Start fresh roadmap for new goal

  You've invested [X weeks] so far. What makes sense?
  ```

## Step 4: Generate Updated Roadmap

If changes approved, spawn curriculum planner:

```
Task(
  prompt="
    <current_context>
    User has completed: [list completed milestones/steps]
    Current position: Milestone [X], Step [Y]
    Original goal: [PROJECT_GOAL]
    Original v1: [PROJECT_SCOPE]
    </current_context>

    <requested_change>
    [What user asked for]
    </requested_change>

    <task>
    Update the learning path in .trike/learning-path.md

    Requirements:
    - Preserve completed work
    - Adjust from current position forward
    - Reflect requested changes
    - Maintain achievable pace
    - Keep v1 scope realistic
    </task>
  ",
  subagent_type="trike-curriculum-planner",
  model="sonnet"
)
```

## Step 5: Show the Updated Plan

Display diff:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 UPDATED ROADMAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**What changed:**
[Summary of changes]

**Previous plan:**
• [Old milestone count] milestones
• Focus: [Previous focus]
• Timeline: [Old estimate]

**New plan:**
• [New milestone count] milestones
• Focus: [Adjusted focus]
• Timeline: [New estimate]

**Upcoming milestones:**
[Show next 3-4 milestones]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Does this look good?
```

## Step 6: Confirm and Update

Wait for confirmation.

If approved:
```bash
# Update progress.json with new learningPath array
# Update learning-path.md (already done by agent)
# Keep current position unless they requested going back
```

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ ROADMAP UPDATED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your learning path has been adjusted.

▶ NEXT UP

/trike:next — Continue with [adjusted plan]

/trike:progress — See updated roadmap
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

</process>

<principles>

## Protect the User
- Warn about scope creep (adding too much)
- Warn about breaking dependencies (removing too much)
- Suggest realistic timelines
- Encourage finishing v1 before expansion

## Preserve Progress
- Never discard completed work
- Adjust from current position forward
- Show what stays vs what changes

## Encourage Momentum
- If they're struggling: simplify
- If they're cruising: offer to accelerate
- If they're stuck: break into smaller pieces
- If they want more: remind them to finish v1 first

## Be Honest
- "That would take 6 more weeks" (not "sure we can add it!")
- "This depends on X, we can't skip it" (not "whatever you want")
- "Let's finish v1, then add features" (not "let's expand scope")

</principles>

<example_scenarios>

## Scenario 1: "This is too hard"
```
I hear you - it's challenging.

Let's look at what's hard:
[Current milestone] involves [concepts].

Options:
1. Break this milestone into 2 smaller ones
2. Add a simpler practice step before this
3. Spend more time explaining [confusing part]

What would help most?
```

## Scenario 2: "I want to add user profiles"
```
User profiles are a great feature!

Your current v1: [scope without profiles]
With profiles: [expanded scope]

This would add ~3 more weeks.

My recommendation: Finish your v1 first (2 weeks left),
THEN add profiles as v1.1. You'll understand the codebase
better by then and can add it faster.

Want to stick with that plan, or add it now?
```

## Scenario 3: "Can we skip authentication?"
```
Let me check dependencies...

Authentication is used by:
• Saved workouts (needs to know whose workout)
• Profile page (needs to know who's logged in)
• Privacy features (needs to restrict access)

We can't fully skip it, but we could:
1. Simplify to "username only, no password" for v1
2. Keep auth but make it one simple step instead of two

Which sounds better?
```

</example_scenarios>

<success_criteria>
- User's request understood correctly
- Realistic assessment of changes
- Dependencies checked
- Updated roadmap generated
- User confirmed and understood the changes
- Progress preserved
</success_criteria>
