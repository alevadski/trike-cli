# Milestone Structure Template

This template guides the curriculum planner in creating well-structured milestones.

## Standard Milestone Format

Every generated milestone should follow this structure:

```markdown
### Milestone [N]: [Action-Oriented Name]

**Goal:**
[What they'll achieve - specific and measurable, tied to their project if possible]

**What You'll Learn:**
[Feature/concept name]

[Explanation contextualized to their project and persona level]
For your [their framework] project, this means [concrete example].

**Why This Matters for You:**
[Direct connection to their goal or addresses their pain point]

**Reference:**
@~/.claude/trike/references/[topic-category]/[specific-file].md

**What You'll Do:**
1. [Specific action step]
2. [Specific action step]
3. [Specific action step]

**Success Criteria:**
- [How they know it worked - something they can verify]
- [What they should see/be able to do]

[If Milestone 4+ for basic-user, or earlier for intermediate:]
**Practice Exercise:**
[Small task on their real project - 5-10 minutes, clear success criteria]
```

---

## Naming Guidelines

**Good milestone names:**
- ✅ "Navigate Claude Code Like a Pro" (benefit-focused)
- ✅ "Set Up Your Project for Success" (outcome-focused)
- ✅ "Connect Your Tools to Claude" (action-oriented)
- ✅ "Build Your First Feature with AI" (exciting)

**Bad milestone names:**
- ❌ "Milestone 3: Slash Commands" (boring, technical)
- ❌ "Learn About MCPs" (vague)
- ❌ "Understanding Context" (passive)

**Pattern:** [Verb] + [Benefit/Outcome]

---

## Goal Guidelines

**The goal should:**
- Be specific and measurable
- Connect to their project when possible
- Match persona level (detailed for never-tried, concise for intermediate)

**Examples by persona:**

**Never-tried:**
"Learn how to use slash commands to navigate Claude Code efficiently, so you don't have to remember complex instructions."

**Basic-user:**
"Master the essential slash commands that will 10x your productivity with Claude Code."

**Intermediate:**
"Optimize your command workflow and create custom commands for your specific use cases."

---

## Explanation Guidelines

**Core principle:** Never explain in abstract. Always tie to THEIR specific project.

**Bad (abstract):**
"Skills are plugins that extend Claude Code's capabilities. They provide specialized knowledge and tools."

**Good (contextualized to React project):**
"Skills are like VS Code extensions for Claude Code. For your React project, installing the 'react-patterns' skill helps me understand React best practices - so when you ask me to refactor a component, I'll suggest proper hooks patterns instead of generic JavaScript."

**Good (contextualized to Django project):**
"Skills give me specialized knowledge. For your Django project, the 'django-patterns' skill helps me understand Django ORM patterns - so I can write migrations and queries that follow Django conventions."

**Persona adaptations:**
- **Never-tried:** More explanation, analogies, step-by-step
- **Basic-user:** Concise but complete, assume coding knowledge
- **Intermediate:** High-level, focus on tradeoffs and optimization

---

## "Why This Matters" Guidelines

**Connect to:**
1. Their stated goal (from quiz Q8)
2. Their pain point (from quiz Q7)
3. Their project needs

**Examples:**

**For user with goal "Ship features faster":**
"This speeds up your workflow by eliminating the back-and-forth of clarifying questions. Clear context = faster iterations."

**For user with pain point "Generic responses":**
"This is THE solution to generic responses. When I understand your project structure, I give you React-specific, project-specific answers instead of generic JavaScript advice."

**For user working on real project:**
"This directly improves how I understand your [Framework] codebase, so every suggestion I make fits your existing patterns."

---

## Success Criteria Guidelines

**Should be:**
- Observable (they can see/verify it)
- Specific (not vague)
- Immediate (can check right now)

**Good examples:**
- ✅ "Ask me to find files across your project and verify I find them correctly"
- ✅ "Ask me a project-specific question and notice more relevant responses"
- ✅ "Check .trike/project-analysis.json exists and contains your framework"
- ✅ "Your tests pass after the refactoring"

**Bad examples:**
- ❌ "Understand slash commands" (not observable)
- ❌ "Feel more confident" (not measurable)
- ❌ "Know how to use skills" (vague)

---

## Practice Exercise Guidelines

