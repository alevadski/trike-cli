# Installing and Configuring MCPs

## What They Are

MCPs (Model Context Protocols) are integrations that connect Claude Code to external tools and services. They enable Claude to interact with APIs, databases, version control systems, cloud platforms, and more.

Think of MCPs as bridges between Claude and the external world. While skills are self-contained workflows, MCPs let Claude reach out to external systems like GitHub, Slack, Jira, AWS, and databases.

## Why This Matters

**External Integration:** MCPs let Claude access real-time data from external systems without you manually copying/pasting information.

**Automation:** Claude can create pull requests, post to Slack, update Jira tickets, or deploy to the cloud directly.

**Real-Time Data:** Instead of working with stale information, Claude always has current data from your tools.

**Reduced Manual Steps:** Fewer copy-paste operations, fewer context switches between tools.

**Enterprise Ready:** Connect to internal tools, APIs, and systems your organization uses.

## How to Install MCPs

### Step 1: Find an MCP

MCPs can be found in several places:

```
Official Registry: https://mcp.so
GitHub: Search "mcp" + tool name (e.g., "mcp github")
npm Registry: Search mcp-* packages
```

Popular MCPs:
- **mcp-github:** GitHub integration (read repos, create PRs, manage issues)
- **mcp-slack:** Slack integration (send messages, read conversations)
- **mcp-jira:** Jira integration (create issues, update tickets)
- **mcp-aws:** AWS integration (manage cloud resources)
- **mcp-postgres:** PostgreSQL integration (query databases)
- **mcp-slack-teams:** Microsoft Teams integration

### Step 2: Install the MCP

MCPs are installed via the `claude mcp add` command:

```bash
# Install an MCP from the registry
claude mcp add mcp-github

# Install with specific version
claude mcp add mcp-github@2.0.0

# Install from GitHub repository
claude mcp add git+https://github.com/org/mcp-custom.git

# Install from npm
claude mcp add npm:mcp-custom
```

This command:
1. Downloads the MCP package
2. Registers it in your Claude Code configuration
3. Prompts for required credentials/API keys
4. Tests the connection

### Step 3: Configure the MCP

MCPs need configuration to connect to external services. Configuration happens in two places:

#### A. During Installation (Interactive)

When you run `claude mcp add`, you're prompted for credentials:

```
Installing mcp-github...

GitHub Authentication
  Enter your GitHub personal access token: [hidden]
  Repository access level: [read/write]
  Permissions required: repo, gist

Testing connection... ✓ Success!
```

#### B. Via ~/.claude.json (Manual)

MCPs are stored in `~/.claude.json`:

```json
{
  "mcps": {
    "mcp-github": {
      "version": "2.0.0",
      "config": {
        "token": "ghp_xxxxxxxxxxxx",
        "accessLevel": "read-write"
      }
    },
    "mcp-slack": {
      "version": "1.5.0",
      "config": {
        "token": "xoxb-xxxxxxxxxxxx",
        "workspace": "my-workspace"
      }
    }
  }
}
```

Never commit this file to version control! Add it to `.gitignore`.

### Step 4: Verify Installation

Check that MCPs are installed and configured:

```bash
# List all installed MCPs
claude mcp list

# Output:
# Installed MCPs:
# ✓ mcp-github (2.0.0) - GitHub integration
# ✓ mcp-slack (1.5.0) - Slack integration
# ✗ mcp-aws (3.0.0) - AWS integration [UNCONFIGURED]

# Test a specific MCP
claude mcp test mcp-github

# Output:
# Testing mcp-github...
# ✓ Authentication successful
# ✓ API connectivity verified
# ✓ Permissions: repo, gist
```

## Common MCPs and Configuration

### mcp-github

**What it does:** Read/write access to GitHub repositories, create PRs, manage issues.

**Install:**
```bash
claude mcp add mcp-github
```

**Configuration (~/.claude.json):**
```json
{
  "mcps": {
    "mcp-github": {
      "config": {
        "token": "ghp_...",
        "owner": "your-username",
        "repo": "your-repo"
      }
    }
  }
}
```

**Token generation:**
1. Go to https://github.com/settings/tokens
2. Create "Personal access token (classic)"
3. Grant: repo, gist, user:email
4. Copy token and add to config

**Usage example:**
```
You: "Use mcp-github to create a pull request with my changes"
Claude: [Creates PR on your behalf, links the MCP to handle it]
```

### mcp-slack

**What it does:** Send messages, post to channels, read conversation history.

**Install:**
```bash
claude mcp add mcp-slack
```

**Configuration (~/.claude.json):**
```json
{
  "mcps": {
    "mcp-slack": {
      "config": {
        "token": "xoxb-...",
        "workspace": "my-workspace"
      }
    }
  }
}
```

**Token generation:**
1. Go to https://api.slack.com/apps
2. Create "New App" > "From scratch"
3. Add "Bot Token Scopes": chat:write, channels:read
4. Create "Bot User OAuth Token"
5. Install app to workspace
6. Copy token and add to config

**Usage example:**
```
You: "Use mcp-slack to post a status update to #engineering"
Claude: [Posts message to Slack channel using MCP]
```

### mcp-jira

**What it does:** Create issues, update tickets, search Jira.

**Install:**
```bash
claude mcp add mcp-jira
```

**Configuration (~/.claude.json):**
```json
{
  "mcps": {
    "mcp-jira": {
      "config": {
        "host": "your-company.atlassian.net",
        "email": "you@company.com",
        "apiToken": "...",
        "project": "PROJ"
      }
    }
  }
}
```

