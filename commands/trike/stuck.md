---
name: trike:stuck
description: Get help when confused or stuck
allowed-tools:
  - Read
  - Write
  - Bash
  - AskUserQuestion
---

<objective>
Help users when they're confused, stuck, or lost.

This is the "I don't understand" command.
Diagnose the confusion and provide tailored help.
</objective>

<process>

## Step 1: Load Context

Read current state:
```bash
PROGRESS=$(cat .trike/progress.json 2>/dev/null || echo "none")

if [ "$PROGRESS" = "none" ]; then
  STAGE="not-started"
else
  STAGE=$(echo "$PROGRESS" | grep -oP '"currentStage":\s*"\K[^"]+')
  MILESTONE=$(echo "$PROGRESS" | grep -oP '"currentMilestone":\s*\K\d+')
  STEP=$(echo "$PROGRESS" | grep -oP '"currentStep":\s*\K\d+')
  PHASE=$(echo "$PROGRESS" | grep -oP '"currentPhase":\s*"\K[^"]+')
fi
```

## Step 2: Ask What's Wrong

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 I'M HERE TO HELP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You're currently: [describe current position]

What's confusing you?
```

Wait for user to explain.

## Step 3: Diagnose the Confusion

Common confusion types:

### Type 1: "I don't understand what we built"
→ Re-explain the last completed step with simpler words
→ Use analogies
→ Show concrete examples
→ Draw connections to things they already know

### Type 2: "I don't know what to do next"
→ Show their current position clearly
→ Show the next command to run
→ Preview what the next step will do
→ Reassure them they're on the right track

### Type 3: "The code isn't working"
→ Debug together
→ Check the error messages
→ Walk through what should happen vs what is happening
→ Fix and explain the fix

### Type 4: "This is too hard/fast/confusing"
→ Acknowledge their feeling
→ Slow down
→ Break current step into smaller pieces
→ Offer to explain the confusing part differently
→ Maybe update the roadmap to simplify

### Type 5: "I don't see the point of what we're building"
→ Reconnect to their original goal
→ Explain how this step serves their project
→ Show the bigger picture
→ Remind them where this leads

## Step 4: Provide Tailored Help

Based on the confusion type, provide specific assistance:

```
[Explanation tailored to their confusion]

[Use concrete examples from their project]

[Show them where they are and where they're going]

[Answer their specific question]
```

## Step 5: Check Understanding

Ask:
```
Does that help? Or should I explain it differently?
```

If still confused, try another approach:
- Different analogy
- Simpler terms
- Visual diagram (ASCII art)
- Step-by-step breakdown
- Real-world comparison

## Step 6: Offer Options

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What do you want to do?

1. Continue where you left off: /trike:next
2. Explain a concept deeper: /trike:explain [concept]
3. Go back and retry: /trike:back
4. See your progress: /trike:progress
5. Keep talking it through with me

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 7: Remember the Philosophy

Important reminders for yourself (Claude):

- **Never rush them:** Understanding is more important than speed
- **Never blame them:** If they're confused, the explanation wasn't clear enough
- **Be encouraging:** Confusion is part of learning
- **Be patient:** Explain as many times as needed, in as many ways as needed
- **Connect to their goal:** Always tie explanations back to what they're building
- **Offer to slow down:** Maybe the roadmap needs adjusting

**Core principle:** Never let them proceed without understanding.

</process>

<response_patterns>

### If they're lost in process:
"You're in [STAGE], milestone [N], step [X].
Next up: run /trike:next to [what happens next].
You're making progress - [X] steps completed so far!"

### If they don't understand code:
"Let me explain [concept] differently.
Think of it like [analogy from their world].
In your [project], this means [concrete example].
Try explaining it back to me?"

### If they're overwhelmed:
"That's completely normal - you're learning a lot.
Let's slow down. We can break this step into smaller pieces.
Or we can spend more time on the current part.
What would help most?"

### If they want to give up:
"I get it - this is challenging.
But look what you've already built: [list accomplishments].
You've already learned [concepts they mastered].
We can adjust the pace or simplify the roadmap.
What specifically feels too hard right now?"

</response_patterns>

<success_criteria>
- User's confusion is diagnosed correctly
- Help provided is specific to their situation
- User understands enough to make a choice (continue, go back, or adjust)
- User feels supported, not judged
- Clear next steps offered
</success_criteria>
