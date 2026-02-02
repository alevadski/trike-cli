# Orientation Step 5: Summary & Transition

## Purpose
Summarize what was learned, acknowledge user preferences, and transition to planning.

## What to Include

**Recap their preferences:**
Show what you learned about them from the quiz:
- Their learning style
- Their goal
- Their time commitment

**Set expectations based on their answers:**

If project-driven:
"Perfect! Let's get straight to planning YOUR project."

If learning-focused:
"Great! You'll learn a lot by building a real project. Let's figure out what to build."

If time-limited (weekends only, irregular):
"No problem! We'll break everything into small pieces you can do at your own pace."

If daily commitment:
"Excellent! With regular practice, you'll make steady progress."

**What's next:**
- Orientation is complete
- Next step: Planning your project
- This is where it gets personal - you describe what you want, Trike helps scope it
- Result: Custom learning path just for you

## Mark Orientation Complete

Update progress.json:
```json
{
  "currentStage": "plan",
  "completedStages": ["orientation"],
  "orientationStep": 5,
  "nextUp": "/trike:plan"
}
```

## Tone
- Congratulatory but not overdone
- Exciting about what's next
- Acknowledge their input matters
- Brief - transition smoothly to planning

## Navigation
Only one option:
- `/trike:plan` - Start planning your project (what you want to build)

Make this feel like a natural next step, not a separate phase.
