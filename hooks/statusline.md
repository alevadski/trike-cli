---
name: statusline
description: Show Trike progress in Claude Code statusline
---

<objective>
Display current learning progress in the statusline.
Show stage and current step/milestone.
</objective>

<process>

## Check for Trike Progress

```bash
if [ ! -f .trike/progress.json ]; then
  # Not a Trike project, don't show anything
  exit 0
fi

PROGRESS=$(cat .trike/progress.json)
STAGE=$(echo "$PROGRESS" | grep -oP '"currentStage":\s*"\K[^"]+' || echo "not-started")
```

## Format Based on Stage

**If not-started:**
```
🚲 Trike: Ready to start → /trike:start
```

**If orientation:**
```
🚲 Trike: Orientation
```

**If plan:**
```
🚲 Trike: Planning your project
```

**If build:**
```bash
MILESTONE=$(echo "$PROGRESS" | grep -oP '"currentMilestone":\s*\K\d+' || echo "?")
STEP=$(echo "$PROGRESS" | grep -oP '"currentStep":\s*\K\d+' || echo "?")
PHASE=$(echo "$PROGRESS" | grep -oP '"currentPhase":\s*"\K[^"]+' || echo "")
```

Format:
```
🚲 Trike: M${MILESTONE}.${STEP} [${PHASE}]
```

Examples:
- `🚲 Trike: M1.3 [execute]`
- `🚲 Trike: M2.1 [verify]`
- `🚲 Trike: M1.5`

**If ship:**
```
🚲 Trike: Shipping 🚀
```

**If graduated:**
```
✓ Trike: Graduated!
```

</process>

<notes>
- Keep it concise for statusline space
- Use emoji for visual distinction
- Show enough context to be helpful
- Phase is optional (only during build)
</notes>
