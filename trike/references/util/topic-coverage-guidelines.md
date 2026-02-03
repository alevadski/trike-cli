# Topic Coverage Guidelines

This guide helps the curriculum planner decide what topics to cover for each persona and how deep to go.

## Core Principle

**Cover everything relevant, but adapt depth and focus to the persona.**
- Never-tried: Foundations first, power features later
- Basic-user: Skip foundations, dive into power features
- Intermediate: Skip basics entirely, focus on advanced and optimization

---

## Topic Matrix by Persona

### Foundation Topics

| Topic | Never-Tried | Basic-User | Intermediate |
|-------|-------------|------------|--------------|
| What is Claude Code | Deep (2-3 milestones) | Skip | Skip |
| Terminal basics | Deep (if needed) | Skip | Skip |
| Slash commands intro | Deep (full milestone) | Quick review (1 milestone) | Skip |
| Basic chat interaction | Deep | Skip | Skip |
| File operations | Deep | Mention | Skip |

### Core Claude Code Features

**References:**
- Slash commands: @~/.claude/trike/references/slash-commands/overview.md
- Context management: @~/.claude/trike/references/context-management/overview.md
- CLAUDE.md: @~/.claude/trike/references/context-management/claude-md.md
- .claudeignore: @~/.claude/trike/references/context-management/claudeignore.md

| Topic | Never-Tried | Basic-User | Intermediate |
|-------|-------------|------------|--------------|
| How to find things | Cover basics | Deep (ask naturally) | Advanced usage + optimization |
| Context management | Intro concepts | Deep dive (2-3 milestones) | Optimization patterns |
| CLAUDE.md | Template usage | Creation + patterns | Advanced patterns + optimization |
| .claudeignore | Basics | Strategy | Advanced patterns |
| File reading/editing | How it works | Best practices | Skip (they know) |

### Power Features

**References:**
- Skills: @~/.claude/trike/references/skills/overview.md
- MCPs: @~/.claude/trike/references/mcps/overview.md
- Hooks: @~/.claude/trike/references/hooks/overview.md

| Topic | Never-Tried | Basic-User | Intermediate |
|-------|-------------|------------|--------------|
| Skills system | Intro + install 1-2 | Deep (discover, install, use) | Custom skill creation |
| MCP servers | Intro concepts | Setup + common MCPs | Custom MCP development |
| Hooks | Mention only | Intro + simple examples | Advanced patterns |
| Plugins | Mention only | Discovery + installation | Development |

### Advanced Features

**References:**
- Checkpointing: @~/.claude/trike/references/advanced/checkpointing.md
- Extended thinking: @~/.claude/trike/references/advanced/extended-thinking.md
- Subagents: @~/.claude/trike/references/advanced/subagents.md

| Topic | Never-Tried | Basic-User | Intermediate |
|-------|-------------|------------|--------------|
| Checkpointing | Skip or brief mention | Intro + use cases | Advanced strategies |
| Extended thinking | Skip | When to use | Complex reasoning patterns |
| Subagents | Skip | Intro | Orchestration patterns |
| LSP integration | Skip | Mention | Deep dive |
| Multi-directory | Skip | Skip or mention | Deep dive |
| Permission modes | Skip | Mention | Security patterns |

### Meta-Tools & Ecosystem

| Topic | Never-Tried | Basic-User | Intermediate |
|-------|-------------|------------|--------------|
| GSD framework | Skip | Intro + key patterns | Deep dive + customization |
| Context7 | Skip | Setup + usage | Advanced usage |
| Repomix | Skip | Mention | Integration patterns |
| Community resources | Where to learn more | Active resources | Contributing back |

### Project Setup

| Topic | Never-Tried | Basic-User | Intermediate |
|-------|-------------|------------|--------------|
| Project analysis | Guided | Review together | Audit existing |
| CLAUDE.md creation | Template + customize | Generate + optimize | Advanced optimization |
| Skills installation | Install 1-2 recommended | Install all recommended | Strategic selection |
| MCP connection | Connect 1 (guided) | Connect 2-3 | Connect + configure all |
| .claudeignore setup | Basic template | Optimized patterns | Advanced strategies |

