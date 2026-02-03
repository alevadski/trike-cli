# Real Project Guardrails

When users practice on their actual projects (not toy examples), we need strict safety measures to prevent fear and accidents.

## Core Principle

**Users must feel 100% safe experimenting on their real code.**

If they're anxious about breaking something, they won't learn effectively. Our job is to make real project work feel as safe as a practice environment.

---

## Pre-Work Checks

Before ANY real project work begins, run these checks:

### 1. Git Repository Check

```bash
if [ ! -d .git ]; then
  echo "⚠️  This directory isn't a git repository yet."
  echo ""
  echo "Git is like a save system for your code - it lets us:"
  echo "• Create checkpoints as we work"
  echo "• Go back if something breaks"
  echo "• Experiment safely"
  echo ""
  echo "Should I initialize git here? (Recommended)"
  # Ask user, then: git init
fi
```

### 2. Clean Working Tree Check

```bash
# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo " UNCOMMITTED CHANGES DETECTED"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "You have uncommitted changes in your project."
  echo ""
  echo "Options:"
  echo "1. Commit them now (save current work)"
  echo "2. Stash them (temporarily hide them)"
  echo "3. Continue anyway (not recommended)"
  echo ""
  # Ask user what to do
fi
```

### 3. Safety Branch Creation

```bash
# Generate unique branch name
TIMESTAMP=$(date +%s)
BRANCH_NAME="trike/practice-$TIMESTAMP"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " CREATING SAFETY BRANCH"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "I'm creating a safe branch for our work:"
echo "Branch: $BRANCH_NAME"
echo ""
echo "This means:"
echo "✓ Your main code stays untouched"
echo "✓ We can experiment freely"
echo "✓ Worst case: delete this branch and start fresh"
echo "✓ When it works: merge it back"
echo ""

git checkout -b "$BRANCH_NAME"

echo "✅ Safe branch created!"
echo ""
echo "We're now working in a sandbox. Your original"
echo "code is safe on the main branch."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

---

## During Work Safeguards

### Commit After Each Milestone

```bash
# After each successful milestone completion
git add -A
git commit -m "Trike Milestone $MILESTONE_NUM: $MILESTONE_NAME

Completed: $(date)
Persona: $PERSONA
Status: Success"

echo ""
echo "✅ Checkpoint created!"
echo ""
echo "I've saved your progress. If anything breaks in"
echo "the next step, we can easily roll back to here."
```

### Destructive Operation Warnings

Before ANY destructive operation, warn and confirm:

```bash
# Before: rm, rm -rf, git reset --hard, git clean -f, etc.

echo "⚠️  WARNING: DESTRUCTIVE OPERATION"
echo ""
echo "I'm about to run: $COMMAND"
echo ""
echo "This will:"
echo "• $EXPLANATION_OF_WHAT_IT_DOES"
echo "• $WHAT_WILL_BE_LOST"
echo ""
echo "Are you sure you want to proceed?"

# Use AskUserQuestion for confirmation
# Only proceed if user confirms
```

### Show Diffs Before Committing

```bash
# Before creating commit
echo "Here's what changed in this milestone:"
echo ""
git diff HEAD

echo ""
echo "Does this look right? Should I commit this?"
# Ask for confirmation
```

### File Change Notifications

```bash
# After file operations
echo "📝 Files modified in this step:"
git status --short

echo ""
echo "• M = Modified"
echo "• A = Added"
echo "• D = Deleted"
```

---

## Rollback Procedures

### Undo Last Milestone

```bash
echo "Rolling back last milestone..."
echo ""
git reset --hard HEAD~1
echo "✅ Rolled back to previous checkpoint"
echo ""
echo "The changes from the last milestone have been undone."
echo "Your code is back to where it was before that step."
```

### Start Fresh (Delete Branch)

```bash
echo "Going back to main branch and deleting practice branch..."
echo ""
CURRENT_BRANCH=$(git branch --show-current)
git checkout main  # or master, or whatever their default is
git branch -D "$CURRENT_BRANCH"

echo "✅ Practice branch deleted"
echo ""
echo "You're back on main. Your original code is unchanged."
echo "All our practice work has been discarded."
echo ""
echo "Want to try again from scratch?"
```

### Cherry-Pick Good Commits

```bash
echo "Let's save the good parts before we reset..."
echo ""
echo "Which commits do you want to keep?"
git log --oneline -10

