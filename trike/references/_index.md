# Claude Code Learning Path Index

This file contains the complete learning path for mastering Claude Code, sorted from easiest to most advanced. Each topic includes metadata for curriculum planning.

**Usage:** Curriculum planner reads this index + quiz results to generate personalized learning paths.

---

## 1. Slash Commands Basics

- **File:** `@~/.claude/trike/references/slash-commands/overview.md`
- **Difficulty:** Beginner
- **Dependencies:** None
- **Quiz mapping:** Q2 (commands knowledge)
- **Topics covered:** Essential commands (/help, /clear, /memory, /review)
- **Individual references:**
  - `@~/.claude/trike/references/slash-commands/help.md`
  - `@~/.claude/trike/references/slash-commands/clear.md`

---

## 2. Claude Code Modes

- **File:** `@~/.claude/trike/references/core/modes.md`
- **Difficulty:** Beginner
- **Dependencies:** None
- **Quiz mapping:** Q1, Q6 (experience level + setup approach)
- **Topics covered:** Plan mode, Default mode, AcceptEdits mode, BypassPermissions mode, Shift+Tab switching
- **Why early:** Understanding modes is fundamental to controlling Claude's autonomy and safety

---

## 3. Context Management Fundamentals

- **File:** `@~/.claude/trike/references/context-management/overview.md`
- **Difficulty:** Beginner
- **Dependencies:** Basic CC usage
- **Quiz mapping:** Q3 (context understanding)
- **Topics covered:** How context works, /context command, token awareness
- **Related:** `@~/.claude/trike/references/context-management/context-command.md`

---

## 4. CLAUDE.md Setup

- **File:** `@~/.claude/trike/references/context-management/claude-md.md`
- **Difficulty:** Beginner-Intermediate
- **Dependencies:** Context Management Fundamentals
- **Quiz mapping:** Q3, Q6 (context + setup approach)
- **Topics covered:** Creating effective CLAUDE.md, structure, best practices

---

## 5. .claudeignore Configuration

- **File:** `@~/.claude/trike/references/context-management/claudeignore.md`
- **Difficulty:** Beginner-Intermediate
- **Dependencies:** CLAUDE.md Setup
- **Quiz mapping:** Q3, Q6
- **Topics covered:** Excluding files, patterns, optimization

---

## 6. Memory Management (/memory)

- **File:** `@~/.claude/trike/references/slash-commands/memory.md`
- **Difficulty:** Beginner-Intermediate
- **Dependencies:** CLAUDE.md Setup
- **Quiz mapping:** Q2, Q6
- **Topics covered:** /memory command, # prefix, persistent facts

---

## 7. Checkpointing & Time Travel (/rewind)

- **File:** `@~/.claude/trike/references/slash-commands/rewind.md`
- **Difficulty:** Intermediate
- **Dependencies:** Basic command knowledge
- **Quiz mapping:** Q2
- **Topics covered:** /rewind, Esc×2 shortcut, session management
- **Related:** `@~/.claude/trike/references/advanced/checkpointing.md`

---

## 8. Code Review Workflow (/review)

- **File:** `@~/.claude/trike/references/slash-commands/review.md`
- **Difficulty:** Intermediate
- **Dependencies:** Basic command knowledge
- **Quiz mapping:** Q2, Q8 (commands + goal)
- **Topics covered:** /review command, feedback integration, iteration

---

## 9. Session Management

- **File:** `@~/.claude/trike/references/slash-commands/overview.md`
- **Difficulty:** Intermediate
- **Dependencies:** Multiple commands knowledge
- **Quiz mapping:** Q2, Q6
- **Topics covered:** /clear, /compact, /init, /rename
- **Individual references:**
  - `@~/.claude/trike/references/slash-commands/clear.md`
  - `@~/.claude/trike/references/slash-commands/compact.md`
  - `@~/.claude/trike/references/slash-commands/init.md`

---

## 10. Advanced Commands

- **File:** `@~/.claude/trike/references/slash-commands/overview.md`
- **Difficulty:** Intermediate
- **Dependencies:** Command basics
- **Quiz mapping:** Q2
- **Topics covered:** /agents, /export, /add-dir, /output-style
- **Individual references:**
  - `@~/.claude/trike/references/slash-commands/agents.md`
  - `@~/.claude/trike/references/slash-commands/export.md`

---

## 11. Skills System Overview

- **File:** `@~/.claude/trike/references/skills/overview.md`
- **Difficulty:** Intermediate
- **Dependencies:** Context management
- **Quiz mapping:** Q4 (skills knowledge)
- **Topics covered:** What skills are, folder placement, discovery

---

