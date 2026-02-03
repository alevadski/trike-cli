# Feature Explanation Patterns

This guide shows how to explain each Claude Code feature in a context-aware, project-specific way.

## Core Principle

**Never explain in abstract. Always tie to THEIR specific project.**

Every explanation should answer:
1. What is this feature?
2. Why does it matter for YOUR project specifically?
3. How does it work in YOUR tech stack?
4. What concrete value will YOU get?

---

## Slash Commands

**Reference:** @~/.claude/trike/references/slash-commands/overview.md

### Abstract (❌ Don't Do This):
"Slash commands are shortcuts that help you navigate Claude Code. They start with / and provide quick access to features."

### Contextualized (✅ Do This):

**For React project:**
"Slash commands are like keyboard shortcuts for Claude Code. Instead of typing 'Can you search for where the Button component is defined?', just ask me 'Find the Button component'. For your React app with dozens of components, asking me to find things becomes your instant navigator - way faster than grepping or using your IDE's search."

**For Python Django project:**
"Slash commands are shortcuts starting with /. For your Django project, you can ask me to find things - just ask 'Find my UserModel' to instantly discover where your models are defined across apps. The commit command creates git commits without leaving Claude Code, which is handy when we're iterating on views and models together."

**For Monorepo:**
"Slash commands are shortcuts for common operations. In your monorepo with multiple packages, ask me to find things - I'll search across all packages. Ask me 'Find api-client' and I'll find every instance across your entire workspace."

### Key Commands and Techniques by Use Case:

**All Users:**
- Ask me to show you the help command - See all available commands
- Ask me to find files or code (e.g., "Find the Button component")
- Use the commit command - Create git commits

**Context Management:**
- Check your context - See what files Claude is looking at
- `#` prefix - Reference specific files (e.g., `# tsconfig.json`)
- Store facts with the memory command - Keep important project info

**Workflow:**
- Review your changes - Review changes before committing

---

## Context Management (CLAUDE.md, .claudeignore)

**Reference:** @~/.claude/trike/references/context-management/overview.md

### Abstract (❌ Don't Do This):
"Claude Code uses context to understand your project. CLAUDE.md helps provide project information."

### Contextualized (✅ Do This):

**For Next.js App Router project:**
"Context determines what I know about your project. Right now, I might see random files, but I don't understand you're using Next.js 14's App Router (not Pages Router), that you prefer Server Components, or that you avoid client-side state.

CLAUDE.md solves this. It's like a README specifically for me:
```markdown
# Your Project

**Framework:** Next.js 14 (App Router, Server Components preferred)
**Styling:** Tailwind CSS (no styled-components)
**State:** React Query for server state, Context for minimal client state
**Constraints:** Don't suggest Pages Router patterns
```

Now when you ask 'How should I fetch data in this component?', I know to suggest Server Components with async/await, not useEffect with client-side fetching."

**For Django REST Framework:**
"Without context, I give generic Python advice. With proper context via CLAUDE.md, I understand your Django setup:
```markdown
## Architecture
- **Apps:** authentication, api, core
- **Views:** Class-based views (no function-based)
- **Serializers:** Always use ModelSerializer
- **Testing:** pytest-django, 80% coverage minimum
```

This means when you ask about implementing an endpoint, I suggest CBV patterns that match your existing code, not FBV approaches you don't use."

**For Microservices:**
"In a microservices architecture, context management becomes critical. Your CLAUDE.md should document service boundaries:
```markdown
## Services
- **auth-service** (Go): Authentication, JWT issuing
- **api-gateway** (TypeScript): Request routing, rate limiting
- **user-service** (Python): User management, profiles

**Constraints:**
- Services don't directly call each other (use message queue)
- Auth service is the ONLY service that touches user credentials
```

This prevents me from suggesting anti-patterns like direct service-to-service calls."

### .claudeignore Patterns:

**General (all projects):**
```
node_modules/
.git/
dist/
build/
*.log
.env
```

**Next.js specific:**
```
.next/
out/
.vercel/
```

**Python specific:**
```
__pycache__/
*.pyc
.venv/
.pytest_cache/
```

**Why this matters:**
"Excluding node_modules saves ~50% of context tokens, meaning I can see MORE of your actual code instead of dependency code you didn't write."

---

## Skills System

**Reference:** @~/.claude/trike/references/skills/overview.md

### Abstract (❌ Don't Do This):
"Skills are plugins that extend Claude Code with specialized knowledge."

