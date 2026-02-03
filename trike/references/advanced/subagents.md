# Subagents & Parallel Work in Claude Code

Subagents enable parallel task execution. Create multiple independent agents that work simultaneously on different parts of your project, then merge their results in the main conversation.

## Core Concept

Subagents are independent Claude instances that:
- Work in parallel on separate tasks
- Don't share state directly (communicate through main conversation)
- Execute independently without waiting for each other
- Report results back to the main conversation

### Key Limitations
- **Cannot be nested:** No agents within agents
- **No direct state sharing:** Share context through main conversation
- **Scope-limited:** Each agent has its own conversation context
- **Sequential merging:** Results combine linearly in main conversation

## The `/agents` Command

### Creating Agents
```
/agents
```

This opens an interface to:
- Create new agents
- Assign tasks to each agent
- Monitor parallel execution
- Collect results

### Workflow
```
1. Main conversation
2. /agents command
3. Create agents (Agent 1, Agent 2, etc.)
4. Assign independent tasks
5. Agents execute in parallel
6. Return to main conversation with results
7. Continue with merged/integrated results
```

## Use Cases

### 1. Parallel Component Development
```
Scenario: Building a web application with multiple components

Agent 1: Build authentication component
Agent 2: Build dashboard component
Agent 3: Build data visualization component

All three work simultaneously, then integrate in main conversation
```

### 2. Simultaneous Testing Coverage
```
Scenario: Testing different aspects of an application

Agent 1: Unit tests for business logic
Agent 2: Integration tests for APIs
Agent 3: E2E tests for user workflows

All run in parallel, results collected in main conversation
```

### 3. Multi-Language Implementation
```
Scenario: Building the same feature in multiple languages

Agent 1: Implement in Python
Agent 2: Implement in Go
Agent 3: Implement in Rust

Compare performance and design across languages
```

### 4. Documentation and Examples
```
Scenario: Creating comprehensive documentation

Agent 1: API documentation
Agent 2: Tutorial guides
Agent 3: Code examples

Parallel creation, then unified in main conversation
```

### 5. Code Review and Optimization
```
Scenario: Comprehensive code analysis

Agent 1: Security review
Agent 2: Performance analysis
Agent 3: Style and best practices

All reviews happen in parallel, merged in main conversation
```

## Practical Examples

### Example 1: Building a Three-Tier Application

```
Main Conversation:
User: "I need a three-tier application (frontend, API, database)"
Claude: "I can help. Let's use subagents to build in parallel"

User: /agents

Agent 1 Task: "Build React frontend with components for user profile, dashboard, settings"
Agent 2 Task: "Build Express.js API with endpoints for user management, data retrieval, updates"
Agent 3 Task: "Design PostgreSQL schema with user table, settings table, data table"

[All three agents work in parallel]

Agent 1 Response:
```
src/components/
  UserProfile.jsx
  Dashboard.jsx
  Settings.jsx
App.jsx
```

Agent 2 Response:
```
/api/users (GET, POST, PUT, DELETE)
/api/data (GET, POST)
/api/settings (GET, PUT)
```

Agent 3 Response:
```
CREATE TABLE users (...)
CREATE TABLE settings (...)
CREATE TABLE data (...)
```

Back in Main Conversation:
User: "Now integrate these. Create Docker Compose for local dev"
Claude: [Uses results from all three agents to create integration setup]
```

### Example 2: Writing Tests in Parallel

```
Main Conversation:
User: "Test this authentication system thoroughly"
Claude: "I'll create multiple test suites in parallel"

User: /agents

Agent 1 Task: "Write unit tests for password hashing, token generation, validation logic"
Agent 2 Task: "Write integration tests for login flow, signup flow, logout flow"
Agent 3 Task: "Write security tests for SQL injection, XSS, CSRF vulnerabilities"

[All test suites developed simultaneously]

Agent 1: [Unit test suite with 15 tests]
Agent 2: [Integration test suite with 8 tests]
Agent 3: [Security test suite with 12 tests]

Back in Main Conversation:
User: "Merge all tests into one test file and show coverage"
Claude: [Combines all tests, generates coverage report]
```

