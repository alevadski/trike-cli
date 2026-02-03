# Installing and Using Skills

## What They Are

Skills are specialized capabilities that extend Claude Code with new functionality. They're lightweight packages that add new commands, workflows, and capabilities to your Claude Code environment.

You can think of skills as plugins for Claude Code. Instead of asking Claude to perform a task manually, a skill encapsulates best practices and workflows into reusable, automated capabilities.

## Why This Matters

**Productivity:** Skills automate complex workflows, saving you time on repetitive tasks.

**Consistency:** Skills encode best practices, ensuring you follow the same patterns every time.

**Extensibility:** The skill ecosystem lets developers share reusable capabilities with each other.

**Discoverability:** Instead of remembering every command, skills provide a catalog of what's possible.

**Quality:** Community skills are reviewed and tested, giving you confidence they work correctly.

## How to Use Skills

### Finding Skills

#### Option 1: Browse the Official Skill Registry

Visit the Trike skill registry to discover available skills:

```
https://trike.so/skills
```

The registry shows:
- **Skill name and description**
- **Installation command**
- **Usage examples**
- **Author and version**
- **Star count and popularity metrics**

#### Option 2: Search for Skills

If you know what you want to do, search the registry:

```
https://trike.so/skills?search=testing
```

Common skill categories:
- **Testing:** Unit testing, integration testing, test reporting
- **Linting:** Code style, static analysis, formatting
- **Documentation:** Auto-docs, type hints, examples
- **DevOps:** Deployment, CI/CD, infrastructure
- **Analysis:** Code metrics, performance profiling, complexity
- **Integration:** Git workflows, issue tracking, external tools

#### Option 3: Ask Claude

You can also ask Claude to recommend skills for your use case:

```
You: "What skills are available for React testing?"
Claude: [Recommends relevant skills and installation steps]
```

### Installing Skills

#### Step 1: Locate the Skill

Find the skill you want in the registry or recommendations.

Example skill: `trike-testing` (a unit testing automation skill)

#### Step 2: Install to ~/.claude/skills/

Skills are installed to your home directory at `~/.claude/skills/`. This makes them available across all your projects.

```bash
# Create the skills directory if it doesn't exist
mkdir -p ~/.claude/skills

# Download and install the skill
# Method 1: Using the skill install command
claude skills install trike-testing

# Method 2: Manual installation (if you have the skill package)
cp trike-testing ~/.claude/skills/
```

#### Step 3: Verify Installation

Once installed, list your available skills:

```bash
claude skills list
```

Output shows:
```
Installed Skills:
- trike-testing (v1.2.0) - Unit testing automation
- trike-docs (v0.5.1) - Auto-documentation generator
```

### Using Skills

#### Basic Usage

Once installed, skills appear as new commands or workflows available in Claude Code.

Using a skill is as simple as asking Claude to use it:

```
You: "Run tests using the trike-testing skill"
Claude: [Activates the skill and executes testing workflow]
```

Or use the skill command directly:

```bash
claude trike-testing --run unit
```

#### Skill-Specific Commands

Each skill defines its own commands. Check the skill's documentation:

```bash
# Get help for a specific skill
claude trike-testing --help

# View usage examples
claude trike-testing --examples

# Show version
claude trike-testing --version
```

#### Example Skill Workflows

**Example 1: Using trike-testing**

```
You: "Use the trike-testing skill to run all unit tests and generate a coverage report"

Claude:
1. Discovers the test files in your project
2. Runs unit tests using the skill's configured test runner
3. Generates a coverage report
4. Reports results with recommendations
```

**Example 2: Using trike-docs**

```
You: "Use the trike-docs skill to generate TypeScript documentation for src/"

Claude:
1. Scans your TypeScript files
2. Extracts type information and JSDoc comments
3. Generates markdown documentation
4. Creates a docs/ directory with organized documentation
```

**Example 3: Using a custom skill**

```
You: "Use my-custom-skill to format all CSS files"

Claude:
1. Finds all CSS files in the project
2. Applies the skill's formatting rules
3. Shows you the changes
4. Asks for confirmation before applying
```

## Popular Skills

### Testing Skills

**trike-testing**
```
Description: Automated unit test execution and reporting
Install: claude skills install trike-testing
Usage: Runs tests, generates coverage, shows metrics
```

**trike-jest**
```
Description: Jest testing framework integration
Install: claude skills install trike-jest
Usage: Runs Jest with custom configurations
```

### Documentation Skills

**trike-docs**
```
Description: Auto-generate documentation from code
Install: claude skills install trike-docs
Usage: Creates markdown docs from types and comments
```

**trike-typedoc**
```
Description: TypeScript documentation generation
Install: claude skills install trike-typedoc
Usage: Generates HTML and markdown TypeScript docs
```

### Code Quality Skills

**trike-lint**
```
Description: Linting and static analysis
Install: claude skills install trike-lint
Usage: Runs ESLint, checks style, reports violations
```