# Help user cherry-pick specific commits they want to preserve
```

---

## Error Handling

### When Things Go Wrong

```bash
if [ $? -ne 0 ]; then
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo " SOMETHING WENT WRONG"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "Don't worry! We're in a safe branch."
  echo ""
  echo "Options:"
  echo "1. Try to fix it together"
  echo "2. Roll back to last checkpoint"
  echo "3. Start this milestone over"
  echo "4. Skip this milestone for now"
  echo ""
  # Ask user what they want to do
fi
```

### Build/Test Failures

```bash
# After running tests or build
if [ $? -ne 0 ]; then
  echo "⚠️  Tests failed (or build failed)"
  echo ""
  echo "This is normal during development!"
  echo ""
  echo "Options:"
  echo "1. Review the errors together and fix them"
  echo "2. Roll back this change"
  echo "3. Commit anyway (marked as WIP)"
  echo ""
  # Ask user preference
fi
```

---

## Safety Messaging

### Persona-Appropriate Reassurance

**Never Tried:**
```
Remember: We're in a safe branch! Worst case scenario,
we delete it and your original code is completely untouched.

There's no way to break your project from here. Experiment
freely - that's how you learn!
```

**Basic User:**
```
Quick reminder: We're working in branch $BRANCH_NAME.
Your main branch is untouched. If anything goes wrong,
we can easily roll back or start fresh.
```

**Intermediate:**
```
Working in branch $BRANCH_NAME. Standard safety measures
active: commits after each milestone, rollback available.
```

### First Real Project Milestone

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 FIRST REAL PROJECT WORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Quick safety briefing:

✓ We're in a safe branch (not main)
✓ Each step is automatically committed (checkpoints)
✓ You can roll back anytime
✓ Worst case: delete branch, start fresh
✓ Your original code: 100% safe

You're in complete control. If at ANY point you want
to stop, go back, or try something different - just say so.

Ready to build something on your actual project? 🚀

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Operations That Require Confirmation

These ALWAYS need explicit user confirmation (using AskUserQuestion):

1. **Deleting files** (`rm`, `rm -rf`)
2. **Force operations** (`git push --force`, `git reset --hard`)
3. **Destructive git** (`git clean -f`, `git checkout .`)
4. **Package operations** (`npm install`, `pip install` - might modify lockfiles)
5. **Database operations** (migrations, seeding, dropping)
6. **Deployment** (publishing, pushing to production)
7. **File moves** (might break imports)
8. **Large refactors** (touching >5 files)

---

## Post-Work Review

### When Practice is Complete

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 PRACTICE COMPLETE!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Great work! Here's what we built together:

[Show summary of changes, commits, features added]

Your options now:

1. **Merge to main** - This worked, let's keep it!
   (I'll help you merge and push)

2. **Keep branch for later** - Not ready yet, but save progress
   (Branch stays for future work)

3. **Discard everything** - Was just practice, delete it
   (Your main code stays unchanged)

What would you like to do?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Merge to Main Helper

```bash
echo "Merging your changes to main..."
echo ""

# Ensure we're updated
git checkout main
git pull  # if remote exists

echo "Here are all the changes we're about to merge:"
echo ""
git diff main..$BRANCH_NAME

echo ""
echo "Does this look good?"
# Confirm with user

git merge $BRANCH_NAME
git push  # if remote exists

echo "✅ Merged and pushed!"
echo ""
echo "Your practice work is now part of your main codebase."
echo "Great job! 🎉"
```

---

## Implementation Checklist

For each real project milestone, ensure:

- [ ] Pre-work checks run (git, clean tree, safety branch)
- [ ] Clear explanation of what we're about to do
- [ ] User knows they're safe (branch messaging)
- [ ] Commit after completion
- [ ] Show what changed
- [ ] Offer rollback if user seems uncertain
- [ ] Destructive operations require confirmation
- [ ] Errors handled gracefully with options
- [ ] Post-work review and merge option

---

## Remember

The goal is **fearless experimentation**. If the user is worried about breaking things, they won't learn effectively.

Every decision should ask: "Does this make the user feel safer?"
