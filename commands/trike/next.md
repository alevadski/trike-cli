---
name: trike:next
description: Continue to next step (main progression command)
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Task
  - AskUserQuestion
---

<objective>
Main progression command.

Routes based on current stage:
- Orientation: Steps 2-5 (uses reference guides)
- Build: Phase cycle (Discuss → Plan → Execute → Explain → Verify)
</objective>

<process>

## Step 1: Load Current State

```bash
if [ ! -f .trike/progress.json ]; then
  echo "Run /trike:start first!"
  exit 1
fi

PROGRESS=$(cat .trike/progress.json)
CURRENT_STAGE=$(echo "$PROGRESS" | grep -oP '"currentStage":\s*"\K[^"]+')
ORIENTATION_STEP=$(echo "$PROGRESS" | grep -oP '"orientationStep":\s*\K\d+' || echo "0")
CURRENT_MILESTONE=$(echo "$PROGRESS" | grep -oP '"currentMilestone":\s*\K\d+')
CURRENT_STEP=$(echo "$PROGRESS" | grep -oP '"currentStep":\s*\K\d+')
CURRENT_PHASE=$(echo "$PROGRESS" | grep -oP '"currentPhase":\s*"\K[^"]+')
```

## Step 2: Route Based on Stage

### ORIENTATION FLOW

```bash
if [ "$CURRENT_STAGE" = "orientation" ]; then
  case $ORIENTATION_STEP in
    1)
      # Orientation Step 2: Claude Code Basics
      REF_FILE="~/.claude/trike/references/orientation-step2.md"
      ;;
    2)
      # Orientation Step 3: User Flow
      REF_FILE="~/.claude/trike/references/orientation-step3.md"
      ;;
    3)
      # Orientation Step 4: Quiz
      REF_FILE="~/.claude/trike/references/orientation-step4.md"
      ;;
    4)
      # Orientation Step 5: Summary
      REF_FILE="~/.claude/trike/references/orientation-step5.md"
      ;;
    *)
      echo "Orientation complete! Run /trike:plan to start planning your project."
      exit 0
      ;;
  esac
  
  # Read the reference file
  cat $REF_FILE
  
  # Now create the output based on the reference guidance
  # The reference file provides structure and content guidelines
fi
```

#### Executing Orientation Steps

Based on which step (read from reference file above):

**For Step 2 (Claude Code Basics):**
- Explain slash commands in simple terms
- List important Trike commands with plain descriptions
- Explain how to talk to Claude Code naturally
- Emphasize "never accept code you can't explain"
- Refer to Claude Code in third person ("Claude Code can help you...")
- Keep under 25 lines
- Navigation: /trike:next, /trike:explain, /trike:plan

Update progress:
```bash
cat .trike/progress.json | sed 's/"orientationStep": 1/"orientationStep": 2/' > .trike/progress.json.tmp
mv .trike/progress.json.tmp .trike/progress.json
```

**For Step 3 (User Flow):**
- Explain all 4 stages thoroughly
- Explain the 5-phase build pattern (Discuss → Plan → Execute → Explain → Verify) in detail
- Clarify that Trike guides, Claude Code builds
- Emphasize understanding over speed
- Keep explanations full and clear
- Navigation: /trike:next, /trike:plan

Update progress:
```bash
cat .trike/progress.json | sed 's/"orientationStep": 2/"orientationStep": 3/' > .trike/progress.json.tmp
mv .trike/progress.json.tmp .trike/progress.json
```

**For Step 4 (Quiz):**
Use AskUserQuestion tool with questions from reference file:
- Learning style (4 options)
- Main goal (4 options)  
- Time commitment (4 options)

Save responses to progress.json:
```bash
# Update learningStyle, userGoals, userTimeCommitment fields
# Set orientationStep to 4
```

Automatically move to step 5 after quiz.

**For Step 5 (Summary):**
- Show what you learned about them from quiz
- Set appropriate expectations based on their answers
- Congratulate on completing orientation
- Transition smoothly to planning
- Only navigation: /trike:plan

Mark orientation complete:
```bash
# Update progress: currentStage = "plan", completedStages includes "orientation"
cat .trike/progress.json | \
  sed 's/"currentStage": "orientation"/"currentStage": "plan"/' | \
  sed 's/"completedStages": \[\]/"completedStages": ["orientation"]/' | \
  sed 's/"nextUp": "\/trike:next"/"nextUp": "\/trike:plan"/' \
  > .trike/progress.json.tmp
mv .trike/progress.json.tmp .trike/progress.json
```

```bash
exit 0
fi
```

### BUILD FLOW

Validate build stage:
```bash
if [ "$CURRENT_STAGE" != "build" ]; then
  echo "Not in build stage yet. Run /trike:build first!"
  exit 1
fi
```

## Step 3: Load Roadmap

Read learning path:
```bash
ROADMAP=$(cat .trike/learning-path.md)
```

Identify current milestone and step from roadmap.
Parse what needs to be built in this step.

## Step 4: Determine Current Phase