**Token generation:**
1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
2. Create "API token"
3. Copy and add to config

**Usage example:**
```
You: "Use mcp-jira to create a bug ticket for the issue we found"
Claude: [Creates Jira ticket, links it in response]
```

### mcp-aws

**What it does:** Deploy applications, manage cloud resources, access S3, EC2, etc.

**Install:**
```bash
claude mcp add mcp-aws
```

**Configuration (~/.claude.json):**
```json
{
  "mcps": {
    "mcp-aws": {
      "config": {
        "region": "us-east-1",
        "credentials": {
          "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
          "secretAccessKey": "..."
        }
      }
    }
  }
}
```

**Credentials setup:**
1. Create IAM user in AWS console
2. Generate access key
3. Grant minimal required permissions
4. Add to config (or use AWS CLI credentials file)

**Usage example:**
```
You: "Use mcp-aws to deploy the application to EC2"
Claude: [Uses MCP to handle AWS deployment]
```

### mcp-postgres

**What it does:** Execute queries, manage databases, migrate schemas.

**Install:**
```bash
claude mcp add mcp-postgres
```

**Configuration (~/.claude.json):**
```json
{
  "mcps": {
    "mcp-postgres": {
      "config": {
        "host": "localhost",
        "port": 5432,
        "database": "myapp",
        "user": "postgres",
        "password": "..."
      }
    }
  }
}
```

**Usage example:**
```
You: "Use mcp-postgres to migrate the users table schema"
Claude: [Connects to database, executes migration]
```

## Best Practices

**Do:**
- Store credentials in ~/.claude.json, never in code
- Test MCPs after installation with `claude mcp test`
- Use minimal permissions (principle of least privilege)
- Keep MCPs updated: `claude mcp update`
- Document which MCPs your project uses
- Review what Claude does before approving actions

**Don't:**
- Commit ~/.claude.json to version control
- Share tokens or API keys
- Use overly broad permissions
- Install MCPs you don't trust
- Assume MCPs will work without testing
- Let Claude make changes to production without review

## MCP Configuration in Projects

For team projects, document MCP requirements in CLAUDE.md:

```markdown
## Required MCPs

This project uses:
- mcp-github (for PR automation)
- mcp-slack (for notifications)
- mcp-postgres (for database migrations)

Setup:
1. claude mcp add mcp-github
2. claude mcp add mcp-slack
3. claude mcp add mcp-postgres
4. Configure credentials in ~/.claude.json
5. Run: claude mcp test
```

## Troubleshooting MCPs

### MCP Not Found

**Problem:** `Error: MCP 'mcp-github' not found`

**Solutions:**
1. Check registry: `claude mcp list`
2. Reinstall: `claude mcp add mcp-github`
3. Verify spelling (case-sensitive)

### Authentication Failed

**Problem:** `Error: GitHub authentication failed`

**Solutions:**
1. Test token: `claude mcp test mcp-github`
2. Verify token has correct permissions
3. Regenerate token if expired
4. Check ~/.claude.json has correct token

### Connection Timeout

**Problem:** `Error: Connection to Slack failed (timeout)`

**Solutions:**
1. Check internet connection
2. Verify API endpoint is accessible
3. Check firewall/proxy settings
4. Try: `claude mcp test mcp-slack --debug`

### Permission Denied

**Problem:** `Error: Insufficient permissions for this action`

**Solutions:**
1. Check token permissions
2. Regenerate token with broader scope
3. Verify IAM/API permissions in external service
4. Contact admin if enterprise system

## Updating MCPs

Keep MCPs current for bug fixes and new features:

```bash
# Update all MCPs
claude mcp update

# Update specific MCP
claude mcp update mcp-github

# Check outdated MCPs
claude mcp outdated
```

## Removing MCPs

When you no longer need an MCP:

```bash
# Remove an MCP
claude mcp remove mcp-github

# This removes from ~/.claude.json
# To fully clean up: rm -rf ~/.claude/mcps/mcp-github
```

## Gotchas

**Gotcha 1: Credentials are sensitive**

Never commit ~/.claude.json. Add to .gitignore:

```
~/.claude.json
.claude.json
.env
```

**Gotcha 2: MCPs need external services**

An MCP only works if the external service is accessible. If GitHub is down, mcp-github won't work.

**Gotcha 3: Token expiration**

Some tokens expire. Regularly rotate:
- GitHub tokens (if using fine-grained)
- AWS credentials
- Slack tokens

**Gotcha 4: Permissions cascade**

Giving Claude broad permissions (like AWS admin access) is risky. Always use minimal permissions:

```
Good: S3 read-only for my-bucket
Bad: Full AWS admin access
```

**Gotcha 5: MCPs are sequential**

MCPs run sequentially, not in parallel. Complex workflows may be slow.

## Summary

MCPs connect Claude to external tools:

1. **Find:** Browse mcp.so or search for "mcp-toolname"
2. **Install:** `claude mcp add mcp-name`
3. **Configure:** Add credentials to ~/.claude.json
4. **Test:** `claude mcp test mcp-name`
5. **Use:** Ask Claude to use the MCP in your workflow

Common MCPs include GitHub, Slack, Jira, AWS, and databases. Always test MCPs after installation and keep credentials secure in ~/.claude.json.

For more: Visit https://mcp.so for the complete MCP registry and documentation.
