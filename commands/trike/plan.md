---
name: trike:plan
description: Plan what YOU want to build
allowed-tools:
  - Read
  - Write
  - Bash
  - Task
  - AskUserQuestion
---

<objective>
Stage 2: Planning

Help user describe their project, scope it to realistic v1, and generate learning path.
Use ONLY plain language - no jargon or technical terms.
Derive tech stack from their needs, don't ask them to choose.
</objective>

<process>

## Step 1: Read Planning Guide

```bash
cat ~/.claude/trike/references/planning-guide.md
```

This guide contains the complete approach for jargon-free planning.
Follow its principles throughout this conversation.

## Step 2: Load User Context

If progress file exists, read it:
```bash
if [ -f .trike/progress.json ]; then
  LEARNING_STYLE=$(cat .trike/progress.json | grep -oP '"learningStyle":\s*"\K[^"]+' || echo "unknown")
  USER_GOALS=$(cat .trike/progress.json | grep -oP '"userGoals":\s*"\K[^"]+' || echo "unknown")
  TIME_COMMITMENT=$(cat .trike/progress.json | grep -oP '"userTimeCommitment":\s*"\K[^"]+' || echo "unknown")
fi
```

Use this context to personalize your approach.

## Step 3: Welcome to Planning

Present brief welcome:
- Transition from orientation (if they completed it)
- Explain this is where they describe their project
- No generic tutorials - building THEIR actual project
- Set expectation: will ask questions to understand, then create custom plan

Keep under 15 lines.

## Step 4: Understand Their Vision

**CRITICAL: Use the planning guide's question patterns.**

Start open-ended:
- "What do you want to build?"
- Let them describe freely
- Don't interrupt with technical questions

Listen for:
- Their goal/problem to solve
- Who will use it
- What it needs to do

## Step 5: Clarify Usage Context

**CRITICAL RULES FROM PLANNING GUIDE:**
1. Ask ONE question at a time
2. Use AskUserQuestion tool for multiple-choice questions
3. WAIT for answer before asking next question
4. Acknowledge their answer before proceeding
5. Add navigation block after each question

The planning guide has detailed question templates.
Read it and follow the pattern exactly:

**Question sequence (one at a time):**
1. Platform: Where they want to use it
2. Data source: Internet data or own stuff
3. Persistence: Save for later or not
4. Workflow: Step-by-step usage description

Use AskUserQuestion for questions 1-3.
Question 4 is open-ended (text response).

**Never ask multiple questions in same message!**

## Step 6: When They Use Jargon or Ask Questions

If they say "I don't know what X means":
- Explain X simply (see planning guide examples)
- Then immediately say "But don't worry about that term now"
- Continue with plain language questions

If they use technical terms:
- That's fine, but don't assume understanding
- Continue asking in plain language
- Derive what you need from their usage description

## Step 7: Derive Tech Stack (Internally)

Based on their answers, YOU decide the best approach:
- Web app (HTML/CSS/JS) for browser use
- Terminal tool (Python/Node) for command line
- Mobile considerations (start with web, move to mobile later)

**Don't tell them:**
- "We'll use React" → Say: "We'll build a website"
- "We'll use an API" → Say: "We'll connect to a service that provides [news/weather/etc]"
- "We'll use localStorage" → Say: "We'll save things simply"

Keep technical decisions invisible. Focus on WHAT they're building, not HOW.

## Step 8: Scope to Realistic v1

Their idea is usually too big. Follow planning guide's pattern:

1. Acknowledge full vision
2. Explain why v1 should be simpler (time, complexity, learning)
3. Propose minimal viable version
4. Show benefits of starting simple
5. Get buy-in

**Example from guide:**
Full vision: Instagram clone
Your v1: Photo upload + gallery (just for them, no users yet)

Be encouraging but realistic.
Use the "build this, then add more" framing.

## Step 9: Confirm v1 Scope

Once they agree on v1:
- Restate it in simple, clear terms
- Confirm this is what they want to build
- Get explicit "yes" before proceeding

Save to progress.json:
```bash
# Update projectGoal (their full vision)
# Update projectV1Scope (the scoped version they agreed to)
```

## Step 10: Generate Learning Path

Spawn the curriculum planner agent:

