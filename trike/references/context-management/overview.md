# Context Management Overview

## What It Is

Context is the collection of files and information Claude Code reads to understand your project. It's the foundation of how Claude Code works—without proper context, I can't give you project-specific advice, only generic suggestions.

Claude Code's context system manages:
1. **Which files I can see** - Through file reading and /context command
2. **What I understand about your project** - Through CLAUDE.md configuration
3. **What I don't need to see** - Through .claudeignore exclusions
4. **How much space I have left** - Through token limits and awareness

## Why It Matters

**For accuracy:**
Without context, I give generic advice. With context, I understand YOUR specific architecture, patterns, and constraints. That's the difference between "here's a React component pattern" and "here's how it fits your Next.js App Router setup."

**For efficiency:**
Token limits are real. Every file I read consumes tokens. Proper context management means I see your ACTUAL code instead of node_modules, build artifacts, or other noise. This translates to better suggestions from more focused understanding.

**For productivity:**
Context shapes every interaction. A well-configured context means:
- Faster problem-solving (I understand your setup immediately)
- Better code suggestions (matching YOUR patterns)
- Fewer clarification questions (I already know your tech stack)
- More context available for complex tasks (less wasted on setup)

## How Claude Code Context Works

### The Context Pipeline

```
1. File Discovery
   ↓
2. .claudeignore Filtering
   ↓
3. CLAUDE.md Injection (project info)
   ↓
4. Token Budgeting
   ↓
5. Context Ready for Claude
```

### File Discovery

Claude Code starts with your entire project directory. By default, it CAN read any file you reference or ask about.

**What's always excluded:**
- `.git/` folder (version control internals)
- Common build/cache directories (handled by .claudeignore)
- Files you explicitly ask to ignore

**What's included:**
- Source code (all languages)
- Configuration files (package.json, tsconfig.json, etc.)
- Documentation (README.md, inline comments)
- Any file you directly reference with `# filename`

### .claudeignore Filtering

Think of .claudeignore like .gitignore, but for Claude Code. It tells me which files to skip, reducing noise and saving tokens.

**Common patterns:**
```
node_modules/          # Dependencies you didn't write
.git/                  # Version control metadata
dist/                  # Build outputs
.env                   # Secrets
*.log                  # Logs
```

**Why it matters:**
Including node_modules could use 50%+ of your context budget. Excluding it means I see MORE of your actual code.

### CLAUDE.md Injection

CLAUDE.md is a configuration file that documents your project specifically for me. It's injected into every conversation, so I always start with this context.

**What goes in CLAUDE.md:**
- Tech stack and framework versions
- Architecture decisions and constraints
- Coding patterns you prefer
- Project-specific knowledge
- Folder structure overview

**Example structure:**
```markdown
# My Project

## Tech Stack
- Next.js 14 (App Router)
- TypeScript 5.x
- Tailwind CSS
- React Query

## Architecture
- Components in /app/components
- API routes in /app/api
- Server Components preferred
- No client-side state managers

## Constraints
- Don't suggest Pages Router patterns
- No styled-components (Tailwind only)
- All async components are OK
```

Once this is in CLAUDE.md, I know these details automatically in every conversation.

### Token Budgeting

Every file I read consumes tokens from your context window. Claude Code tracks this awareness:

**Token math:**
- Large files consume more tokens (README: ~500, node_modules package: ~2000)
- Small files consume less (config files: ~50-200)
- CLAUDE.md is always included (baseline ~1000)
- Available tokens vary (usually 10,000-50,000 for actual project context)

**What this means:**
- Early in a conversation, I have more context budget
- As we discuss more, available context shrinks
- I'll proactively tell you when context is getting tight
- `/context` command shows current usage

### The /context Command

Shows you exactly what context I'm currently aware of:

```bash
/context
```

**Output includes:**
- Files currently in context
- Token count (used / available)
- CLAUDE.md status
- .claudeignore exclusions
- Context utilization percentage

