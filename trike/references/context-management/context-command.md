# The /context Command: Monitoring and Optimization

## What It Is

The `/context` command is a diagnostic tool that shows you exactly what context is currently loaded, how many tokens it's using, and how much capacity remains.

Think of it like a system monitor for Claude Code's context window.

## Why It Matters

**Awareness:**
You need to know when context is getting full so you can manage it proactively.

**Debugging:**
When advice feels generic, `/context` shows if CLAUDE.md is loaded. When context runs out, `/context` shows why.

**Optimization:**
By seeing what's consuming tokens, you can improve .claudeignore patterns and save budget.

**Strategic decisions:**
Knowing available capacity helps you decide whether to read a large file or defer it to a new conversation.

## How to Use

### Basic Command

```bash
/context
```

Outputs current context status. Shows:
- Total tokens used vs. available
- Files in current context
- CLAUDE.md injection status
- .claudeignore exclusions
- Remaining token budget

### When to Run

**Before starting work:**
```bash
/context
```
Verify CLAUDE.md is loaded and context is clean.

**When advice feels off:**
```bash
/context
```
Check if project setup (CLAUDE.md) is actually loaded.

**When approaching token limits:**
```bash
/context
```
See what's consuming space and plan next steps.

**During large file analysis:**
```bash
/context
```
Understand how much capacity analyzing this file will consume.

## Reading /context Output

### Example Output Structure

```
=== CONTEXT STATUS ===

Token Usage: 18,456 / 50,000 (37%)
Available: 31,544 tokens

=== FILES IN CONTEXT ===

Size        Tokens    File
────────────────────────────────────
  2.1 KB     240      package.json
  8.5 KB    1,240     src/app.tsx
  4.2 KB     650      src/components/Button.tsx
  1.8 KB     310      README.md
  3.4 KB     524      CLAUDE.md (injected)

Total loaded: 5 files | 3,000 tokens

=== EXCLUDED BY .claudeignore ===

Patterns: node_modules/, .next/, dist/, *.log, .env
Would exclude: ~22,000 tokens
- node_modules/ → ~18,500 tokens (15,847 files)
- .next/ → ~2,100 tokens (1,234 files)
- dist/ → ~850 tokens (342 files)
- *.log → ~150 tokens (47 files)
- .env → ~50 tokens (1 file)

=== CLAUDE.md STATUS ===

✅ Loaded: CLAUDE.md (3.4 KB, 524 tokens)
Framework: Next.js 14 (App Router)
Tech Stack: TypeScript, React, Tailwind CSS

=== CAPACITY ANALYSIS ===

Available: 31,544 tokens
Estimated file sizes you could add:
- Large file (50 KB): ~7,250 tokens ✅ Fits
- Medium file (20 KB): ~2,900 tokens ✅ Fits
- Small file (5 KB): ~730 tokens ✅ Fits
```

## Breaking Down the Output

### 1. Token Usage

```
Token Usage: 18,456 / 50,000 (37%)
Available: 31,544 tokens
```

**What this means:**
- Currently using 18,456 tokens
- Total capacity is 50,000 tokens
- 31,544 tokens still available (63%)
- At 37%, you have plenty of room

**Thresholds:**
- Below 50%: Comfortable, read large files freely
- 50-75%: Getting moderate, be selective about new files
- 75-90%: Tight, think twice before adding files
- 90-95%: Very tight, consider new conversation
- 95%+: Essentially full, new conversation recommended

### 2. Files in Context

```
Size        Tokens    File
────────────────────────────────────
  2.1 KB     240      package.json
  8.5 KB    1,240     src/app.tsx
  4.2 KB     650      src/components/Button.tsx
```

**Read as:**
- package.json: 2.1 KB file, consuming 240 tokens
- src/app.tsx: 8.5 KB file, consuming 1,240 tokens
- Ratio: ~120 tokens per KB for code (varies by file type)

**Key insights:**
- Which files are largest (and consuming most tokens)
- Whether specific files are loaded (helpful for debugging)
- Whether your context is focused or scattered