### Contextualized (✅ Do This):

**For React TypeScript project:**
"Skills are like hiring specialized consultants. Right now, I'm a general programmer. Install the 'react-patterns' skill, and I become a React expert who knows hooks patterns, component architecture, and modern best practices.

Concrete example from YOUR project:
- **Without skill:** 'Create state for user data' → I might suggest useState
- **With react-patterns skill:** 'Create state for user data' → I suggest React Query for server state, only useState for truly local UI state, and show you the exact pattern used in your existing components

Other skills for your stack:
- **typescript-helper:** Better type inference suggestions
- **vite-config:** Optimal Vite configuration
- **tailwind-assist:** Smart Tailwind class suggestions"

**For Python FastAPI:**
"Skills add domain expertise. Install 'fastapi-patterns' and I understand:
- Dependency injection patterns
- Async route handler best practices
- Pydantic model patterns
- How to structure responses

In practice:
- **Without:** Generic Python async patterns
- **With:** FastAPI-specific dependency injection, proper use of BackgroundTasks, Pydantic validators matching your existing models"

**For Testing:**
"The 'test-generator' skill is like having a QA engineer on call:
- Sees your testing patterns (pytest? jest? vitest?)
- Matches your existing test structure
- Suggests edge cases based on code analysis
- Generates fixtures that match your data models

For your project specifically, it'll create tests that use YOUR existing fixtures and test utilities, not generic examples."

### Installation:

**Skill Folder Placement:**

Skills are placed in the `~/.claude/skills/` directory. Each skill is a folder containing its implementation files.

**Finding and Managing Skills:**

Check available skills and their documentation. For your specific tech stack, look for skills that match your needs in the marketplace or community resources.

Once you have a skill:
1. Download or clone it to `~/.claude/skills/[skill-name]/`
2. Skills automatically load when Claude Code starts
3. Manage your installed skills by organizing files in that directory

---

## MCP Servers (Model Context Protocol)

**Reference:** @~/.claude/trike/references/mcps/overview.md

### Abstract (❌ Don't Do This):
"MCPs connect external tools and data sources to Claude Code."

### Contextualized (✅ Do This):

**For GitHub workflow:**
"MCP servers connect external services. The GitHub MCP is particularly useful for your workflow:

What it enables:
- 'Check if there's an existing PR for auth refactor' → I can read PRs
- 'What did the team decide in issue #42?' → I can read issue comments
- 'Look at how the other team implemented rate limiting in their repo' → I can read other repos you have access to

Without GitHub MCP:
- You'd have to manually copy/paste PR descriptions
- I can't see issue discussions
- No visibility into other repos

Installation:
```bash
claude mcp add github
```

Connects to: Your GitHub account (uses your permissions)"

**For Database work:**
"MCP servers bring external data into Claude Code. If you install the Postgres MCP for your database:

What it enables:
- 'Show me all users created in the last week' → I can query DB
- 'What's the schema for the orders table?' → I can inspect schema
- 'Are there any orphaned records?' → I can analyze data

For your Django project, this means:
- I can verify migrations match actual schema
- Suggest optimizations based on actual data patterns
- Help debug data inconsistencies
- Generate realistic test fixtures from real data

Security note: MCP has read-only access by default"

**For APIs (Stripe, Contentful, etc.):**
"MCPs for service APIs let me interact with services you use:

**Stripe MCP** (if you use Stripe):
- 'Check if customer had any failed payments' → I can check Stripe
- 'What's the current state of subscription sub_xxx?' → Live data

**Contentful MCP** (if you use headless CMS):
- 'What content types do we have?' → I can see schema
- 'Get the latest blog posts' → I can fetch content

This is powerful for your project because:
- I understand your actual Stripe setup, not theoretical
- Debugging becomes easier (I can check live state)
- Content modeling discussions use your actual content types"

### Common MCPs:

**Always useful:**
- `github` - Repository, issues, PRs
- `filesystem` - Extended file operations (already available in CC)

**By tech stack:**
- `postgres` / `mysql` - Database servers
- `redis` - Cache inspection
- `stripe` - Payment data
- `aws` - Cloud resources
- `vercel` / `netlify` - Deployment platforms

**Installation:**
```bash
claude mcp add github
claude mcp list  # See installed MCPs
```

Then configure the service connection through `~/.claude/settings.json`

---

## Hooks System (Deprecated)

