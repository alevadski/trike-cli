# Claude Code Modes

## What They Are

Claude Code has four operational modes that control how Claude interacts with your code:

1. **Default Mode** - Standard behavior with permission prompts
2. **Plan Mode** - Read-only analysis, no modifications allowed
3. **AcceptEdits Mode** - Auto-accepts file edits without prompting
4. **BypassPermissions Mode** - Skips all permission checks (use carefully!)

You can switch between modes using **Shift+Tab** during a session.

## Why This Matters

Modes let you control the level of automation and safety:
- **Plan mode** for exploration without risk
- **Default mode** for normal development with safeguards
- **AcceptEdits mode** for trusted workflows where you want speed
- **BypassPermissions** for autonomous operation (advanced)

## How to Use Each Mode

### Default Mode (Recommended for Most Work)

**What it does:**
- Claude asks permission before modifying files
- You review each change before it happens
- Balance of safety and productivity

**When to use:**
- Normal development workflow
- Working on unfamiliar code
- When you want to review changes before they happen

**How to use:**
```
# Start in default mode (default)
claude

# Or explicitly set it
claude --mode default
```

### Plan Mode (Read-Only Exploration)

**What it does:**
- Claude can analyze code but NOT modify files
- No file writes, no command execution
- Perfect for understanding without risk

**When to use:**
- Exploring a new codebase
- Understanding architecture before making changes
- Getting AI analysis without touching code
- Learning how something works

**How to use:**
```
# Start in plan mode
claude --mode plan

# Or switch during session with Shift+Tab
```

**Example workflow:**
```
You: "Analyze the authentication flow in this codebase"
Claude: [Reads files, explains how auth works, no modifications]

You: "I'm ready to make changes now"
Claude: [Prompts to exit plan mode]
You: "Yes, switch to default mode"
Claude: [Now can make changes with your permission]
```

### AcceptEdits Mode (Faster Development)

**What it does:**
- Auto-accepts file edits without asking
- Still shows you what's changing
- Speeds up iteration when you trust Claude

**When to use:**
- Trusted refactoring tasks
- Working on non-critical code
- When you're confident in the changes
- Prototyping and experimentation

**When NOT to use:**
- Production code without review
- Unfamiliar codebases
- Complex refactors you don't understand

**How to use:**
```
# Start with auto-accept
claude --mode acceptEdits

# Or switch during session with Shift+Tab
```

### BypassPermissions Mode (Advanced/Autonomous)

**What it does:**
- Skips ALL permission checks
- Claude operates fully autonomously
- Maximum speed, minimum safety rails

**When to use:**
- Fully automated scripts
- Trusted environments only
- You understand ALL the risks
- Quick prototyping on throwaway code

**When NOT to use:**
- Production code
- Shared repositories
- When you're unsure about changes
- Codebases you care about

**How to use:**
```
# Use with caution!
claude --dangerously-skip-permissions
```

**⚠️ Warning:** This mode bypasses safety checks. Only use in controlled environments where mistakes are acceptable.

## Switching Modes During a Session

**Keyboard shortcut:** Press **Shift+Tab** to cycle through modes

```
Default → Plan → AcceptEdits → BypassPermissions → Default
```

The current mode is shown in your Claude Code status line.

## Practical Workflows

### Workflow 1: Explore → Plan → Implement

```
1. Start in plan mode for exploration
   claude --mode plan

2. Ask Claude to analyze the codebase
   "Explain the user authentication system"

3. Once you understand, exit plan mode
   Press Shift+Tab or ask to switch to default mode

4. Make changes with permission prompts
   "Update the login flow to use JWT tokens"
```

### Workflow 2: Trusted Refactoring

```
1. Start in acceptEdits for speed
   claude --mode acceptEdits

2. Give clear instructions
   "Refactor all components to use TypeScript strict mode"

3. Claude applies changes automatically
   [Files modified without prompting]

4. Review changes with version control
   git diff
```

### Workflow 3: Safe Experimentation

```
1. Create a branch for experiments
   git checkout -b experiment

2. Use acceptEdits mode for rapid iteration
   claude --mode acceptEdits

3. Try different approaches quickly
   "Try implementing this with Redux"
   [Changes applied]
   "Actually, revert and try with Zustand"
   [Changes applied]

4. Review final result
   git diff main
```

## Configuration

You can set default modes in `~/.claude/settings.json`:

```json
{
  "defaultMode": "default",
  "autoAcceptEdits": false,
  "bypassPermissions": false
}
```

**Project-specific settings:**
Create `.claude/settings.json` in your project root to override defaults for that project.

## Best Practices

**Do:**
- Start in plan mode when exploring new code
- Use default mode for normal development
- Use acceptEdits for trusted, repetitive tasks
- Always use version control (git) before acceptEdits mode
- Understand what each mode allows before using it

**Don't:**
- Use bypassPermissions on production code
- Use acceptEdits on critical systems without review
- Forget which mode you're in (check status line)
- Use autonomous modes on unfamiliar codebases

## Common Patterns

### Pattern: Safe Exploration
```
Plan mode → Understand → Default mode → Implement
```

### Pattern: Rapid Prototyping
```
AcceptEdits mode → Quick iterations → Review diffs → Keep or revert
```

### Pattern: Mixed Approach
```
Default mode for logic → AcceptEdits for boilerplate → Default for testing
```

## Gotchas

**Gotcha 1: Plan mode can still read files**
Plan mode prevents modifications but Claude can still read all accessible files. Use `.claudeignore` to exclude sensitive data.

**Gotcha 2: AcceptEdits still shows changes**
AcceptEdits auto-accepts but changes are still visible in your editor and `git diff`. Review them!

**Gotcha 3: Mode persists in session**
If you switch modes with Shift+Tab, it stays that way for the session. Check status line if unsure.

**Gotcha 4: BypassPermissions is REALLY autonomous**
With `--dangerously-skip-permissions`, Claude can delete files, run commands, push to git. Only use when you mean it!

## Summary

Modes give you control over Claude's autonomy:

| Mode | Autonomy | Safety | Use Case |
|------|----------|--------|----------|
| Default | Low | High | Normal development |
| Plan | None | Highest | Read-only exploration |
| AcceptEdits | Medium | Medium | Trusted refactoring |
| BypassPermissions | Highest | Lowest | Autonomous automation |

Start with plan mode for exploration, default mode for development, and only use autonomous modes when you understand the risks.

**Switch modes:** Press **Shift+Tab** during any session.