**What to look for:**
- Large files consuming disproportionate tokens? Exclude them in .claudeignore
- Missing files you expected? Use `# filename` to load them
- Too many files from early in conversation? Consider pruning context

### 3. Excluded by .claudeignore

```
Patterns: node_modules/, .next/, dist/, *.log, .env
Would exclude: ~22,000 tokens
- node_modules/ → ~18,500 tokens (15,847 files)
```

**What this tells you:**
- Your .claudeignore patterns are working
- How many tokens they're saving you
- Which patterns are most effective

**Interpretation:**
- node_modules savings of 18,500 tokens = excellent
- .next/ savings of 2,100 tokens = good
- These combined save 20,600 tokens (40% of your budget!)

**If exclusions are small:**
Your .claudeignore might not be comprehensive enough. Consider adding:
- node_modules/ (if not already)
- dist/, build/, out/
- .next/ (for Next.js)
- __pycache__/ (for Python)
- *.log
- .env

### 4. CLAUDE.md Status

```
✅ Loaded: CLAUDE.md (3.4 KB, 524 tokens)
Framework: Next.js 14 (App Router)
Tech Stack: TypeScript, React, Tailwind CSS
```

**Good signs (✅):**
- CLAUDE.md is loaded
- Shows the metadata extracted from it
- You see your framework and tech stack

**Bad signs (❌):**
```
❌ Not loaded: CLAUDE.md not found
```

If CLAUDE.md isn't loaded:
1. Create it: `touch CLAUDE.md` in project root
2. Add basic content (see claude-md.md guide)
3. Run `/context` again

### 5. Capacity Analysis

```
Available: 31,544 tokens
Estimated file sizes you could add:
- Large file (50 KB): ~7,250 tokens ✅ Fits
- Medium file (20 KB): ~2,900 tokens ✅ Fits
- Small file (5 KB): ~730 tokens ✅ Fits
```

**What this helps with:**
- Before reading a large file, you know if it fits
- Helps prioritize which file to read first
- Shows if you need to defer analysis to new conversation

**Example decision:**
```
You have 31,544 tokens available.
Want to analyze all files in /src/components/ (120 KB total)?

At ~150 tokens per KB:
120 KB × 150 = 18,000 tokens needed
31,544 available = ✅ Fits with room to spare
```

## Practical Examples

### Example 1: Debugging Generic Advice

**Situation:** You're getting generic advice that doesn't match your project

**What to do:**
```bash
/context
```

**What to look for:**
```
✅ Loaded: CLAUDE.md
```

If NOT loaded:
- Create CLAUDE.md
- Add your tech stack and constraints
- Advice will become more specific

### Example 2: Context Filling Up

**Situation:** You've been discussing a lot and feel like context might be full

**What to do:**
```bash
/context
```

**Output shows:**
```
Token Usage: 45,234 / 50,000 (90%)
Available: 4,766 tokens

⚠️  Context is 90% full. Consider:
- Starting a new conversation
- Using /memory to store important facts
- Deferring large file analysis
```

**Next steps:**
- Use `/memory` to save critical decisions
- Start new conversation with `# filename` to bring in important context
- Or keep going carefully with small files only

### Example 3: Optimizing .claudeignore

**Situation:** Context is only at 40%, but you're not seeing much of your code

**What to do:**
```bash
/context
```

**Output shows:**
```
Excluded by .claudeignore:
- node_modules/ → ~15,000 tokens
- .next/ → ~2,100 tokens
- dist/ → ~1,200 tokens

Total excluded: ~18,300 tokens
```

**Analysis:**
- You're excluding 18,300 tokens
- Available is 31,544
- But only 5 files loaded (~3,000 tokens of actual code)
- Problem: Not enough source files loaded yet

**Solution:**
Use `# filename` to reference specific files:
```
# src/app.tsx - show me the app component
# src/components/Button.tsx - show me the button component
```

### Example 4: Planning Large File Analysis

**Situation:** You want to analyze a 200 KB generated file

