# Example Generated Milestones

This file shows what high-quality milestones look like for different experience levels and topics.

## Purpose

The curriculum planner should reference these examples when generating milestones to:
- Match the tone and structure
- See how to contextualize explanations to specific projects
- Understand appropriate depth for different experience levels
- Get inspiration for practice exercises

---

## Example 1: Slash Commands (Beginner Level)

**User Context:**
- Q1: "Never used it, just installed"
- Q2: "I don't know what slash commands are"
- Project: React + TypeScript web app
- Goal: Ship features faster
- Pain Point: Don't know where to start

### Milestone 3: Navigate Claude Code Like a Pro

**Goal:**
Learn to use slash commands - shortcuts that make Claude Code easier to use without memorizing complex instructions.

**Reference:**
@~/.claude/trike/references/slash-commands/overview.md

**What You'll Learn:**
Slash Commands

Think of commands like keyboard shortcuts on your computer - instead of clicking through menus, you can ask me in natural language to find things. You can also use quick commands to manage your workflow.

They help you:
• Navigate faster without remembering complex instructions
• Get things done quicker with shortcuts instead of long explanations
• Discover features you didn't know existed

For your React app, asking me to find things can instantly locate where a component is defined, and the commit command creates git commits without leaving Claude Code.

**Why This Matters for You:**
You mentioned you "don't know where to start" - slash commands are the perfect starting point. They make Claude Code feel less intimidating and help you discover what's possible.

**What You'll Do:**
1. Ask me to show you the help command
2. You'll see a list of all available commands
3. Ask me: "Find my Button component"
4. See how I find files for you!

**Success Criteria:**
- You used the help command and saw the command list
- You asked me to find files and I found them in your project
- You feel comfortable asking me to search for things

---

## Example 2: Context Management (Intermediate Level)

**User Context:**
- Q1: "Use it regularly for conversations"
- Q3: "I have to tell it which files to read"
- Project: Next.js 14 monorepo
- Goal: Get better responses
- Pain Point: Responses are generic/unhelpful

### Milestone 5: Master Context to Get Project-Specific Answers

**Goal:**
Understand exactly how Claude Code sees your monorepo, so you can get Next.js-specific, project-specific answers instead of generic React advice.

**Reference:**
@~/.claude/trike/references/context-management/overview.md

**What You'll Learn:**
Context Management System

You mentioned responses feel "generic/unhelpful" - this is almost always a context issue.

Without understanding your monorepo structure, shared packages, and Next.js 14 App Router setup, I can only give general programming advice. With proper context, I give you answers that reference your actual components, understand your state management patterns, and respect your project constraints.

For your Next.js monorepo:
• Context determines which packages I prioritize
• I understand your shared component library structure
• I suggest patterns that match your existing code
• I know you're using App Router, not Pages Router

**Why This Matters for You:**
This directly solves your main pain point. Better context = responses that feel like they came from someone on your team who already knows your codebase.

**What You'll Do:**
1. Check your context to see what files I'm currently looking at
2. Review which parts of your monorepo I can see
3. Add key config files to your context
4. Ask the same question again - notice how the response changes

**Success Criteria:**
- You understand what's in my current context
- You can see why some responses were too generic
- You know how to add important files when needed

**Practice Exercise:**
Ask me a project-specific question about your Next.js app twice: once with minimal context, then again after adding 2-3 key configuration files to your context. Compare the responses and notice how the second one references your actual setup.

---

## Example 3: Skills System (Experienced Level)

**User Context:**
- Q1: "Use it extensively"
- Q4: "I've used 1-2 built-in skills"
- Project: Python FastAPI microservices
- Goal: Learn comprehensively
- Pain Point: Don't know what features exist

### Milestone 7: Expand Your Skills Arsenal for FastAPI

**Goal:**
Discover and install skills that give Claude Code specialized knowledge about FastAPI patterns, async Python, and API design.

**Reference:**
@~/.claude/trike/references/skills/overview.md

**What You'll Learn:**
Skills Marketplace and Installation

Skills are like VS Code extensions for Claude Code - they give me domain-specific knowledge. You've used a couple, but there's a whole ecosystem you're missing.

For your FastAPI microservices:
• "fastapi-patterns" - Async route handlers, dependency injection, Pydantic models
• "python-testing" - Pytest patterns, async test fixtures, mocking strategies
• "api-design" - RESTful best practices, OpenAPI schemas, versioning

