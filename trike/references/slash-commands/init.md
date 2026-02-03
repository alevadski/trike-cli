# /init Command

## What It Is

`/init` initializes a new Claude Code project. It sets up the foundation: CLAUDE.md, .claudeignore, directory structure, and initial context. It's the first command you run when starting with Claude Code on a new project.

## Why It Matters

Starting fresh without initialization is chaotic:
- Claude doesn't understand your project structure
- You have to manually add context for every session
- You're burning context on basic explanation, not actual work
- Every session starts from zero

With `/init`:
- Claude gets a baseline understanding of your project
- CLAUDE.md is created with your architecture
- .claudeignore is optimized for your codebase
- You save context (and time) in every future session

Real-world impact: After `/init`, future sessions are 50% more productive because Claude starts with understanding, not ignorance.

## How to Use

### Initialize a New Project

```
/init
```

Claude asks questions about your project:

```
What's the name of this project?
> MyAwesomeApp

What's the primary language/framework?
> React TypeScript

What does this project do?
> A real-time collaborative whiteboard app

Is there a specific architecture I should know about?
> We use a monorepo structure with separate frontend and backend services
```

Based on your answers, Claude generates:
- **CLAUDE.md** - Project overview, architecture, conventions
- **.claudeignore** - Files/folders Claude should ignore
- **Initial context** - Summary in the session

### Initialize with Project Name

```
/init MyProjectName
```

Skips the name question, goes straight to questions about the tech stack and purpose.

### Initialize with Guided Setup

```
/init --guided
```

More detailed questions to build a comprehensive project understanding:
- Technology stack
- Project structure
- Key constraints
- Team preferences
- CI/CD pipeline
- Deployment environment

## Practical Workflows

### Workflow 1: Starting a Brand New Project

```
You've just created a new React app with create-react-app

/init
Claude: What's the name?
> MyApp

Claude: What's the primary framework?
> React (TypeScript)

Claude: What does it do?
> A task management app with real-time collaboration

Claude: Special architecture?
> No, standard React app structure

Claude: Creates CLAUDE.md and .claudeignore
Claude: Ready to work!

(Now you can ask Claude to implement features and Claude understands the project)
```

### Workflow 2: Onboarding to an Existing Project

```
You're joining an existing project.
The codebase is complex. Other devs have been working on it for months.

/init
Claude: What's the name?
> ExistingProjectX

Claude: What's the primary framework?
> Node.js backend with Next.js frontend

Claude: What does it do?
> SaaS analytics platform with real-time dashboards

Claude: Special architecture?
> Monorepo structure, uses tRPC for type-safe API

Claude: Creates/updates CLAUDE.md based on actual codebase
Claude: Optimizes .claudeignore for this project
Claude: You're now onboarded; Claude understands the project
```

The `/init` command reads your actual codebase, so it generates accurate setup.

### Workflow 3: Re-Initialize After Major Changes

```
6 months in, project architecture has changed significantly.
CLAUDE.md is now outdated.

/init --refresh
Claude: Analyzes current codebase
Claude: Updates CLAUDE.md to reflect reality
Claude: Updates .claudeignore based on current structure
Claude: You're back in sync
```

Keeps your setup current.

## What /init Creates

### 1. CLAUDE.md

