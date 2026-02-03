# /rewind Command & Esc×2 Checkpointing

## What It Is

`/rewind` lets you jump to previous checkpoints in your conversation. Press `Esc` twice (`Esc×2`) to create a checkpoint automatically. This lets you explore ideas without losing your original work.

## Why It Matters

Without checkpointing, you're committed to every decision:
- You ask Claude to "refactor this component" and hate the result
- You have to manually undo changes or describe the original
- You can't easily try two different approaches

With checkpointing:
- Press `Esc×2` before the refactor attempt
- Claude refactors, you hate it
- Press `/rewind` to go back
- Try a different approach from the checkpoint

Real-world impact: Saves 10-15 minutes per session when exploring multiple solutions.

## How to Use

### Create a Checkpoint

**Keyboard shortcut (easiest):**
```
Press Esc, then Esc again (within 1 second)
```

This creates a checkpoint at the current moment. You'll see confirmation in the UI.

**Manual command:**
```
/rewind --checkpoint "Implementing dark mode"
```

Use this if you want to give the checkpoint a meaningful name for later reference.

### Jump to a Previous Checkpoint

```
/rewind
```

Claude shows you a list of recent checkpoints. Select one to jump back:

```
Available checkpoints:
1. "Before refactoring Button component" (5 messages ago)
2. "Initial setup complete" (25 messages ago)
3. "Dark mode implementation started" (12 messages ago)

Jump to checkpoint: [1/2/3]
```

You pick "1", and the conversation resets to that point. All work after checkpoint 1 is preserved in your chat history (you can scroll back to see it), but Claude treats it as if the refactor never happened.

### The Key Insight

Jumping to a checkpoint doesn't delete your work. It's like:
1. Scrolling your chat back to that moment
2. Claude "forgetting" everything after that point
3. You can now take a different path from there

If you change your mind, you can:
- `/rewind` again and pick a different checkpoint
- Scroll back in chat history to see the work you "undid"

## Practical Workflows

### Workflow 1: Exploring Multiple Refactoring Approaches

```
Session start, working on UserCard component

[Esc×2] ← Checkpoint: "UserCard baseline"

Me: Refactor UserCard to use composition pattern
Claude: Does the refactor
Me: I don't like this, too many nested components

[/rewind]
Me: Show me checkpoint 1 (UserCard baseline)
Claude: Resets to the original
Me: Try a different refactor using hooks instead
Claude: Different approach, much better
```

Result: You explored both paths without losing the original code.

### Workflow 2: Working on Two Things in Parallel

```
Session starts, you're on feature X

[Esc×2] ← Checkpoint: "Feature X baseline"

Work on feature X for 20 messages...
Me: Actually, let me work on feature Y first
Claude: Sure

[/rewind]
Me: Jump to checkpoint 1
Claude: Resets to feature X baseline

You start working on feature Y instead...
Later, if you want to get back to feature X work:
[/rewind]
Me: Show me the checkpoint after I chose feature Y
Claude: Shows you the list, you pick the right one
```

### Workflow 3: Prototyping vs. Production

```
Me: Let's prototype a solution to the caching problem
[Esc×2] ← Checkpoint: "Before caching prototype"

Work on prototype for 10 messages...
Me: Great, I understand the problem now. Rewind to before prototype
[/rewind]

Me: Jump to checkpoint 1
Claude: Resets to baseline

Me: Now let's implement the proper production solution
Claude: Builds the real thing, informed by what you learned
```

You learned from the prototype without committing to its code.

### Workflow 4: Handling Mistakes

```
You ask Claude to "Refactor the entire authentication system"
Claude: Starts making changes

Me: Oh no, wait—that's not what I meant
[/rewind]

Me: Take me back 1 checkpoint
Claude: Resets to before the massive refactor

Me: Actually, I just need to add one new endpoint
Claude: Focused change instead of full refactor
```

Saves you from running with misunderstood instructions.

## Checkpoints vs. /rewind Behavior

**What gets reset:** Everything Claude has "seen" after the checkpoint
- The conversation history before the checkpoint stays visible
- Claude forgets about code changes after the checkpoint
- But your actual files are unchanged (until you commit)

**What stays the same:** Your actual project files
- Checkpointing doesn't change your code
- It only resets what Claude knows about the conversation
- You've been iterating with Claude, not making real changes (until you `/commit`)

## Advanced Patterns

### Named Checkpoints

For long sessions, name your checkpoints:

```
/rewind --checkpoint "API authentication complete, starting frontend"
/rewind --checkpoint "Dark mode working in components, need theme integration"
/rewind --checkpoint "Before attempting the big refactor"
```

Then later, `/rewind` shows you the names, making it easy to jump to the right spot.

### Checkpoint Before Big Changes

Habit: Before asking Claude to make significant changes, press `Esc×2` first:

