---
name: trike:quiz
description: Assess your Claude Code knowledge to personalize your learning path
allowed-tools:
  - AskUserQuestion
  - Write
  - Bash
---

<objective>
Collect granular data about the user's Claude Code knowledge, goals, and pain points through an 8-question assessment. If they have experience with other AI coding tools, ask which one to enable feature comparisons later.
</objective>

<process>

## Step 1: Brief Intro

Say: "8 quick questions to personalize your learning path."

## Step 2: Ask All Questions

Use the AskUserQuestion tool with all 8 questions:

```json
{
  "questions": [
    {
      "question": "How familiar are you with Claude Code?",
      "header": "Experience",
      "multiSelect": false,
      "options": [
        {
          "label": "Never used it, just installed",
          "description": "You have Claude Code but haven't tried it yet"
        },
        {
          "label": "Never used CC but have experience with other AI coding tools",
          "description": "You've used Cursor, Copilot, or similar tools"
        },
        {
          "label": "Used it a few times for basic questions",
          "description": "You've chatted with Claude but haven't explored features"
        },
        {
          "label": "Use it regularly for conversations",
          "description": "It's your coding companion but mostly for chat"
        },
        {
          "label": "Know about commands and tried some features",
          "description": "You've used slash commands or explored a bit"
        },
        {
          "label": "Use it extensively (skills, MCPs, hooks, etc.)",
          "description": "You're already using advanced features"
        }
      ]
    },
    {
      "question": "Which of these slash commands have you used?",
      "header": "Commands",
      "multiSelect": false,
      "options": [
        {
          "label": "I don't know what slash commands are",
          "description": "Commands are new to you"
        },
        {
          "label": "Only /help and /clear",
          "description": "You know the basics exist"
        },
        {
          "label": "Basic commands like /commit, /search",
          "description": "You've tried a few common ones"
        },
        {
          "label": "Advanced commands like /plan, /remember",
          "description": "You use commands regularly"
        },
        {
          "label": "I've created custom slash commands",
          "description": "You've built your own commands"
        }
      ]
    },
    {
      "question": "How do you think Claude Code understands your codebase?",
      "header": "Context",
      "multiSelect": false,
      "options": [
        {
          "label": "It reads all my files automatically",
          "description": "Claude has access to everything by default"
        },
        {
          "label": "I have to tell it which files to read",
          "description": "Manual file selection each time"
        },
        {
          "label": "It uses CLAUDE.md and smart context selection",
          "description": "You understand the context system"
        },
        {
          "label": "I don't know how it works",
          "description": "The mechanism is unclear to you"
        },
        {
          "label": "I actively manage context with CLAUDE.md and .claudeignore",
          "description": "You optimize context regularly"
        }
      ]
    },
    {
      "question": "What are 'skills' in Claude Code?",
      "header": "Skills",
      "multiSelect": false,
      "options": [
        {
          "label": "I haven't heard of skills",
          "description": "Skills are completely new to you"
        },
        {
          "label": "I know they exist but never used them",
          "description": "You're aware but haven't tried"
        },
        {
          "label": "I've used 1-2 built-in skills",
          "description": "You've experimented with skills"
        },
        {
          "label": "I regularly use skills for different tasks",
          "description": "Skills are part of your workflow"
        },
        {
          "label": "I've installed custom skills or plugins",
          "description": "You've extended Claude with plugins"
        }
      ]
    },
    {
      "question": "Have you heard of MCP (Model Context Protocol) servers?",
      "header": "MCPs",
      "multiSelect": false,
      "options": [
        {
          "label": "No, what's that?",
          "description": "MCPs are new to you"
        },
        {
          "label": "I've heard of them but don't know what they do",
          "description": "You've seen the term but unclear on purpose"
        },
        {
          "label": "I know they connect external tools/data",
          "description": "You understand the concept"
        },
        {
          "label": "I have 1-2 MCPs installed",
          "description": "You've set up MCPs"
        },
        {
          "label": "I actively use multiple MCPs",
          "description": "MCPs are essential to your workflow"
        }
      ]
    },
    {
      "question": "How do you typically start a Claude Code session?",
      "header": "Setup",
      "multiSelect": false,
      "options": [
        {
          "label": "Just open it and start chatting",
          "description": "Minimal setup, dive right in"
        },
        {
          "label": "Tell Claude what I'm working on",
          "description": "Provide some context manually"
        },
        {
          "label": "Use /remember or provide context",
          "description": "You give structured context"
        },
        {
          "label": "I have CLAUDE.md files set up",
          "description": "You've created project documentation"
        },
        {
          "label": "Full setup: CLAUDE.md, .claudeignore, hooks, skills configured",
          "description": "Your projects are fully optimized"
        }
      ]
    },
    {
      "question": "What frustrates you most about using AI coding tools?",
      "header": "Pain Points",
      "multiSelect": false,
      "options": [
        {
          "label": "Don't know where to start",
          "description": "Getting started is intimidating"
        },
        {
          "label": "Responses are generic/unhelpful",
          "description": "Not getting good results"
        },
        {
          "label": "It forgets context too quickly",
          "description": "Constantly re-explaining your project"
        },
        {
          "label": "Don't know what features exist",
          "description": "Missing capabilities you don't know about"
        },
        {
          "label": "Hard to get consistent quality",
          "description": "Results are hit or miss"
        }
      ]
    },
    {
      "question": "What do you want to achieve with Claude Code?",
      "header": "Goal",
      "multiSelect": false,
      "options": [
        {
          "label": "Ship features faster on my current project",
          "description": "Immediate productivity gains on real work"
        },
        {
          "label": "Learn the tool comprehensively",
          "description": "Master all capabilities thoroughly"
        },
        {
          "label": "Specific use case (refactoring, docs, testing, etc.)",
          "description": "Solve a particular problem"
        },
        {
          "label": "Explore what's possible",
          "description": "Discovery and experimentation"
        },
        {
          "label": "Get unstuck on my workflow",
          "description": "Improve how you currently use it"
        }
      ]
    }
  ]
}
```

