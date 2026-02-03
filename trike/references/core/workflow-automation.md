# Workflow Automation

## What It Is

Workflow automation means chaining Claude Code commands together to build powerful, repeatable processes. Instead of manually asking Claude to perform multiple steps, you create workflows that Claude executes as a coordinated sequence.

Workflows are structured sets of instructions that Claude follows to accomplish complex tasks without you having to manage each step individually.

## Why This Matters

**Saves Time:** Automated workflows eliminate repetitive manual steps.

**Consistency:** Every workflow execution follows the same pattern, ensuring consistent results.

**Complexity:** You can chain multiple Claude Code features together (context, modes, analysis).

**Reproducibility:** Run the same workflow on new projects or code without starting from scratch.

**Integration:** Combine Claude Code with scripts, MCPs, and skills for powerful automation.

**Real Example:**
```
Manual approach (5 steps):
1. Run eslint (5 minutes)
2. Read output (2 minutes)
3. Fix issues (20 minutes)
4. Run tests (5 minutes)
5. Review results (5 minutes)
Total: 37 minutes

Automated approach (1 command):
claude workflow run fix-and-test
Total: Seconds to setup, 2 minutes to execute
```

## Common Workflow Patterns

### Pattern 1: Lint → Fix → Test

Automate code quality:

```
Workflow: fix-and-test

Step 1: Run linter
  Command: eslint src/ --report-unused-disable-directives

Step 2: Ask Claude to fix issues
  Request: "Review lint output and fix all errors"

Step 3: Run tests
  Command: npm test

Step 4: Report results
  Output: Test results and summary
```

**Usage:**
```bash
claude workflow run fix-and-test
```

### Pattern 2: Documentation Generation

Auto-generate documentation:

```
Workflow: generate-docs

Step 1: Scan TypeScript files
  Command: find src -name "*.ts" -type f

Step 2: Extract types and comments
  Request: "Generate TypeScript documentation"

Step 3: Create markdown files
  Output: docs/ directory with organized documentation

Step 4: Generate index
  Request: "Create an index of all documented modules"
```

**Usage:**
```bash
claude workflow run generate-docs
```

### Pattern 3: Security Scanning

Automated security checks:

```
Workflow: security-scan

Step 1: Scan dependencies
  Command: npm audit --audit-level=moderate

Step 2: Check .env files
  Request: "Verify no secrets in code"

Step 3: Review permissions
  Request: "Check file permissions and access control"

Step 4: Generate report
  Output: Security findings and recommendations
```

**Usage:**
```bash
claude workflow run security-scan
```

### Pattern 4: Code Review

Automated peer review:

```
Workflow: code-review

Step 1: Get changed files
  Command: git diff main --name-only

Step 2: Ask Claude to review
  Request: "Review these files for quality, performance, security"

Step 3: Generate feedback
  Output: Detailed review comments and suggestions

Step 4: Create PR comment
  MCP: Use mcp-github to post review
```

**Usage:**
```bash
claude workflow run code-review
```

### Pattern 5: Dependency Updates

Automate dependency management:

```
Workflow: update-dependencies

Step 1: Check outdated packages
  Command: npm outdated

Step 2: Update safely
  Request: "Update to latest minor versions, avoid breaking changes"

Step 3: Run tests
  Command: npm test

Step 4: Create PR
  MCP: Use mcp-github to create pull request
```

**Usage:**
```bash
claude workflow run update-dependencies
```

## Creating Custom Workflows

### Basic Workflow Structure

Create a file at `.claude/workflows/my-workflow.md`:

```markdown
# My Custom Workflow

## Description
Describe what this workflow does.

## Trigger
When to run this workflow:
- Manual: claude workflow run my-workflow
- On git hook: pre-commit, post-commit, etc.
- On schedule: Daily, weekly, etc.

## Steps

### Step 1: Analyze
Description of what happens.

### Step 2: Execute
Description of what happens.

### Step 3: Report
Description of what happens.
```

### Advanced Workflow Structure

