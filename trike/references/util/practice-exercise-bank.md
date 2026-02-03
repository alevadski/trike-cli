# Practice Exercise Bank

Collection of practice exercises organized by topic and experience level.

## Purpose

Curriculum planner should reference these when creating practice exercises for milestones. Each exercise:
- 5-10 minutes max
- On user's actual project
- Clear success criteria
- Builds confidence
- Related to what was just learned

---

## Slash Commands

**Reference:** @~/.claude/trike/references/slash-commands/overview.md

### Beginner Level (Q1: Never used / Used a few times)

**Exercise 1: Navigation Practice**
```
Ask me to find where [a component/function/class you mentioned] is defined in your project.
Once I find it, check your context to verify I can see that file.

Success: You've successfully located a file and confirmed it's in context.
```

**Exercise 2: Workflow Integration**
```
Make a small change to a comment in any file, then use the commit command to create a commit with the message "Testing Claude Code workflow".

Success: New commit appears in git log with your message.
```

**Exercise 3: Discovery**
```
Ask me to show you the help command and identify 3 commands you haven't tried yet. Try each one and note what it does.

Success: You've experimented with 3 new commands and understand their purpose.
```

### Intermediate Level (Q1: Use regularly / Know about commands)

**Exercise 1: Context Optimization**
```
Check your context to see current context size. Then reference your main configuration files using # prefix (e.g., # tsconfig.json). Ask me a project-specific question and compare quality to earlier responses.

Success: You can see the context difference and response quality improvement.
```

**Exercise 2: Workflow Efficiency**
```
Store 3 facts about your project using the memory command (framework version, key constraints, preferred patterns). Then start a new conversation and verify I still know these facts.

Success: Persistent context survives across sessions.
```

**Exercise 3: Command Combinations**
```
Combine methods for a workflow: Ask me to find [file], reference it with # prefix, then ask me to explain how it works.

Success: Smooth workflow combining multiple techniques.
```

### Advanced Level (Q1: Use extensively)

**Exercise 1: Custom Workflow**
```
Design a command workflow for a task you do frequently (like 'investigate bug' or 'plan feature'). Document the sequence of commands you'd use.

Success: Reusable command sequence that saves time.
```

**Exercise 2: Context Strategy**
```
Audit your current context usage. Identify what's wasting tokens and create a .claudeignore strategy. Measure token reduction.

Success: Measurable reduction in context tokens while maintaining quality.
```

---

## Context Management (CLAUDE.md, .claudeignore)

**Reference:** @~/.claude/trike/references/context-management/overview.md

### Beginner Level

**Exercise 1: First CLAUDE.md**
```
Create a simple CLAUDE.md with 3 sections:
1. What your project does (1 sentence)
2. Main framework/language
3. One constraint (something to avoid)

Test: Ask me about your project and see if I reference your CLAUDE.md.

Success: I cite information from your CLAUDE.md when answering.
```

**Exercise 2: Context Size Awareness**
```
Check your project size: find . -type f | wc -l
Then create .claudeignore to exclude node_modules/ or .venv/
Check your context to see the size difference.

Success: Significantly fewer files in context after .claudeignore.
```

### Intermediate Level

**Exercise 1: Structured CLAUDE.md**
```
Add a 'Constraints' section to your CLAUDE.md listing 2-3 things you DON'T want me to suggest (like deprecated patterns or libraries you avoid). Ask me for suggestions and verify I respect constraints.

Success: I actively avoid suggesting things you listed in constraints.
```

**Exercise 2: Response Quality Comparison**
```
Ask me a project-specific question BEFORE creating CLAUDE.md. Note the response quality. Create comprehensive CLAUDE.md with architecture, patterns, constraints. Ask the same question again. Compare responses.

Success: Clear quality difference with CLAUDE.md context.
```

**Exercise 3: Optimal .claudeignore**
```
Create project-appropriate .claudeignore covering:
- Dependencies (node_modules, .venv)
- Build artifacts (.next, dist)
- Large assets (images, fonts)
Measure context size reduction.

Success: 40%+ reduction in context size, maintaining code visibility.
```

### Advanced Level

**Exercise 1: Dynamic Context Strategy**
```
For your monorepo/microservices: create CLAUDE.md files in each package/service documenting that specific area. Test: work on one package and verify I prioritize its CLAUDE.md.

Success: Context awareness shifts based on working location.
```