## 12. Installing & Using Skills

- **File:** `@~/.claude/trike/references/skills/installing-and-using.md`
- **Difficulty:** Intermediate
- **Dependencies:** Skills System Overview
- **Quiz mapping:** Q4
- **Topics covered:** Finding skills, installation, usage, popular skills list

---

## 13. MCP Servers Overview

- **File:** `@~/.claude/trike/references/mcps/overview.md`
- **Difficulty:** Intermediate
- **Dependencies:** Context management
- **Quiz mapping:** Q5 (MCPs knowledge)
- **Topics covered:** What MCPs are, how they work, value proposition

---

## 14. Installing & Configuring MCPs

- **File:** `@~/.claude/trike/references/mcps/installing-and-configuring.md`
- **Difficulty:** Intermediate-Advanced
- **Dependencies:** MCP Servers Overview
- **Quiz mapping:** Q5
- **Topics covered:** claude mcp add, config files, popular MCPs list

---

## 15. Hooks System

- **File:** `@~/.claude/trike/references/hooks/overview.md`
- **Difficulty:** Advanced
- **Dependencies:** Settings knowledge
- **Quiz mapping:** Q6 (advanced setup)
- **Topics covered:** ~/.claude/settings.json, hook types, use cases

---

## 16. Extended Thinking

- **File:** `@~/.claude/trike/references/advanced/extended-thinking.md`
- **Difficulty:** Intermediate-Advanced
- **Dependencies:** Basic prompting
- **Quiz mapping:** Q1, Q7 (experience + pain points)
- **Topics covered:** Tab key, think/ultrathink keywords, when to use

---

## 17. Subagents & Task Decomposition

- **File:** `@~/.claude/trike/references/advanced/subagents.md`
- **Difficulty:** Advanced
- **Dependencies:** Advanced commands (/agents)
- **Quiz mapping:** Q2 (advanced commands)
- **Topics covered:** /agents command, Task tool, parallel work, limitations
- **Related:** `@~/.claude/trike/references/slash-commands/agents.md`

---

## 18. Context Optimization Strategies

- **File:** `@~/.claude/trike/references/context-management/optimization-strategies.md`
- **Difficulty:** Advanced
- **Dependencies:** Context fundamentals, CLAUDE.md, .claudeignore
- **Quiz mapping:** Q3, Q6
- **Topics covered:** Token optimization, smart context selection, patterns

---

## 19. Workflow Automation

- **File:** `@~/.claude/trike/references/core/workflow-automation.md`
- **Difficulty:** Advanced
- **Dependencies:** Commands, skills, MCPs
- **Quiz mapping:** Q2, Q4, Q5, Q8 (commands + tools + goal)
- **Topics covered:** Chaining commands, custom workflows, productivity patterns

---

## 20. Debugging & Troubleshooting

- **File:** `@~/.claude/trike/references/core/debugging-troubleshooting.md`
- **Difficulty:** Intermediate-Advanced
- **Dependencies:** Basic tool knowledge
- **Quiz mapping:** Q7 (pain points)
- **Topics covered:** Common issues, quality improvement, systematic debugging

---

## 21. Project Onboarding Best Practices

- **File:** `@~/.claude/trike/references/core/project-onboarding.md`
- **Difficulty:** Advanced
- **Dependencies:** CLAUDE.md, .claudeignore, skills, MCPs
- **Quiz mapping:** Q3, Q4, Q5, Q6
- **Topics covered:** Complete setup checklist, templates, optimization

---

## Status Legend

- ✅ File created and path added
- ⬜ Planned but not created yet
- 🔧 In progress

---

## Notes for Curriculum Planner

**How to use this index:**

1. Read user's quiz answers (Q1-Q8)
2. For each topic in this index:
   - Check "Quiz mapping" to see if user needs this topic
   - Use quiz answer to determine depth (skip, brief, comprehensive)
   - Check "Dependencies" to ensure prerequisites are met
3. Build learning path by selecting + ordering relevant topics
4. Include "File" path for each milestone in learning-path.md
5. /trike:next will load the file at runtime for fresh context

**Adaptation examples:**

- Q2 = "I don't know slash commands" → Include topics 1, 5, 6, 7, 8, 9
- Q2 = "Advanced commands" → Skip 1, include only 9 (optimization)
- Q3 = "It reads all files automatically" → Deep dive on topics 2, 3, 4, 17
- Q4 = "I haven't heard of skills" → Include topics 10, 11
- Q5 = "No, what's that?" → Include topics 12, 13

**Path updates:**

As reference files are created, replace "⬜ *Not created yet*" with:
`@~/.claude/trike/references/[category]/[file].md`

