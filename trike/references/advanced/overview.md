# Advanced Claude Code Features

This section covers advanced features in Claude Code (CC) that enable sophisticated workflows, detailed reasoning, and parallel task execution.

## Core Advanced Features

### 1. **Extended Thinking**
Deep reasoning capability for complex problems. Activate using the Tab key during input or through natural language prompts. Claude will think through the problem step-by-step before responding.

**When to use:** Problem-solving, debugging, complex analysis, architectural decisions
**Activation method:** Tab key or mention "think" naturally in your request

See detailed guide: `extended-thinking.md`

### 2. **Checkpointing & Time Travel**
Save and rewind to previous conversation states using the `/rewind` command. Useful for experimenting with different approaches without losing progress.

**When to use:** Exploring alternative solutions, backing out of mistakes, branching workflows
**Command:** `/rewind` (lists available checkpoints)

See detailed guide: `checkpointing.md`

### 3. **Subagents & Parallel Work**
Execute multiple independent tasks in parallel using the `/agents` command and Task tool. Subagents can work on different aspects of your project simultaneously.

**When to use:** Parallel code generation, independent component development, simultaneous testing
**Command:** `/agents` (creates or lists agents)

See detailed guide: `subagents.md`

## Quick Reference Table

| Feature | Command/Key | Use Case | Nesting? |
|---------|------------|----------|----------|
| Extended Thinking | Tab key or natural language | Deep reasoning | Yes* |
| Checkpointing | `/rewind` | Backup & recovery | No |
| Subagents | `/agents` | Parallel tasks | No |

*Extended thinking can be used within subagent work

## Workflow Patterns

### Complex Analysis Pattern
```
1. Use Tab key to enable extended thinking
2. Ask a complex question
3. Claude reasons through the problem
4. Review the detailed analysis
5. Ask follow-up questions as needed
```

### Exploratory Development Pattern
```
1. Start development work
2. Reach a milestone (implicit checkpoint)
3. Try experimental approach
4. If unsuccessful, use /rewind to return
5. Try alternative approach
6. Keep the better version
```

### Parallel Development Pattern
```
1. Create multiple subagents with /agents
2. Assign independent tasks to each
3. Each subagent works in parallel
4. Merge results when complete
5. Continue in main conversation
```

## Best Practices

- **Extended Thinking:** Use for critical decisions and complex problems; skip for straightforward tasks
- **Checkpointing:** Checkpoint before major changes or experiments
- **Subagents:** Use for truly independent tasks; avoid premature parallelization

## Important Constraints

- Subagents cannot be nested (no agents within agents)
- Checkpoints are conversation-specific (not project-wide)
- Extended thinking increases token usage; use purposefully
- Subagents cannot directly share state; use main conversation for results

## Getting Started

Choose a feature based on your needs:
- Need to think deeply? Start with `extended-thinking.md`
- Want to experiment safely? Start with `checkpointing.md`
- Need parallel work? Start with `subagents.md`

## Related Files in This Directory

For detailed information about specific advanced features, load these reference files:

- `@~/.claude/trike/references/advanced/extended-thinking.md` - Deep reasoning with Tab key and thinking prompts
- `@~/.claude/trike/references/advanced/checkpointing.md` - Save and rewind conversation states with /rewind
- `@~/.claude/trike/references/advanced/subagents.md` - Parallel task execution with /agents and Task tool

---

**Next Steps:** Read the specific guide for the feature you need, then try the practical exercises to solidify your understanding.
