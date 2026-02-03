# Checkpointing & Time Travel in Claude Code

Checkpointing allows you to save the state of your conversation at key points and rewind to earlier states if needed. This is essential for exploratory work and safe experimentation.

## Core Concept

Checkpoints are automatically created at key moments in your conversation. You can explicitly rewind to any previous checkpoint using the `/rewind` command.

### What Gets Saved?
- Conversation history
- All previous messages and responses
- Code context and state
- Tool results and outputs
- Your question history

### What Doesn't Travel Back?
- Downloaded files (but file references are preserved)
- External system state (databases, servers)
- Executed commands (you need to re-execute if needed)

## The `/rewind` Command

### Basic Usage
```
/rewind
```

This displays a list of available checkpoints with:
- Checkpoint timestamp
- A summary of the conversation state
- Option to select which checkpoint to rewind to

### Selecting a Checkpoint
```
/rewind
[Shows list of checkpoints]
User selects checkpoint from list
Result: Conversation state restores to that point
```

## How Checkpointing Works

1. **Automatic Checkpoints:** Created at significant conversation milestones
2. **Viewing Checkpoints:** Use `/rewind` to see available states
3. **Reverting:** Select a checkpoint to restore conversation to that state
4. **Continuing:** After rewind, you can ask new questions from the restored state

## Use Cases

### 1. Experimental Development
```
Scenario: You're trying a new feature approach

1. Build feature with approach A (implicit checkpoint)
2. Ask Claude to refactor with approach B
3. Approach B doesn't work well
4. Use /rewind to go back to approach A
5. Try approach C instead
```

### 2. Debugging Failed Implementations
```
Scenario: You followed advice that led to breaking changes

1. Implement solution suggested by Claude
2. Realize it breaks existing code
3. Use /rewind to undo that conversation
4. Ask for a different approach
5. Avoid the broken path entirely
```

### 3. Exploring Alternative Solutions
```
Scenario: Multiple valid solutions exist

1. Implement solution 1 (checkpoint)
2. Code generation and testing happens
3. Want to see solution 2
4. Use /rewind to conversation before solution 1
5. Ask for solution 2 instead
6. Compare both solutions
```

### 4. Safe Refactoring
```
Scenario: Large refactoring with uncertainty

1. Start refactoring task
2. Get partway through
3. Realize refactoring direction is wrong
4. Use /rewind to before refactoring started
5. Try different refactoring approach
```

### 5. Branch and Merge Pattern
```
Scenario: You want to explore two paths

1. Reach a decision point (checkpoint)
2. Ask Claude "Try approach A" (path 1)
3. Get results for approach A
4. Use /rewind to decision point
5. Ask "Try approach B" (path 2)
6. Get results for approach B
7. Choose the better one
```

## Practical Examples

### Example 1: Safe Architecture Experimentation

```
User: "Let's build a data pipeline"
Claude: [Generates initial architecture with MongoDB]
User: [Decides to test with PostgreSQL instead]

At this point, you have an implicit checkpoint.
You could continue modifying, or:

User: /rewind
[See list: "Before MongoDB schema", "After validation code added"]
User: [Select "Before MongoDB schema"]
Claude: "Rewound. What would you like to do?"
User: "Let's design this with PostgreSQL instead"
Claude: [New implementation with PostgreSQL]
```

### Example 2: Debugging a Wrong Turn

```
User: "Add caching to the API"
Claude: [Implements Redis caching]
User: [Tests implementation]
Claude: "Here's the integration code..."
User: [Realizes Redis added too much complexity]

User: /rewind
[Shows checkpoints: "After caching discussion", "Before caching code"]
User: [Selects "Before caching code"]
Claude: "Ready to continue from before caching discussion"
User: "Let's use simple in-memory caching instead"
Claude: [Simpler solution without Redis]
```

### Example 3: Algorithm Optimization Branch

```
User: "Help me optimize this sorting algorithm"
Claude: [Provides O(n log n) solution - checkpoint created]
User: "Can you also show me an O(n) solution with hashing?"
Claude: [Provides different approach]
User: "These are very different. Let me see them side by side"

User: /rewind
[Select checkpoint from before O(n log n) solution]
Claude: "Back to start of sorting discussion"
User: "Show me both approaches"
Claude: [Presents O(n log n) and O(n) approaches side by side]
```

## Workflow Patterns

### The Branch Pattern
```
1. Work on main task
2. Reach a decision point (implicit checkpoint)
3. Explore Branch A (experiment)
4. Rewind to decision point
5. Explore Branch B (experiment)
6. Compare and choose winner
```

### The Recovery Pattern
```
1. Get Claude's suggested approach
2. Implement and test
3. Realize it's not working
4. /rewind to before implementation
5. Get new approach
6. Test new approach
```

### The Validation Pattern
```
1. Get solution for problem
2. Implement and verify it works
3. Decide you want to see alternatives
4. /rewind to before first solution
5. Ask for different approaches
6. Test each one
```

## Important Constraints

