# Project Onboarding

## What It Is

Project onboarding is the process of setting up a new project for optimal Claude Code usage. It means creating the right configuration files, establishing best practices, and preparing your project to work effectively with Claude from the start.

A well-onboarded project is set up to be understood, analyzed, and modified efficiently by Claude Code.

## Why This Matters

**Time Savings:** A properly set up project saves hours compared to ad-hoc setup.

**Better Analysis:** Claude understands your project architecture and can give better advice.

**Consistency:** Onboarding ensures consistent workflows across your team.

**Efficiency:** Token optimization means more context for actual problem-solving.

**Collaboration:** Clear setup makes it easier for teams to work together.

**Real Example:**
```
Project without onboarding:
- First Claude session: 30 minutes explaining architecture
- Unclear conventions: Claude makes inappropriate suggestions
- Poor context optimization: Only 10k tokens left for analysis
- Inefficient: Total overhead per task: 20 minutes

Project with proper onboarding:
- First Claude session: 5 minutes, Claude already understands
- Clear conventions: Claude follows your patterns
- Optimized context: 80k+ tokens available for analysis
- Efficient: Overhead per task: 2 minutes
```

## Onboarding Checklist

Complete this checklist for new projects:

### Phase 1: Foundation (15 minutes)

- [ ] Create `.claude/` directory
- [ ] Create `CLAUDE.md` with project overview
- [ ] Create `.claudeignore` with standard patterns
- [ ] Verify context with `claude context info`

### Phase 2: Configuration (10 minutes)

- [ ] Set up project-specific settings in `.claude/settings.json`
- [ ] Create `.claude/skills-config.json` if using skills
- [ ] Document tech stack and key dependencies
- [ ] Add coding conventions and standards

### Phase 3: Optimization (10 minutes)

- [ ] Review and adjust `.claudeignore` patterns
- [ ] Verify no source code is excluded
- [ ] Check token usage is reasonable
- [ ] Document optimization decisions

### Phase 4: Team Setup (5 minutes)

- [ ] Add `.claude/` directory to version control
- [ ] Create onboarding guide for team members
- [ ] Share CLAUDE.md with team
- [ ] Document how to work with Claude on this project

**Total time: 40 minutes → Years of efficiency**

## Step-by-Step Onboarding Guide

### Step 1: Create Project Structure

Create the essential directories:

```bash
# Navigate to your project
cd my-project

# Create Claude Code directory
mkdir -p .claude/workflows
mkdir -p .claude/skills

# Verify structure
ls -la .claude/
```

### Step 2: Write CLAUDE.md

This is THE most important file. Create `.claude/CLAUDE.md`:

```markdown
# My Project

## Overview
Brief description of what this project does.

## Tech Stack
- Frontend: React 18, TypeScript
- Backend: Node.js 18, Express
- Database: PostgreSQL
- Tools: Jest, ESLint, Prettier

## Project Structure
```
src/
  ├── components/    - React components
  ├── hooks/        - Custom React hooks
  ├── services/     - API and utility services
  ├── types/        - TypeScript type definitions
  ├── styles/       - Global styles
  └── App.tsx       - Root component

tests/
  ├── unit/         - Unit tests
  ├── integration/  - Integration tests
  └── fixtures/     - Test data

docs/
  ├── API.md        - API documentation
  └── ARCHITECTURE.md - System design

.claude/           - Claude Code configuration
package.json       - Dependencies and scripts
```

## Key Files
- `.env.example` - Environment variables template
- `package.json` - Project dependencies
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.js` - Linting rules
- `.prettier.rc` - Code formatting

## Important Rules
1. Keep backward compatibility with API v1
2. All database changes need migration files
3. New components must have TypeScript types
4. Tests are required for new features

## Common Workflows
- Fixing a bug: Read error, find relevant code, suggest fix
- Adding a feature: Understand requirements, design, implement
- Refactoring: Maintain behavior while improving structure

## Running the Project

### Development
```bash
npm install
npm start         # Starts dev server on :3000
npm test          # Runs tests
npm run lint      # Checks code style
```

### Production
```bash
npm run build
npm run start:prod
```

## Git Conventions
- Main branch: `main` (production-ready)
- Feature branches: `feature/description`
- Bug fixes: `fix/description`
- Commit format: `type: description` (chore, feat, fix, docs)

## Debugging Tips
- Check `npm run lint` before debugging logic errors
- Database issues: Check migrations with `npm run migrate:status`
- API errors: Enable debug mode with `DEBUG=* npm start`

## Who To Ask
- Architecture questions: Check docs/ARCHITECTURE.md
- API questions: See docs/API.md
- Build issues: npm run debug

