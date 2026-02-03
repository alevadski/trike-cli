# Extended Thinking in Claude Code

Extended thinking enables Claude to reason deeply about complex problems before responding. This is particularly useful for debugging, architecture decisions, and solving difficult problems.

## Activation Methods

### Method 1: Tab Key (Recommended)
Press **Tab** during input to activate extended thinking before sending your message. This is the primary way to enable deep reasoning.

```
Your prompt: [type your question]
Press: Tab
Result: Extended thinking enabled for this turn
```

### Method 2: Natural Language
Mention thinking-related keywords naturally in your request:
- "Think about this problem..."
- "Let me think through this step by step"
- "Consider the implications of..."
- "Work through the logic here..."

Claude will recognize the need for deeper reasoning and activate extended thinking automatically.

### What NOT to Use
- ~~`/think` command~~ (This command does not exist)
- ~~`@thinking` tag~~ (Not supported)
- ~~Explicit thinking blocks~~ (Not needed)

## How Extended Thinking Works

1. **Activation:** You trigger it via Tab key or natural language
2. **Reasoning Phase:** Claude thinks through the problem systematically
3. **Response Phase:** Claude provides a structured answer based on the reasoning
4. **Output:** You see both the thinking process and the final answer

## Use Cases

### 1. Debugging Complex Issues
```
Prompt: [Describe the bug] [Press Tab]
Claude thinks: Traces through code logic, identifies edge cases,
              considers error sources
Response: Pinpoints the root cause and suggests fixes
```

### 2. Architecture Decisions
```
Prompt: [Present design options] [Press Tab]
Claude thinks: Weighs trade-offs, considers scalability,
              evaluates complexity
Response: Recommends best approach with detailed reasoning
```

### 3. Problem-Solving
```
Prompt: [Describe the problem] [Press Tab]
Claude thinks: Breaks down the problem, explores approaches,
              evaluates solutions
Response: Provides comprehensive solution with reasoning
```

### 4. Code Review
```
Prompt: [Paste code for review] [Press Tab]
Claude thinks: Analyzes patterns, checks correctness,
              considers best practices
Response: Detailed review with specific improvements
```

## Practical Examples

### Example 1: Debugging a Race Condition

**Without Extended Thinking:**
```
User: "Why is my async code hanging sometimes?"
Claude: "Could be a race condition. Check your Promise handling."
```

**With Extended Thinking (Press Tab):**
```
User: "Why is my async code hanging sometimes?" [Tab pressed]
Claude's thinking:
  - Considers async/await behavior
  - Traces execution order
  - Evaluates error handling
  - Checks Promise chaining
  - Identifies missing timeout
Claude's response: "The issue is a missing timeout in your Promise.all().
When one promise never resolves, the whole chain hangs. Here's the fix..."
```

### Example 2: Evaluating Architecture Patterns

**Scenario:** Choosing between two database patterns

```
User: "Should I use event sourcing or CQRS for my application?" [Tab pressed]
Claude's thinking:
  - Analyzes event sourcing benefits (audit trail, event replay)
  - Considers CQRS advantages (separation, scaling reads/writes)
  - Evaluates your use case requirements
  - Weighs implementation complexity
  - Projects maintenance implications

Claude's response: "For your use case with 10K users and financial data,
CQRS is better because... Event sourcing would add unnecessary complexity
because... Here's how to implement CQRS..."
```

### Example 3: Solving an Algorithm Problem

```
User: "How would you implement efficient graph traversal for a million nodes?" [Tab]
Claude's thinking:
  - Considers BFS vs DFS trade-offs
  - Evaluates memory requirements
  - Analyzes time complexity
  - Checks for cycle detection needs
  - Considers optimization techniques

Claude's response: "Use iterative DFS with a stack to minimize memory...
For a million nodes, you need lazy loading... Here's the implementation..."
```

## When to Use Extended Thinking

