# /review Command

## What It Is

`/review` shows you exactly what changed in your files before you commit. It displays the diff of all modifications Claude has made or suggested, so you can verify everything looks right before `/commit`.

## Why It Matters

Code changes happen fast with Claude. After asking "Refactor this component", you get 50 lines changed across 3 files. Without reviewing:
- You might commit broken code
- You might miss a mistake Claude made
- You might commit things you didn't intend
- You have no chance to say "wait, I changed my mind"

With `/review`:
- You see exactly what changed
- You can spot mistakes before they hit git
- You can ask Claude to fix issues
- You have final approval before committing

Real-world impact: Catches 80% of issues before they become git history.

## How to Use

### Review All Changes

```
/review
```

Shows a comprehensive diff:

```
Files changed: 3

src/components/Button.tsx
─────────────────────────────
- const Button = (props) => {
+ const Button: React.FC<ButtonProps> = (props) => {

  return (
    <button
-     className={`btn ${props.className}`}
+     className={cn('btn', props.className)}
    >
      {props.children}
    </button>
  )
}

src/components/__tests__/Button.test.tsx
─────────────────────────────
+ import { render, screen } from '@testing-library/react';
+ import { Button } from '../Button';
+
+ describe('Button', () => {
+   it('renders with className', () => {
+     render(<Button className="custom">Click me</Button>);
+     expect(screen.getByText('Click me')).toHaveClass('custom');
+   });
+ });

src/styles/globals.css
─────────────────────────────
- .btn { padding: 8px; }
+ .btn { padding: 8px; border-radius: 4px; }
```

### Review with Summary Only

```
/review --summary
```

Just shows what files changed, not the full diff:

```
Files changed: 3
- src/components/Button.tsx (modified)
- src/components/__tests__/Button.test.tsx (new)
- src/styles/globals.css (modified)
```

Use when diffs are huge and you just want an overview.

### Review Specific Files

```
/review src/components/Button.tsx
/review src/components/
```

Just show changes to specific files.

## Practical Workflows

### Workflow 1: Change, Review, Commit

```
Me: Refactor the Button component to use TypeScript

Claude: [Makes changes to Button.tsx]

Me: /review
(See the changes)

Me: Looks good!
Claude: Ready to commit?

Me: Commit my changes with message: "Refactor Button with TypeScript"
```

Simple flow: change → review → commit

### Workflow 2: Review, Ask for Fixes, Then Commit

```
Me: Add dark mode support to the dashboard

Claude: [Makes changes across 5 files]

Me: /review
(Examine changes)

Me: This looks mostly good, but the dark mode toggle needs to be in the header, not the sidebar

Claude: [Adjusts the changes]

Me: /review
(Confirm the fix)

Me: Perfect! Commit my changes with message: "Add dark mode support to dashboard"
```

Iterate until satisfied.

### Workflow 3: Review and Reject, Ask for Different Approach

```
Me: Refactor the auth flow to use hooks

Claude: [Makes changes]

Me: /review
(See the approach)

Me: I don't like this approach. Can you instead extract the auth logic to a custom hook called useAuth()?

Claude: [Rewrites with useAuth hook]

Me: /review
(Looks better)

Me: Commit my changes with message: "Refactor auth to use custom useAuth hook"
```

You get to decide on approach before committing.

### Workflow 4: Batch Review After Multiple Changes

```
Me: Implement the user profile feature

Claude: [Works for 20 messages, making lots of changes]

Me: /review
(See all changes together)

Me: Hmm, wait. Can you adjust the email field validation?

Claude: [Fixes validation]

Me: /review
(Confirm fix)

Me: Commit my changes with message: "Implement user profile feature"
```

Review once at the end, or review multiple times during work.

## Strategic Review Patterns

### Pattern 1: Review After Each Major Change

```
For each distinct piece of work:

Claude: [Implements feature A]
/review
(Approve or request changes)

Claude: [Implements feature B]
/review
(Approve or request changes)

Ask me to commit with message: "Implement features A and B"
```

Frequent reviews catch issues early.

### Pattern 2: Review Before Writing Tests

```
Claude: [Implements the feature]
Me: /review
(Check the implementation)
Me: Implementation looks good. Now add comprehensive tests

Claude: [Adds tests]
Me: /review
(Verify tests)
Me: Commit my changes with message: "Implement feature with tests"
```

Separate concerns: feature first, then tests.

### Pattern 3: Comprehensive Final Review

```
Work for 30 messages building a complex feature...
At the end:

Me: /review
(See ALL changes across entire feature)

Me: This is comprehensive. Spot-check everything once...
(Review the full context)

Me: Looks good! Commit my changes with message: "Complete complex feature"
```

One final review before committing.

## What to Look For in /review

**Good signs ✅**
- Changes are focused (doing what you asked)
- Code style matches your project
- Tests are included
- No obvious bugs
- Commit-worthy quality

**Bad signs ❌**
- Massive changes you didn't ask for
- Code that contradicts your `/memory` facts
- Missing error handling
- Tests missing or incomplete
- Code that looks hacky or incomplete