**Exercise 2: Architecture Documentation**
```
Document your architecture patterns in CLAUDE.md with specific examples from your codebase. Include: component patterns, state management, data flow, testing approach. Verify I suggest patterns matching your docs.

Success: Suggestions match your documented patterns exactly.
```

---

## Skills System

**Reference:** @~/.claude/trike/references/skills/overview.md

### Beginner Level

**Exercise 1: First Skill Installation**
```
Search for skills related to your framework: claude skill search [react/django/etc]
Install the most relevant one.
Test: Ask me a framework-specific question before and after installing. Notice the difference.

Success: Skill installed and response quality improves.
```

**Exercise 2: Skill Impact**
```
Pick a code pattern you use frequently (like state management or API calls). Ask me to review one example BEFORE installing a relevant skill. Install skill, ask again. Compare suggestions.

Success: With skill, suggestions match your project patterns better.
```

### Intermediate Level

**Exercise 1: Complete Skill Stack**
```
Install all recommended skills for your project:
- Framework-specific skill
- Testing skill (if applicable)
- Language skill (typescript-helper, python-testing, etc.)

Verify each works by asking skill-specific questions.

Success: 3+ skills installed and demonstrably useful.
```

**Exercise 2: Skill-Specific Tasks**
```
Use the test-generator skill (if installed) to generate tests for an untested component/function in your project. Verify tests run and pass.

Success: Generated tests integrate with your test suite and pass.
```

**Exercise 3: Marketplace Exploration**
```
Browse skills marketplace for your tech stack. Identify 2 skills that would help with pain points you have. Research what they do, install and test them.

Success: Found and integrated 2 new skills into workflow.
```

### Advanced Level

**Exercise 1: Skill Optimization**
```
Audit your installed skills: claude skill list
For each, document: what it does, when you use it, value it provides.
Remove skills you haven't used in 2 weeks.

Success: Cleaned-up skill set with clear use cases documented.
```

**Exercise 2: Custom Skill Workflow**
```
Design a workflow using multiple skills for a complex task (like 'comprehensive code review'). Document which skills contribute what.

Success: Multi-skill workflow that's reusable.
```

---

## MCPs (Model Context Protocol)

**Reference:** @~/.claude/trike/references/mcps/overview.md

### Beginner Level

**Exercise 1: GitHub MCP**
```
Install GitHub MCP: claude mcp add github
Test: Ask me to check if there's an existing PR for [a topic relevant to your project]

Success: I can read PRs and issues from your repo.
```

**Exercise 2: MCP Value Discovery**
```
List services you frequently access manually (GitHub, databases, APIs, cloud platforms). Identify which have MCPs available: claude mcp search [service]

Success: Found 2+ relevant MCPs for services you use.
```

### Intermediate Level

**Exercise 1: Database MCP**
```
Install database MCP (postgres/mysql/etc if you use one).
Test: Ask me to describe your database schema.
Verify: Can I see tables, columns, relationships?

Success: I can query and describe your actual database.
```

**Exercise 2: Multi-MCP Workflow**
```
Connect 2-3 MCPs relevant to your workflow (github + database, github + cloud platform, etc.). Test a task that requires both: "Check if PR#42's database migration is applied in staging"

Success: I can correlate information across MCPs.
```

**Exercise 3: MCP for Debugging**
```
Use MCP to debug a real issue:
- Database MCP: check actual data state
- GitHub MCP: read related issues/PRs
- Service MCP: check service status

Success: MCP helps identify root cause faster.
```

### Advanced Level

**Exercise 1: Complete MCP Integration**
```
Map your development workflow to MCPs:
- Code: GitHub MCP
- Data: Database MCP
- Deploy: Vercel/AWS/etc MCP
- Monitor: Logging MCP

Install all relevant. Test cross-cutting tasks.

Success: Workflow fully integrated with MCPs.
```

**Exercise 2: MCP-Powered Analysis**
```
Use MCPs for cross-service analysis:
"Compare GitHub PR descriptions to actual database schema changes - do they match?"

Success: I can verify consistency across services using MCPs.
```

---

## CLAUDE.md Creation

**Reference:** @~/.claude/trike/references/context-management/claude-md.md

### Beginner Level

**Exercise 1: Basic Template**
```
Create CLAUDE.md with:
1. Project name and purpose
2. Main language and framework
3. How to run the project locally

Test: Ask me "How do I run this project?" and verify I cite CLAUDE.md

Success: CLAUDE.md created and referenced in responses.
```

### Intermediate Level

