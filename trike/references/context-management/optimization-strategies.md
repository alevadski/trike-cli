# Context Management Optimization Strategies

## What It Is

Context optimization is the practice of strategically managing which files and data Claude reads to maximize token efficiency. With a fixed context budget (typically 200,000 tokens), every file you include must earn its place.

Context optimization means being intentional about what Claude analyzes and what gets excluded, ensuring you get the most value from your token budget.

## Why This Matters

**Token Budget is Finite:** Most Claude Code sessions have a 200,000 token limit. Once you exceed it, Claude stops reading new files.

**Better Analysis:** Less context clutter means Claude focuses on your actual code, not node_modules or build artifacts.

**Faster Responses:** Smaller context = faster processing = quicker responses.

**Cost Efficiency:** Fewer tokens used = lower API costs if you're on a paid plan.

**Real Example:**
```
Without optimization:
- node_modules: 45,000 tokens
- dist/ build artifacts: 12,000 tokens
- .git/: 8,000 tokens
- Your code: 5,000 tokens
Total: 70,000 tokens used for small amount of useful context

With optimization:
- Your code: 25,000 tokens
- Key dependencies config: 2,000 tokens
- Total: 27,000 tokens available for deep analysis
```

## How Context Works

### Token Counting

Not all files cost the same:

```
package.json: ~500 tokens
Single component file (500 lines): ~2,000 tokens
node_modules folder: 30,000-50,000 tokens
Large codebase (10 files): 15,000-25,000 tokens
```

You can check context usage:

```bash
# See what's included and token counts
claude context info

# See what's excluded
claude context excluded
```

### Context Selection

Claude automatically:
1. Reads files in .claudeignore
2. Scans your project structure
3. Identifies relevant code for your task
4. Loads files in priority order

Your job: Guide this process with .claudeignore patterns.

## Optimization Strategies

### Strategy 1: Aggressive Dependency Exclusion

**The problem:** Dependencies like node_modules can use 40,000+ tokens.

**The solution:** Exclude them entirely:

```
# .claudeignore
node_modules/
vendor/
.venv/
venv/
env/
```

**Why it works:** You rarely need Claude to read third-party code. When you do, you can explicitly ask.

**Real savings:** 30,000-50,000 tokens per project.

### Strategy 2: Exclude Build Artifacts

**The problem:** Build outputs, compiled files, and temporary artifacts add up.

**The solution:**

```
# .claudeignore
dist/
build/
out/
.next/
.nuxt/
__pycache__/
*.pyc
```

**Why it works:** Build artifacts are generated, not source code. You want Claude to analyze source, not builds.

**Real savings:** 5,000-15,000 tokens per project.

### Strategy 3: Exclude Environment and Configuration Files

**The problem:** Environment-specific files multiply context without adding value.

**The solution:**

```
# .claudeignore
.env
.env.local
.env.*.local
secrets/
credentials/
```

**Why it works:** These files are environment-specific and repetitive across different environments.

**Real savings:** 1,000-3,000 tokens, but more importantly keeps secrets secure.

### Strategy 4: Exclude Logs and Caches

**The problem:** Log files and caches grow indefinitely and add noise.

**The solution:**

```
# .claudeignore
*.log
logs/
.cache/
.pytest_cache/
.jest_cache/
.eslintcache/
```

**Why it works:** Logs and caches are transient and don't help Claude understand your code.

**Real savings:** 1,000-5,000 tokens depending on log volume.

### Strategy 5: Be Selective with Large Text Files

**The problem:** Database dumps, large CSVs, and data files consume huge amounts of tokens.

**The solution:**

```
# .claudeignore
*.db
*.sqlite
*.sqlite3
data/
datasets/
*.csv    # Only if very large
```

**Why it works:** Data files are usually not code. When you need them analyzed, you can ask for that specifically.

**Real savings:** 10,000-100,000 tokens depending on data size.

### Strategy 6: Project-Specific Optimization

Different projects need different strategies:

**For Node.js/JavaScript:**
```
node_modules/
.next/
.nuxt/
dist/
coverage/
npm-debug.log*
yarn-error.log*
```

**For Python:**
```
__pycache__/
.pytest_cache/
.coverage
htmlcov/
*.pyc
.venv/
venv/
```

**For React/Frontend:**
```
node_modules/
.next/
dist/
.cache/
coverage/
public/generated/
```

**For Full-Stack:**
```
node_modules/
venv/
.next/
dist/
build/
.pytest_cache/
__pycache__/
data/
```

### Strategy 7: Smart File Inclusion

Instead of loading everything, load only what's relevant:

**Before (bad):**
```bash
# This loads tons of files
You: "What's the structure of this project?"
```

**After (good):**
```bash
# Be specific about what you want to analyze
You: "Analyze the authentication module in src/auth/"
```

Claude will focus on:
1. Files in src/auth/
2. Related files those depend on
3. Configuration files
4. Not the entire project

**Real savings:** 50,000+ tokens by being specific.