**trike-format**
```
Description: Code formatting automation
Install: claude skills install trike-format
Usage: Formats code with Prettier or similar tools
```

### DevOps/Deployment Skills

**trike-deploy**
```
Description: Deployment automation
Install: claude skills install trike-deploy
Usage: Handles deployment pipelines, environment setup
```

**trike-docker**
```
Description: Docker integration and container management
Install: claude skills install trike-docker
Usage: Builds images, runs containers, manages deployments
```

### Analysis Skills

**trike-metrics**
```
Description: Code metrics and complexity analysis
Install: claude skills install trike-metrics
Usage: Calculates cyclomatic complexity, lines of code, etc.
```

**trike-performance**
```
Description: Performance profiling and optimization
Install: claude skills install trike-performance
Usage: Profiles code, identifies bottlenecks, suggests optimizations
```

## Best Practices

**Do:**
- Read skill documentation before using
- Start with popular, well-reviewed skills
- Test skills in a non-critical project first
- Check version compatibility with your project
- Keep skills updated to latest versions
- Combine complementary skills for powerful workflows

**Don't:**
- Install untrusted or unknown skills
- Assume a skill will work without testing
- Use outdated or unmaintained skills
- Ignore skill version conflicts
- Expect skills to replace your judgment
- Use skills for sensitive operations without review

## Creating Your Own Skill

If you find yourself repeating a workflow, consider packaging it as a skill:

```bash
# Create a new skill scaffold
claude skills create my-custom-skill

# This generates:
# ~/.claude/skills/my-custom-skill/
#   ├── skill.json      (metadata)
#   ├── README.md       (documentation)
#   └── workflow.md     (skill definition)
```

Your skill becomes available to Claude Code immediately.

## Skill Configuration

Skills can be configured in `~/.claude/skills/skill-name/config.json`:

```json
{
  "name": "trike-testing",
  "version": "1.2.0",
  "description": "Unit testing automation",
  "commands": {
    "run": "Run all tests",
    "coverage": "Generate coverage report"
  },
  "settings": {
    "testFramework": "jest",
    "includeIntegration": false,
    "minCoverage": 80
  }
}
```

Customize settings per project by creating `.claude/skills-config.json` in your project root.

## Troubleshooting Skills

### Skill Not Found

**Problem:** `Error: Skill 'trike-testing' not found`

**Solutions:**
1. Check installation: `claude skills list`
2. Reinstall: `claude skills install trike-testing`
3. Check ~/.claude/skills/ directory exists
4. Verify skill name is correct (case-sensitive)

### Skill Version Conflict

**Problem:** Skill requires Node 18+ but you have Node 16

**Solutions:**
1. Check requirements: `claude trike-testing --requirements`
2. Update Node: `nvm install 18`
3. Use a different skill version: `claude skills install trike-testing@2.0.0`

### Skill Execution Fails

**Problem:** Skill runs but produces errors

**Solutions:**
1. Check logs: `claude trike-testing --debug`
2. Review configuration: `.claude/skills-config.json`
3. Run skill examples: `claude trike-testing --examples`
4. Check skill documentation for common issues

## Uninstalling Skills

To remove a skill:

```bash
# Remove a specific skill
claude skills uninstall trike-testing

# Remove all skills
claude skills uninstall --all

# This removes the skill but keeps configuration
# To fully clean up: rm -rf ~/.claude/skills/trike-testing
```

## Gotchas

**Gotcha 1: Skills are global, not per-project**

Skills installed to ~/.claude/skills/ are available in all projects. If you want project-specific skill configurations, use `.claude/skills-config.json` in your project root.

**Gotcha 2: Skill names are case-sensitive**

`trike-testing` is different from `Trike-Testing`. Always use lowercase with hyphens.

**Gotcha 3: Skills need explicit activation in prompts**

Skills don't run automatically. You need to explicitly ask Claude to use them:

```
Good: "Use the trike-testing skill to run tests"
Not as good: "Run tests" (Claude might do it manually instead)
```

**Gotcha 4: Version conflicts can occur**

If a skill requires a specific Node version or dependency, installation might fail silently. Always check: `claude trike-testing --requirements`

**Gotcha 5: Skills are always local**

Skills run on your machine, not in the cloud. This means they need dependencies installed (Node, Python, etc.) to work properly.

## Summary

Skills extend Claude Code with automated workflows:

1. **Find:** Browse the registry at trike.so/skills
2. **Install:** `claude skills install skill-name` to ~/.claude/skills/
3. **Use:** Ask Claude to use the skill in your workflow
4. **Create:** Package your own workflows as reusable skills
5. **Manage:** Update, uninstall, and configure as needed

Popular skills include testing (trike-testing), documentation (trike-docs), and analysis (trike-metrics). Start with popular, well-reviewed skills and test them before critical use.

For more: Visit https://trike.so/skills for the complete skill registry and documentation.