### Use It When:
- Debugging complex issues with multiple moving parts
- Making architectural decisions with long-term impact
- Solving algorithmic problems
- Analyzing code for security or performance issues
- Working through ambiguous requirements
- Explaining how complex systems work

### Skip It When:
- Simple, straightforward questions
- Asking for syntax or basic API documentation
- Small code changes or refactoring
- Procedural tasks with clear steps
- Time is critical and you need quick answers

## Extended Thinking + Other Features

### With Subagents
Extended thinking can be used within subagent tasks:
```
/agents
Agent 1: [complex task] [Tab]
Agent 2: [simpler task]
```

### With Context Management
Extended thinking respects context limits:
- Works with both limited and full context
- May use context more effectively with deep reasoning
- Large thinking processes might use more tokens

### With Skills
Extended thinking can inform skill creation:
```
Create a skill that does X [Tab]
Claude thinks through the requirements carefully,
then generates a more robust skill
```

## Performance Considerations

- Extended thinking uses more tokens than regular reasoning
- Response time increases (more computation)
- Results are typically higher quality
- Use selectively for high-impact decisions

## Tips for Best Results

1. **Be Specific:** Provide detailed context for better thinking
   ```
   Good: "Debug this race condition in Node.js async code..."
   Less effective: "Why doesn't my code work?"
   ```

2. **Ask Follow-ups:** Use thinking for initial analysis, then ask specifics
   ```
   1. Press Tab: "What are the main issues here?"
   2. Without Tab: "How do I fix issue #2?"
   ```

3. **Combine Methods:** Use Tab for complex parts, natural language for straightforward ones
   ```
   "Here's my code [Tab] - focus on the async handling"
   ```

4. **Review the Reasoning:** Look at Claude's thinking to understand the approach
   ```
   This helps you learn the reasoning process
   ```

## Common Mistakes

- Using extended thinking for every question (wastes tokens)
- Not providing enough context for effective thinking
- Forgetting that Tab key is the primary activation method
- Expecting extended thinking to guarantee bug-free code (it's assistance, not verification)

## Exercises

### Exercise 1: Debug with Thinking
**Task:** Use Tab to help debug a provided code snippet
```
1. Write a function with a subtle bug
2. Ask Claude to debug it [Press Tab before asking]
3. Review Claude's reasoning
4. Identify what extended thinking revealed
```

### Exercise 2: Architecture Decision
**Task:** Use Tab to evaluate design patterns
```
1. Present two architectural approaches
2. Ask for comparison [Press Tab]
3. Review the reasoning
4. Identify trade-offs Claude found
```

### Exercise 3: Algorithm Optimization
**Task:** Use Tab to solve an efficiency problem
```
1. Present a working but slow algorithm
2. Ask for optimization [Press Tab]
3. Compare thinking with non-thinking response
4. Measure the difference in solution quality
```

### Exercise 4: Code Review
**Task:** Use Tab for detailed code review
```
1. Share production code (sanitized)
2. Request thorough review [Press Tab]
3. Implement top 3 recommendations
4. Note what thinking revealed vs normal review
```

## Advanced Patterns

### Deep Dive Pattern
```
User: [Complex problem] [Tab]
Claude: [Detailed analysis with reasoning]
User: [Follow-up: "Go deeper on point 3"]
Claude: [Focused deep analysis without needing Tab again]
```

### Decision Framework Pattern
```
User: [Present multiple options] [Tab]
Claude: [Compares all options systematically]
User: [Follow-ups on specific comparisons]
Claude: [Detailed evaluations]
```

### Root Cause Pattern
```
User: [Describe symptom] [Tab]
Claude: [Traces back to root causes]
User: [Questions about each root cause]
Claude: [Detailed explanations]
```

## Summary

Extended thinking is activated via Tab key or natural language mentions of thinking. It enables deeper reasoning for complex problems without requiring special commands. Use it strategically for high-impact decisions and complex analysis, and pair it with follow-up questions for best results.

---

**Next:** Try the exercises above to practice extended thinking, then explore `checkpointing.md` or `subagents.md`.