A markdown file with:
- **Project name and purpose**
- **Tech stack** (language, framework, libraries)
- **Architecture overview** (folder structure, service boundaries)
- **Key conventions** (naming patterns, coding style)
- **Important constraints** (don't use X, always use Y)
- **How to run/test/deploy**

Example CLAUDE.md:
```markdown
# MyApp

Real-time task collaboration platform.

## Stack
- Frontend: React 18 + TypeScript + Tailwind
- Backend: Node.js + Express + PostgreSQL
- Deployment: AWS EC2 + Docker

## Architecture
```
src/
  components/         # React components
  hooks/             # Custom hooks
  services/          # API client, utilities
  types/             # TypeScript definitions
  pages/             # Next.js pages (if using Next)
```

## Key Conventions
- Use functional components only, no class components
- All API calls go through services/api.ts
- Styling: Tailwind CSS, no CSS-in-JS
- Testing: Vitest + React Testing Library

## Important
- Never use classnames library (using clsx instead)
- Always destructure props in function signature
- Database schema changes require migration files

## Running
- Dev: npm run dev
- Test: npm test
- Build: npm run build
```

### 2. .claudeignore

A gitignore-like file excluding:
- node_modules/
- dist/, build/
- .git/
- Temporary files
- Large binary files

```
node_modules/
dist/
build/
.git/
*.log
.DS_Store
venv/
__pycache__/
```

Keeps Claude focused on your actual code, not noise.

### 3. Session Context

Claude now starts with baseline understanding instead of asking "What's this project?" every session.

## When to Use /init

**Use /init for:**
- Starting work on a new project
- Joining an existing project
- When project architecture changes significantly
- When you want to refresh Claude's understanding

**Don't use /init for:**
- Every session (do it once at the start)
- Temporary projects you won't use Claude Code for
- Small scripts (too much overhead)

## Advanced Patterns

### Pattern 1: Init and Immediately Start Work

```
/init
(Answer setup questions)

Claude: CLAUDE.md and .claudeignore created

Me: Now, implement the login feature
Claude: (with project context) Let me build the login flow...
```

No wasted session on setup; move immediately to work.

### Pattern 2: Init with Team Context

```
/init --guided

What's the name?
> CompanyProduct

What's the tech stack?
> Next.js + Supabase

What does it do?
> B2B SaaS platform for inventory management

Special architecture?
> We use Supabase for auth and real-time data
> Code review mandatory for all PRs
> TypeScript strict mode required

Claude: Creates CLAUDE.md with team preferences
Claude: Team consistency across sessions
```

### Pattern 3: Init Different Branches

If you work on multiple feature branches:

```
Branch: main
/init
Claude: Creates CLAUDE.md for main

Switch to branch: feature/dark-mode
/init --refresh
Claude: Re-scans codebase for branch-specific context
```

Keep context synchronized across branches.

## Combining /init with Other Commands

### /init + /memory

After init, you can still use `/memory` for session-specific facts:

```
/init
(Sets up project baseline)

/memory For this task, focus only on the authentication module
/memory We're preparing for an audit, code must be extra defensive
```

CLAUDE.md is permanent setup; `/memory` is session-specific refinement.

### /init + Quick Sessions

```
/init (one-time setup)

Session 1: Build feature A (Claude has context from CLAUDE.md)
Session 2: Build feature B (Claude remembers structure from CLAUDE.md)
Session 3: Fix bugs (Claude understands architecture from CLAUDE.md)
```

One init, many productive sessions.

## Best Practices

**Do:**
- Run `/init` once at the start of a project
- Keep CLAUDE.md updated as architecture changes
- Be honest about constraints in `/init` (helps Claude avoid mistakes)
- Include "important constraints" (things Claude should never suggest)
- Re-init if project changes significantly (new framework, new architecture)

**Don't:**
- Init every session (do it once)
- Leave CLAUDE.md outdated (update it when things change)
- Use `/init` on tiny projects (overkill setup for small scripts)
- Ignore `.claudeignore` (it matters for performance)
- Make CLAUDE.md too long (keep it focused, not encyclopedic)

## Practice Exercise (15-20 minutes)

### Goal
Initialize your real project and experience how it improves Claude's understanding.

### Steps

1. **Go to your project directory** in Claude Code

2. **Run /init:**
   ```
   /init
   ```

3. **Answer Claude's questions honestly:**
   - What's the project name?
   - What's the primary tech stack?
   - What does the project do?
   - Any special architecture or constraints?

4. **Review the generated CLAUDE.md:**
   - Does it accurately describe your project?
   - Is the architecture section helpful?
   - Are the constraints clear?
   - Edit it if needed to improve clarity

5. **Review the generated .claudeignore:**
   - Does it exclude node_modules, dist, etc.?
   - Are there files Claude shouldn't see?
   - Add any patterns you want ignored

6. **Start a new task** knowing Claude has context:
   ```
   /clear (fresh session)

   Now ask Claude to implement a feature or fix
   Claude responds with project-aware advice
   ```

7. **Notice the improvement:**
   - Does Claude understand your architecture?
   - Does Claude respect your constraints?
   - Do responses feel more tailored?

### Success Criteria
- You've run `/init` successfully
- CLAUDE.md was created and is reasonable
- .claudeignore excludes appropriate files
- In a new session, Claude demonstrates understanding of your project

## Gotchas

**Gotcha 1: CLAUDE.md is not automatically updated**
If your project changes significantly, `/init` doesn't auto-update CLAUDE.md. You either re-run `/init --refresh` or manually edit CLAUDE.md. Keep it current.

**Gotcha 2: .claudeignore patterns are strict**
If you add `*.log` to .claudeignore, Claude won't see ANY .log files. Make sure you want to exclude files before adding patterns. Test by using `/context` to see what Claude sees.

**Gotcha 3: /init reads your actual codebase**
If your codebase is huge (monorepo with 100+ services), `/init` analysis might take time or be expensive in tokens. Use `--guided` to manually describe instead of auto-scanning.

**Gotcha 4: CLAUDE.md doesn't make Claude perfect**
Even with perfect CLAUDE.md, Claude can still:
- Forget constraints mid-conversation
- Suggest things that violate your documented style
- Misunderstand architecture

Use `/memory` to reinforce key facts in sessions where Claude seems confused.

**Gotcha 5: Different projects need different init approaches**
- Monorepo: Complex architecture, needs detailed CLAUDE.md
- Single app: Simpler setup, basic CLAUDE.md suffices
- Library: Emphasize API contracts and constraints
- Prototype: Might not need `/init` at all

Adapt your init detail to project complexity.

**Gotcha 6: .claudeignore affects search and context**
Files in `.claudeignore` won't appear in `/search` results. If Claude says "I can't find that file," it might be ignored. You can temporarily remove patterns from `.claudeignore` if needed.
