# /help Command

## What It Is

`/help` displays all available slash commands in Claude Code and explains what each one does. `/help [command]` gives detailed information about a specific command.

## Why It Matters

You don't need to remember every slash command. When you can't remember the exact syntax or what a command does, `/help` gets you the answer instantly without breaking context or searching documentation.

Real-world impact: Instead of "Hmm, what was that command for reviewing code?", you just type `/help review` and get the answer in 2 seconds.

## How to Use

### See All Commands

```
/help
```

Shows a comprehensive list of all slash commands with brief descriptions:

```
Available slash commands:

Ask me to find files and code  Ask Claude to search (e.g., "Find the Button component")
/memory [info]                 Store facts about your project
/rewind                        Jump to previous conversation checkpoints
/context                       See what Claude is currently reading
/review [changes]              Review code changes before committing
Commit command                 Create a git commit from the conversation
/clear                         Start a fresh session
/compact                        Compress conversation history
/init [project]                Initialize a new Claude Code project
/export                        Export conversation or code
/agents                        Spawn subagents for parallel work
/help [command]                Get detailed help on a command
```

### Get Detailed Help on a Specific Command

```
/help memory
/help rewind
/help review
/help agents
```

Returns comprehensive information:

```
/help review

COMMAND: /review [changes]
PURPOSE: Review code changes before committing
SYNTAX:  /review
         /review --no-diff (show summary only)

DESCRIPTION:
Shows you exactly what's changed in your files before you commit.
Prevents surprises when you git push.

EXAMPLES:
/review                          (see all changes)
/review --no-diff                (summary without file diffs)

SEE ALSO: /commit, /rewind
```

## Common Scenarios

### Scenario 1: "I forget what that command does"

```
Me: /help memory
Claude: Explains /memory, syntax, examples, when to use
```

Takes 5 seconds instead of scrolling docs.

### Scenario 2: "I remember the command but not the exact syntax"

```
Me: I want to export the conversation
Claude: /help export
Claude shows: /export --format [json|markdown|pdf]
```

### Scenario 3: "What commands are available for [task]?"

```
Me: I want to review my changes before committing
Claude: /help
(You scan list, see /review and /commit)
```

Or ask Claude directly:
```
Me: What command should I use to see my changes?
Claude: /review - it shows you exactly what changed
Me: /help review
Claude: Detailed explanation with examples
```

### Scenario 4: "How do I combine commands?"

```
Me: /help review
Claude: Shows /review, plus "SEE ALSO: /commit, /rewind"
```

Helps you understand command relationships.

## Advanced Usage

### Getting Help with Syntax

```
/help commit
```

Shows you:
- How to ask me to commit with a message
- Advanced syntax options like committing without verification or amending
- When to use each option

### Comparing Commands

```
/help rewind
/help checkpoint
/help clear
```

Different commands, different purposes:
- `/rewind` - go back to a previous checkpoint
- `/checkpoint` - create a checkpoint manually
- `/clear` - nuke everything and start fresh

### Finding Related Commands

Most `/help` responses include "SEE ALSO" section:

```
/help review

SEE ALSO: /commit, /rewind, /context
```

This helps you discover related commands you might not know about.

## Combining /help with Other Commands

### /help + /memory

```
Me: /help memory
Claude: Detailed guide on /memory command

Me: /memory This project uses React Query for server state
Claude: Stores the fact

Me: Now help me implement data fetching
Claude: Suggests React Query patterns because of your /memory
```

### /help + Finding Things

```
Me: /help memory
Claude: Detailed guide on /memory command

Me: Find all Button components
Claude: Identifies Button files

Me: Ask me with specific constraints
(for advanced finding)
Find all Button components in src/components
```

## Best Practices

**Do:**
- Use `/help` when you forget a command
- Use `/help [command]` before using an unfamiliar command
- Ask Claude about command relationships ("Should I use /rewind or /checkpoint?")
- Refer to `/help` output when you're uncertain about syntax

**Don't:**
- Try to remember every command syntax (just use /help)
- Assume you understand a command without checking /help first
- Skip `/help` for "advanced" commands you rarely use
- Ignore "SEE ALSO" suggestions - they often lead to useful commands

## Practice Exercise (3-5 minutes)

### Goal
Get comfortable using `/help` to discover and understand commands.

### Steps

1. **Run /help to see all commands:**
   ```
   /help
   ```

2. **Pick one command you've never used:**
   ```
   /help [unfamiliar-command]
   ```
   Read the full explanation

3. **Ask Claude about a related command:**
   ```
   Me: When should I use /rewind vs /clear?
   Claude: Explains the difference
   ```

4. **Use /help to find the right command for a task:**
   ```
   Me: I want to compress my conversation but keep important context
   Claude: That's /compact
   Me: /help compact
   Claude: Detailed guide
   ```

### Success Criteria
- You've used `/help` with no arguments
- You've used `/help [command]` at least once
- You understand when to use 2-3 different commands
- You feel comfortable discovering commands via /help

## Gotchas

**Gotcha 1: /help doesn't teach you deep patterns**
`/help memory` explains what `/memory` does, but won't teach you advanced memory strategies. For deep learning, check the detailed reference files (memory.md, rewind.md, etc.)

**Gotcha 2: /help output can be long**
For broad commands like `/help search`, the output might be substantial. Skim the examples and "SEE ALSO" sections.

**Gotcha 3: Not all commands are discoverable via /help**
Some advanced commands or experimental features might not be in the main `/help` list. Ask Claude directly: "Is there a command to do X?"

**Gotcha 4: /help doesn't show keyboard shortcuts**
`/help` documents slash commands. For keyboard shortcuts (like `Esc×2` for checkpointing), check individual command reference files.

**Gotcha 5: /help is context-aware**
If you're in a specific context (TypeScript project, React app), `/help` might filter examples or suggestions. It's showing you the most relevant version.

**Gotcha 6: /help is your friend, not your enemy**
Some developers feel bad about using `/help` repeatedly. Don't. It's faster than trying to remember, and Claude Code expects you to use it. Use `/help` liberally.