Each skill acts like a specialized consultant who knows that specific domain.

**Why This Matters for You:**
You want to "learn comprehensively" - skills are how Claude Code scales beyond general programming knowledge into specialized domains. For Python/FastAPI work, the right skills make the difference between generic Python advice and FastAPI best practices.

**What You'll Do:**
1. Browse skills marketplace: `claude skill search fastapi python api`
2. Review available skills and their descriptions
3. Install recommended skills for your stack
4. Test: Ask me about async dependency injection before and after installing fastapi-patterns skill

**Success Criteria:**
- You've installed 3+ skills relevant to your FastAPI work
- You can see the quality difference in responses when skills are active
- You understand which skills help with which types of questions

**Practice Exercise:**
Identify a code pattern you use frequently in your microservices (like auth middleware or database connection handling). Install a relevant skill, then ask me to review and improve one of your actual implementations. Compare the suggestions to what generic advice would look like.

---

## Example 4: Real Project Work (Intermediate Level)

**User Context:**
- Q1: "Know about commands and tried some features"
- Q8: "Ship features faster on my current project"
- Project: Django REST API
- Pain Point: Hard to get consistent quality

### Milestone 12: Build Your First Feature End-to-End

**Goal:**
Implement a complete feature on your Django API using Claude Code - from planning through testing - to prove your setup works and build confidence for solo work.

**What You'll Learn:**
Real Project Development Workflow with Safety Guardrails

This is where everything comes together. You've set up CLAUDE.md, installed skills, and learned the tools. Now we'll use them to ship actual code.

For your Django REST API, we'll:
• Work in a safe feature branch (nothing touches main)
• Plan implementation using Claude Code
• Generate code that matches your existing patterns
• Write tests using your pytest setup
• Verify everything works before merging

**Why This Matters for You:**
Your goal is "ship features faster" - this milestone proves you can do that. We'll implement a real feature with appropriate guardrails so you gain confidence without risk.