### Example 3: Building Multiple Features

```
Main Conversation:
User: "Build three features: user search, saved items, notifications"

User: /agents

Agent 1 Task: "Implement user search with filters and pagination"
Agent 2 Task: "Implement saved items with categories and sharing"
Agent 3 Task: "Implement real-time notifications with preferences"

[All three features developed in parallel]

Back in Main Conversation:
User: "These are great. Now add a settings page that controls all three features"
Claude: [Uses all three feature implementations to build unified settings page]
```

## The Task Tool with Subagents

The Task tool helps structure and track work within subagents:

```
In a subagent:
1. Use TodoWrite to create task list for that agent's work
2. Update task status (pending → in_progress → completed)
3. Complete tasks in order
4. Return summary to main conversation
```

### Example: Agent with Task Management

```
Agent 1 Task: "Build payment processing system"

Agent 1 internally:
- Creates task list:
  1. Design payment schema
  2. Implement Stripe integration
  3. Write error handling
  4. Add logging
  5. Write tests

- Executes tasks sequentially
- Updates status as it progresses
- Returns completed system to main conversation
```

## Workflow Patterns

### The Parallel Feature Pattern
```
1. Define features/components to build
2. Create one agent per feature
3. Agents work in parallel
4. Integrate in main conversation
```

### The Parallel Testing Pattern
```
1. Identify test categories (unit, integration, E2E)
2. Create one agent per category
3. Agents write tests in parallel
4. Merge test suites in main conversation
5. Run all tests together
```

### The Parallel Implementation Pattern
```
1. Define the same feature across technologies
2. Create one agent per technology
3. Agents implement independently
4. Compare implementations in main conversation
5. Choose or hybrid approach
```

### The Parallel Analysis Pattern
```
1. Have code that needs analysis
2. Create agents for different aspects (security, performance, style)
3. Agents analyze in parallel
4. Merge findings in main conversation
5. Create unified improvement plan
```

### The Parallel Documentation Pattern
```
1. Identify documentation sections needed
2. Create one agent per section
3. Agents write documentation in parallel
4. Assemble complete documentation in main conversation
5. Review and polish
```

## Important Constraints

### Cannot Nest
```
VALID:
Main conversation
  -> /agents
    -> Agent 1
    -> Agent 2
    -> Agent 3
  -> Back to main conversation

INVALID:
Main conversation
  -> /agents
    -> Agent 1
      -> /agents [NOT ALLOWED]
        -> Sub-agent 1a
```

### No Direct State Sharing
```
Agent 1 creates: users_list = [...]
Agent 2 cannot access users_list directly

Solution:
Agent 1 returns: "I created users.json with [...] format"
Main conversation reads both agent outputs
Main conversation tells Agent 2: "Use the format from Agent 1"
Agent 2 uses the shared information
```

### Limited Context per Agent
```
Each agent has its own conversation context
Advantage: Can focus deeply without distraction
Disadvantage: Must explicitly share context through main conversation
```

## Best Practices

1. **Clear Boundaries:** Each agent needs distinct, non-overlapping responsibilities
```
Good: Agent 1 = Frontend, Agent 2 = Backend, Agent 3 = Database
Bad: Agent 1 = Frontend, Agent 2 = Something frontend-related too
```

2. **Explicit Interfaces:** Define how agents' work will integrate
```
Good: "Agent 1 builds API returning JSON with fields X, Y, Z"
Less clear: "Agent 1 builds API"
```

3. **Independent Work:** Ensure agents don't depend on each other's results
```
Good: Agents can work immediately and simultaneously
Bad: Agent 2 waits for Agent 1 results (defeats parallelism)
```

4. **Integration Plan:** Know how you'll combine results
```
Good: "These three components will be combined in App.jsx"
Unclear: No clear integration strategy
```

5. **Validation Strategy:** Plan how you'll validate integrated results
```
Good: "Run tests, then manual testing of integration points"
Less clear: "Hope they work together"
```

