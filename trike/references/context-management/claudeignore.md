# .claudeignore Patterns and Best Practices

## What It Is

.claudeignore is a file in your project root that tells Claude Code which files and directories to skip. It works like .gitignore but specifically for context management.

When you add a pattern to .claudeignore, those files are excluded from context entirely. I won't read them unless you specifically reference them.

## Why It Matters

**Token savings:**
Including node_modules could use 50,000+ tokens (half your budget). Excluding it means you keep that budget for actual code analysis.

**Faster context loading:**
Fewer files to scan = faster context initialization.

**Security:**
You can exclude .env files containing secrets, ensuring I never read them accidentally.

**Focus:**
Without build artifacts, logs, and dependencies cluttering context, I see more of YOUR actual code.

**Real impact:**
A well-configured .claudeignore typically saves 40-60% of context tokens.

## Basic Patterns

### Syntax

.claudeignore uses standard gitignore syntax:

```
# Exact filename
.env

# Directories (trailing slash)
node_modules/

# Glob patterns
*.log
*.pyc
dist/
build/

# Exclude pattern (but maybe include specific file)
# pattern starting with ! will be included
# Note: Many ignore tools don't support this perfectly

# Comments (lines starting with #)
# This is a comment

# Whitespace-only lines are ignored
```

### Common Directories to Exclude

```
# Dependencies (ALWAYS exclude these)
node_modules/
vendor/
.venv/
env/

# Build outputs
dist/
build/
out/
.next/
.nuxt/
target/

# IDE and Editor files
.vscode/
.idea/
*.swp
*.swo

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
*.log
logs/

# Version control
.git/
.gitignore

# Cache directories
.cache/
__pycache__/
.pytest_cache/
.eslintcache/
.next/cache/

# OS files
.DS_Store
Thumbs.db

# Temporary files
tmp/
temp/
.tmp/
```

## Patterns by Project Type

### Node.js / JavaScript / TypeScript

```
# Essential excludes
node_modules/
.env
.env.local
*.log

# Build outputs
dist/
build/
.next/
.nuxt/
out/

# IDE
.vscode/
.idea/

# Testing
.nyc_output/
coverage/
.jest_cache/

# Package manager
package-lock.json  # Optional: if you prefer seeing lock file
pnpm-lock.yaml     # Optional: if you prefer seeing lock file
```

**Why exclude node_modules:**
A typical node_modules directory contains 10,000+ files. Reading all of them could consume 30,000-50,000 tokens. Your actual code is probably only 2,000-5,000 tokens. You want me to see your code, not libraries.

**Example savings:**
```
With node_modules:  45,000 tokens used on dependencies, 5,000 on your code
Without it:         50,000 tokens available for your code
```

### Python

```
# Essential
.env
.venv/
venv/
env/
__pycache__/
*.pyc
*.pyo

# Build
dist/
build/
*.egg-info/

# IDE
.vscode/
.idea/

# Testing
.pytest_cache/
.coverage
htmlcov/

# Logs
*.log
```

### React/Next.js Specific

```
# Essential
node_modules/
.env
.env.local
.env*.local

# Next.js
.next/
out/
build/

# IDE
.vscode/
.idea/

# Testing
.nyc_output/
coverage/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### Django/Python Web

```
# Essential
.env
.env.local
.venv/
venv/
__pycache__/
*.pyc

# Django
db.sqlite3
staticfiles/
media/

# IDE
.vscode/
.idea/

# Testing
.pytest_cache/
.coverage
htmlcov/

# Logs
*.log
```

### Go

```
# Build
bin/
dist/
*.exe
*.dll

# IDE
.vscode/
.idea/
*.swp

# Logs
*.log

# Environment
.env
.env.local

# Go mod cache (optional)
# vendor/  # Only exclude if very large
```

### Java

```
# Build
target/
build/
*.class
*.jar
*.war

# IDE
.idea/
.vscode/
*.swp

# Maven
.m2/

