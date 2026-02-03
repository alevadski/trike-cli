# /compact Command

## What It Is

`/compact` compresses your conversation history while keeping the important context. Instead of deleting everything (`/clear`), it summarizes early messages and removes repetitive back-and-forth, so Claude can still reference key learnings without the noise.

## Why It Matters

Long sessions accumulate baggage:
- By message 100, you've had 30 clarifications, 5 false starts, and 20 minute explanations
- Claude remembers all of it, burning context on noise
- But you can't use `/clear` because you need to remember where you are

With `/compact`:
- Early messages are summarized into key facts
- Repetitive clarifications are removed
- Recent messages stay intact (so context is preserved)
- Claude still remembers what matters

Real-world impact: A 100-message session becomes 30 messages of pure signal, freeing up context for the next task.

## How to Use

### Compact the Current Session

```
/compact
```

Claude analyzes your conversation and:
1. Summarizes early exploration into key facts
2. Removes repetitive exchanges
3. Keeps recent context intact
4. Rebuilds the conversation with 1/3 the messages but same understanding

Result:
```
Session compressed
Messages before: 87
Messages after: 28
Context saved: ~59 messages worth of tokens
```

### Compact with Custom Strategy

```
/compact --keep-decisions
```

Prioritizes decisions over implementation details:
- Keeps "We decided to use X" but removes "Here's why Y wouldn't work"
- Keeps final code but removes iterations
- Useful when decisions matter, not the exploration

```
/compact --keep-recent [N]
```

Keep last N messages uncompressed, compress everything before:

```
/compact --keep-recent 10
```

Keeps last 10 messages as-is, compresses messages 1-77.

## Practical Workflows

### Workflow 1: Long Session Getting Messy

```
You've been working for 90 messages.
Earlier messages are outdated.
Recent messages are the real progress.

Me: /compact

Claude: Compresses messages 1-70, keeps messages 71-90 intact
Claude: You now have lean context, ready for next task

Me: Now, let's add the payment feature
Claude: Remembers key architecture from compressed section
Claude: Has fresh context for new task
```

### Workflow 2: Continuing After a Long Session

```
You've worked for 80 messages implementing feature X.
Work is done. You want to move on to feature Y.

Me: /review
(Confirm feature X is good)

Me: /commit "Complete feature X"

Me: /compact
Claude: Compresses the feature work into a summary
Claude: Session is now lean, context-ready for feature Y

Me: Now let's implement feature Y
Claude: Can reference feature X if needed, but isn't bogged down by 80 messages
```

### Workflow 3: Cleanup Between Major Milestones

```
Session 1: Implement auth (40 messages)
Me: /compact
(Compress auth work into summary)

Session 2: Implement dashboard (50 messages)
Me: /compact
(Compress dashboard work into summary)

Session 3: Implement real-time updates
(Compact builds on summaries from sessions 1 and 2)
```

Multiple compacts across sessions.

### Workflow 4: Dealing with Exploration Bloat

```
You've explored 5 different approaches to a problem.
Messages: try approach A, doesn't work, try B, doesn't work, etc.
Finally settled on approach E.

Me: /compact

Claude: Removes the A, B, C, D exploration
Claude: Keeps "We ended up using approach E, here's why"
Claude: Removes the back-and-forth
Claude: Reduces messages from 80 → 20
```

## Comparing /compact, /clear, and /rewind

| Command | Use When | Result |
|---------|----------|--------|
| `/compact` | Session is long but still valuable | Messages summarized, context preserved |
| `/clear` | Completely starting over | All history gone, fresh start |
| `/rewind` | Made a mistake recently | Jump back to previous checkpoint |

**Decision tree:**
- "Do I need my current work context?" → Use `/compact`
- "Do I need to completely restart?" → Use `/clear`
- "Did I just make a bad decision?" → Use `/rewind`

## When to Use /compact

**Use /compact for:**
- Sessions over 50 messages that are still on-track
- Multiple related tasks in one session (feature implementation + tests + docs)
- Long refactoring sessions
- Exploration that led to a good solution
- Freeing up context for continued work

**Don't use /compact for:**
- Short sessions (< 30 messages)
- Sessions that need to be completely redone
- When you need exact message history for debugging
- When you're about to context-switch (use `/clear` instead)

## What /compact Keeps and Removes

### What It Removes ✂️
- Repetitive explanations ("I already told you this...")
- False starts ("Let's try approach X" → "Actually, never mind")
- Clarifications that were resolved
- Debugging conversations that led nowhere
- Back-and-forth about understanding requirements

### What It Keeps ✅
- Final decisions and why they were made
- Working code and implementations
- Key facts about the project
- Architecture decisions
- Successfully completed tasks

## Advanced Patterns

### Pattern 1: Compact Before Working on New Feature

```
Feature A is done: 40 messages
Testing feature A: 15 messages
Integration work: 10 messages

(Total: 65 messages, feature A is complete)

Me: /compact
Claude: Compresses to "Feature A implemented and tested, key architecture: [summary]"

Ready for feature B: Fresh context, no baggage
```