For complex workflows, use `.claude/workflows/advanced.yaml`:

```yaml
name: Fix and Deploy
description: Fixes code issues and deploys to staging

triggers:
  - manual
  - git_branch: feature/*

steps:
  - id: lint
    type: command
    command: npm run lint
    onError: continue

  - id: fix
    type: claude
    prompt: "Fix all linting errors"
    mode: acceptEdits

  - id: test
    type: command
    command: npm test
    onError: halt

  - id: deploy
    type: mcp
    mcp: mcp-aws
    action: deploy-staging
    requiresApproval: true

  - id: notify
    type: mcp
    mcp: mcp-slack
    action: post-message
    channel: "#engineering"
    message: "Deployed to staging"
```

## Using Workflows

### Running Built-in Workflows

Claude Code comes with workflows. List and run them:

```bash
# List all available workflows
claude workflow list

# Run a workflow
claude workflow run fix-and-test

# Run with parameters
claude workflow run fix-and-test --args="--verbose"
```

### Running Custom Workflows

Workflows you create are automatically discoverable:

```bash
# List custom workflows (in .claude/workflows/)
claude workflow list --custom

# Run your workflow
claude workflow run my-custom-workflow
```

### Workflow Execution

When you run a workflow, Claude:

1. **Reads the workflow definition** (.claude/workflows/)
2. **Executes each step** in sequence
3. **Handles errors** according to configuration (continue or halt)
4. **Reports progress** as it goes
5. **Summarizes results** when complete

Example output:

```
Starting workflow: fix-and-test

Step 1/4: Run linter
  Command: eslint src/
  Result: Found 12 issues
  Time: 3s

Step 2/4: Fix issues
  Request: Review lint output and fix
  Claude: [Fixes ESLint errors]
  Files modified: 8
  Time: 25s

Step 3/4: Run tests
  Command: npm test
  Result: All tests passed (127 tests)
  Time: 12s

Step 4/4: Report results
  Summary: ✓ Lint fixed, ✓ Tests passed
  Time: 2s

Total time: 42s
Status: SUCCESS
```

## Powerful Workflow Combinations

### Combination 1: Code Quality Pipeline

Chain: Lint → Format → Type Check → Test

```bash
claude workflow run code-quality
```

Automated quality assurance without manual intervention.

### Combination 2: Release Preparation

Chain: Dependency Check → Security Scan → Build → Test → Generate Changelog

```bash
claude workflow run prepare-release
```

Ensures code is production-ready before release.

### Combination 3: PR Automation

Chain: Run Tests → Generate Review → Create PR → Post to Slack

```bash
claude workflow run create-pull-request
```

End-to-end pull request creation with automated checks.

### Combination 4: Documentation Sync

Chain: Generate Docs → Commit Changes → Post Update → Create PR

```bash
claude workflow run sync-documentation
```

Keep documentation always in sync with code.

### Combination 5: Deployment Pipeline

Chain: Run Tests → Build → Deploy to Staging → Run E2E Tests → Deploy to Production

```bash
claude workflow run deploy-production
```

Automated deployment with safety checks.

## Workflow Best Practices

**Do:**
- Start workflows with the simplest version
- Test workflows on non-critical code first
- Document workflow purpose and steps clearly
- Set error handling (continue vs halt)
- Make workflows idempotent (safe to run repeatedly)
- Version control workflow definitions (.claude/workflows/)
- Use meaningful step names and descriptions
- Add pause points for manual review if needed

**Don't:**
- Create overly complex workflows (hard to debug)
- Run destructive operations without approval
- Assume workflows will always succeed (handle errors)
- Create workflows without testing them first
- Use workflows for sensitive operations without review
- Neglect to document what workflows do
- Chain too many MCPs (slow and unreliable)

## Error Handling in Workflows

### Continue on Error

Workflow continues even if a step fails:

```yaml
- id: lint
  type: command
  command: npm run lint
  onError: continue    # Continue to next step
```

**Use when:** Non-critical steps or informational checks.