**Reference:** @~/.claude/trike/references/hooks/overview.md

**Note:** Pre-commit and post-commit hooks are not currently available in Claude Code. Workflow automation is best handled through scripts in your project or external tools.

For automation needs, consider:
- Shell scripts in your project's `scripts/` directory
- Git hooks (outside of Claude Code)
- External CI/CD automation tools
- Custom commands in Claude Code

---

## Checkpointing

**Reference:** @~/.claude/trike/references/advanced/checkpointing.md

### Use Case:

Checkpointing lets you save conversation state for long projects, though it's not a primary feature.

**Better alternatives:**
- Use git branches to track progress on code
- Commit frequently with descriptive messages
- Use the memory command to document decisions and progress
- Start a new conversation and reference previous work

**For long refactors:**
- Break work into smaller git commits
- Use feature branches
- Document progress in git commit messages
- Reference those commits if resuming later

---

## Extended Thinking

**Reference:** @~/.claude/trike/references/advanced/extended-thinking.md

### How It Works:

Claude can engage in deeper reasoning for complex problems. There's no special command—just ask directly or use natural language cues:

**Examples:**
- "Take your time reasoning through this..."
- "Walk me through your analysis step-by-step"
- "Show your full reasoning chain"
- "Consider all the factors carefully..."

### Best For:

- Architecture decisions
- Complex debugging
- Performance optimization
- Refactoring planning
- Security analysis

**In practice:**
Just ask your question and indicate you want thorough reasoning. Claude will engage in as much depth as needed.

---

## Agents (Advanced)

**Reference:** @~/.claude/trike/references/advanced/subagents.md

### Overview:

Claude Code can work with agents for specialized tasks. This is an advanced feature for specific workflows.

**For most projects:**
- Work directly with Claude
- Use natural language to ask me to find things, check your context, and use the memory command for information management
- Break complex tasks into smaller steps

**When agents might help:**
- Specialized analysis tasks
- Parallel processing of independent sections
- Complex orchestration workflows

Check the Claude Code documentation for current agent capabilities and usage patterns.

---

## LSP Integration

### Abstract (❌ Don't Do This):
"LSP integration connects Claude Code to your editor's language server."

### Contextualized (✅ Do This):

**For TypeScript Projects:**
"LSP integration gives Claude Code the same type information your editor has:

Your VS Code knows:
- Type definitions for all your TypeScript
- Autocomplete suggestions
- Error locations
- Import paths

Without LSP:
- I guess at types by reading code
- Might suggest imports that don't exist
- Can't verify type safety

With LSP:
- I see the same TypeScript errors you see
- Suggestions are type-safe
- Imports are accurate
- Refactoring is safer

For your Next.js project specifically:
```typescript
// You ask: 'Add error handling to this function'
function fetchUser(id: string): Promise<User> {
  // ...
}

// With LSP, I know:
// - User type has: id, name, email, createdAt
// - Specific error types to catch
// - Return type constraints
```

Result: Type-safe error handling that matches YOUR User interface."

**For Python Projects:**
"LSP (via Pylance/Pyright) helps with your Django models:

Without LSP:
- I approximate field types
- Might suggest non-existent model methods
- Miss related field names

With LSP:
```python
class User(models.Model):
    email = models.EmailField()
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)

# You ask: 'Add validation'
# With LSP, I know:
# - email is EmailField (has specific validators)
# - profile relationship exists
# - Available model methods
```

Better suggestions because I see what your editor sees."

**For Go Projects:**
"LSP (gopls) brings struct awareness:

Your service definitions:
```go
type AuthService struct {
    config *Config
    cache  Cache
    logger Logger
}

func (s *AuthService) MethodName...
```

With LSP:
- I know AuthService's fields
- Can suggest methods that match your patterns
- Understand interface implementations
- See available imports"

### Setup:

Most projects have LSP working by default (via .vscode/settings.json or similar).

Verify:
```bash
# TypeScript
cat tsconfig.json  # Should exist

# Python
cat pyproject.toml  # Should have tools.pyright

# Go
go env GOPLS  # Should show path
```

Claude Code automatically uses LSP when available.

---

## Quality Checklist

When explaining ANY feature:

- [ ] Tied to user's specific project
- [ ] Used their tech stack in examples
- [ ] Showed concrete value for THEM
- [ ] Compared before/after
- [ ] No generic abstract definitions
- [ ] Included project-specific examples
- [ ] Connected to their goals/pain points