**What to do:**
```bash
/context
```

**Check available tokens:**
```
Available: 31,544 tokens
Large file (200 KB): ~29,000 tokens ✅ Barely fits
```

**Decision:**
- Could load it, but leaves almost no room for anything else
- Better to: start new conversation, load the file first, then add other context
- Or: use `# filename` to read just the part you need

## /context Command Variants

### Check without Side Effects

Some versions let you check context without changing it:

```bash
/context --check
```

(Availability depends on your Claude Code version)

### Get Detailed Breakdown

Some versions provide more detail:

```bash
/context --detailed
```

Shows:
- Token count per file type
- Breakdown by category (source, config, docs)
- Detailed exclusion analysis

### Save Context Report

You might want to save context info for analysis:

```bash
/context > context_report.txt
```

(Availability depends on your setup)

## Common /context Issues

### Issue: CLAUDE.md Not Showing

**Problem:**
```
❌ Not loaded: CLAUDE.md not found
```

**Solutions:**
1. Create file in project root: `touch CLAUDE.md`
2. Add content to it
3. Make sure filename is exactly `CLAUDE.md` (case-sensitive on Linux/Mac)
4. Run `/context` again

### Issue: Exclusions Not Working

**Problem:**
```
Excluded by .claudeignore:
[nothing listed or very little]
```

**Solutions:**
1. Check .claudeignore exists: `ls .claudeignore`
2. Add basic patterns:
   ```
   node_modules/
   dist/
   .env
   ```
3. Verify patterns match your structure
4. Run `/context` again

### Issue: Too Few Tokens Available

**Problem:**
```
Token Usage: 47,000 / 50,000 (94%)
Available: 3,000 tokens
```

**Solutions:**
1. You've read many files—context is full
2. Use `/memory` to save important facts
3. Start new conversation
4. Or continue carefully with small, focused tasks

### Issue: Large Gaps in Context

**Problem:**
You're at 40% capacity but see very few files loaded

**Solutions:**
1. Use `# src/file.ts` to load specific files
2. Check .claudeignore patterns aren't too aggressive
3. Ask me to read specific files

## Context Management Workflow

### Before Starting

```bash
/context
```

Ensure:
- CLAUDE.md loaded ✅
- .claudeignore configured ✅
- Available tokens adequate ✅

### During Work

Every 20-30 minutes:
```bash
/context
```

Monitor:
- Still have capacity? ✅
- CLAUDE.md still active? ✅

### When Approaching Limits

```bash
/context
```

If above 80%:
- Save progress with `/memory`
- Consider new conversation
- Or finish task on limited context

### After Large Analysis

```bash
/context
```

Verify you still have capacity for next task.

## Context Optimization Tips

### 1. Monitor Regularly

Every conversation, run `/context` at:
- Start (verify setup)
- Midway (confirm capacity)
- Before reading large files (estimate impact)

### 2. Use .claudeignore Aggressively

Every time `/context` shows large exclusions being minimal:
```bash
/context
```

If "Excluded by .claudeignore" is < 10,000:
- Add patterns: node_modules/, dist/, build/, etc.
- Rerun `/context`
- Should save 20,000+ tokens

### 3. Leverage CLAUDE.md

When `/context` shows CLAUDE.md NOT loaded:
```markdown
# Your Project
[tech stack, architecture, constraints]
```

This single file improves advice for entire conversation.

### 4. Be Strategic About File Loading

Before reading a file:
```bash
/context
```

Check: "Can this file fit? Should I read it now or defer?"

## Summary

`/context` is your context awareness tool:

1. **Run regularly:** Start, middle, before large files
2. **Check status:** Token usage, availability
3. **Verify setup:** CLAUDE.md loaded, .claudeignore working
4. **Estimate capacity:** Before reading large files
5. **Optimize patterns:** Use insights to improve .claudeignore

A few seconds running `/context` throughout conversation saves hours by preventing context problems and ensuring you always have the analysis capacity you need.

Use it as a habit—like checking fuel gauge before a road trip.