**When to include:**
- **Never-tried:** Milestone 4+ (after foundation built)
- **Basic-user:** Milestone 4+ (standard)
- **Intermediate:** Milestone 2+ (they're ready earlier)

**Requirements:**
- 5-10 minutes max
- On their actual project (not toy examples)
- Clear success criteria
- Related to what they just learned
- Builds confidence

**Good examples:**

**After learning slash commands:**
"Ask me to find where authentication is handled in your project. Then ask me to explain how it works."

**After learning skills:**
"Install one skill that's relevant to your [Framework] project and use it to solve a real problem you have today."

**After learning CLAUDE.md:**
"Add a 'Constraints' section to your CLAUDE.md listing 2-3 things you DON'T want me to suggest (like deprecated patterns or libraries you avoid)."

**Bad examples:**
- ❌ "Install 3 skills and compare them" (too vague, unclear success)
- ❌ "Create a CLAUDE.md from scratch" (too broad, overwhelming)
- ❌ "Build a complete authentication system" (way too big)

---

## Persona-Specific Adaptations

### Never-Tried Milestones

**Characteristics:**
- Shorter (5-10 min each)
- One clear concept per milestone
- More explanation and examples
- Encouraging tone
- Hand-holding through steps
- Frequent confidence building

**Example structure:**
```markdown
### Milestone 3: Your First Slash Command

**Goal:**
Learn to use slash commands - these are shortcuts that make Claude Code easier to use.

**What You'll Learn:**
Slash commands

Think of commands like shortcuts on your phone - instead of typing out long instructions, you can ask me to do things directly (like ask me to find files or help you understand things).

They help you:
• Navigate faster (no remembering complex instructions)
• Get things done quicker (shortcuts instead of explanations)
• Discover features you didn't know existed

**Why This Matters for You:**
You mentioned you "don't know where to start" - slash commands are the perfect starting point. They make Claude Code feel less intimidating.

**What You'll Do:**
1. Ask me to show you the help command
2. You'll see a list of all available commands
3. Ask me: "Find any file from my project"
4. See how I find files for you!

**Success Criteria:**
- You used the help command and saw the command list
- You asked me to find files and I found them
- You feel comfortable asking me to search for things

Don't worry if this feels simple - you're building the foundation! 🚲
```

### Basic-User Milestones

**Characteristics:**
- Medium length (10-15 min)
- Immediately practical
- Efficient but complete
- Assumes coding knowledge
- Focus on unlocking power features
- "Aha moment" focused

**Example structure:**
```markdown
### Milestone 5: Context Management Deep Dive

**Goal:**
Understand how Claude Code sees your project, so you can get specific answers instead of generic ones.

**What You'll Learn:**
Context Management

You mentioned responses feel "generic/unhelpful" - this is almost always a context issue.

Without understanding your project structure, patterns, and constraints, I can only give general programming advice. With proper context, I give you React-specific, project-specific, pattern-matching responses.

For your React monorepo, context management means:
• I know which packages to prioritize
• I understand your shared component library
• I suggest patterns that match your existing code

**Why This Matters for You:**
This directly solves your main pain point. Better context = responses that feel like they came from someone on your team.

**What You'll Do:**
1. Check your current context using the context command
2. Review which files I'm currently seeing
3. Add your main config files to your context
4. Try asking the same question again - notice the difference

**Success Criteria:**
- You can see what's in my current context
- You understand why some responses are generic
- You know how to add important files

**Practice Exercise:**
Ask me a project-specific question twice: once with minimal context, then again after adding 2-3 key files with /add-context. Notice how the second response is more specific.
```

### Intermediate Milestones

**Characteristics:**
- Longer (15-20 min)
- Complex challenges
- Minimal hand-holding
- Peer-to-peer tone
- Focus on optimization and tradeoffs
- Expects self-direction

**Example structure:**
```markdown
### Milestone 4: Subagent Orchestration Patterns

**Goal:**
Master subagent orchestration for complex, multi-step workflows.

**What You'll Learn:**
Subagent Orchestration

Breaking complex tasks into specialized subagents enables parallel execution and cleaner context isolation. Each subagent operates with specific tools and focused context, then results are synthesized.

Useful for your microservices architecture when:
• Parallel analysis across services
• Multi-repository operations
• Distributed testing
• Complex build orchestration

**Tradeoffs:**
+ Parallel execution (faster)
+ Isolated context (cleaner reasoning)
+ Specialized tooling (more precise)
- Coordination overhead
- Result synthesis complexity
- Harder to debug failures

**Why This Matters for You:**
Your goal is workflow optimization. Subagents let you parallelize operations that currently run sequentially.

**What You'll Do:**
1. Identify a workflow in your project that's currently sequential
2. Design subagent breakdown with clear boundaries
3. Implement orchestration pattern
4. Measure performance improvement

**Success Criteria:**
- Workflow runs in parallel
- Results synthesize correctly
- Measurable performance gain
- Pattern is reusable

**Practice Exercise:**
Implement subagent orchestration for your test suite: one subagent per service, run in parallel, aggregate results. Compare execution time.
```

---

## Quality Checklist

Before generating a milestone, verify:
- [ ] Name is action-oriented and benefit-focused
- [ ] Goal is specific and connects to user's project
- [ ] Explanation is contextualized (never abstract)
- [ ] "Why this matters" addresses their goal or pain point
- [ ] Steps are actionable and clear
- [ ] Success criteria are observable
- [ ] Practice exercise (if included) is 5-10 min and clear
- [ ] Tone matches persona (encouraging/efficient/peer)
- [ ] No time estimates anywhere
- [ ] Teaches understanding, not just execution

