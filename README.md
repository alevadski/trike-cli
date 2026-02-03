<div align="center">

# TRIKE 🚲

**Stop typing. Start vibing. 100x your Claude Code game.**

**A [Claude Code](https://claude.ai/code) plugin that helps experienced developers master advanced features in 2-3 hours.**

<br>

```bash
npx trike-cli
```

<br>

[What is Trike?](#what-is-trike) · [How It Works](#how-it-works) · [Commands](#commands) · [Who Is This For?](#who-is-this-for)

</div>

---

## What is Trike?

Trike helps experienced developers get way more out of Claude Code. Most people only use basic chat, but there's:

- **Slash commands** - context, memory, review, rewind, agents, and more
- **Context management** - CLAUDE.md, .claudeignore optimization
- **Skills & MCPs** - extend Claude with specialized knowledge and tool integrations
- **Hooks** - automate your workflow
- **Advanced features** - extended thinking, subagents, checkpointing

Trike creates a personalized learning path based on your existing knowledge, so you only learn what you're missing. In 2-3 hours, you'll have a fully optimized project setup and 100x the productivity.

## Installation

```bash
npx trike-cli
```

That's it. Trike installs itself as a Claude Code plugin and you're ready to go.

## Quick Start

Open Claude Code in any directory and run:

```bash
/trike:start
```

Take an 8-question assessment to identify what you already know, then Trike will create a personalized learning path for your specific needs and project.

## How It Works

**1. Assessment** - Answer 8 questions about your Claude Code knowledge (2 min)

**2. Project Analysis** - Trike analyzes your actual project's tech stack and structure (1 min)

**3. Personalized Path** - Get a custom learning curriculum focused on what YOU need (instant)

**4. Learn by Doing** - Work through milestones, each teaching a Claude Code feature in the context of YOUR project (2-3 hours)

**5. Fully Optimized** - Leave with:
- CLAUDE.md configured for your tech stack
- .claudeignore optimized
- Recommended skills installed
- Recommended MCPs configured
- Complete understanding of all Claude Code features

## Commands

Once installed, you have access to these commands in Claude Code:

- `/trike:start` - Begin your learning journey
- `/trike:quiz` - Take the knowledge assessment
- `/trike:begin` - Analyze your project and create curriculum
- `/trike:next` - Get the next milestone in your learning path
- `/trike:progress` - Check your current progress

**Utility commands** (available after completion):
- `/trike:setup-check` - Audit any project's Claude Code setup
- `/trike:prompt-help` - Get help improving your prompts

## What You'll Learn

Depending on your assessment results, your learning path may include:

### Core Features
- How to use slash commands effectively (`/memory`, `/rewind`, `/review`, `/agents`)
- Understanding how context works and token management
- Creating effective CLAUDE.md files for your tech stack
- Optimizing .claudeignore for your project structure

### Power Features
- Installing and using Skills (specialized knowledge modules)
- Setting up MCP servers (tool integrations)
- Configuring hooks for workflow automation

### Advanced Features
- When and how to use extended thinking
- Working with subagents for parallel tasks
- Checkpointing and session management strategies

**Every topic is taught by applying it to YOUR real project** - no abstract tutorials or toy examples.

## Who Is This For?

### Perfect for:
- ✅ Developers who know how to code but are new to Claude Code
- ✅ Experienced devs who want to master all CC features
- ✅ Anyone who feels like they're only scratching the surface
- ✅ Teams wanting consistent Claude Code setup across projects

### Not ideal for:
- ❌ Complete beginners to programming (learn basics first)
- ❌ People who just want quick answers (Trike is a learning journey)
- ❌ Those not willing to invest 2-3 hours

## Philosophy

**Learn by doing on your real project.**

Instead of abstract tutorials, every milestone teaches a Claude Code feature by having you apply it to YOUR actual project. The learning is immediate, relevant, and practical.

**Personalized, not one-size-fits-all.**

No fixed learning paths. Trike adapts to what you already know and what you're trying to achieve. If you already know slash commands, we'll skip them. If you're struggling with context management, we'll go deep.

**Context-aware explanations.**

When teaching CLAUDE.md, we don't show generic examples. We show you how to document YOUR React monorepo or YOUR Python microservices. Real stack, real patterns.

## Example Learning Path

Here's what a typical experienced developer's path might look like:

```
Quiz Results: Uses CC regularly, knows basic commands, unclear on context management
Goal: Ship features faster
Pain Point: Responses feel generic/unhelpful

Your Personalized Path (10 milestones, ~2.5 hours):
├─ Milestone 1: How Context Really Works
├─ Milestone 2: Creating Effective CLAUDE.md
├─ Milestone 3: Optimizing .claudeignore
├─ Milestone 4: Memory Management with /memory
├─ Milestone 5: Code Review Workflow with /review
├─ Milestone 6: Finding and Installing Skills
├─ Milestone 7: Setting Up Your First MCP
├─ Milestone 8: Advanced Context Optimization
├─ Milestone 9: When to Use Extended Thinking
└─ Milestone 10: Workflow Automation Patterns
```

## Requirements

- [Claude Code](https://claude.ai/code) installed
- A project to work with (or willingness to start one)
- 2-3 hours of focused time
- Basic understanding of your tech stack

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT © [Alex Levadski](https://github.com/alevadski)

---

<div align="center">

**Built for developers, by developers.**

[Report Bug](https://github.com/alevadski/trike/issues) · [Request Feature](https://github.com/alevadski/trike/issues)

</div>
