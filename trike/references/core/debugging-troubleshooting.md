# Debugging and Troubleshooting

## What It Is

Debugging and troubleshooting in Claude Code involves diagnosing problems with your code, Claude's responses, your project setup, or Claude Code itself. It means identifying why something isn't working and fixing it systematically.

Troubleshooting is the process of working through issues methodically to improve code quality, fix bugs, and resolve configuration problems.

## Why This Matters

**Save Hours:** Systematic debugging saves far more time than random attempts.

**Better Code:** Understanding what went wrong prevents the same issues in the future.

**Improved Responses:** Better context and clearer requests lead to better Claude suggestions.

**Faster Iteration:** Quick diagnosis means faster fixes and faster development.

**Confidence:** Understanding root causes beats trial-and-error approaches.

## Debugging Your Code

### Step 1: Identify the Problem

Be specific about what's broken:

**Bad:** "This code doesn't work"

**Good:** "This function throws 'TypeError: undefined is not iterable' when called with an empty array"

When asking Claude for debugging help:

```
You: "This code fails with: TypeError: Cannot read property 'name' of undefined
      It happens on line 42 when processing user data.
      Stack trace: [paste full stack]"

Claude: [Diagnoses the exact issue and suggests fixes]
```

### Step 2: Provide Context

Share:
- The error message (full stack trace)
- Which code is failing
- What you expected to happen
- What actually happened
- Any recent changes that triggered the issue

```
You: "I changed the user API response format yesterday.
      Now the ProfileCard component fails with:
      TypeError: Cannot read property 'firstName' of undefined

      Before the change it worked. Here's the component code: [paste]
      Here's the new API response: [paste]"
```

### Step 3: Isolate the Issue

Ask Claude to help narrow down the problem:

```
You: "Can you trace through this code and identify exactly where it fails?
      I think the issue is in the user data transformation."

Claude: [Analyzes the code, identifies the exact line and cause]
```

### Step 4: Verify the Fix

After Claude suggests a fix, test it:

```bash
# Run your test suite
npm test

# Or manually test the failing scenario
node script.js
```

Report results to Claude:

```
You: "Applied your fix and now tests pass. Thanks!"
```

## Common Debugging Patterns

### Pattern 1: Type Errors

**Problem:** `Cannot read property 'x' of undefined`

**Debugging approach:**
```
1. Identify where the value comes from
2. Add logging to check if value exists
3. Add null checks before accessing properties
4. Ask Claude to review the code path
```

**Example:**
```javascript
// Before
const name = user.profile.firstName  // Fails if user or profile is null

// After
const name = user?.profile?.firstName || 'Unknown'  // Safe
```

### Pattern 2: Logic Errors

**Problem:** Code runs but produces wrong results

**Debugging approach:**
```
1. Add console.log statements to trace values
2. Check input and output at each step
3. Compare expected vs actual behavior
4. Ask Claude to review the logic
```

**Example:**
```javascript
// Before
function sum(arr) {
  let total = 0;
  arr.forEach(num => total = num);  // Bug: overwrites instead of adding
  return total;
}

// After
function sum(arr) {
  let total = 0;
  arr.forEach(num => total += num);  // Fixed
  return total;
}
```

### Pattern 3: Performance Issues

**Problem:** Code works but runs slowly

**Debugging approach:**
```
1. Identify the slow part with timing
2. Check for inefficient loops or algorithms
3. Review for redundant API calls
4. Ask Claude for optimization suggestions
```

**Example:**
```javascript
// Slow: O(n²) nested loops
arr.forEach(item1 => {
  arr.forEach(item2 => {
    if (item1.id === item2.id) process(item1);
  });
});

// Fast: O(n) using Set
const ids = new Set(arr.map(i => i.id));
arr.forEach(item => {
  if (ids.has(item.id)) process(item);
});
```

### Pattern 4: Async/Promise Issues

**Problem:** Promises don't resolve, async code behaves unexpectedly

**Debugging approach:**
```
1. Check if you're awaiting async functions
2. Verify error handling (catch blocks)
3. Look for race conditions
4. Ask Claude to review async flow
```

**Example:**
```javascript
// Wrong: Doesn't wait for result
async function load() {
  const data = getUser(id);  // Missing await
  return data;
}

// Right: Properly awaits
async function load() {
  const data = await getUser(id);
  return data;
}
```