### Real Project Work

| Topic | Never-Tried | Basic-User | Intermediate |
|-------|-------------|------------|--------------|
| When to start | After foundations (milestone 8+) | Early (milestone 5-6) | Immediately (milestone 3-4) |
| Safety measures | Heavy (detailed guidance) | Moderate (reminders) | Light (assumed knowledge) |
| Feature complexity | Simple, guided | Medium, coached | Complex, self-directed |
| Coaching level | Heavy hand-holding | Moderate guidance | Minimal, peer review |

---

## Recommended Milestone Counts by Persona

### Never-Tried (12-15 milestones total)

**Phase 1: Foundations (3-4 milestones)**
- What is Claude Code and how it works
- First successful interaction
- Basic commands (/help, /clear, simple ones)
- Understanding responses

**Phase 2: Core Features (3-4 milestones)**
- Slash commands deep dive
- File operations
- Basic context understanding
- Simple workflows

**Phase 3: Power Features (3-4 milestones)**
- Skills intro + install 1-2
- MCPs intro + connect 1
- CLAUDE.md creation (template)
- .claudeignore basics

**Phase 4: Guided Real Project (2-3 milestones)**
- Project analysis review
- Simple feature implementation (heavy coaching)
- Verification and learning

**Phase 5: Next Steps (1 milestone)**
- What you've learned
- Where to go next
- Resources

**Total:** ~12-15 milestones, ~4-5 hours

### Basic-User (15-19 milestones total) - PRIMARY AUDIENCE

**Phase 1: What You're Missing (2 milestones)**
- Capability showcase (mind-blowing features)
- Mental model shift (chat bot → power tool)

**Phase 2: Core Power Features (3-4 milestones)**
- Slash commands mastery
- Context management deep dive (2 milestones if pain point is "forgets context")
- CLAUDE.md creation for their project
- .claudeignore optimization

**Phase 3: Ecosystem Discovery (4-5 milestones)**
- Skills system deep dive
- Skills installation + marketplace
- MCP servers intro
- MCP setup + common ones
- Hooks intro (if interested)

**Phase 4: Real Project Setup (3 milestones)**
- Project analysis review
- Complete optimization (CLAUDE.md, skills, MCPs, .claudeignore)
- Verification + testing

**Phase 5: Build Something Real (2 milestones)**
- Choose + plan feature
- Implement with moderate coaching

**Phase 6: Advanced Techniques (2-3 milestones)**
- Checkpointing + extended thinking
- Subagents intro
- LSP integration mention

**Phase 7: Meta-Tools (1-2 milestones)**
- GSD framework
- Context7, Repomix, community

**Total:** ~17-19 milestones, ~5 hours

### Intermediate (10-12 milestones total)

**Phase 1: Advanced Features Deep Dive (3-4 milestones)**
- Checkpointing strategies
- Extended thinking use cases
- Subagent orchestration
- LSP integration

**Phase 2: Ecosystem Mastery (2-3 milestones)**
- Custom skill creation
- MCP development intro
- Hook automation patterns
- Plugin development overview

**Phase 3: Real Project Optimization (3-4 milestones)**
- Audit existing setup
- Optimization opportunities
- Implement complex feature (minimal coaching)
- Performance analysis

**Phase 4: Meta-Tools & Frameworks (2 milestones)**
- GSD deep dive + customization
- Context7 mastery
- Community contribution

**Total:** ~10-12 milestones, ~3-4 hours

---

## Topic Depth Guidelines

### Foundation Level (Never-Tried)
**Goal:** Build confidence, understand basics

**Depth:**
- Start from zero knowledge
- Explain terminology
- Use analogies and metaphors
- Step-by-step instructions
- Frequent check-ins
- Celebrate small wins

**Example topic coverage - Slash Commands:**
1. What are slash commands (analogy: keyboard shortcuts)
2. Why they're useful (3 specific benefits)
3. How to use them (type / and press tab)
4. Try your first one (/help)
5. 5 most important commands
6. Practice asking me to find things
7. When to use commands vs chat