# Gradle (uncomment if using Gradle)
# .gradle/
# gradle/

# Logs
*.log

# Environment
.env
.env.local
```

## Advanced Patterns

### Excluding Specific File Types

```
# All log files
*.log

# All temp files
*.tmp
*.bak
*.swp

# All compiled files
*.o
*.class
*.pyc

# All minified files
*.min.js
*.min.css
```

### Excluding Deeply Nested Paths

```
# Exclude node_modules anywhere (top-level or nested)
node_modules/

# Exclude hidden directories
.*/

# Exclude specific deep path
src/node_modules/
tests/fixtures/large-data/
```

### Including Specific Files in Excluded Directories

**Note:** Most tools (including Claude Code's context system) don't perfectly support negative patterns like in gitignore. Instead:

**Option 1: Don't exclude the parent**
```
# Instead of excluding entire /src directory:
src/node_modules/  # Only exclude this

# Leave /src itself accessible
```

**Option 2: List individually**
```
logs/
# But want logs/important.log?
# Better to exclude the whole logs/ folder and reference files explicitly when needed
```

## Context-Specific Patterns

### For Large Monorepos

```
# Exclude all node_modules except root
packages/*/node_modules/
apps/*/node_modules/

# But keep root accessible
# node_modules/  (don't exclude root)
```

### For Projects with Large Assets

```
# Images and media
*.mp4
*.mov
*.png
*.jpg
*.jpeg
*.gif

# Databases
*.db
*.sqlite
*.sqlite3

# Archives
*.zip
*.tar
*.gz
```

### For Projects with Generated Code

```
# Auto-generated from schemas
src/generated/
src/types/generated.ts

# Built documentation
docs/generated/

# Compiled output
dist/
out/
```

### For ML/Data Science Projects

```
# Large data files
data/
datasets/
*.csv  # Only if very large
*.parquet
*.feather

# Models
models/
*.pkl
*.h5

# Notebooks output
.ipynb_checkpoints/
```

## Creating an Effective .claudeignore

### Step 1: Start with Essentials

Every project should exclude:
```
# Security
.env
.env.local

# Dependencies
node_modules/
vendor/
.venv/

# Build outputs
dist/
build/

# Version control
.git/

# Logs
*.log
```

### Step 2: Add Project-Specific

For your tech stack:

**Node.js/JavaScript:**
```
# Add to essentials
.next/
npm-debug.log*
```

**Python:**
```
# Add to essentials
__pycache__/
.pytest_cache/
```

### Step 3: Test It

```bash
# Check what would be excluded
# Run this to see files that match patterns:
git check-ignore -v *

