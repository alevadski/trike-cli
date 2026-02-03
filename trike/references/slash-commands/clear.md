# /clear Command

## What It Is

`/clear` wipes your entire conversation history and starts a fresh session. All messages, context, and state are gone. You're back to a blank slate with Claude.

## Why It Matters

Long sessions accumulate noise. By the 50th message, Claude might remember random details from message 5 that are no longer relevant. `/clear` lets you:
- Get a fresh perspective on a problem
- Reset context when pivoting to a new task
- Remove accumulated distractions
- Start optimized without baggage

Real-world impact: Sometimes a 30-minute session gets messy and confusing. `/clear` lets you start fresh with just the important context in 10 seconds.

## How to Use

### Clear Everything and Start Fresh

```
/clear
```

You're now in a blank session. All previous messages are gone from Claude's context.

Claude confirms:
```
Session cleared. Starting fresh.
What would you like to work on?
```

### Clear with a Specific Note (Optional)

```
/clear --note "Switching to database schema work"
```

Creates a session note for your own reference about why you cleared. Helpful for long debugging sessions where you want to remember the pivot point.

## Practical Workflows

### Workflow 1: Escaping a Confused Conversation

```
Session has 60+ messages. You've been going in circles.
The conversation is confusing and you can't get back on track.

Me: /clear

Claude: Fresh start

Me: (summarize just the key problem, fresh)
Claude: Clear thinking, no noise from 60 previous messages
```

Result: Sometimes the best way out is to start over.

### Workflow 2: Switching Contexts Dramatically

```
You've been working on frontend UI for 30 messages.
Boss asks you to fix a critical backend bug immediately.

Me: /clear

Claude: Fresh slate

Me: There's a critical bug in the auth service...
(backend context, no frontend noise)
```

Then later, when you return to frontend:
```
Me: /clear

Claude: Fresh start

Me: Back to the UI work...
```

Each clear gets you focused on one thing.

### Workflow 3: Cleanup After Exploration

```
You've been exploring 5 different solutions to a problem.
Messages: exploration, dead ends, backtracking, confusion.
Now you know the solution.

Me: /clear

Claude: Fresh start

Me: (Tell Claude the solution you discovered, from scratch)
Claude: Now implements the solution cleanly without exploration baggage
```

Clean implementation without all the "um, actually try this" back-and-forth.

### Workflow 4: Session Wrap-Up and New Session

```
Session has been productive. Feature is done.
You've fixed bugs, optimized, tested. 60+ messages.

Me: /review (final check)
Me: /commit "Complete feature X"

Now ready to switch tasks:

Me: /clear

Claude: Fresh start for the next feature
```

## Comparing /clear, /rewind, and /compact

| Command | What It Does | When to Use |
|---------|--------------|-------------|
| `/clear` | Delete entire conversation history | Starting completely fresh |
| `/rewind` | Jump to a specific checkpoint | Undoing recent decisions |
| `/compact` | Compress history but keep key info | Long sessions that are still relevant |

**Choose the right one:**
- `/rewind` - "I made a mistake recently, go back"
- `/compact` - "Session is long but still on track, compress noise"
- `/clear` - "Complete reset, start new task"

## Best Practices

**Do:**
- Use `/clear` when switching major tasks (frontend → backend, feature → bug fix)
- Use `/clear` when a conversation gets confusing (too many tangents)
- Use `/clear` after completing something (clean slate for next thing)
- Clear before major pivots in your work direction
- Consider `/compact` before `/clear` (compress instead of nuke)

**Don't:**
- Use `/clear` to avoid dealing with confusing messages (fix them with `/memory` instead)
- Clear without committing working code (your conversation is history, your git is reality)
- Clear multiple times per conversation (sign that you need better `/memory` or `/rewind`)
- Use `/clear` as a shortcut for `/rewind` (different tools for different problems)

## Common Patterns

### Pattern 1: Feature-Based Sessions

Each major feature gets its own session:

```
Session 1: Implement auth
[work for 40 messages]
Ask me to commit with message: "Implement authentication"
/clear

Session 2: Build user dashboard
[work for 35 messages]
Ask me to commit with message: "Build user dashboard"
/clear

Session 3: Add real-time notifications
[work for 45 messages]
Ask me to commit with message: "Add real-time notifications"
```

Each session is focused and clean.

### Pattern 2: Task-Switching Sessions

When you need to context-switch:

