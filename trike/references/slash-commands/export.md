# /export Command

## What It Is

`/export` saves your conversation or generated code to a file outside Claude Code. You can export as markdown (readable discussion), JSON (structured data), or plain code. Useful for sharing, documenting, or archiving your work.

## Why It Matters

Without export, your work lives only in Claude Code:
- You can't share the conversation with teammates
- You can't document the decision-making process
- You can't review the work later outside Claude Code
- You can't easily copy code snippets

With `/export`:
- Export full conversations for documentation
- Export just the code for version control
- Share decisions with team members
- Archive your work

Real-world impact: Saves context when onboarding teammates ("Here's how we decided to structure the API") and documents decision rationale.

## How to Use

### Export Full Conversation as Markdown

```
/export
```

Creates a markdown file with full conversation history:

```markdown
# Claude Code Conversation Export

**Project:** MyApp
**Date:** 2026-02-03
**Duration:** 45 messages

## Task: Implement User Authentication

### Message 1
User: Build a login system using React and Express

Claude: I'll build a complete authentication system...
[full response]

### Message 2
User: Add password reset functionality

Claude: Great addition. Here's how to implement password reset...
[full response]

... (continues for all messages)
```

### Export Code Only

```
/export --code
```

Extracts all code from conversation and exports as files:

```
/export results/
├── src/
│   ├── components/
│   │   ├── Login.tsx
│   │   └── PasswordReset.tsx
│   ├── services/
│   │   └── auth.ts
│   └── types/
│       └── auth.d.ts
├── backend/
│   ├── routes/
│   │   └── auth.js
│   └── models/
│       └── User.js
```

Each file is properly formatted and ready to use.

### Export as JSON

```
/export --format json
```

Structured data export:

```json
{
  "metadata": {
    "project": "MyApp",
    "date": "2026-02-03",
    "messages": 45
  },
  "messages": [
    {
      "number": 1,
      "type": "user",
      "content": "Build a login system..."
    },
    {
      "number": 2,
      "type": "claude",
      "content": "I'll build a complete authentication..."
    }
  ],
  "code_artifacts": [
    {
      "filename": "src/components/Login.tsx",
      "language": "typescript",
      "content": "..."
    }
  ]
}
```

### Export with Custom Filename

```
/export my-auth-implementation.md
/export --code exported-code/
```

Saves to specified location.

## Practical Workflows

### Workflow 1: Document Decision-Making for Team

```
You've worked with Claude on a complex refactoring.
You want to explain the architecture to your team.

/export architecture-discussion.md

Share the markdown file with team:
"Here's how we decided on the new architecture, the alternatives we rejected, and why this approach wins."

Team reads through decision-making process instead of getting a bare codebase
```

### Workflow 2: Archive Session for Later Reference

```
You've built a complex feature.
You want to keep the conversation for future reference.

/export --code
(Export all code to /exported-code/)

/export --format json
(Export as structured data)

Store both in your project's /docs/sessions/ directory
Link them from a DECISIONS.md file
```

Later, when you need to understand "Why did we structure the API this way?", you have the full context.

### Workflow 3: Share Implementation with Non-Claude Users

```
You've built something impressive with Claude.
Team member doesn't use Claude Code.

/export --code
(Export all code files)

Share the exported code directory with team member
They see the final result, can review and integrate
```

### Workflow 4: Create Documentation from Conversation

```
You've explained a complex feature to Claude.
Now you want to create official documentation.

/export --format markdown

Take the markdown export
Extract key explanations
Turn into official docs/api.md or docs/architecture.md
```

Conversation becomes documentation.

## What Each Format Is Best For

### Markdown (Default)
**Use for:**
- Sharing full discussions with team
- Documentation of decisions
- Blog posts or articles about the work
- Archives for later reference

**Best when:** You want to show the thinking process, not just the code.

### JSON
**Use for:**
- Structured analysis of the conversation
- Parsing/processing the export programmatically
- Archiving with metadata
- Integration with other tools

**Best when:** You need to analyze or integrate the data.

### Code Only
**Use for:**
- Getting just the code files generated
- Integrating into your project quickly
- Sharing only the artifacts, not the discussion
- Clean code review without conversation

**Best when:** You want production code, not the discussion.

## Advanced Export Patterns

### Pattern 1: Export Decision Points

When exporting, you can mark important decisions:

```
During conversation:
Me: /checkpoint "Authentication approach decided"

(Work continues)

Me: /export

(Exported markdown includes checkpoint markers)
[CHECKPOINT: Authentication approach decided]
```