# Or verify in Claude Code:
/context
```

The `/context` command shows what's excluded.

### Step 4: Iterate

Monitor context usage:
```bash
/context
```

If context is still tight:
- Add more patterns to .claudeignore
- Look for large directories being included
- Exclude those directories

## Interpreting /context Output

The `/context` command shows what's excluded:

```
Excluded by .claudeignore:
- node_modules/ (would be ~25,000 tokens)
- .next/ (would be ~3,500 tokens)
- __pycache__/ (would be ~2,100 tokens)
- *.log (would be ~450 tokens)
Total savings: ~31,050 tokens
```

**Read this as:**
- node_modules is HUGE - great that it's excluded
- .next/ is significant - make sure you want it excluded
- Log files are small but add up - good to exclude

If you see "Excluded by .claudeignore" with 0 entries, your .claudeignore might be missing or not working.

## Common Mistakes

### Mistake 1: Over-Excluding

**Problem:**
```
# Too aggressive
*.js
*.css
src/
```

**Result:** I can't see your code

**Fix:** Only exclude what you don't need me to read:
```
# Better
node_modules/
dist/
.env
```

### Mistake 2: Under-Excluding

**Problem:**
```
.env
```

**Result:** Context fills with node_modules, logs, build artifacts

**Fix:** Add common exclusions:
```
.env
node_modules/
dist/
build/
*.log
```

### Mistake 3: Excluding Important Files

**Problem:**
```
package.json
tsconfig.json
```

**Result:** I lose critical project info

**Fix:** Never exclude:
- package.json / requirements.txt
- Configuration files (tsconfig.json, jest.config.js)
- CLAUDE.md (it should always be included)
- Source code directories (src/, lib/, app/)

### Mistake 4: Not Maintaining It

**Problem:** .claudeignore from 2021 includes patterns for dependencies you no longer use

**Result:** Patterns are irrelevant but no harm

**Fix:** Review .claudeignore quarterly:
- [ ] Remove patterns for old dependencies
- [ ] Add patterns for new ones
- [ ] Check current project size with `/context`

## .claudeignore vs .gitignore

They're similar but different:

| Pattern | .gitignore | .claudeignore |
|---------|-----------|---------------|
| .env | ✅ Should be | ✅ Should be |
| node_modules/ | ✅ Usually | ✅ Always |
| build/ | ✅ Usually | ✅ Usually |
| .git/ | N/A (Git skips) | ✅ Explicitly skip |
| *.log | ✅ Often | ✅ Often |
| dist/ | ✅ Often | ✅ Often |
| src/ | ❌ Never | ❌ Never |

**Key difference:**
- .gitignore: What NOT to commit
- .claudeignore: What NOT to read

You should have BOTH:
- .gitignore handles version control
- .claudeignore handles context management

## Special Cases

### When You Want Me to READ an "Ignored" File

Even with patterns in .claudeignore, you can force reading:

```
# This will work even if logs/ is in .claudeignore
# logs/error-trace.txt - show me the error
```

Using the `#` prefix overrides .claudeignore patterns.

### Large Single Files

If you have a single large file (e.g., 100MB database dump):

```
# In .claudeignore
data.db
large-dataset.csv
```

But reference it specifically when needed:
```
# data.csv - analyze this file
```

### Temporary Exclusions

For debugging, you might temporarily need to see something:

```bash
# Ask Claude to analyze without .claudeignore constraints
# (explain the need - I can read specific large files on demand)
```

## .claudeignore Template

Copy this template and customize:

```
# ===== Security =====
.env
.env.local
.env.*.local
secrets/
credentials/

# ===== Dependencies =====
node_modules/
vendor/
.venv/
venv/
env/

# ===== Build Outputs =====
dist/
build/
out/
.next/
.nuxt/

# ===== IDE & Editors =====
.vscode/
.idea/
*.swp
*.swo

# ===== Testing & Coverage =====
coverage/
.nyc_output/
.jest_cache/
.pytest_cache/

# ===== Logs =====
*.log
logs/

# ===== OS & Temp =====
.DS_Store
Thumbs.db
.tmp/
tmp/

# ===== Language-Specific =====
# Python
__pycache__/
*.pyc
*.pyo

# ===== Version Control =====
.git/

# ===== Package Managers (optional) =====
# Uncomment if you don't want to see lock files
# package-lock.json
# pnpm-lock.yaml
# yarn.lock
```

## Verification Checklist

Before relying on .claudeignore:

- [ ] .claudeignore file exists in project root
- [ ] Essential patterns included (.env, node_modules/, dist/)
- [ ] Technology-specific patterns added (e.g., .next/ for Next.js)
- [ ] Run `/context` to verify exclusions work
- [ ] Check that source code is NOT excluded
- [ ] Test with a large file reference (`# filename`)

## Summary

.claudeignore is your token budget optimizer:

1. **Start with essentials:** .env, node_modules/, build outputs
2. **Add tech-specific:** .next/, __pycache__/, etc.
3. **Be aggressive with exclusions:** Dependencies, logs, caches
4. **Never exclude source code:** Keep src/, app/, lib/ included
5. **Monitor with /context:** Check savings regularly
6. **Update quarterly:** Remove obsolete patterns

A well-maintained .claudeignore saves 40-60% of context tokens, meaning more tokens for actual code analysis and better advice for your project.