```
About to ask for: "Migrate from Redux to Zustand"
[Esc×2] ← Checkpoint: "Before Redux to Zustand migration"

Me: Migrate the entire app from Redux to Zustand
Claude: Makes changes...
Me: Let me review with /review
[See the changes]
If you don't like them: /rewind
```

### Exploring Architectures

```
Project needs a redesign. You want to see two different approaches.

[Esc×2] ← Checkpoint: "Architecture baseline"

Explore Approach A for 15 messages...
[/rewind]
Jump to checkpoint 1

Explore Approach B for 15 messages...
[/rewind]
Jump back and compare both

Pick the best one, continue from there
```

## Best Practices

**Do:**
- Press `Esc×2` before asking for major refactors
- Use `/rewind` when experiments don't pan out
- Name checkpoints for long sessions
- Treat checkpoints as "save points" before risky changes
- Combine with `/review` - checkpoint, ask for change, review, then /rewind if needed

**Don't:**
- Rely on /rewind instead of version control (always git commit working code)
- Create a checkpoint every message (use them for meaningful moments)
- Forget that /rewind is conversation-level, not code-level
- Use /rewind as a substitute for actually committing and pushing code

## Keyboard Shortcut: Esc×2

**The shortcut:**
```
Press Escape key
Release
Press Escape key again
(within 1-2 seconds total)
```

**Confirmation:** You'll see a message like "Checkpoint created: Checkpoint 3 at 14:32"

**Why this shortcut:**
- It's fast (no typing `/rewind --checkpoint`)
- It's memorable (double-tap escape = save point, like in video games)
- It's collision-free (Escape doesn't conflict with Claude Code commands)

**If it doesn't work:**
- Make sure you're in Claude Code (not browsing)
- Try again within 1-2 seconds of first Escape
- Use `/rewind --checkpoint "Manual name"` as fallback

## Combining with Other Commands

### /rewind + /review

```
Before making changes:
[Esc×2]

Me: Refactor the authentication flow
Claude: Makes changes

Me: /review
(see the changes)

Me: I don't like this approach
[/rewind]
(jump back to checkpoint)

Me: Try a different approach
Claude: Different solution
```

### /rewind + Commit Command

```
[Esc×2] ← Checkpoint before big work

Work for 30 messages, multiple features

Me: /review
(see all changes across many messages)

Me: This looks good
Me: Commit my changes with message: "Implement new dashboard features"
```

If you hate the commit message or changes:
```
[/rewind]
(go back to checkpoint)
Try again
```

## Practice Exercise (5-10 minutes)

### Goal
Understand how checkpoints help you explore ideas safely.

### Setup
Start a Claude Code session in your project with something to work on.

### Steps

1. **Create a checkpoint at the start:**
   ```
   [Esc×2]
   ```
   You'll see "Checkpoint created" confirmation

2. **Ask Claude to make a change you're uncertain about:**
   ```
   "Try a new approach to the [component/function/feature]"
   ```
   Let Claude make 3-5 changes or suggestions

3. **Ask for /review to see what changed:**
   ```
   /review
   ```

4. **Decide you don't like the direction** (you're experimenting):
   ```
   /rewind
   ```
   Select the checkpoint you created in step 1

5. **Claude resets to the checkpoint**. Now try a different approach:
   ```
   "Actually, let's try a different approach: [different idea]"
   ```

6. **Compare mentally:** You've now seen two approaches starting from the same point

7. **If you like the new one:** Continue forward. If not:
   ```
   [/rewind]
   ```
   Jump back and try a third approach

### Success Criteria
- You've used `Esc×2` to create a checkpoint
- You've used `/rewind` to jump back to it
- You've explored multiple approaches to the same problem
- You understand that /rewind resets conversation, not actual files

## Gotchas

**Gotcha 1: Checkpoints are session-only**
If you close Claude Code and come back later, your checkpoints are gone. They're temporary save points, not permanent. Use git commits for permanent history.

**Gotcha 2: /rewind resets conversation, not code**
When you `/rewind`, Claude "forgets" the work after the checkpoint. But if you've run commands or actually changed files (not through Claude), those changes persist. The rewind is only about what Claude knows/has advised.

**Gotcha 3: Using /rewind too often slows progress**
Checkpoints are useful for exploration, but don't create one every message. Use them for meaningful milestones: "Before major refactor", "Feature complete", "Before trying new approach".

**Gotcha 4: Forgetting what was after the checkpoint**
When you `/rewind`, you can scroll back to see the work you "undid". Don't forget it's still in your chat history if you want to reference it.

**Gotcha 5: Combining with external changes**
If you're also editing files outside Claude Code while using checkpoints, you might get confused about what's been changed. Use checkpoints when Claude is doing the work, not when you're mixing manual + Claude changes.

**Gotcha 6: /rewind doesn't undo /commit**
If you've already `/commit`ted code to git, `/rewind` won't undo that. The commit is permanent. Use `/rewind` before `/commit` if you're uncertain.
