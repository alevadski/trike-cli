# /memory Command & # Prefix

## What It Is

`/memory` stores persistent facts about your project that Claude should remember throughout the session. The `#` prefix in your messages references specific files, preventing Claude from assuming details about them.

Together, they solve the problem: "I keep telling Claude the same thing over and over."

## Why It Matters

Without memory management:
- Claude reads your `UserService.ts` and assumes it uses promises
- You have to say "Oh wait, it's async/await based" multiple times
- This wastes time and context

With `/memory`:
- You tell Claude once: "UserService.ts uses async/await, never promises"
- Claude remembers for the whole session
- No more repetitive corrections

Real-world impact: In a 30-message session, `/memory` can save 5-10 clarifications.

## How to Use

### Store a Fact

```
/memory The Button component uses Tailwind classes, not styled-components
/memory UserModel has a deleted_at field for soft deletes
/memory This monorepo uses yarn workspaces with separate package.json files
```

**What to store:**
- Project architecture decisions ("We use signals for state, not atoms")
- Naming conventions ("All utils files are [domain].utils.ts")
- Technology choices ("We target ES2020, use modern JS everywhere")
- Constraints ("Don't use any DOM APIs, we run on Node and browser")
- Patterns ("All API responses are wrapped in { data, error } objects")

### Reference Files with #

When discussing a specific file, prefix with `#` to tell Claude "This file is important, look at it specifically":

```
# src/components/Button.tsx
How should I implement the loading state?

# database/models.py
Add a new field for tracking login attempts
```

Why this matters:
- Claude gives you advice specific to that file
- Avoids generic assumptions ("Usually you'd use X")
- Combines with `/memory` - "I remember you use Tailwind here"

### Combined Pattern

Most powerful pattern: Use both together:

```
/memory This project uses Material-UI v5 with custom theme, no Tailwind

# src/components/UserCard.tsx
Add dark mode support to this component
```

Now Claude:
1. Remembers Material-UI is the standard here
2. Looks specifically at UserCard.tsx
3. Gives you Material-UI specific advice, not Tailwind

## Practical Workflows

### Workflow 1: Working with Custom Patterns

**Session start:**
```
/memory Our API endpoints use this pattern:
- GET /api/v1/{resource} returns { data: [...], error: null }
- Errors return { data: null, error: { code, message } }
- All dates are ISO 8601 strings
```

**Later in session:**
```
# src/api/users.ts
Implement the POST /users endpoint
```

Claude now knows the exact response format and won't suggest alternatives.

### Workflow 2: Handling Assumptions

Claude says: "You could use Redux here..."

You respond:
```
/memory We don't use Redux. All state is React Context + useReducer pattern
```

From that point on, Claude won't suggest Redux.

### Workflow 3: Complex Architecture

For monorepos or microservices:
```
/memory Service boundaries:
- auth-service (Go) owns login and JWT issuing only
- api-gateway (Node) routes requests but never calls services directly
- user-service (Python) handles user profiles and settings
Services communicate via Kafka message queue only
```

Now when you ask "Should we fetch user data from auth-service?", Claude remembers the architecture and says "No, use user-service and message queue."

## Advanced Patterns

### Store Multiple Related Facts

```
/memory React patterns for this project:
- Use hooks, no class components
- Always extract custom hooks to hooks/ folder
- useCallback for event handlers to prevent re-renders
- Custom hooks go in src/hooks/[domain].hooks.ts
```

Later: `/memory Database uses PostgreSQL with Drizzle ORM, no raw SQL`

You can build up a knowledge base of project patterns.

### Refresh Memory When It Changes

If project architecture changes:
```
/memory (updating) We're migrating from Redux to Zustand.
New pattern: import { useStore } from '@/store' and use hooks only
```

Claude will use the updated version going forward.

### Clear Memory If Wrong

If you realize you gave Claude bad info:
```
/memory (ignore previous memory about Redux)
Actually we use Zustand, always have
```

## Common Patterns by Role

### Frontend Developer

