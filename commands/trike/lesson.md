---
name: trike:lesson
description: Continue current lesson (alias for /trike:next)
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Task
  - AskUserQuestion
---

<objective>
Alias for /trike:next

"Lesson" is more beginner-friendly than "next step".
This command does exactly the same thing as /trike:next.
</objective>

<process>

## Execute Main Teaching Loop

This is an alias. Execute the same logic as `/trike:next`:

1. Load current state from `.trike/progress.json`
2. Determine current phase (discuss/plan/execute/explain/verify)
3. Execute that phase
4. Update progress
5. Indicate what's next

See `/trike:next` for full implementation details.

The phases are:
- **Discuss:** What we're building and why
- **Plan:** How we'll build it
- **Execute:** I build it (you watch)
- **Explain:** I explain how it works
- **Verify:** You explain it back

</process>

<note>
Some users prefer /trike:lesson, others prefer /trike:next.
Both do the same thing - use whichever feels natural.
</note>
