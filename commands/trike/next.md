---
name: trike:next
description: Continue to the next milestone in your learning path
allowed-tools:
  - Read
  - Write
  - Bash
---

<objective>
Deliver the next milestone from the user's learning path with appropriate coaching based on their experience level. Be concise and interactive. Always end responses with navigation block.
</objective>

<process>

## Step 0: Check Progress Exists

Check if `.trike/progress.json` exists.

If not found:
```
I don't see any progress yet. Let's start your Trike journey!
```

Then automatically proceed to run `/trike:start` (show the greeting and launch quiz).

## Step 1: Load Current State

Read `.trike/progress.json` and `.trike/learning-path.md`

Check `milestoneState` in progress.json:
- If `"in-progress"` → Resume current milestone
- If `"completed"` or missing → Start next milestone

## Step 2: Determine Which Milestone

Calculate: `currentMilestone` from progress.json

If all complete: Show congratulations (brief) and end.

## Step 3: Extract Milestone Content

Parse milestone [currentMilestone] from learning-path.md

## Step 4: Load Reference File (if specified)

Check if milestone includes a "Reference:" line.

If yes:
- Extract the file path (format: @~/.claude/trike/references/...)
- Convert to actual path: ~/.claude/trike/references/...
- Read the reference file using Read tool
- Use reference content to enhance milestone delivery

If no reference specified, continue without it.

## Step 5: Deliver Milestone

If `milestoneState` is `"in-progress"`:
```
Continuing Milestone [X]: [Title]

[Brief reminder of what this milestone covers]
```

If starting fresh:
```
Milestone [X]: [Title]

[Brief context - 1-2 sentences]

[Learning content - contextual to their project]

[Practice exercise with clear success criteria]
```

Use reference file context (if loaded) to provide accurate, detailed explanations.

**Keep it concise.** No walls of text.

Update progress.json to mark milestone as `"in-progress"`:
```bash
current=$(jq -r '.currentMilestone' .trike/progress.json)
jq ".milestoneState = \"in-progress\"" .trike/progress.json > temp && mv temp .trike/progress.json
```

## Step 6: Navigation Block (First Time)

End with:
```
---
Questions? Run /trike:next to continue
```

## Step 7: Guide Through Milestone

**This step happens in the conversation as user asks questions or works through the milestone.**

Adapt coaching based on Q1 (experience):
- "Never used it" → More guidance, encouraging
- "Use extensively" → Peer-level, minimal hand-holding

**Stay brief.** Answer questions, don't lecture.

After each response, always end with navigation block:
```
---
Questions? Run /trike:next to continue
```

## Step 8: Check Understanding (Not Mandatory)

When user seems ready or asks to move on, ask:

"Do you have any questions about [topic]? Do you feel you understand it?"

Then provide 3 self-assessment questions:

```
Here are 3 questions to test your understanding:

1. [Question about core concept]
2. [Question about practical application]
3. [Question about how it relates to their project]

These are just for self-reflection - you don't need to answer them out loud. But if you can't answer them confidently, let me know and I'll explain deeper!
```

Wait for user response:
- If they have questions → Answer them, then loop back to this step
- If they're confident → Proceed to mark complete

After response, always end with navigation block:
```
---
Ready to complete? Run /trike:next
```

## Step 9: Mark Complete

When user confirms they're ready to move on:

Update progress.json:
```bash
# Get current milestone number
current=$(jq -r '.currentMilestone' .trike/progress.json)
next=$((current + 1))

# Mark current as complete and move to next
jq ".milestonesCompleted += [$current] | .currentMilestone = $next | .milestoneState = \"completed\"" .trike/progress.json > temp && mv temp .trike/progress.json
```

## Step 10: Brief Feedback

Show:
```
✅ Milestone [X] complete!

Progress: [X]/[total] ████░░░░

Next: [brief preview of next milestone]
```

## Step 11: Navigation Block (Final)

End with:
```
---
Continue? Run /trike:next
```

</process>
