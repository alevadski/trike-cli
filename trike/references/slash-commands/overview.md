# Slash Commands Overview

## What They Are

Slash commands are shortcuts in Claude Code that let you control the conversation and your workspace without breaking context. They start with `/` and handle common workflows: searching code, managing context, reviewing changes, and optimizing sessions.

## Why They Matter

Experienced developers work fast. Slash commands eliminate friction:
- **Ask to find things instantly** instead of describing where they are
- **Manage context** precisely instead of hoping Claude understands your project
- **Review changes** before committing instead of rewriting
- **Stay focused** on problems, not meta-conversations about how Claude Code works

## Command Categories

### Essential (Use Every Session)
- `/help` - See all available commands
- Ask me to find files and code instantly (e.g., "Find the Button component")
- `/context` - See what Claude is looking at
- `#` prefix - Reference specific files without cluttering context

### Memory & Persistence
- `/memory [info]` - Store facts Claude should remember
- `#` prefix - Link to specific files for cross-session awareness

### Workflow Management
- `/review [changes]` - Review code before committing
- Use the commit command - Create git commits from Claude Code
- `/rewind` or `Esc×2` - Jump to previous conversation checkpoints

### Session Control
- `/clear` - Wipe current session, start fresh
- `/compact` - Compress history without losing important context
- `/init [project]` - Initialize a new Claude Code project
- `/export` - Export conversation or code

### Advanced
- `/agents` - Spawn subagents for parallel work
- `/help [command]` - Deep dive on specific commands

## The Real Power: Combinations

Slash commands become powerful when combined:

**Example: Refactoring a component**
```
1. Ask me to find UserCard
2. (Claude shows file)
3. Store with memory: UserCard uses styled-components, not Tailwind
4. (You describe changes)
5. Review your changes (before committing)
6. Ask me to commit with message: "Refactor UserCard to use Tailwind"
```

**Example: Handling interruptions**
```
1. You're working on a feature
2. Boss asks for urgent fix
3. Use the rewind command (jump back to checkpoint before feature work)
4. Fix the urgent issue
5. Use the rewind command (jump forward to feature work)
```

## Common Patterns by Role

### Frontend Developer
Frequent: Ask to find things, use memory command (component patterns), review changes, commit
Example: `I'm implementing dark mode. Find all buttons. Store with memory: Dark mode should preserve user preference in localStorage.`

### Backend Developer
Frequent: Ask to find things, use memory command (API contracts), check context (understanding service boundaries)
Example: `Building auth middleware. Where is UserService defined? Store with memory to understand existing patterns.`

### Full-Stack Developer
Frequent: All commands, especially the compact command (long sessions span both frontend and backend)
Example: Ask me to find things in frontend and backend, then use the compact command when conversation gets long.

### DevOps/Infrastructure
Frequent: Check context, use memory command (deployment constraints), use export command (documentation)
Example: `Setting up Kubernetes manifests. Store with memory: We deploy to AWS EKS, use KARPENTER for autoscaling.`

## When to Use Each Command

| Goal | How to Do It |
|------|---------|
| Find where something is | Ask me to find it (e.g., "Where is X defined?") |
| Tell Claude something important | `/memory` + `#` prefix |
| Jump to earlier work | `/rewind` or `Esc×2` |
| See what Claude is reading | `/context` |
| Review before committing | `/review` |
| Save conversation state | `/checkpoint` (via Esc×2) |
| Clear and start fresh | `/clear` |
| Compress long conversations | `/compact` |
| Delegate work | `/agents` |

## How They Work Under the Hood

Slash commands are executed by Claude Code (not sent to Claude). This means:
- **No context cost** - Switching between commands doesn't count against your context window
- **Immediate results** - No waiting for Claude to "think" about what you meant
- **Perfect accuracy** - Commands don't need natural language parsing

For example:
- Ask me "Find the Button component" and I'll find it instantly
- `/memory This project uses Tailwind, not styled-components` stores that fact for this session
- `/review` shows exactly what changed without guessing your intent

## Best Practices

**Do:**
- Use `/memory` when Claude makes assumptions about your project
- Ask me to find things before asking Claude to modify a file
- Use `/review` before every `/commit`
- Use `/context` when confused about what Claude is looking at
- Use `/rewind` + `Esc×2` to checkpoint before risky changes

**Don't:**
- Describe locations instead of asking me to find them
- Have meta-conversations about understanding when `/memory` can fix it
- Make major changes without `/review` first
- Assume Claude knows your architecture (use `/memory`)
- Forget to checkpoint with `Esc×2` before big changes

## Getting Help

**See all commands:**
```
/help
```

**Learn a specific command:**
```
/help memory
/help rewind
/help review
```

**Start here if you're new:**
Run `/help` to see all available commands, then dive into specific command guides below.

## Related Files in This Directory

For detailed information about specific commands, load these reference files:

- `@~/.claude/trike/references/slash-commands/memory.md` - Store persistent facts about your project
- `@~/.claude/trike/references/slash-commands/rewind.md` - Checkpoint and navigate conversation history
- `@~/.claude/trike/references/slash-commands/review.md` - Review code changes before committing
- `@~/.claude/trike/references/slash-commands/agents.md` - Spawn subagents for parallel work
- `@~/.claude/trike/references/slash-commands/clear.md` - Clear session and start fresh
- `@~/.claude/trike/references/slash-commands/compact.md` - Compress conversation history
- `@~/.claude/trike/references/slash-commands/export.md` - Export conversations and code
- `@~/.claude/trike/references/slash-commands/help.md` - Get help on commands
- `@~/.claude/trike/references/slash-commands/init.md` - Initialize Claude Code projects