**Exercise 1: Comprehensive CLAUDE.md**
```
Expand CLAUDE.md to include:
- Architecture overview
- Key dependencies
- Code conventions
- Common commands
- Important constraints

Test multiple questions and verify I reference appropriate sections.

Success: CLAUDE.md is comprehensive and frequently referenced.
```

**Exercise 2: Pattern Documentation**
```
Add a 'Patterns' section documenting 3 patterns you use:
- How you structure components/modules
- How you handle errors
- How you write tests

Verify: When suggesting code, I match your documented patterns.

Success: Suggestions follow documented patterns without reminding.
```

### Advanced Level

**Exercise 1: Living Documentation**
```
Set up CLAUDE.md as living documentation:
- Document current architecture
- List recent architectural decisions
- Note deprecated patterns
- Include team conventions

Create hook to remind to update CLAUDE.md on major changes.

Success: CLAUDE.md stays current with project evolution.
```

---

## Real Project Work

### Beginner Level

**Exercise 1: Safe Exploration**
```
Create a feature branch: git checkout -b test-claude-code
Make a tiny change (like fixing a typo or updating a comment).
Ask me to commit it using the commit command.
Review with git diff main

Success: Safe change made, committed, and reviewed.
```

**Exercise 2: Simple Addition**
```
On a feature branch, ask me to add a simple feature (like a new helper function or utility). Review the code I generate. If satisfied, commit. If not, ask for changes.

Success: You made a conscious decision about accepting/rejecting AI-generated code.
```

### Intermediate Level

**Exercise 1: Feature Implementation**
```
Choose a small feature from your backlog (or I'll suggest based on your project). Plan it, implement it with my help, write tests, commit. Keep it under 30 minutes total.

Success: Complete feature shipped in one focused session.
```

**Exercise 2: Refactoring**
```
Identify a component/module that needs improvement. Refactor it with my help. Ensure tests still pass. Commit with detailed message explaining improvements.

Success: Code quality improved, tests green, changes committed.
```

**Exercise 3: Bug Fix**
```
Pick a real bug or issue. Debug it with my assistance. Implement fix. Write regression test. Commit.

Success: Bug fixed, test prevents regression, committed.
```

### Advanced Level

**Exercise 1: Complex Feature**
```
Implement a multi-file feature touching several parts of your codebase:
- Plan implementation strategy
- Create feature branch
- Implement across multiple files
- Update tests
- Update documentation
- Commit atomically

Success: Production-ready feature implemented end-to-end.
```

**Exercise 2: Architecture Improvement**
```
Refactor a complex part of your system:
- Analyze current structure
- Design improved architecture
- Implement incrementally
- Maintain backwards compatibility
- Full test coverage

Success: Meaningful architectural improvement merged.
```

---

## Verification Exercises (Ensuring Understanding)

### After Learning Any Feature

**Exercise 1: Teach Back**
```
Explain the feature you just learned in your own words. How does it work? Why would you use it? When would you NOT use it?

Success: Clear explanation showing understanding of trade-offs.
```

**Exercise 2: Real Scenario**
```
Describe a real situation from your work where this feature would have helped. Be specific about the problem and how the feature solves it.

Success: Concrete use case from actual experience.
```

**Exercise 3: Integration**
```
How does this feature fit with other features you've learned? Create a workflow that combines 2-3 features.

Success: Workflow showing feature interaction understanding.
```

---

## Exercise Selection Guidelines

### Choose exercises based on:

**Experience Level (Q1):**
- Never used → Simple, guided exercises with clear steps
- Use regularly → Practical, immediately useful exercises
- Use extensively → Complex challenges, optimization exercises

**Pain Points (Q7):**
- "Don't know where to start" → More guidance, clear success criteria
- "Generic responses" → Exercises focused on CLAUDE.md and context
- "Forgets context" → Persistent context exercises
- "Don't know features" → Discovery and exploration exercises

**Goals (Q8):**
- "Ship features faster" → Practical workflow exercises
- "Learn comprehensively" → Full-coverage exercises
- "Specific use case" → Exercises focused on that use case

**Project Type:**
- Monorepo → Cross-package exercises
- Microservices → Multi-service exercises
- Solo project → Focus on individual productivity

---

## Exercise Quality Checklist

Before including an exercise:

- [ ] 5-10 minutes max
- [ ] Uses their actual project (not toy examples)
- [ ] Clear success criteria (observable)
- [ ] Related to feature just learned
- [ ] Builds confidence
- [ ] Teaches verification ("how do you know it worked?")
- [ ] Appropriate difficulty for experience level
- [ ] Has concrete value (not just "try this")