## Improving Claude's Responses

### Quality Issue 1: Claude's Response Is Too General

**Problem:** Claude gives generic advice instead of addressing your specific code.

**Solution:** Provide more context:

```
Bad: "How do I optimize this code?"
Good: "Here's my code that sorts 100,000 items.
       It currently takes 5 seconds.
       Can you suggest specific optimizations? Here's the code: [paste]"
```

### Quality Issue 2: Claude Misunderstands Your Goal

**Problem:** Claude solves the wrong problem.

**Solution:** Be explicit about your goal:

```
Bad: "I have this React component"
Good: "I have this React component.
       The goal is to fetch user data when it mounts and display it.
       Currently it's not showing the data. Here's the code: [paste]"
```

### Quality Issue 3: Claude's Suggestion Breaks Something

**Problem:** The fix Claude suggests causes other problems.

**Solution:** Ask Claude to consider side effects:

```
You: "Your fix works for the main issue, but it breaks integration tests.
      The tests expect the original API contract. How can we fix this
      without changing the API? Here's the test: [paste]"
```

### Quality Issue 4: Claude Needs to See More Code

**Problem:** Claude can't help because it's missing context.

**Solution:** Expand the context strategically:

```
You: "You mentioned checking the parent component.
      Here's the parent: [paste]
      And here's how it's called: [paste]"
```

## Troubleshooting Claude Code

### Issue 1: Claude Can't Read My Files

**Symptoms:** Claude says files don't exist or are unreadable.

**Causes:**
- Files are in .claudeignore
- Files don't exist
- Permission issues

**Solutions:**
```bash
# Check if files are excluded
claude context info

# Verify files exist
ls -la src/myfile.js

# Force Claude to read excluded files
# Put filename in your message with # prefix:
# src/large-data.csv - analyze this file
```

### Issue 2: Context Is Running Out

**Symptoms:** Claude says context is full, won't read more files.

**Causes:**
- Including too much code
- Dependencies in context
- Large non-source files

**Solutions:**
```bash
# Check context usage
claude context info

# See what's using space
claude context excluded

# Add exclusions to .claudeignore
echo "node_modules/" >> .claudeignore
echo "dist/" >> .claudeignore

# Run again
claude context info
```

### Issue 3: Claude's Analysis Is Shallow

**Symptoms:** Claude doesn't understand your architecture.

**Causes:**
- Not enough context about the project
- Missing key files
- Unclear code structure

**Solutions:**
```bash
# Create CLAUDE.md explaining your architecture
echo "# Project Overview
Your project structure and key concepts" > CLAUDE.md

# Reference key files in your prompts
You: "Here's our architecture [CLAUDE.md].
      Now, can you review this new component? [paste]"
```

### Issue 4: Claude Suggests Inappropriate Changes

**Symptoms:** Claude suggests refactors that would break things.

**Causes:**
- Missing context about constraints
- Unaware of legacy requirements
- Don't understand the full system

**Solutions:**
```
You: "Before suggesting changes, please understand:
     1. This code must be compatible with IE11
     2. We can't use modern CSS features
     3. The API response format is fixed

     Given these constraints, how would you optimize this? [paste]"
```

## Diagnosing Claude Code Issues

### Issue 1: Commands Not Working

**Problem:** Commands like `claude --help` don't work.

**Diagnosis:**
```bash
# Check if Claude CLI is installed
which claude

# Check version
claude --version

# Check installation
npm list -g @anthropic-ai/claude-cli
```

**Solutions:**
```bash
# Reinstall Claude Code
npm install -g @anthropic-ai/claude-cli

# Update to latest version
npm update -g @anthropic-ai/claude-cli
```

### Issue 2: Slow Response Times

**Problem:** Claude takes too long to respond.

**Diagnosis:**
```bash
# Check context size
claude context info

# Check network
ping api.anthropic.com

# Check system resources
top  # See if CPU/memory is maxed
```

**Solutions:**
- Reduce context with .claudeignore
- Check internet connection
- Close other applications
- Try again later (API may be busy)

### Issue 3: Mode Not Changing

**Problem:** Shift+Tab doesn't switch modes.