```bash
# Read their context
PROJECT_V1=$(cat .trike/progress.json | grep -oP '"projectV1Scope":\s*"\K[^"]+')
LEARNING_STYLE=$(cat .trike/progress.json | grep -oP '"learningStyle":\s*"\K[^"]+')
TIME_COMMITMENT=$(cat .trike/progress.json | grep -oP '"userTimeCommitment":\s*"\K[^"]+')
```

Use Task tool:
```
Task(
  prompt="
    Generate personalized learning path for complete beginner.
    
    Project v1: $PROJECT_V1
    Learning style: $LEARNING_STYLE
    Time commitment: $TIME_COMMITMENT
    
    Tech stack (derived): [what you decided based on their needs]
    
    Create milestones in .trike/learning-path.md following the template.
    Remember: vibecoding focus (architecture over syntax).
  ",
  subagent_type="trike-curriculum-planner"
)
```

## Step 11: Present the Plan

After agent completes:

Read the generated learning path:
```bash
cat .trike/learning-path.md
```

Present it to user:
- Show milestone names and brief descriptions
- Give realistic timeline estimate
- Emphasize: personalized for THEIR project
- Explain they'll learn as they build

Ask: "Does this roadmap make sense? Ready to start building?"

## Step 12: Generate CLAUDE.md

After user confirms, generate CLAUDE.md to guide Claude Code during building:

Read the template:
```bash
cat ~/.claude/trike/references/claude-md-template.md
```

Generate CLAUDE.md in project root:
```bash
# Extract project name from v1 scope
PROJECT_NAME=$(cat .trike/progress.json | grep -oP '"projectV1Scope":\s*"\K[^"]+' | head -c 50)

# Use the template to create CLAUDE.md
# Replace {PROJECT_NAME} with actual name
# Write to ./CLAUDE.md
```

The CLAUDE.md should instruct Claude Code to:
- Use Trike's teaching resources
- Follow navigation block requirements
- Use one-question-at-a-time pattern
- Avoid jargon
- Follow the 5-phase build pattern

## Step 13: Instruct User to Reload Context

**CRITICAL:** Claude Code needs to read the new CLAUDE.md

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ PLANNING COMPLETE

Your personalized learning path is ready!
I've also created a CLAUDE.md file to help guide the building process.

▶ NEXT - IMPORTANT

To start building, you need to reload so I can read the new instructions:

1. Type: /clear
2. Then type: /trike:build

This resets my context and I'll read your CLAUDE.md file, which contains
important teaching guidelines for your project.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 14: Update Progress

Update progress only after CLAUDE.md is created:
```bash
# Set currentStage to "build"
# Add "plan" to completedStages
# Set nextUp to "/clear then /trike:build"
```

</process>

<critical_rules>

## CONVERSATION RULES:
1. **ONE question at a time** - Never ask multiple questions in same message
2. **WAIT for answers** - Don't proceed until they respond
3. **Use AskUserQuestion** - For any question with predefined options
4. **Add navigation blocks** - End every response with ▶ NEXT section
5. **Acknowledge answers** - Before asking next question, acknowledge what they said

## NEVER Use These Terms Without Explanation:
- API (say: "service that provides data")
- Framework (say: "tools to build faster")
- Frontend/Backend (say: "what you see" / "behind the scenes")
- Database (say: "where data is saved")
- CLI (say: "terminal tool")
- React/Vue/etc (just say: "website")

## ALWAYS:
- Derive tech from needs, don't ask them to choose
- Use plain language only
- Explain when they ask "what's X?"
- Keep explanations simple and brief
- Focus on WHAT they're building, not HOW
- Scope down their big ideas to realistic v1
- End responses with navigation blocks

## NEVER:
- Ask "Do you want React or Vue?"
- Ask "Which API should we use?"
- Ask multiple questions in one message
- Assume they understand technical terms
- Let them proceed without v1 scoping
- Forget navigation blocks

</critical_rules>

<success_criteria>
- User described their project in plain language
- You understood their needs without jargon
- Scoped to realistic v1 they agreed to
- Derived appropriate tech stack (invisible to them)
- Learning path generated and makes sense to them
- User excited and ready to start building
- No technical confusion or overwhelm
</success_criteria>
