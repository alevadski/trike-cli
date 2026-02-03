---
name: trike:progress
description: Check your current progress in your learning path
allowed-tools:
  - Read
  - Bash
---

<objective>
Display user's progress briefly with visual tracking. No verbose output.
</objective>

<process>

## Step 1: Load Progress

Read `.trike/progress.json` and `.trike/learning-path.md`

## Step 2: Calculate Progress

```bash
completed=$(jq -r '.milestonesCompleted | length' .trike/progress.json)
total=$(grep -c "^### Milestone" .trike/learning-path.md)
percentage=$(( (completed * 100) / total ))
```

## Step 3: Display Progress

Show concise report:
```
Your Progress

Completed: [X]/[total] milestones ([XX]%)

████████░░░░░░

Current: Milestone [Y] - [Title]

Next Up:
⬜ Milestone [Y+1]
⬜ Milestone [Y+2]
```

Keep it scannable. No long text.

## Step 4: Navigation Block

End with:
```
---
Run /trike:next to continue your learning path
```

</process>