**What You'll Do:**
1. Choose a feature from your backlog (or I'll suggest one based on your API structure)
2. Create safety branch: `git checkout -b feature/claude-code-test`
3. Discuss approach and plan implementation steps
4. Implement feature incrementally with explanations
5. Run tests to verify: `pytest tests/test_[feature].py -v`
6. Review changes: `git diff main`
7. Commit (or rollback if you prefer)

**Success Criteria:**
- Feature branch created and working
- Tests pass for new functionality
- You understand what was built and why
- You're comfortable with the workflow

**Practice Exercise:**
After implementing the feature, explain to me (in your own words) how the new code integrates with your existing API structure. If you can clearly explain it, you're ready to work independently.

---

## Example 4.5: Context Auditing (Intermediate Level)

**User Context:**
- Q1: "Use it regularly but want better results"
- Q3: "Not sure what files Claude sees"
- Project: Java Spring Boot or any multi-module project
- Goal: Get project-specific answers
- Pain Point: Responses are generic or miss important context

### Milestone 6: Audit Your Project Context

**Goal:**
Verify exactly what Claude Code understands about your project, so responses become specific to your actual architecture.

**Reference:**
@~/.claude/trike/references/context-management/overview.md

**What You'll Learn:**
Context Verification and CLAUDE.md Setup

Your problem is that I don't have the full picture of your project. The fix is simple and repeatable.

**Why This Matters for You:**
Generic responses usually mean I'm missing key files about how your project is structured. By auditing context once, you unlock project-specific answers from that point on.

**What You'll Do:**

**Step 1:** Check your context to see what's loaded
Check the token usage and which files I can currently see.

**Step 2:** Analyze CLAUDE.md
- Does it exist in your project root?
- If yes: Review what's documented about your structure, dependencies, and patterns
- If no: That's your problem - we'll create one

**Step 3:** Create or improve CLAUDE.md
If it doesn't exist, we'll build one that covers:
- Your project structure (modules, packages, key folders)
- Technology stack and versions
- How tests are organized
- Common patterns in your codebase
- Build/deployment process

**Success Criteria:**
- You checked your context and know what's in my current view
- You've created or reviewed CLAUDE.md
- Next question you ask is noticeably more specific to your project

**Practice Exercise:**
Ask me a question about your project architecture twice: once before creating CLAUDE.md, then again after. Compare how specific the second answer is.

---

## Example 5: Advanced Features (Expert Level)

**User Context:**
- Q1: "Use it extensively"
- Q4: "I've installed custom skills or plugins"
- Project: Kubernetes microservices (Go + TypeScript)
- Goal: Get unstuck on workflow
- Pain Point: Hard to get consistent quality

### Milestone 8: Orchestrate Complex Tasks with Subagents

**Goal:**
Master subagent orchestration for multi-service operations in your Kubernetes environment.

**Reference:**
@~/.claude/trike/references/advanced/subagents.md

**What You'll Learn:**
Subagent Orchestration Patterns

You're already advanced - this is about optimization. Subagents enable parallel execution across your microservices architecture with isolated context per service.

Pattern: Main agent coordinates, specialized subagents handle each service:
• Subagent A: Analyzes Go backend service
• Subagent B: Reviews TypeScript frontend
• Subagent C: Checks K8s manifests
• Main agent: Synthesizes findings

Use cases in your environment:
• Cross-service impact analysis (when changing shared proto)
• Parallel test suite execution (one subagent per service)
• Distributed debugging (trace request across services)
• Multi-repo coordination (separate subagent per repo)

Tradeoffs:
+ Parallel execution (3x faster for multi-service tasks)
+ Context isolation (cleaner reasoning per service)
+ Specialized tooling (different skills per subagent)
- Coordination overhead (synthesis complexity)
- Harder debugging (multiple execution traces)

**Why This Matters for You:**
You want "consistent quality" - subagents help by isolating context and enabling specialized reasoning per service. This prevents context pollution when working across your microservices.

**What You'll Do:**
1. Identify a multi-service task (e.g., "analyze impact of auth service change")
2. Design subagent breakdown with clear boundaries
3. Implement orchestration: spawn subagents with specific context
4. Synthesize results into actionable recommendations
5. Measure: compare to sequential execution time

**Success Criteria:**
- Task completes in parallel across services
- Results synthesize correctly without duplication
- Measurable performance improvement
- Pattern is reusable for similar tasks

**Practice Exercise:**
Implement subagent orchestration for your test suite: spawn one subagent per microservice to run tests in parallel. Compare total execution time to sequential testing. Extract the pattern as a reusable workflow.

---

## Common Patterns Across Examples

### Always Include:
1. **User context reference** - Tie to their quiz answers
2. **Project-specific examples** - Use their actual tech stack
3. **Pain point addressing** - Connect to their stated frustration
4. **Goal alignment** - Show how this helps their goal
5. **Clear success criteria** - Observable, verifiable outcomes

### Adapt Based on Experience:
- **Beginners:** More explanation, encouragement, step-by-step
- **Intermediate:** Concise but complete, show what they're missing
- **Advanced:** Peer-level, optimization focus, tradeoffs

### Practice Exercises:
- Start at Milestone 4 for most users (earlier for experienced)
- 5-10 minutes max
- On their actual project
- Clear success criteria

### Tone Variations:
- **Q1: Never used** → "Ask me to show you the help command..." (encouraging)
- **Q1: Use regularly** → "You understand X, now let's unlock Y..." (respectful)
- **Q1: Use extensively** → "Pattern: Main agent coordinates..." (peer-level)

---

## Anti-Patterns to Avoid

❌ **Abstract Explanations:**
"Skills extend Claude Code's capabilities with specialized knowledge."

✅ **Project-Specific:**
"For your React app, the 'react-patterns' skill helps me suggest hooks patterns instead of generic JavaScript."

---

❌ **Generic Success Criteria:**
"Understand how skills work"

✅ **Observable Criteria:**
"Ask me about component state before and after installing react-patterns skill - notice the difference"

---

❌ **Toy Examples:**
"Create a simple 'Hello World' component to practice"

✅ **Real Project Work:**
"Refactor your existing UserProfile component using patterns I suggest"

---

## Quality Checklist for Generated Milestones

Before including a milestone in learning-path.md:

- [ ] References user's quiz answers (Q1-Q8)
- [ ] Uses their project's actual tech stack
- [ ] Addresses their pain point or goal
- [ ] Success criteria are observable
- [ ] Practice exercise (if included) is on real project
- [ ] Tone matches their experience level
- [ ] No time estimates
- [ ] Teaches WHY, not just HOW
- [ ] Milestone name is benefit-focused
- [ ] Builds on previous milestones