### Halt on Error

Workflow stops if a step fails:

```yaml
- id: test
  type: command
  command: npm test
  onError: halt        # Stop entire workflow
```

**Use when:** Critical steps like tests or security checks.

### Skip on Condition

Skip steps based on conditions:

```yaml
- id: deploy
  type: mcp
  mcp: mcp-aws
  action: deploy
  onlyIf: "branch == main"   # Only deploy from main
```

## Sharing Workflows

Share workflows with team:

```bash
# Export workflow
claude workflow export my-workflow > my-workflow.json

# Share the file in your team repo or docs
# Team members can import it
claude workflow import my-workflow.json
```

Workflows in `.claude/workflows/` are automatically shared with your team (via version control).

## Troubleshooting Workflows

### Workflow Not Found

**Problem:** `Error: Workflow 'my-workflow' not found`

**Solutions:**
1. Check file exists: `.claude/workflows/my-workflow.md`
2. Check spelling and case
3. List workflows: `claude workflow list`

### Workflow Fails at Step

**Problem:** Workflow halts with error at Step 3

**Solutions:**
1. Check error message
2. Run that step manually to debug
3. Review error handling (onError: continue vs halt)
4. Check step prerequisites are met

### Slow Workflow Execution

**Problem:** Workflow takes too long to run

**Solutions:**
1. Remove unnecessary steps
2. Run steps in parallel if possible (not default)
3. Add caching for command results
4. Check individual step timing with `claude workflow run --timing`

## Workflow Automation Examples

### Example 1: Weekly Code Cleanup

```yaml
name: Weekly Code Cleanup
schedule: "0 9 * * 1"  # Every Monday at 9 AM

steps:
  - id: scan
    type: command
    command: eslint src/ --report-unused-disable-directives

  - id: fix
    type: claude
    prompt: "Remove unused eslint-disable comments"
    mode: acceptEdits

  - id: format
    type: command
    command: prettier --write src/

  - id: commit
    type: command
    command: git add . && git commit -m "chore: automated code cleanup"

  - id: push
    type: command
    command: git push
```

### Example 2: Automated Release

```yaml
name: Release
trigger: manual

steps:
  - id: test
    type: command
    command: npm test
    onError: halt

  - id: build
    type: command
    command: npm run build
    onError: halt

  - id: version
    type: claude
    prompt: "Update version in package.json, follow semver"
    mode: acceptEdits

  - id: changelog
    type: claude
    prompt: "Generate CHANGELOG entry for new version"
    mode: acceptEdits

  - id: publish
    type: command
    command: npm publish
    requiresApproval: true

  - id: tag
    type: command
    command: git tag v$(jq -r .version package.json) && git push --tags
```

## Gotchas

**Gotcha 1: Workflows are sequential by default**

Steps run one at a time, not in parallel. This can be slow for complex workflows.

**Gotcha 2: Each step has fresh context**

Context doesn't carry between steps. If Step 1 loads files, Step 2 might not see them.

**Gotcha 3: Commands must exist locally**

Workflows run commands on your machine. npm, python, git, etc. must be installed and in PATH.

**Gotcha 4: MCPs add latency**

MCPs (mcp-github, mcp-slack, etc.) require network calls. Workflows with many MCPs are slow.

**Gotcha 5: Workflow state is not persistent**

If a workflow fails halfway, rerunning starts from Step 1. No resume capability.

## Summary

Workflow automation chains Claude Code commands together:

1. **Create:** Define workflows in `.claude/workflows/`
2. **Test:** Run workflows on non-critical code first
3. **Use:** `claude workflow run workflow-name`
4. **Share:** Commit .claude/workflows/ to version control
5. **Monitor:** Check timing and error handling

Common workflows:
- Lint → Fix → Test
- Generate documentation
- Security scanning
- Code review
- Dependency updates
- Release preparation

Workflows save time, ensure consistency, and enable complex automation that would be tedious to do manually.

For more: Check the workflows directory for examples and templates.