Helps readers understand the flow.

### Pattern 2: Export and Commit with Git

```
/export --code exported-code/

(Verify exported code)

git add exported-code/
git commit -m "Export: User authentication system from Claude Code session"
```

(Note: This uses git commit directly, not the Claude Code commit command)

Keep exported sessions in git history.

### Pattern 3: Selective Export

Before exporting, cleanup:

```
/clear
(Remove noise)

/memory The final architecture is [X]
/memory Implementation summary: [Y]

/export

(Export contains only the essential information)
```

### Pattern 4: Export for Portfolio

```
Built something impressive? Export it.

/export --code
(Export production-ready code)

/export --format markdown
(Export discussion/explanation)

Create a portfolio entry:
- Link to exported code
- Link to decision discussion
- Shows both the code and the thinking

Impressive for job interviews!
```

## Combining /export with Other Commands

### /export + Commit Command

Before exporting, commit the work:

```
/review
(Verify all changes)

Ask me to commit with message: "Implement feature X"

/export features/feature-x-session.md
(Archive the conversation)

git add docs/sessions/
git commit "Archive: Feature X implementation session"
```

Code goes to git, discussion goes to documentation.

### /export + /agents

After parallel agents complete:

```
/agents collect
(All agents finish)

/export --code
(Export all agent artifacts)

/review
(Review all exported code)
```

Consolidate all agent work into organized export.

## Best Practices

**Do:**
- Export when you've completed significant work
- Use markdown exports for team sharing
- Use code exports for clean integration
- Keep exports in version control for reference
- Export before `/clear` if you want to preserve the conversation

**Don't:**
- Export unreviewed code (always `/review` first)
- Export sensitive information (API keys, credentials)
- Rely on exports as your only backup (git commit the actual code)
- Export incomplete work without explaining the state

## Practice Exercise (10-15 minutes)

### Goal
Export a real session and understand the different export formats.

### Setup
Start Claude Code in your project with something to work on.

### Steps

1. **Do real work for 20-30 messages:**
   ```
   Ask Claude to implement a feature or refactor something
   Have a real back-and-forth with clarifications, adjustments, etc.
   Build up content worth exporting
   ```

2. **Before exporting, review:**
   ```
   /review
   (Verify the work is good)
   ```

3. **Export as markdown:**
   ```
   /export my-session.md
   ```
   (Review the exported file - does it read well?)

4. **Export code only:**
   ```
   /export --code exported-code/
   ```
   (Check the file structure - is it well-organized?)

5. **Export as JSON:**
   ```
   /export --format json my-session.json
   ```
   (Open the file - understand the structure)

6. **Explore use cases:**
   - Could you share the markdown with teammates?
   - Is the code export production-ready?
   - Could you integrate the exported code into your project?

### Success Criteria
- You've successfully exported in 2-3 different formats
- You understand when to use each export type
- You could share or archive the export if needed

## Gotchas

**Gotcha 1: Exports include everything**
Markdown exports include the full conversation, including mistakes, dead ends, and clarifications. If you have sensitive discussions, review the export before sharing.

**Gotcha 2: Sensitive data in exports**
If you discussed API keys, database credentials, or other sensitive info, they'll be in the export. Never commit exports with sensitive data to version control.

```
Good: /export --code (just code, usually safe)
Bad: /export (full conversation might have sensitive info)
```

**Gotcha 3: Code exports might not match your actual repo**
Exported code is what Claude generated, not necessarily what you actually committed to git. If you modified the code manually, the export might be outdated.

**Gotcha 4: Markdown exports can be huge**
Long conversations export as large markdown files (100+ MB is possible). They're readable but might be hard to share or version control.

```
✅ Use markdown for documentation and sharing (30-50 messages)
❌ Don't use markdown for massive sessions (100+ messages)
```

**Gotcha 5: Exported code needs context**
Code exported without the conversation context might be hard to understand. Include:
- A README explaining the code
- References to the conversation export
- Architecture documentation

```
exports/
├── code/          (exported code)
├── session.md     (exported conversation)
└── README.md      (explanation of what's here)
```

**Gotcha 6: Exports are snapshots**
Exports capture the moment you export them. If you continue working after exporting, the export is stale. Re-export if you want the latest version.

```
Session 1: Implement feature
/export feature-v1.md

(Continue working)

/export feature-v2.md
(v2 includes new work)
```

**Gotcha 7: Don't use exports as backups**
Exports are snapshots for sharing and documentation, not backups. Always commit working code to git for real backup. Exports are supplementary, not replacement for git history.