**Diagnosis:**
```bash
# Check current mode
claude mode current

# Check available modes
claude mode list
```

**Solutions:**
- Ensure you pressed Shift+Tab correctly
- Try `claude --mode acceptEdits` to set directly
- Check if mode was already in that state

### Issue 4: Memory Issues

**Problem:** Claude Code becomes unresponsive.

**Diagnosis:**
```bash
# Check memory usage
ps aux | grep claude

# Check system memory
free -h
```

**Solutions:**
- Close unused tabs/applications
- Reduce project size with .claudeignore
- Restart Claude Code
- Check for memory leaks in your code

## Troubleshooting Checklist

Use this checklist when something goes wrong:

### For Code Issues
- [ ] Understand the exact error message (not just "it's broken")
- [ ] Share the stack trace and error context
- [ ] Provide the relevant code snippet
- [ ] Explain what you expected vs what happened
- [ ] Check recent changes that might have caused it

### For Claude Response Issues
- [ ] Is Claude's response addressing your actual question?
- [ ] Does Claude have enough context about your project?
- [ ] Are you being specific about your goal?
- [ ] Have you explained constraints or requirements?
- [ ] Did you provide example code or error messages?

### For Claude Code Issues
- [ ] Is Claude Code installed correctly?
- [ ] Are you in the right directory?
- [ ] Does .claudeignore have the right patterns?
- [ ] Is your context within reasonable limits (20k-100k)?
- [ ] Is your internet connection stable?

## Getting Help

When stuck, provide this information:

```
1. What were you trying to do?
2. What's the exact error or problem?
3. What have you tried to fix it?
4. Relevant code or stack trace (paste directly)
5. Project type and tech stack
6. Claude Code version (claude --version)
```

**Example:**
```
I'm trying to add authentication to a React app.
When I login, the page doesn't show the protected content.
I've tried adding checks but it's not working.

Error:
TypeError: Cannot read property 'isLoggedIn' of undefined
(at line 42 of ProtectedRoute.jsx)

I've added console.log statements but the state isn't printing.
The state management uses Redux.

Project: React + Redux + Node.js API
Claude Code: 1.2.0
```

## Gotchas

**Gotcha 1: Error Messages Can Be Misleading**

The error location isn't always the real problem:

```javascript
// Error says "line 42: Cannot read property 'id' of undefined"
// But the actual problem is 10 lines earlier where id was set incorrectly
```

Always trace back to the source, not just the error line.

**Gotcha 2: It Might Be a Cache Problem**

Clear caches when behavior changes unexpectedly:

```bash
# Clear npm cache
npm cache clean --force

# Clear build cache
rm -rf dist/ build/ .next/
npm run build
```

**Gotcha 3: .claudeignore Changes Don't Always Take Effect Immediately**

After changing .claudeignore, context might need to refresh:

```bash
# Force refresh
claude context refresh

# Or just ask Claude to reload context
You: "Can you reload the project context?"
```

**Gotcha 4: Test Failures Aren't Always Code Issues**

Tests can fail for many reasons:

```
- Database not running
- API server down
- Missing environment variables
- Port conflicts
- Outdated test data
```

Run setup checks before debugging the code.

**Gotcha 5: Performance Issues Are Often Not Where You Think**

```javascript
// You think this loop is slow:
for (let i = 0; i < 1000; i++) {
  // Do something
}

// But actually it's the API calls inside:
for (let i = 0; i < 1000; i++) {
  await api.call();  // This is the real bottleneck!
}
```

Use profiling tools to find the actual issue.

## Summary

Effective debugging and troubleshooting:

1. **Be specific:** Exact error messages, not vague descriptions
2. **Provide context:** Relevant code, stack traces, and recent changes
3. **Isolate issues:** Narrow down to the exact problem
4. **Verify fixes:** Test solutions before declaring victory
5. **Ask Claude:** Provide all above info for best help

Common issues:
- Type errors: Add null checks
- Logic errors: Add logging and trace values
- Performance: Profile and optimize bottlenecks
- Async issues: Ensure proper await/catch

Debugging systematically is faster than random trial-and-error. Share error details with Claude and you'll get better help.

For more: Check project documentation or ask Claude with a detailed error report.