```
/memory React project, Next.js 14 with App Router
- Use 'use client' only when necessary (prefer Server Components)
- Styling: Tailwind CSS, no CSS-in-JS
- State: React Query for server state, Context for minimal client state
- Testing: Vitest + React Testing Library
```

### Backend Developer

```
/memory Express.js backend with TypeScript
- All routes in src/routes/
- Middleware pattern: authentication → validation → handler
- Database: PostgreSQL + Knex.js migrations
- Never use Promise.then(), always async/await
```

### Database Work

```
/memory Database schema uses:
- All tables have id (UUID), created_at, updated_at
- User soft-deletes with deleted_at field
- Never raw SQL, use Query Builder methods
- Run migrations with npm run migrate
```

## Best Practices

**Do:**
- Store facts that would be tedious to repeat
- Use `/memory` at the session start for architecture
- Reference files with `#` prefix to ground advice
- Store naming conventions and patterns early
- Update `/memory` if architecture changes mid-session

**Don't:**
- Store facts obvious from the code (Claude can read it)
- Create massive `/memory` entries (keep them specific)
- Forget `/memory` when introducing new concepts mid-session
- Mix unrelated facts in one `/memory` (one topic per entry)

## When to Use vs. When to Skip

**Use `/memory`:**
- "Every API endpoint returns { data, error }"
- "We only use PostgreSQL functions, never application logic in SQL"
- "All CSS is generated, not handwritten"
- "This app runs on Node 18 LTS, target ES2020"

**Skip it (Claude can read the code):**
- "The UserModel.ts file has these fields..."
- "The package.json dependencies are..."
- "The folder structure is src/components, src/utils..."

**Skip it (too generic):**
- "This is a React app"
- "We use TypeScript"
- "There's a database"

Those are obvious from the code or not useful enough to memorize.

## Practice Exercise (5-10 minutes)

### Goal
Set up memory for your real project and experience how it improves Claude's advice.

### Steps

1. **Start a Claude Code session** in your project

2. **Identify 3-5 core facts** about your project that Claude gets wrong or would benefit from knowing:
   - Architecture decisions ("We use Vite, not webpack")
   - Technology choices ("All forms use react-hook-form")
   - Naming patterns ("API handlers are [action].handler.ts")

3. **Store them as /memory entries:**
   ```
   /memory [fact 1]
   /memory [fact 2]
   /memory [fact 3]
   ```

4. **Ask Claude a question** that would normally trigger generic advice:
   - "How should I build the login form?" (without memory, generic React form advice)
   - "Set up form validation" (without memory, suggests Zod or Yup)

5. **Observe the difference**: Claude now gives project-specific advice instead of generic patterns

6. **Use # prefix** in your next message:
   ```
   # src/forms/LoginForm.tsx
   Implement the email field
   ```

7. **Notice how Claude combines** the /memory facts with the specific file reference

### Success Criteria
- You've stored 3+ facts with `/memory`
- You've used `#` prefix in at least one follow-up message
- Claude's advice is specific to your project, not generic

## Gotchas

**Gotcha 1: Memory doesn't persist across sessions**
Memory is session-specific. If you start a new Claude Code session, you need to re-enter your `/memory` facts. Store crucial architecture facts in CLAUDE.md instead for permanent persistence.

**Gotcha 2: # prefix doesn't load the file automatically**
`# src/utils/helpers.ts` tells Claude this file is important, but you may still need to ask Claude to read it: "Show me this file first" or `/search helpers.ts` to pull it in.

**Gotcha 3: Memory can conflict with .claudeignore**
If you store `/memory` about a file, but that file is in .claudeignore, Claude won't be able to read it. Use `/memory` for facts, `#` for files Claude should see.

**Gotcha 4: Overly specific memory limits flexibility**
Don't `/memory` every detail. Store patterns and decisions, not implementation details. "All forms use react-hook-form" ✅ vs. "The email field should have type='email'" ❌

**Gotcha 5: Forgetting to refresh memory mid-session**
If architecture changes and you don't update `/memory`, Claude might give outdated advice. Always `/memory` new facts as they arise.