```
Interrupt from manager: "Critical bug in production"

Current task: [50 messages into feature development]
/rewind --checkpoint "Feature work checkpoint"
/clear

Now focus on the bug:
[20 messages to fix and verify]
Ask me to commit with message: "Hotfix: critical bug in auth"

Return to feature:
/rewind (jump back to feature checkpoint)
(or /clear + restate where you were)
```

### Pattern 3: Investigation-Then-Implementation

When exploring a problem space:

```
Session 1: Investigate the performance issue
[30 messages: profiling, analyzing, exploring]
/clear

Session 2: Implement the fix you discovered
[20 messages: clean implementation]
Ask me to commit with message: "Fix performance bottleneck"
```

Split investigation from implementation for cleaner code.

## Advanced Patterns

### Pattern 1: Clear with Memory Reset

When starting fresh on a related task:

```
You've been working on userAuth feature.
Now switching to adminAuth feature.
Same patterns, different context.

(End of userAuth work)
/clear

/memory Admin authentication has different permissions model
/memory Admin users can't be soft-deleted
/memory Admin action logs are mandatory

(Start of adminAuth work with cleared conversation but preserved memory)
```

### Pattern 2: Save Important Context Before Clear

If you're clearing but want to remember something:

```
/memory The performance issue was in the database query N+1 problem
/memory Solution: implement result caching at the service layer

/clear

(Fresh session, but /memory preserved the learnings)
```

## Practice Exercise (5-10 minutes)

### Goal
Get comfortable with `/clear` and understand when it's the right tool.

### Setup
Start a Claude Code session in your project, work on something for 15-20 messages.

### Steps

1. **Work on a task for a while:**
   ```
   (Do 10-15 messages of work on one feature)
   ```

2. **Notice the conversation getting long:**
   ```
   /help (take a message)
   /context (check what Claude is seeing)
   (Work a few more messages)
   ```

3. **Commit your work:**
   ```
   /review
   Ask me to commit with message: "Feature complete"
   ```

4. **Clear the session:**
   ```
   /clear
   ```

5. **Start on a new task:**
   ```
   (Describe a different feature or fix)
   Claude: Responds without any context from previous work
   ```

6. **Notice the difference:**
   - How much faster is Claude without 30 messages of history?
   - How much cleaner is the conversation?
   - How focused is the work?

### Success Criteria
- You've used `/clear` successfully
- You've worked on two separate things in separate sessions
- You understand the difference between `/clear`, `/rewind`, and `/compact`
- You can explain when you'd use `/clear` vs. other commands

## Gotchas

**Gotcha 1: /clear is permanent**
Once you clear, that conversation history is gone from Claude's context. You can still scroll back in your chat UI to read old messages, but Claude can't see them. If you need to preserve something, save it before clearing (git commit, save notes, etc.).

**Gotcha 2: /clear doesn't undo git changes**
Clearing the conversation doesn't revert your code. If you committed something before clearing, it's still committed. `/clear` only clears Claude's context, not your filesystem.

**Gotcha 3: Don't clear to avoid problems**
If the conversation is confusing because Claude doesn't understand your project, use `/memory`, not `/clear`. If you want to undo recent decisions, use `/rewind`, not `/clear`. Use `/clear` only for actual "start fresh" moments.

**Gotcha 4: Use /memory before clearing**
If you're clearing to switch tasks but want to preserve learnings:

```
/memory The auth service uses JWT tokens with 24-hour expiry
/memory Never access the database directly, use the query service

/clear

(Switch to new task, but memory is preserved)
```

**Gotcha 5: Clearing loses session state**
Any state that Claude built up (understanding your architecture, preferences, patterns) is lost. In a new session after `/clear`, you might need to re-establish context if jumping back to related work.

**Gotcha 6: Multiple clears in a session suggests deeper issues**
If you're clearing multiple times in a single work session, consider:
- Better `/memory` setup (so you don't need to re-establish context)
- Better task definition (clearer goals)
- Better `/rewind` usage (undo mistakes instead of nuking entire session)

**Gotcha 7: Don't use /clear for tactical context management**
```
❌ DON'T: I'm going to ask about 3 different features one after another, /clear between each
✅ DO: /clear between major context switches (feature → bug fix, frontend → backend)

❌ DON'T: /clear because the conversation is getting hard to read
✅ DO: /memory to clarify confusing topics, /compact to clean up noise

❌ DON'T: /clear to "reset" Claude's understanding
✅ DO: /memory to correct Claude's understanding
```
