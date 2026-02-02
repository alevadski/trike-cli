# Orientation Step 4: Quick Preferences Quiz

## Purpose
Gather information about the user's learning style and goals to personalize their experience.

## Questions to Ask

Use AskUserQuestion tool with these questions:

**Question 1: Learning Style**
"How do you learn best?"

Options:
- "By trying things myself and experimenting" - Active learner, hands-on
- "By watching someone do it first, then trying" - Observer-first, then practice
- "With detailed explanations before I start" - Theory-first learner
- "A mix of all of these" - Flexible, adaptive

**Question 2: Main Goal**
"What brings you here?"

Options:
- "I have a specific project I want to build" - Project-driven, clear vision
- "I want to learn how to build things with AI in general" - Learning-focused, exploratory
- "I need to automate or solve something for work" - Problem-solving, practical need
- "I'm just exploring and seeing what's possible" - Curious, no specific goal yet

**Question 3: Time Commitment**
"How much time can you dedicate to this?"

Options:
- "30 minutes to 1 hour every day" - Daily learner, steady progress
- "A few hours each week" - Weekly learner, slower but consistent
- "Mostly on weekends" - Weekend warrior, batch learning
- "Whenever I find time - no set schedule" - Flexible, irregular

## How to Use Responses

Save these to progress.json:
```json
{
  "learningStyle": "their answer",
  "userGoals": "their answer",
  "userTimeCommitment": "their answer"
}
```

These will inform:
- How Trike paces explanations
- How much detail to provide upfront vs on-demand
- How to break down the learning path
- Encouragement and expectations setting

## Tone
- Friendly and quick
- No judgment - all answers are valid
- Explain briefly why you're asking ("helps me personalize your experience")

## After Quiz
Move to step 5 (summary) automatically.