- **Not Project-Wide:** Checkpoints are conversation-specific, not saved to disk
- **No Nesting:** You cannot checkpoint within a checkpoint exploration
- **No Auto-Recovery:** Checkpoints are for intentional rewinds, not crashes
- **Conversation Scope:** Rewinding changes your conversation path, not your actual files

## When to Create Checkpoints

While checkpoints are automatic, consider these milestones:
- Before major design decisions
- Before attempting experimental approaches
- Before refactoring large sections
- Before implementing potentially breaking changes
- Before making framework/library choices

You can create implicit checkpoints by:
1. Reaching a stopping point in conversation
2. Asking Claude to summarize the current state
3. Asking a clarifying question that pauses momentum

## Tips for Effective Checkpointing

1. **Keep Conversations Focused:** Fewer, clearer topics = better checkpoints
2. **Use Descriptive Questions:** Helps identify checkpoints by their purpose
3. **Don't Over-Experiment:** Balance exploration with progress
4. **Label Decision Points:** Ask questions that mark important decisions
5. **Document Your Path:** Mention what you're exploring and why

### Good Checkpoint Conversation Flow
```
"Let's build feature X"
[Work happens - checkpoint created]
"Before we continue, let's try approach A instead of approach B"
[Conversation pauses - checkpoint created]
/rewind
[Choose earlier checkpoint]
"Let's try approach B as originally discussed"
```

### Poor Checkpoint Conversation Flow
```
"Do this... no try that... actually do something else... wait try the first thing again"
[Too many rapid changes with implicit checkpoints]
[Hard to know which checkpoint represents what state]
```

## Advanced Patterns

### Scientific Comparison Pattern
```
1. Ask Claude for solution approach 1
2. Let them show it (checkpoint)
3. /rewind to before approach 1
4. Ask for approach 2
5. Compare results side by side
6. Keep the better approach
```

### Risk Mitigation Pattern
```
1. Before major refactoring, note current state
2. Ask Claude to describe the refactoring plan
3. Execute refactoring
4. Test thoroughly
5. If issues arise, /rewind to before refactoring
6. Either fix from there or apply differently
```

### Learning Pattern
```
1. Ask for solution with approach A
2. Understand and implement (checkpoint)
3. /rewind
4. Ask for solution with approach B
5. Compare learning value of each approach
6. Choose approach with better pedagogical value
```

## Exercises

### Exercise 1: Basic Rewind
**Task:** Practice the rewind workflow
```
1. Start a conversation about building a feature
2. Get Claude's approach (checkpoint created)
3. Ask Claude to try a different approach
4. Use /rewind to go back
5. Ask for yet another approach
6. Note how checkpointing enables exploration
```

### Exercise 2: Branch Comparison
**Task:** Compare two solutions using rewind
```
1. Ask Claude to implement solution A
2. Get full implementation (checkpoint)
3. /rewind to before solution A
4. Ask for solution B
5. Compare the two approaches
6. Identify trade-offs each had
```

### Exercise 3: Recovery Workflow
**Task:** Use rewind to recover from a bad decision
```
1. Ask Claude for an architecture pattern
2. Start implementing it (checkpoint)
3. Ask Claude to continue implementation
4. Realize the architecture doesn't fit your needs
5. Use /rewind to before the pattern implementation
6. Ask for a different pattern
7. Compare the recovery time vs. continuing with bad approach
```

### Exercise 4: Multi-Branch Exploration
**Task:** Explore three different solutions
```
1. Start problem description
2. Ask for solution A (checkpoint)
3. Ask Claude to continue with A
4. /rewind to before A
5. Ask for solution B (checkpoint)
6. Ask Claude to continue with B
7. /rewind to before A
8. Ask for solution C
9. Compare all three solutions
```

## Common Patterns

### Testing Hypotheses
```
User: "Will this code handle 10K concurrent users?"
Claude: [Analyzes and suggests approach]
User: [Wants to test different concurrency model]
User: /rewind
Claude: [Ready to discuss alternative]
```

### Exploring Frameworks
```
User: "Let's build with Framework A"
Claude: [Provides architecture with Framework A]
User: "Actually, I want to see Framework B"
User: /rewind
Claude: [Provides architecture with Framework B]
User: "Which is better for my use case?"
Claude: [Compares after seeing both]
```

## What Rewind Doesn't Do

- **Doesn't undo your files:** Use version control for your actual code
- **Doesn't undo real execution:** Only conversation history reverts
- **Doesn't preserve external state:** Databases, APIs, deployed services continue
- **Doesn't create branches:** You're selecting a linear path through conversation history

## Summary

Checkpointing enables safe experimentation through automatic conversation state saving. Use `/rewind` to restore to previous states, supporting branch exploration, recovery from wrong turns, and comparison of multiple approaches. This is essential for exploratory development and making informed architectural decisions.

---

**Next:** Learn about parallel work with subagents in `subagents.md`, or review `extended-thinking.md` for complementary reasoning techniques.