**Example:**
```
Context Status: 18,234 / 50,000 tokens (36%)

Files in context:
- package.json (240 tokens)
- src/app.tsx (1,820 tokens)
- src/components/Button.tsx (456 tokens)
- CLAUDE.md (1,120 tokens)

Excluded by .claudeignore:
- node_modules/ (would be ~15,000 tokens)
- dist/ (would be ~3,500 tokens)

Available for new files: 31,766 tokens
```

**How to read it:**
- If tokens are above 80%, I might ask before reading large files
- If tokens are below 10%, context is very tight—previous conversations may be referenced less
- "Excluded by .claudeignore" shows what you've prevented me from reading

## Context Optimization Strategies

### 1. Start with CLAUDE.md

Before any technical work, invest 15 minutes in CLAUDE.md:
- Lists your tech stack
- Documents architecture decisions
- Explains your constraints
- Saves context tokens in every conversation

### 2. Use .claudeignore Aggressively

Exclude what you don't need me to read:
- Build artifacts (dist, build, .next, .out)
- Dependencies (node_modules, vendor)
- Logs and caches (*.log, __pycache__)
- Secrets (.env, .env.local)
- IDE files (.vscode, .idea)

Typical savings: 40-60% of context tokens.

### 3. Reference Specific Files

Instead of saying "read my component", be specific:
- ❌ "Look at my components"
- ✅ "# src/components/Button.tsx - show me the Button component"

Using the `#` prefix ensures I read exactly what you need.

### 4. Use /memory for Decisions

For facts that don't change, use /memory:
```
/memory We're using SWR for data fetching, not React Query
/memory Auth tokens stored in httpOnly cookies, never localStorage
```

These facts are stored and reused across conversations without consuming new tokens each time.

### 5. Monitor Context with /context

Regularly check:
```bash
/context
```

This tells you:
- Current token usage
- When you're approaching limits
- Which files are consuming the most tokens
- What's being excluded

## Common Context Problems and Fixes

### Problem: "I keep explaining the same things"
**Root cause:** CLAUDE.md missing or incomplete
**Fix:** Create/enhance CLAUDE.md with your tech stack and patterns

### Problem: "Context fills up quickly"
**Root cause:** .claudeignore excludes too little (or missing entirely)
**Fix:** Add node_modules/, dist/, .next/ etc. to .claudeignore

### Problem: "Claude seems to forget previous context"
**Root cause:** Context window limit reached (usually ~15,000 tokens in a conversation)
**Fix:** Use `/memory` to store important facts, start a new conversation, or reference files directly with `#`

### Problem: "Getting generic advice, not project-specific"
**Root cause:** CLAUDE.md is missing or too minimal
**Fix:** Add architecture details, framework versions, and coding patterns to CLAUDE.md

## Quick Start: Set Up Context Properly

**Step 1: Create CLAUDE.md** (5 min)
```bash
# In your project root
cat > CLAUDE.md << 'EOF'
# Project Name

## Tech Stack
- Framework: [your framework]
- Language: [your language]
- Key libraries: [list them]

## Architecture
- Folder structure: [brief overview]
- Key patterns: [what you prefer]

## Constraints
- Don't suggest: [patterns you avoid]
- Always use: [preferred approach]
EOF
```

**Step 2: Create .claudeignore** (2 min)
```bash
cat > .claudeignore << 'EOF'
node_modules/
dist/
build/
.next/
.git/
*.log
.env
.env.local
EOF
```

**Step 3: Verify** (1 min)
```bash
/context
```

Should see your CLAUDE.md injected and large directories excluded.

## Related Files in This Directory

For detailed information about specific context management topics, load these reference files:

- `@~/.claude/trike/references/context-management/claude-md.md` - Complete guide to creating effective CLAUDE.md files
- `@~/.claude/trike/references/context-management/claudeignore.md` - Detailed guide to .claudeignore patterns and optimization
- `@~/.claude/trike/references/context-management/context-command.md` - How to use and interpret /context command output

## Summary

Context management is the foundation of effective Claude Code use:

1. **CLAUDE.md** tells me what I need to know about your project
2. **.claudeignore** tells me what NOT to read
3. **Token limits** mean I need to be strategic about what I load
4. **/context** shows me what's currently loaded
5. **Good context = better advice**

Invest time upfront in context setup, and every conversation becomes more productive.