## Exercises

### Exercise 1: Parallel Components
**Task:** Build three components simultaneously
```
1. Create /agents
2. Agent 1: Build navbar component with menu, logo, user profile
3. Agent 2: Build footer component with links and copyright
4. Agent 3: Build sidebar component with navigation items
5. In main conversation, create App.jsx that uses all three
6. Note how much faster this is than sequential building
```

### Exercise 2: Parallel Testing
**Task:** Write comprehensive tests in parallel
```
1. Create /agents
2. Agent 1: Write unit tests for utility functions
3. Agent 2: Write integration tests for API endpoints
4. Agent 3: Write E2E tests for user workflows
5. In main conversation, merge all tests into test.js
6. Run all tests together
7. Generate coverage report
```

### Exercise 3: Multi-Language Implementation
**Task:** Implement the same feature in multiple languages
```
1. Create /agents
2. Agent 1: Implement quicksort algorithm in Python
3. Agent 2: Implement quicksort algorithm in JavaScript
4. Agent 3: Implement quicksort algorithm in Go
5. In main conversation, compare performance and code style
6. Analyze which language is best for your use case
```

### Exercise 4: Parallel Code Review
**Task:** Review code from multiple angles
```
1. Prepare code that needs review
2. Create /agents
3. Agent 1: Review for security vulnerabilities
4. Agent 2: Review for performance optimization opportunities
5. Agent 3: Review for code style and best practices
6. In main conversation, merge all recommendations
7. Create prioritized improvement list
```

### Exercise 5: Documentation Building
**Task:** Build complete documentation in parallel
```
1. Identify documentation sections (API, Guides, Examples, FAQ)
2. Create /agents
3. Agent 1: Write API documentation
4. Agent 2: Write getting started guide
5. Agent 3: Write code examples
6. Agent 4: Write FAQ
7. In main conversation, assemble into cohesive documentation
```

## Common Patterns

### Divide and Conquer
```
Large project → Split into independent modules
Each module → One agent
All agents work simultaneously
Main conversation integrates
```

### Variant Testing
```
Feature implementation X → Test current version
Test approach Y → Different testing strategy
Test approach Z → Yet another strategy
Compare coverage and speed
```

### Cross-Cutting Concerns
```
Same codebase → Security review (Agent 1)
Same codebase → Performance review (Agent 2)
Same codebase → Style review (Agent 3)
Merge findings
```

## What Agents Cannot Do

- **Cannot wait for each other:** Design for parallelism
- **Cannot access each other's context:** Must share through main conversation
- **Cannot nest:** No agents within agents
- **Cannot modify shared files:** No concurrent file writes
- **Cannot use other agents' sessions:** Each session is independent

## Performance Considerations

### Ideal Scenarios
- Multiple independent components
- Different test suites
- Independent feature implementations
- Parallel code reviews
- Documentation sections

### Less Ideal Scenarios
- Highly interdependent work (sequential might be better)
- Single large task (no parallelism benefit)
- Tasks where you need to iterate quickly with one agent
- Complex state sharing needed

## Troubleshooting

### "Agents are taking too long"
- Check if tasks are truly independent
- Consider if sequential would be faster
- Verify agents aren't waiting for each other

### "Results don't integrate well"
- Define integration points more clearly
- Ask agents about expected interfaces upfront
- In main conversation, explicitly merge results

### "Agents seem to do different quality work"
- Give more specific instructions to each agent
- Provide example output format
- Ask for same level of detail in each result

## Summary

Subagents enable parallel task execution for:
- Component/feature development
- Test suite creation
- Code review and analysis
- Documentation generation
- Multi-language implementations

Key benefits: Speed through parallelism, diverse perspectives through separate agents
Key limitations: Cannot nest, no direct state sharing, sequential integration

Use `/agents` to create parallel agents, assign clear independent tasks, then merge results in main conversation.

---

**Next:** Combine these advanced features - use extended thinking in subagents, or explore checkpointing alongside parallel work. Review the overview in `overview.md` for complete feature integration strategies.