## Advanced Optimization Patterns

### Pattern 1: Monorepo Optimization

Monorepos have multiple packages. Exclude what you don't need:

```
# .claudeignore for monorepo
packages/*/node_modules/
packages/*/dist/
apps/*/build/

# But maybe keep root-level shared code
# (don't exclude packages/ entirely)
```

### Pattern 2: Large Assets Exclusion

If your project has media, databases, or generated files:

```
# .claudeignore
*.mp4
*.mov
*.png
*.jpg
*.jpeg
*.gif
*.db
*.sqlite
public/generated/
```

### Pattern 3: Generated Code

Exclude auto-generated code that clutters context:

```
# .claudeignore
src/generated/
src/types/generated.ts
src/gql/
.graphql/
protobuf/
```

### Pattern 4: IDE and Tool Files

Exclude editor configurations you don't need Claude to read:

```
# .claudeignore
.vscode/
.idea/
*.swp
*.swo
.DS_Store
Thumbs.db
```

## Token Optimization Workflow

### Step 1: Baseline Measurement

Check your current context usage:

```bash
claude context info
```

Note the total tokens and what's included.

### Step 2: Identify Large Items

```bash
# Find largest directories
du -sh . --exclude=node_modules --exclude=.git | sort -hr | head -20
```

These are candidates for exclusion.

### Step 3: Create .claudeignore

Start with essentials:

```
# Security
.env
.env.local

# Dependencies
node_modules/
vendor/
.venv/

# Build
dist/
build/

# Logs
*.log

# Version control
.git/
```

### Step 4: Add Project-Specific Patterns

Based on your tech stack, add more patterns.

### Step 5: Verify Impact

```bash
claude context info
```

You should see significant token savings.

### Step 6: Iterate

Monitor context usage:
- If still too high, add more exclusions
- If excluding too much, remove patterns
- Aim for 30,000-50,000 tokens for typical projects

## Context Usage by File Type

Reference these typical token costs:

```
package.json: 500 tokens
tsconfig.json: 300 tokens
eslintrc: 200 tokens

Single .tsx file (300 lines): 1,200 tokens
Single .py file (300 lines): 1,000 tokens
Single .js file (300 lines): 1,000 tokens

Entire src/ directory (50 files): 20,000 tokens
node_modules directory: 40,000-60,000 tokens
Documentation (10 markdown files): 5,000 tokens
```

## Best Practices

**Do:**
- Start with aggressive exclusion, add back as needed
- Exclude all dependencies (node_modules, venv, vendor)
- Exclude build outputs and generated files
- Be specific in your requests ("analyze src/auth/" not "analyze everything")
- Review context usage regularly
- Update .claudeignore as projects evolve
- Keep source code included (never exclude src/, app/, lib/)

**Don't:**
- Over-exclude to the point Claude can't see your code
- Exclude configuration files (package.json, tsconfig.json)
- Assume Claude needs everything to help you
- Include test fixtures or mock data files
- Keep outdated .claudeignore patterns
- Exclude CLAUDE.md or project documentation

## Measuring Optimization Success

Your optimization is working well when:

```
- Total context: 20,000-50,000 tokens
- Your code: 50%+ of context
- Excluded items: 30,000-80,000 tokens "saved"
- Response time: Fast (typically <2 seconds)
- Analysis quality: Claude focuses on your code, not noise
```

## Gotchas

**Gotcha 1: Over-exclusion hides code**

If you exclude too much, Claude can't help effectively:

```
BAD: *.js *.ts src/  (excludes all code)
GOOD: node_modules/ (excludes only dependencies)
```

**Gotcha 2: Patterns apply recursively**

A pattern applies everywhere:

```
logs/       # Excludes logs/ at root and nested
.env        # Excludes .env everywhere in tree
```

**Gotcha 3: Configuration files matter**

Never exclude:
- package.json / requirements.txt
- tsconfig.json / .eslintrc
- CLAUDE.md
- Source directories (src/, app/, lib/)

**Gotcha 4: Context is per-session**

Each session starts fresh with current .claudeignore. Changes take effect immediately.

**Gotcha 5: Explicit references override exclusions**

Even if file is in .claudeignore, you can force Claude to read it:

```
You: "# database-dump.sql - analyze this file"
Claude: [Reads file despite .claudeignore exclusion]
```

## Summary

Context optimization maximizes your token budget:

1. **Start aggressive:** Exclude dependencies, build outputs, logs
2. **Exclude by type:** .env files, caches, node_modules
3. **Be specific:** Ask Claude to analyze specific areas
4. **Monitor:** Check `claude context info` regularly
5. **Iterate:** Add/remove patterns based on actual usage

A well-optimized project:
- Uses 30,000-50,000 tokens total
- Focuses Claude on your code (50%+ of context)
- Saves 30,000-80,000 tokens through exclusions
- Produces faster, more focused responses

Common exclusions: node_modules/, dist/, build/, .env, *.log

For more: Check reference on .claudeignore for detailed pattern syntax.
