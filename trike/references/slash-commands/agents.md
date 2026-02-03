# /agents Command - Subagents & Parallel Work

## What It Is

`/agents` spawns independent subagents that work in parallel on different tasks. Instead of doing one thing at a time in a linear conversation, you can delegate multiple tasks to separate agents and get results faster.

## Why It Matters

Without subagents:
- You ask Claude to "Write tests AND update docs AND refactor the API"
- Claude does them sequentially (test file, then doc file, then refactor)
- Takes 3x longer than parallel work

With subagents:
- You spawn 3 agents: one for tests, one for docs, one for refactor
- They all work simultaneously in separate conversations
- You get results in 1/3 the time

Real-world impact: 30-minute refactor becomes a 10-minute parallel job.

## How to Use

### Spawn a Subagent

```
/agents create "Task description"
```

**Example:**
```
/agents create "Write unit tests for the UserService using Vitest"
/agents create "Update API documentation in docs/api.md"
/agents create "Refactor the Button component to use Tailwind instead of styled-components"
```

Each creates a separate agent that starts working independently.

### Monitor Subagents

```
/agents list
```

Shows all active subagents and their progress:

```
Active agents:
1. UserService tests (45% complete)
2. API docs update (20% complete)
3. Button refactor (70% complete)
```

### Collect Results

```
/agents collect
```

Waits for all agents to finish, then shows results:

```
Agent 1 (UserService tests): ✅ Complete
Files created: src/services/__tests__/UserService.test.ts

Agent 2 (API docs update): ✅ Complete
Files modified: docs/api.md

Agent 3 (Button refactor): ✅ Complete
Files modified: src/components/Button.tsx
```

You can now review all changes and decide which to keep/modify.

### Cancel a Subagent

```
/agents cancel [agent-id]
```

Stops a subagent if it's going in the wrong direction.

## Real-World Patterns

### Pattern 1: Multi-Front Refactoring

You're refactoring from Redux to Zustand across a large codebase:

```
Main Claude: Set up the base store
/agents create "Convert src/slices/userSlice.ts to Zustand store"
/agents create "Convert src/slices/themeSlice.ts to Zustand store"
/agents create "Update all useSelector hooks to use Zustand hooks in src/pages/"
/agents create "Update all useDispatch hooks to use Zustand actions in src/components/"

While agents work in parallel, main Claude:
/agents list (check progress)
/agents collect (get all results)
/review (see all changes at once)
Ask me to commit with message: "Migrate from Redux to Zustand"
```

Time saved: Instead of 2 hours of sequential work, ~30 minutes with 4 agents in parallel.

### Pattern 2: Setting Up New Features

You need to build a new feature with frontend, backend, and database work:

```
/agents create "Backend: Create POST /api/users/preferences API endpoint"
/agents create "Database: Add preferences table and migration"
/agents create "Frontend: Create UserPreferences component with form"
/agents create "Tests: Write integration tests for preferences flow"

/agents list (check on progress while working on something else)
/agents collect (gather all components)
/review (see the full feature)
Ask me to commit with message: "Implement user preferences feature"
```

Each agent is independent, works in their own context, and you merge results after.

### Pattern 3: Documentation Sprint

Writing tests, docs, and examples for a new library:

```
/agents create "Write comprehensive API documentation in docs/api.md"
/agents create "Write usage examples in docs/examples.md"
/agents create "Write troubleshooting guide in docs/troubleshooting.md"
/agents create "Write TypeScript declarations in index.d.ts"

/agents collect (get all documentation complete)
```

### Pattern 4: Code Review + Improvements

Your code works but needs optimization:

```
/agents create "Add TypeScript strict mode types to src/utils/"
/agents create "Add error handling to src/api/client.ts"
/agents create "Add performance optimizations to src/components/Table.tsx"
/agents create "Add accessibility improvements to form components"

Work on something else while agents improve the code
/agents collect (review all improvements)
```

## When to Use /agents vs. Sequential Work

**Use /agents for:**
- Independent tasks that don't depend on each other
- Large refactors across multiple files/components
- Tasks that are "nice to have" improvements
- Building features with multiple independent pieces
- Optimization work (tests, docs, types, performance)

**Don't use /agents for:**
- Tasks that depend on each other (Agent B needs Agent A to finish first)
- Critical path work where you need feedback before proceeding
- Bug fixes where you need to debug interactively
- Tasks where agents might conflict with each other
- Work where you need to make decisions in the middle

**Example of conflict:**
```
❌ DON'T DO THIS:
/agents create "Rename UserService to UserRepository"
/agents create "Update all imports of UserService"
(Agent 1 and 2 conflict - Agent 2 needs Agent 1 done first)

✅ DO THIS:
Tell Claude: "Rename UserService to UserRepository and update all imports"
(Single agent handles both - they're interdependent)
```

## Limitations

**Important constraints:**
- Subagents share your context limits (more agents = less context each)
- Agents can't directly communicate or depend on each other
- If agents conflict (both modifying the same file), you'll need to resolve conflicts
- No "chain" logic (Agent A → Agent B → Agent C in sequence)