## Step 3: Check for Other Tool Experience

If Q1 answer is "Never used CC but have experience with other AI coding tools":

Ask (brief): "Which AI coding tool have you used? (e.g., Cursor, GitHub Copilot, Cody, Windsurf, etc.)"

Wait for response. Store their answer as `otherTool`.

## Step 4: Store Quiz Answers

Create `.trike/progress.json`:

```bash
mkdir -p .trike

# If they mentioned other tool:
cat > .trike/progress.json <<'EOF'
{
  "currentStage": "quiz-complete",
  "quizCompleted": true,
  "quizAnswers": {
    "experience": "[Q1_ANSWER]",
    "commands": "[Q2_ANSWER]",
    "context": "[Q3_ANSWER]",
    "skills": "[Q4_ANSWER]",
    "mcps": "[Q5_ANSWER]",
    "setup": "[Q6_ANSWER]",
    "painPoint": "[Q7_ANSWER]",
    "goal": "[Q8_ANSWER]"
  },
  "otherTool": "[TOOL_NAME or null]",
  "userGoal": "[Q8_ANSWER]",
  "userPainPoint": "[Q7_ANSWER]",
  "createdAt": "[TIMESTAMP]",
  "lastActive": "[TIMESTAMP]"
}
EOF
```

**Important:** If they didn't select "other AI coding tools", set `otherTool: null`

## Step 5: Show Brief Results

Display:
```
✅ Assessment complete!

Goal: [Q8 answer]
Focus: [Q7 answer]
[If otherTool: "Coming from: [TOOL_NAME]"]

Ready to generate your personalized learning path.
```

## Step 6: Navigation Block

End with:
```
---
Run /trike:begin to analyze your project and create your curriculum
```

</process>