**Questions to ask yourself:**
1. "Does this do what I asked?"
2. "Does this match my project's style?"
3. "Are there edge cases I'm worried about?"
4. "Is the code testable?"
5. "Would I accept this in a code review?"

If any answer is "no" or "I'm not sure", ask Claude to adjust before committing.

## Combining /review with Other Commands

### /review + /rewind

```
/review
(See changes, decide you don't like them)

/rewind
(Jump back to checkpoint)

Claude is reset to before those changes
(You can ask for a different approach)
```

### /review + /memory

Before reviewing, set expectations:

```
/memory Code style: keep lines under 80 chars, use 2-space indent
/memory Error handling: always wrap promises in try/catch

Claude: [Makes changes]

/review
(Verify they match /memory expectations)
```

### /review + /commit

```
/review
(Everything looks good)

/commit "Implement feature X"
(Commit all reviewed changes)
```

Standard flow: review then commit.

### /review + /agents

After parallel agents complete:

```
/agents collect
(All agents finish)

/review
(See all changes from all agents at once)

(Decide if you want to accept, reject, or modify)

/commit "Complete multi-agent refactoring"
```

Review agent work in aggregate.

## Advanced Review Techniques

### Technique 1: Review for Security Issues

When reviewing auth, API, or sensitive code:

```
/review

Look for:
- Are secrets being hardcoded? ❌
- Are inputs validated? ✅
- Are permissions checked? ✅
- Is rate limiting in place? (check)
```

### Technique 2: Review for Performance

When reviewing database, rendering, or compute-heavy code:

```
/review

Look for:
- N+1 queries? ❌
- Re-renders on every keystroke? ❌
- Unnecessary object allocations? ❌
- Memoization where needed? ✅
```

### Technique 3: Review for Test Coverage

When reviewing with new tests:

```
/review

Look for:
- Happy path tests? ✅
- Edge case tests? ✅
- Error handling tests? ✅
- Integration tests? (for this feature)
```

## Best Practices

**Do:**
- Always `/review` before `/commit`
- Look at diffs, not just file names
- Review after each major change (not just at the end)
- Reject changes and ask for adjustments if unsure
- Trust your code review instincts

**Don't:**
- Skip `/review` to save time (you'll regret it)
- Commit changes you don't fully understand
- Be afraid to ask for changes after reviewing
- Assume `Claude knows best` without checking
- Ignore parts of the diff that look suspicious

## Practice Exercise (10-15 minutes)

### Goal
Practice reviewing code changes and catching issues before commit.

### Setup
Start Claude Code in your project. Have something to work on: a feature, refactor, or new code.

### Steps

1. **Ask Claude to make changes:**
   ```
   Implement a specific feature or make a refactor
   ```

2. **Claude makes changes** (5+ files ideally)

3. **Run /review:**
   ```
   /review
   ```

4. **Examine the changes carefully:**
   - Does it do what you asked?
   - Does the code style match your project?
   - Do you see any issues?
   - Are tests included?

5. **Try these scenarios:**

   **Scenario A:** Changes look good
   ```
   Me: This looks great!
   Ask me to commit with message: "Describe your changes"
   ```

   **Scenario B:** You see an issue
   ```
   Me: I notice [specific issue]. Can you fix this?
   Claude: Fixes it
   /review
   (Confirm the fix)
   Ask me to commit with a message
   ```

   **Scenario C:** You don't like the approach
   ```
   Me: The overall approach isn't what I wanted. Can you try [different approach]?
   Claude: Different implementation
   /review
   Ask me to commit with a message
   ```

### Success Criteria
- You've run `/review` successfully
- You understand what the diffs mean
- You've either approved changes or asked for adjustments
- You've committed with confidence

## Gotchas

**Gotcha 1: /review shows changes, not just code**
`/review` shows a diff. If you've never used diff before, learn to read unified diff format:
- Lines starting with `-` are removed
- Lines starting with `+` are added
- Context lines without prefix are unchanged

**Gotcha 2: /review doesn't include your manual edits**
If you edited files outside Claude Code while talking to Claude, `/review` might not show those changes. Review only shows what Claude changed in the conversation.

**Gotcha 3: Large reviews can be overwhelming**
If you've worked for 50 messages changing 20+ files, `/review` output is huge. Use `--summary` flag or review specific files:
```
/review --summary
/review src/components/
```

**Gotcha 4: You can't "undo" a review**
Reviewing doesn't commit. If you review, reject changes, and ask for new ones, the old ones are still visible in history but Claude knows to use the new approach going forward.

**Gotcha 5: Review doesn't catch every error**
`/review` shows you diffs. It doesn't run tests, check syntax, or verify logic. You still need to:
- Think carefully about the changes
- Test the code
- Run your test suite
- Consider edge cases

**Gotcha 6: Committing after /review doesn't mean the code is good**
`/review` is your last human check before git. It doesn't mean the code is production-ready. After committing:
- Run your full test suite
- Do a real code review (if with a team)
- Test in staging/development
- Then deploy

Use `/review` as your final human verification, not as a guarantee of quality.