**What this means:**
- Great for: 3-5 independent tasks
- Risky for: 10+ agents (they'll starve for context)
- Bad for: Sequential pipelines where output of one feeds another

**Conflict resolution:**
If 2 agents modify the same file, Claude will alert you:
```
⚠️ Conflict detected:
Agent 1 modified src/Button.tsx
Agent 2 also modified src/Button.tsx
Please review and choose which changes to keep
```

## Advanced Patterns

### Pattern 1: Delegation with Constraints

When spawning agents, be specific about constraints:

```
/agents create "Add TypeScript types to src/utils/ - use existing patterns only, don't refactor"
/agents create "Write tests for src/api/ - must achieve 80% coverage"
/agents create "Update docs - match the tone and format of existing docs/"
```

Agents respect constraints more when explicitly stated.

### Pattern 2: Testing Multiple Approaches in Parallel

Before committing to one solution, explore multiple:

```
/agents create "Implement caching with Redis"
/agents create "Implement caching with in-memory LRU cache"
/agents create "Implement caching with database query optimization"

/agents collect (see all 3 approaches)
/agents cancel [agent-ids] (keep only the best approach)
```

### Pattern 3: Staged Execution

For tasks that have some dependencies, break it into stages:

```
Stage 1:
/agents create "Create database migration for new_table"
/agents collect (wait for database schema to be ready)

Stage 2:
/agents create "Create API endpoints using new_table schema"
/agents create "Create React components that consume endpoints"
/agents collect
```

Staged execution still gives you parallelism without conflicts.

## Combining with Other Commands

### /agents + /memory

Before spawning agents, set up memory so they all know your project constraints:

```
/memory Our project uses TypeScript strict mode, no any types
/memory Styling is Tailwind, no CSS-in-JS
/memory Testing is Vitest + React Testing Library

/agents create "Refactor Button component with types and tests"
/agents create "Refactor Card component with types and tests"
/agents create "Refactor Modal component with types and tests"
```

All agents inherit your memory, so they work consistently.

### /agents + /review

After collecting results:

```
/agents collect

/review
(See all changes from all agents at once)
```

This shows you the cumulative diff of all agent work.

### /agents + Commit Command

Once you've reviewed and approved:

```
/review (confirm all changes)
Ask me to commit with message: "Complete refactoring effort with 4 parallel agents"
```

Git commit captures all agent work as one logical change.

## Practice Exercise (10-15 minutes)

### Goal
Spawn agents for a real multi-part task in your project and see parallelism in action.

### Prerequisites
- Have a Claude Code session open in your project
- Identify a task with 3-4 independent parts

### Examples
**Frontend:** Style 3 components, write tests for 1 utility, update docs
**Backend:** Add 3 API endpoints, write database migrations, create tests
**Refactoring:** Update types in 3 files, add error handling to 2 services, write docs

### Steps

1. **Set up memory for consistency** (so all agents follow same patterns):
   ```
   /memory [Your project's key constraint]
   /memory [Testing framework and style]
   /memory [Naming conventions for this task]
   ```

2. **Spawn 3-4 agents** for independent parts:
   ```
   /agents create "Task 1 description"
   /agents create "Task 2 description"
   /agents create "Task 3 description"
   ```

3. **Check progress** (optional):
   ```
   /agents list
   ```

4. **When ready, collect results:**
   ```
   /agents collect
   ```

5. **Review all changes at once:**
   ```
   /review
   ```

6. **Judge the parallel approach:**
   - Did all agents complete without conflicts?
   - Is the quality consistent across agents?
   - Was it faster than doing sequential work?
   - What would you do differently?

### Success Criteria
- You've spawned 3+ agents successfully
- Agents ran in parallel without blocking each other
- Results were collected and reviewed
- You understand when /agents is useful vs. sequential work

## Gotchas

**Gotcha 1: Agents don't automatically coordinate**
If Agent 1 renames a function and Agent 2 uses that function, Agent 2 gets outdated code. Always check for dependencies before spawning.

**Gotcha 2: Context gets split among agents**
If you spawn 5 agents on a big project, each agent gets 1/5 of available context (roughly). With 4+ agents, context becomes tight. Start with 2-3 agents.

**Gotcha 3: Agents see read-only versions of files**
Agents can't read each other's outputs in real-time. Agent B can't see what Agent A just wrote. They only merge when you `/agents collect`.

**Gotcha 4: Conflicts require manual resolution**
If agents modify the same file differently, you'll get a conflict. You must manually choose which changes to keep. Minimize agent overlap.

**Gotcha 5: No "chain" or "pipeline" logic**
You can't do: Agent A creates file, Agent B reads that file, Agent C modifies it. Agents are parallel, not sequential. Use staged execution if you need some ordering.

**Gotcha 6: Spawning too many agents wastes resources**
More agents doesn't always mean faster. 3-4 agents is optimal. 10+ agents starve for context and become slow and ineffective.

**Gotcha 7: Agents inherit your memory but not live context**
Agents see your `/memory` statements but don't see the conversation that happened before you spawned them. Repeat key context in `/memory` if it's critical for agents.
