---
name: trike:explain
description: Deep dive on any concept (usage: /trike:explain [topic])
allowed-tools:
  - Read
  - Write
  - Bash
  - WebFetch
---

<objective>
Provide deep explanations of concepts on demand.

User can ask about:
- Technical concepts ("authentication", "APIs", "databases")
- Project-specific components ("how the User model works")
- Why decisions were made ("why did we use Flask?")
- Broader topics ("how does the web work?")

Always connect explanations back to THEIR project.
</objective>

<process>

## Step 1: Parse the Topic

User will provide topic like:
- `/trike:explain authentication`
- `/trike:explain how the login works`
- `/trike:explain why we need a database`

Extract the topic they want explained.

## Step 2: Load Project Context

Read their progress and roadmap:
```bash
PROGRESS=$(cat .trike/progress.json)
PROJECT_GOAL=$(echo "$PROGRESS" | grep -oP '"projectGoal":\s*"\K[^"]+')
PROJECT_SCOPE=$(echo "$PROGRESS" | grep -oP '"projectV1Scope":\s*"\K[^"]+')

# If they've built code, load relevant files
if [ -f "relevant-file.js" ]; then
  cat relevant-file.js
fi
```

## Step 3: Explain with Context

Structure the explanation:

### Part 1: What It Is
Simple definition in 2-3 sentences.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 EXPLAINING: [Topic]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**What it is:**
[Simple, clear definition]

**In everyday terms:**
[Analogy or real-world comparison]
```

### Part 2: Why It Matters to Their Project

```
**Why [your project] needs this:**
[Connect directly to their goal]

For example, in your [project]:
[Concrete example from their codebase or roadmap]
```

### Part 3: How It Works

```
**How it works:**

[Step-by-step explanation]

1. [First thing that happens]
2. [Second thing that happens]
3. [Result]

[If code exists, show relevant snippet]
```

### Part 4: The Bigger Picture

```
**How it fits:**

[Show how this concept relates to other things they've learned]

• Connects to [concept A] which they learned in milestone [X]
• Works together with [concept B]
• Enables them to later [future capability]
```

### Part 5: Common Confusions

```
**Common confusions cleared up:**

• "Does this mean [misconception]?" → No, actually [correct understanding]
• "Why not just [alternative approach]?" → [Explain tradeoffs]
```

## Step 4: Check Understanding

Ask them to engage:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Try explaining [topic] back to me in your own words.

Or ask me to clarify any part that's still unclear.
```

Wait for response.

If they have follow-up questions, answer those.

If they want to go deeper:
```
Want to go deeper on any specific part?
```

## Step 5: Connect to Next Steps

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Now that you understand [topic] better:

• Continue your lesson: /trike:next
• See where you are: /trike:progress
• Explore another concept: /trike:explain [topic]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

</process>

<explanation_principles>

## Always Project-Specific
- Never generic "here's how variables work"
- Always "here's why YOUR workout tracker needs variables"
- Use their code/roadmap as examples

## Appropriate Depth
- Start simple
- Go deeper if they ask
- Use analogies from their world
- Avoid unnecessary jargon

## Multiple Angles
- Definition
- Visual/analogy
- Code example
- Real-world comparison
- Connection to their project

## Vibecoding Focus
- Emphasize: why, when, tradeoffs
- De-emphasize: syntax, language quirks (unless relevant)
- Focus on: architecture, how pieces connect, what to watch for
- Skip: deep language internals (unless they specifically ask)

</explanation_principles>

<example_explanations>

## Example 1: User asks about authentication

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 EXPLAINING: Authentication
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**What it is:**
Authentication is how your app knows who's who. It's the "are you really you?" check.

**In everyday terms:**
Like showing ID at airport security. You prove you're the account owner.

**Why your workout tracker needs this:**
Your users' workout data is personal. Authentication ensures:
• Only they can see their own workouts
• No one else can modify their progress
• You can save their data under their account

**How it works in your app:**

1. User enters username + password
2. Your app checks if they match what's stored
3. If yes: give them a "session token" (like a wristband)
4. For future requests: check the token

[Show code from their auth.js file if it exists]

**How it fits:**
• User model (milestone 2) stores the credentials
• Auth middleware (milestone 4) checks the token
• Protected routes use this to block non-users

**Common confusions:**
• "Is this the same as authorization?" → No. Authentication = "who are you", Authorization = "what can you do"
• "Why not just remember in browser?" → Browser storage can be manipulated. Need server-side validation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Example 2: User asks about why we chose Flask

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 EXPLAINING: Why Flask for Your Project
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**What Flask is:**
A lightweight Python web framework. It helps you build web apps without writing all the low-level HTTP handling.

**Why we chose it for your API:**

✓ Python syntax is beginner-friendly
✓ Flask is minimal - less to learn
✓ Perfect for APIs (your use case)
✓ Easy to deploy

**What about alternatives?**

• Django: More features, but heavier. Overkill for your simple API.
• FastAPI: More modern, but Python type hints are extra complexity.
• Node/Express: Would mean learning JavaScript too.

For your goal (simple data API), Flask is the sweet spot.

**How it works in your project:**

Your main.py:
```python
from flask import Flask
app = Flask(__name__)

@app.route('/workouts')  # This URL endpoint
def get_workouts():       # Returns this data
    return workouts
```

Flask handles:
• Routing (/workouts → get_workouts function)
• HTTP stuff (requests, responses, headers)
• Running the web server

You just write:
• What URLs exist
• What data to return

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

</example_explanations>

<success_criteria>
- Explanation is clear and accurate
- Connected to their specific project
- Multiple angles provided (definition, analogy, example)
- User can ask follow-ups
- Next steps clearly indicated
</success_criteria>