### Power User Level (Basic-User)
**Goal:** Unlock capabilities, close knowledge gaps

**Depth:**
- Skip basics, focus on gaps
- Show what they're missing
- Practical, immediately applicable
- "Aha moment" focused
- Efficient but thorough

**Example topic coverage - Slash Commands:**
1. Quick review: commands you probably know
2. Commands you're missing (power features)
3. Deep dive: /memory, context referencing with #, asking naturally to find things
4. Command workflows (combining commands with natural language)
5. Productivity patterns
6. Practice: solve real problem using commands and natural language

### Master Level (Intermediate)
**Goal:** Optimize, master, create

**Depth:**
- Skip all basics
- Focus on advanced patterns
- Optimization and tradeoffs
- Creating custom solutions
- Peer-level discussion

**Example topic coverage - Slash Commands:**
1. Advanced command patterns
2. Custom command creation
3. Combining commands with natural language queries
4. Performance optimization
5. When NOT to use commands
6. Build custom workflow for your needs

---

## Topic Selection Based on User Context

### Based on Goal (Quiz Q8)

**"Ship features faster"**
- Prioritize: Context management, skills, real project work
- Minimize: Theory, exploration
- Fast-track to productivity

**"Learn comprehensively"**
- Include: Everything relevant
- Deep dives on all topics
- Thorough coverage

**"Specific use case"**
- Focus: Features relevant to that use case
- Recommend: Specialized skills/MCPs
- Custom path for their need

**"Explore what's possible"**
- Showcase: Breadth over depth
- Try: Many features
- Discover: What exists

**"Get unstuck on workflow"**
- Start: Audit current setup
- Focus: Optimization and fixes
- Improve: Existing patterns

### Based on Pain Point (Quiz Q7)

**"Don't know where to start"**
- Extra: Clear structure, hand-holding
- Emphasis: Quick wins, confidence
- Start: Very basic, build up

**"Responses are generic/unhelpful"**
- Extra: 2-3 milestones on context management
- Emphasis: CLAUDE.md, project setup
- Show: Before/after examples

**"Forgets context too quickly"**
- Extra: Context optimization deep dive
- Emphasis: Persistent context strategies
- Tools: /memory, CLAUDE.md, .claudeignore

**"Don't know what features exist"**
- Extra: Feature discovery showcase
- Emphasis: Skills, MCPs, commands
- Structure: Try everything

**"Inconsistent quality"**
- Extra: Prompting patterns, setup
- Emphasis: Optimization, verification
- Tools: Proper workflows

---

## Quality Criteria for Topic Coverage

Good topic coverage means:
- [ ] Appropriate for persona level
- [ ] Addresses user's specific goal
- [ ] Solves their stated pain point
- [ ] Builds on previous milestones
- [ ] Leads to project setup and real work
- [ ] Covers features they'll actually use
- [ ] Skips irrelevant advanced topics (for beginners)
- [ ] Skips basic topics (for advanced users)
- [ ] Total milestone count is reasonable
- [ ] Estimated time aligns with goal (never stated to user!)

---

## Anti-Patterns to Avoid

**Don't:**
- ❌ Cover everything for everyone (too much)
- ❌ Use same curriculum for all personas
- ❌ Teach advanced features to never-tried users too early
- ❌ Bore intermediate users with basics
- ❌ Skip real project work
- ❌ Make every path the same length
- ❌ Ignore user's stated goal
- ❌ Forget their pain point
- ❌ Teach features they won't use
- ❌ Create milestones longer than 20 minutes

**Do:**
- ✅ Adapt depth to persona
- ✅ Focus on what helps THEM
- ✅ Build progressively
- ✅ Get to real work quickly (for basic-user and intermediate)
- ✅ Build confidence first (for never-tried)
- ✅ Address pain points throughout
- ✅ Make every milestone valuable
- ✅ Connect to their specific project
- ✅ End with fully optimized setup + feature shipped