## Helpful Resources
- [Project wiki](https://wiki.internal.com/my-project)
- [API docs](./docs/API.md)
- [Architecture](./docs/ARCHITECTURE.md)
```

### Step 3: Create .claudeignore

```bash
# Create .claudeignore in project root
cat > .claudeignore << 'EOF'
# Security
.env
.env.local
.env.*.local
secrets/

# Dependencies
node_modules/
vendor/
.venv/

# Build outputs
dist/
build/
out/
.next/

# IDE and editors
.vscode/
.idea/
*.swp
*.swo

# Testing and coverage
coverage/
.nyc_output/
.jest_cache/

# Logs
*.log
logs/

# OS files
.DS_Store
Thumbs.db

# Version control
.git/

# Caches
.cache/
__pycache__/
*.pyc
EOF
```

Verify it works:

```bash
# Check what's excluded
claude context info
```

Should show significant token savings from excluded items.

### Step 4: Create Settings

Create `.claude/settings.json`:

```json
{
  "defaultMode": "default",
  "autoAcceptEdits": false,
  "contextBudget": 100000,
  "excludePatterns": [],
  "includePatterns": [
    "src/**/*.{ts,tsx,js,jsx}",
    "*.json",
    "CLAUDE.md"
  ],
  "modelPreferences": {
    "defaultModel": "claude-opus-4-5",
    "forAnalysis": "claude-opus-4-5",
    "forCoding": "claude-opus-4-5"
  }
}
```

### Step 5: Create Skills Configuration (if using skills)

Create `.claude/skills-config.json`:

```json
{
  "enabled": true,
  "autoUpdate": true,
  "skills": {
    "trike-testing": {
      "enabled": true,
      "testFramework": "jest",
      "includeIntegration": true
    },
    "trike-lint": {
      "enabled": true,
      "autoFix": true
    }
  }
}
```

### Step 6: Verify Context

Check that your setup is optimal:

```bash
# See context usage
claude context info

# You should see:
# Total tokens available: ~100,000
# Source code: ~20,000 tokens
# Config files: ~2,000 tokens
# Documentation: ~3,000 tokens
# Available for analysis: ~75,000 tokens
```

If context is too high:
1. Add more patterns to .claudeignore
2. Check for large files being included
3. Review CLAUDE.md size (should be <5k tokens)

### Step 7: Add to Version Control

Commit the configuration:

```bash
git add .claude/ CLAUDE.md .claudeignore
git commit -m "chore: add Claude Code configuration"
git push
```

### Step 8: Create Onboarding Guide for Team

Create `.claude/ONBOARDING.md`:

```markdown
# Claude Code Setup for This Project

## Quick Start (5 minutes)

1. Clone repo: `git clone ...`
2. Install: `npm install`
3. Start Claude: `claude`

That's it! Claude already understands this project.

## What Claude Knows
- Project structure and conventions
- Tech stack (React, TypeScript, Node.js)
- Important files and directories
- Git and commit conventions
- How to run development/tests/build

## Common Tasks

### Task: Fix a bug
1. Ask Claude: "Fix the bug where [description]"
2. Claude will find the issue and suggest fixes
3. Review the changes
4. Done!

### Task: Add a feature
1. Ask Claude: "Add feature to [description]"
2. Claude will design and implement it
3. Claude will create tests
4. You review and merge

### Task: Refactor code
1. Ask Claude: "Refactor [component/module]"
2. Claude maintains behavior while improving
3. Tests verify nothing broke
4. You review and merge

## Tips
- Be specific: "Fix login for users with @ in email"
- Include context: "The API was changed to return..."
- Share code: Paste the error message or relevant code
- Review changes: Always check diffs before merging

## Questions?
- Read CLAUDE.md for project overview
- Check docs/ARCHITECTURE.md for design
- Search git history for similar changes
- Ask Claude with full context

## Known Issues & Workarounds
- Node v16 not supported, use Node 18+
- PostgreSQL must be running for tests
- .env file needed (copy from .env.example)
```

## Advanced Onboarding

### Setting Up Workflows

Create useful workflows in `.claude/workflows/`:

```bash
mkdir -p .claude/workflows
```

Create `.claude/workflows/fix-and-test.md`:

```markdown
# Workflow: Fix and Test

## Purpose
Automatically fix linting errors and verify tests pass.

## Usage
```
claude workflow run fix-and-test
```

## Steps
1. Run linter: eslint src/
2. Ask Claude to fix issues
3. Format code: prettier --write
4. Run tests: npm test
5. Report results
```

### Setting Up Skills

List required skills in CLAUDE.md:

```
## Required Skills

This project uses:
- trike-testing (for automated testing)
- trike-lint (for code quality)
- trike-docs (for documentation)

Setup: `claude skills install trike-testing`
```

### Team Collaboration

For teams, add to CLAUDE.md:

```
## Team Collaboration

### Code Review
Ask Claude to review changes:
```
claude
Review my PR for quality, security, and performance
```

### Pair Programming
Use Claude as a pair programmer:
```
claude --mode acceptEdits
Implement the user authentication feature
```

### Knowledge Sharing
Claude knows the codebase and can explain:
```
claude
Explain how the payment processing flow works
```
```

## Onboarding for Different Project Types

### Node.js Backend

```
CLAUDE.md sections:
- API endpoints and routes
- Database schema
- Authentication/authorization
- Error handling patterns
- Testing approach

.claudeignore additions:
migrations/   # If many migration files
logs/
```

### React Frontend

```
CLAUDE.md sections:
- Component structure
- State management (Redux/Context/Zustand)
- Routing
- Styling approach
- Component lifecycle patterns

.claudeignore additions:
public/
.storybook/
```

### Full Stack (MERN/MEAN/etc)

```
CLAUDE.md sections:
- Frontend structure and conventions
- Backend API and routes
- Database schema and migrations
- Authentication and authorization
- Testing strategy
- Deployment process

.claudeignore additions:
client/node_modules/
server/node_modules/
build/
```

### Data Science / ML

```
CLAUDE.md sections:
- Notebook purpose and usage
- Data sources and format
- Model architecture
- Training process
- Evaluation metrics

.claudeignore additions:
data/              # Large datasets
models/            # Trained models
*.pkl
*.h5
.ipynb_checkpoints/
```

## Verification Checklist

Before considering a project "onboarded":

- [ ] CLAUDE.md exists and describes project clearly
- [ ] .claudeignore is configured (test with `claude context info`)
- [ ] Token budget is reasonable (20k-100k available)
- [ ] Project structure is documented
- [ ] Key technologies are listed
- [ ] Running/testing instructions are clear
- [ ] Common commands are documented
- [ ] Conventions are explained
- [ ] Files are committed to version control
- [ ] Team members can replicate setup

## Maintenance

Onboarding isn't one-time. Keep it updated:

### Monthly
- [ ] Review CLAUDE.md for accuracy
- [ ] Check if new key files should be documented
- [ ] Update tech stack if changed

### Quarterly
- [ ] Verify .claudeignore patterns still make sense
- [ ] Check if new conventions emerged
- [ ] Update team onboarding guide

### When Making Architecture Changes
- [ ] Update CLAUDE.md with new structure
- [ ] Update .claudeignore if needed
- [ ] Update documentation
- [ ] Communicate changes to team

## Benefits of Proper Onboarding

**For you:**
- Claude understands your project immediately
- Faster problem-solving (less context needed)
- Better code suggestions
- Less manual explanation

**For your team:**
- Everyone has same understanding
- New team members onboard faster
- Knowledge is captured in documentation
- Consistent quality of Claude suggestions

**For the project:**
- Better code quality
- Clearer architecture
- Easier maintenance
- Better collaboration

## Gotchas

**Gotcha 1: CLAUDE.md Gets Stale**

Old information is worse than no information. Keep it current.

**Gotcha 2: Over-Documenting**

CLAUDE.md should be 1-2 pages, not a novel. Be concise.

**Gotcha 3: Forgetting About .claudeignore**

Projects change. What should be excluded changes. Review periodically.

**Gotcha 4: Configuration In Multiple Places**

Don't duplicate settings in .claude/settings.json and comments in CLAUDE.md. Choose one source of truth.

**Gotcha 5: Not Committing Configuration**

If .claude/ isn't in version control, each team member sets it up differently.

## Summary

Proper onboarding takes 40 minutes and pays back in hours of saved time:

1. **Create CLAUDE.md:** Explain project structure, tech stack, conventions
2. **Create .claudeignore:** Optimize context, exclude dependencies
3. **Create .claude/settings.json:** Set project-specific configuration
4. **Verify context:** Check `claude context info` shows good savings
5. **Commit to git:** Share with team
6. **Document for team:** Create onboarding guide

Key files:
- CLAUDE.md: Project overview (most important!)
- .claudeignore: Context optimization
- .claude/settings.json: Configuration
- .claude/workflows/: Reusable automation

Result: Claude becomes part of your development workflow from day one, understanding your code, conventions, and goals immediately.

For more: See other reference files for detailed guidance on context management, workflows, and optimization.