### Pattern 2: Strategic Compacting in Sessions

```
Session flow:
1. Work on task 1 (40 messages)
2. /compact (clean up)
3. Work on task 2 (35 messages)
4. /compact (clean up)
5. Work on task 3 (30 messages)

Result: Session stayed under 50 messages at any time
Each task had fresh context
Overall session is highly productive
```

### Pattern 3: Compress to Baseline

When you've drifted far from initial understanding:

```
Initial setup: "Build a React dashboard"
Then: Refactored backend
Then: Added real-time sync
Then: Optimized performance
(Session is now messy, context drifting)

Me: /compact --keep-decisions

Claude: Removes the exploration and back-and-forth
Claude: Keeps "We built a React dashboard, refactored backend, added real-time, optimized performance"
Claude: Session is now focused on current work
```

## Combining /compact with Other Commands

### /compact + /memory

Before compacting, establish what should be remembered:

```
/memory Final architecture: Dashboard loads data via WebSocket
/memory Real-time updates happen every 500ms with batching
/memory Styling is Tailwind, no custom CSS

/compact

(Memory is preserved even though messages are compressed)
```

### /compact + Commit Command

After significant work:

```
/review (verify all changes)
Ask me to commit with message: "Complete dashboard implementation"

/compact (clean up session)

(Now ready for next task with clean context)
```

### /compact + /agents

After agent work:

```
/agents collect
(All agents complete)

/review
(Verify all changes)

/compact

(Compress multi-agent work into summary)
```

## Best Practices

**Do:**
- Use `/compact` regularly in long sessions (every 50-70 messages)
- Compact between major milestones
- Use `/memory` to preserve important facts before compacting
- Compact before `/clear` if you want to preserve some context
- Check `/context` after compacting to ensure Claude still has what you need

**Don't:**
- Compact too early (sessions under 30 messages don't need it)
- Compact and then immediately forget what was summarized (trust the summary)
- Use `/compact` when you need to debug message history (keep original)
- Compact without understanding what it removes

## Practice Exercise (10-15 minutes)

### Goal
Experience how compacting cleans up a long session while preserving context.

### Setup
Start Claude Code in your project and work on something for 30-40 messages.

### Steps

1. **Do real work for 30-40 messages:**
   ```
   Ask Claude to implement a feature or refactor something substantial
   Go back-and-forth: clarifications, adjustments, testing, etc.
   Build up a realistic long conversation
   ```

2. **Before compacting, check current state:**
   ```
   /context
   (See how many messages Claude is tracking)
   ```

3. **Run /compact:**
   ```
   /compact
   ```
   (Watch Claude summarize the long conversation)

4. **Check state after compacting:**
   ```
   /context
   (See that context is cleaner but understanding is preserved)
   ```

5. **Ask Claude to reference earlier work:**
   ```
   Remember the [component/feature] we implemented?
   Claude should be able to reference it even though it's been summarized
   ```

6. **Continue working:**
   ```
   Ask Claude to build on earlier work
   Claude should remember architecture and decisions without the noise
   ```

### Success Criteria
- You've used `/compact` successfully
- Messages were reduced but context was preserved
- Claude can still reference earlier work
- You understand how compacting differs from clearing

## Gotchas

**Gotcha 1: /compact is not reversible**
Once you compact, the detailed message history is gone from Claude's context. You can still scroll back in your UI to see it, but Claude forgets the details. Use sparingly or keep a backup if message history matters.

**Gotcha 2: Compacting can lose nuance**
If you explored 5 approaches and settled on one, `/compact` might lose the reasoning for why you rejected the others. If you might need that info later, save it to `/memory` first.

```
Before compacting:
/memory We tried approach A (too slow), B (too complex), C (not extensible), D (wrong paradigm)
/memory Final approach E: lazy loading with memoization, scales to 10k items

/compact

(Memory preserves the decisions even as messages are compressed)
```

**Gotcha 3: Compacting removes debugging context**
If you've been debugging an issue, compacting removes the exploration. If you need to debug again, you've lost the trails you explored. Keep debugging context in `/memory` if it's important.

**Gotcha 4: Different strategies have different effects**

```
/compact (default)
- Balances context preservation with reduction
- Keeps recent messages, summarizes old

/compact --keep-decisions
- Focuses on decisions, removes implementation details
- Good for "What did we decide?" not "How did we code it?"

/compact --keep-recent 15
- Keeps last 15 messages as-is, compresses everything before
- Useful when recent work is what matters
```

Understand which strategy fits your situation.

**Gotcha 5: Compacting a session that's not on track**
If your session has gone off the rails and you're confused about direction, `/compact` won't fix it. Use `/rewind` to jump back, or `/clear` to restart.

**Gotcha 6: Context estimation after compacting**
After compacting, you can't assume exactly how much context was saved. It depends on what could be summarized. Use `/context` to check actual available context after compacting.