Based on CURRENT_PHASE value:
- If null → Start with "discuss"
- If "discuss" → Move to "plan"
- If "plan" → Move to "execute"
- If "execute" → Move to "explain"
- If "explain" → Move to "verify"
- If "verify" complete → Move to next step

## Step 5: Execute Current Phase

Read the lesson template for guidance:
```bash
cat ~/.claude/trike/references/lesson-template.md
```

Then execute the appropriate phase based on CURRENT_PHASE.

### PHASE: DISCUSS

**Purpose:** Teach architectural understanding of what we're building

Present:
- What this step accomplishes for THEIR project
- Why their project needs this
- What will be created
- How it connects to previous work

Ask if they have questions before planning.

**CRITICAL: End with navigation block:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▶ NEXT

/trike:next — Plan how to build it

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Update phase to "plan" in progress.json.

### PHASE: PLAN

**Purpose:** Explain implementation approach

Present:
- How Claude Code will build it (strategy, not syntax)
- What files/components will be created
- Key architectural concepts involved

Ask if they have questions before building.

**CRITICAL: End with navigation block:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▶ NEXT

/trike:next — Watch Claude Code build it

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Update phase to "execute" in progress.json.

### PHASE: EXECUTE

**Purpose:** Build the code (GSD-style with narration)

Announce you're building and will narrate as you go.

Execute with narration:
- Use Write/Edit tools to create code
- Explain each action as it happens
- Focus on architectural decisions, not syntax
- Run/test to verify it works

Commit the work:
```bash
git add .
git commit -m "Step [X]: [What was built]"
```

**CRITICAL: End with navigation block:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▶ NEXT

/trike:next — Let me explain what was built

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Update phase to "explain" in progress.json.

### PHASE: EXPLAIN

**Purpose:** Walkthrough of what was built

Present:
- Files created/modified and what each does
- Walk through the architecture (not line-by-line)
- How pieces connect
- Why decisions matter for their project goals

**CRITICAL: End with navigation block:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▶ NEXT

/trike:next — Verify your understanding

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Update phase to "verify" in progress.json.

### PHASE: VERIFY

**Purpose:** Check understanding before proceeding

Ask them to explain in their own words:
- What was just built
- Why their project needs it
- How components connect

Evaluate their understanding:
- Good understanding → Proceed
- Partial understanding → Clarify specific parts, ask again
- Major gaps → Re-explain differently, loop back

## Step 6: Check for Practice Exercise

**IMPORTANT:** Starting at Milestone 4, check if learning path includes a practice exercise for this milestone.

```bash
# Check milestone number
if [ "$CURRENT_MILESTONE" -ge 4 ]; then
  # Look for "Practice exercise:" in learning path for this milestone
  HAS_PRACTICE=$(grep -A 50 "## Milestone $CURRENT_MILESTONE:" .trike/learning-path.md | grep -q "Practice exercise:" && echo "yes" || echo "no")
fi
```

If HAS_PRACTICE is "yes", proceed to PRACTICE phase instead of completing the step.
If HAS_PRACTICE is "no" or milestone < 4, complete the step as normal (below).

### PHASE: PRACTICE (Milestones 4+ only, when practice exercise exists)

**Purpose:** User builds something themselves with coaching

Read coaching guide:
```bash
cat ~/.claude/trike/references/practice-coaching.md
```

1. **Present the exercise** from learning path
2. **Help them plan** - ask what they think needs to change
3. **Guide their prompt** - review before they run it
4. **Let them execute** - they run their prompt with Claude Code
5. **Review together** - debug if needed, celebrate when it works
6. **Reflect** - quick learning reflection

Update phase to "practice" in progress.json.

**After successful practice:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ PRACTICE COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You just vibecoded that yourself!

▶ NEXT

/trike:next — Continue to next step

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Then mark step complete (continue to step completion below).

## Step 7: Mark Step Complete

Only after verification (and practice if applicable):
- Mark step complete
- Increment currentStep
- Reset currentPhase to null
- Update progress.json

**CRITICAL: Show completion with navigation block:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ STEP [X] COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Great! You understand [what was taught].

**Progress:**
Milestone [N]: [X] of [Y] steps complete

▶ NEXT

/trike:next — Continue to step [X+1]

[Brief preview of next step]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

</process>

<guidance>

**CRITICAL FOR ALL PHASES:**
**ALWAYS END WITH NAVIGATION BLOCK** - Every single phase output MUST include:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▶ NEXT

/trike:next — [what happens next]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
This is NON-NEGOTIABLE. User must always know what to do next.

**For Orientation:**
- Use reference files as guides
- Keep outputs under 25 lines
- No jargon or technical terms
- Trike speaks, Claude Code is third person
- Fuller explanations in step 3
- ALWAYS end with navigation block

**For Build:**
- Follow lesson template
- Trike guides, Claude Code builds
- Architecture over syntax
- Never skip verification
- Reference pedagogy.md for teaching principles
- ALWAYS end with navigation block (every phase!)
</guidance>
