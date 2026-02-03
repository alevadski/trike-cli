# Model Context Protocol (MCP) - Complete Guide

## Table of Contents
- [What Are MCPs?](#what-are-mcps)
- [Why MCPs Matter](#why-mcps-matter)
- [How MCPs Work](#how-mcps-work)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Popular MCPs Reference](#popular-mcps-reference)
- [Troubleshooting](#troubleshooting)
- [Practice Exercise](#practice-exercise)

---

## What Are MCPs?

**MCPs (Model Context Protocol servers)** are specialized tools that extend Claude's capabilities by connecting AI assistants to external data sources, systems, and applications. They are open-standard integrations that allow Claude to access and interact with information and services beyond its built-in knowledge.

Think of MCPs as "adapters" or "connectors" that bridge Claude with the rest of your digital ecosystem—whether that's your GitHub repositories, Slack workspace, databases, file systems, or custom APIs.

### Key Characteristics

- **Open Standard**: MCPs follow a unified protocol, eliminating fragmented integrations
- **Bidirectional Communication**: MCPs enable both reading data from systems and writing/modifying data
- **Tool & Resource Based**: MCPs expose capabilities through tools (actions) and resources (data)
- **Secure**: Connections are authenticated and controlled through configuration files
- **Extensible**: Anyone can build custom MCPs for their specific needs

---

## Why MCPs Matter

### Problems MCPs Solve

1. **Context Fragmentation**: Without MCPs, you'd need to manually copy/paste information between systems and Claude
2. **Real-Time Integration**: MCPs provide live access to current data instead of outdated snapshots
3. **Workflow Automation**: Combine Claude's reasoning with your tools for powerful automation
4. **Enterprise Integration**: Safely connect AI to business systems with proper authentication and permissions
5. **Custom Workflows**: Build specialized AI experiences tailored to your specific needs

### Benefits

- **Better AI Responses**: Claude has access to current, relevant context
- **Reduced Manual Work**: Automate repetitive tasks like information gathering
- **Unified Experience**: One interface (Claude) for accessing multiple systems
- **Enterprise-Ready**: Proper security, authentication, and audit trails
- **Scalable**: Add new MCPs as your needs evolve

---

## How MCPs Work

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Claude Client                          │
│              (Desktop, Web, or CLI Application)             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ MCP Protocol (JSON-RPC)
                     │
┌────────────────────▼────────────────────────────────────────┐
│           MCP Servers (Multiple Connected)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  GitHub MCP  │  │ Slack MCP    │  │ Postgres MCP │      │
│  │ (Tools/Data) │  │(Tools/Data)  │  │(Tools/Data)  │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
└─────────┼──────────────────┼──────────────────┼──────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │   GitHub     │  │    Slack     │  │  PostgreSQL  │
    │   Repository │  │   Workspace  │  │   Database   │
    └──────────────┘  └──────────────┘  └──────────────┘
```

### Request/Response Flow

1. **User Request**: You ask Claude to perform a task that requires external data or action
2. **Tool Selection**: Claude determines which MCP tool is needed
3. **Tool Invocation**: Claude calls the MCP server with parameters
4. **External Execution**: The MCP server executes the action on the external system
5. **Response**: The MCP server returns data/results to Claude
6. **Processing**: Claude processes the response and provides you with the answer

### Example Flow

```
User: "What pull requests are open in my project?"
  ↓
Claude: "I'll use the GitHub MCP to fetch open PRs"
  ↓
MCP Call: github.list_pull_requests(repo="my-project", state="open")
  ↓
GitHub: Returns 3 open PRs with details
  ↓
Claude: "You have 3 open pull requests..." (summarized with details)
```

---

## Installation & Setup

### Prerequisites

- Claude CLI (`claude` command available in terminal)
- GitHub account (if using GitHub MCP, etc.)
- Appropriate credentials/tokens for the MCPs you want to use

### Installing MCPs

Use the `claude mcp add` command (NOT `install`):

```bash
# Basic syntax
claude mcp add [mcp-name]

# Examples
claude mcp add github
claude mcp add slack
claude mcp add postgres
claude mcp add filesystem

# With parameters
claude mcp add postgres --connection-string "postgresql://user:pass@localhost/db"
```

### Listing Installed MCPs

```bash
claude mcp list
```

### Removing MCPs

```bash
claude mcp remove [mcp-name]
```

### Viewing MCP Details

```bash
claude mcp describe [mcp-name]
```

---

## Configuration

### Configuration Files

MCPs are configured through two main files:

#### 1. `~/.claude.json` (Global Claude Configuration)

Located in your home directory, this is Claude's main configuration file that references MCPs:

```json
{
  "version": "1.0",
  "mcps": [
    {
      "name": "github",
      "enabled": true,
      "version": "latest"
    },
    {
      "name": "filesystem",
      "enabled": true,
      "version": "1.2.0",
      "settings": {
        "root_path": "/Users/yourname/projects"
      }
    }
  ]
}
```

#### 2. `.mcp.json` (Project-Level Configuration)

Create this file in your project root to configure MCPs specific to that project:

```json
{
  "mcps": [
    {
      "name": "github",
      "config": {
        "repo": "my-org/my-project",
        "token_env": "GITHUB_TOKEN"
      }
    },
    {
      "name": "postgres",
      "config": {
        "host": "localhost",
        "port": 5432,
        "database": "myapp",
        "user_env": "DB_USER",
        "password_env": "DB_PASSWORD"
      }
    }
  ]
}
```

### Environment Variables

MCPs can use environment variables for sensitive data. Set them in your shell:

```bash
# Add to ~/.bash_profile, ~/.zshrc, or similar
export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxx"
export SLACK_TOKEN="xoxb-xxxxxxxxxxxxxxxxxxxx"
export DATABASE_URL="postgresql://user:pass@localhost/db"
```

Then reference them in configuration:

```json
{
  "name": "github",
  "token_env": "GITHUB_TOKEN"
}
```

### Configuration Priority

Claude checks configuration in this order:
1. `.mcp.json` (current project directory)
2. `~/.claude.json` (global user config)
3. Environment variables
4. Default settings

---

## Popular MCPs Reference

### Official/Widely-Used MCPs

#### 1. **GitHub** - Repository & Issue Management
- **Purpose**: Access GitHub repositories, create/manage issues, pull requests, and repositories
- **Key Tools**:
  - `search_repositories` - Find repositories
  - `list_issues` - Get open issues
  - `list_pull_requests` - View pull requests
  - `create_issue` - Create new issues
  - `create_pull_request` - Create PR with description
- **Installation**: `claude mcp add github`
- **Config Required**: GitHub token (personal access token)
- **Use Cases**: Automating issue triage, PR reviews, repository search

#### 2. **Filesystem** - Secure File Operations
- **Purpose**: Read, write, and manage files safely with sandboxing
- **Key Tools**:
  - `read_file` - Read file contents
  - `write_file` - Write to file
  - `list_directory` - List directory contents
  - `create_directory` - Create folders
  - `delete_file` - Remove files (with confirmation)
- **Installation**: `claude mcp add filesystem`
- **Config Required**: Root path to restrict access
- **Use Cases**: Local file management, configuration updates, code generation

#### 3. **Postgres** - PostgreSQL Database Access
- **Purpose**: Query and modify PostgreSQL databases
- **Key Tools**:
  - `query` - Execute SELECT queries
  - `insert` - Add records
  - `update` - Modify records
  - `delete` - Remove records
  - `describe_table` - Get schema information
- **Installation**: `claude mcp add postgres`
- **Config Required**: Database URL, credentials
- **Use Cases**: Data analysis, database maintenance, automated reporting

#### 4. **Slack** - Workspace Integration
- **Purpose**: Send messages, manage channels, read conversation history
- **Key Tools**:
  - `send_message` - Post messages to channels
  - `list_channels` - View available channels
  - `get_channel_history` - Read past messages
  - `create_channel` - Make new channels
  - `list_users` - View workspace members
- **Installation**: `claude mcp add slack`
- **Config Required**: Slack bot token
- **Use Cases**: Automated notifications, channel management, conversation retrieval

#### 5. **Git** - Git Repository Operations
- **Purpose**: Read Git repositories, search history, inspect commits
- **Key Tools**:
  - `list_commits` - View commit history
  - `search_commits` - Find commits by message
  - `get_diff` - Compare versions
  - `get_file_contents` - Read file at specific commits
  - `list_branches` - View branches
- **Installation**: `claude mcp add git`
- **Config Required**: None (works with local repos)
- **Use Cases**: Code review automation, commit analysis, change tracking

#### 6. **Google Drive** - File Storage & Collaboration
- **Purpose**: Access files stored on Google Drive
- **Key Tools**:
  - `list_files` - Browse drive contents
  - `read_file` - Read file contents
  - `create_file` - Upload new files
  - `search_files` - Find files by name/content
  - `share_file` - Manage sharing permissions
- **Installation**: `claude mcp add google-drive`
- **Config Required**: Google Drive API credentials
- **Use Cases**: Document analysis, automated file organization, report generation

#### 7. **Fetch (Web)** - Web Content Retrieval
- **Purpose**: Download and parse web pages, convert HTML to readable content
- **Key Tools**:
  - `fetch_url` - Get web page content
  - `fetch_and_parse` - Download and convert HTML
  - `fetch_multiple` - Get multiple URLs efficiently
- **Installation**: `claude mcp add fetch`
- **Config Required**: None
- **Use Cases**: Web scraping, news aggregation, content analysis

#### 8. **Sequential Thinking** - Complex Problem Solving
- **Purpose**: Enable step-by-step reasoning for complex problems
- **Key Tools**:
  - `think` - Start a thinking session
  - `step` - Execute single thinking step
  - `conclude` - Finalize reasoning
- **Installation**: `claude mcp add sequential-thinking`
- **Config Required**: None
- **Use Cases**: Debugging, strategic planning, complex analysis

#### 9. **Memory** - Knowledge Graph & Persistence
- **Purpose**: Store and retrieve persistent knowledge between conversations
- **Key Tools**:
  - `save_memory` - Store information
  - `retrieve_memory` - Fetch stored facts
  - `update_relationship` - Link related items
  - `query_knowledge` - Search memory graph
- **Installation**: `claude mcp add memory`
- **Config Required**: Storage location (optional)
- **Use Cases**: Long-term learning, context persistence, knowledge management

#### 10. **Puppeteer** - Browser Automation
- **Purpose**: Control a headless browser for complex web interactions
- **Key Tools**:
  - `navigate` - Go to URL
  - `click` - Click elements
  - `type` - Enter text
  - `screenshot` - Capture page
  - `wait_for_selector` - Wait for elements
- **Installation**: `claude mcp add puppeteer`
- **Config Required**: None
- **Use Cases**: Web testing automation, form submission, interactive sites

#### 11. **Docker** - Container Management
- **Purpose**: Build, run, and manage Docker containers
- **Key Tools**:
  - `list_containers` - View running containers
  - `build_image` - Build Docker images
  - `run_container` - Start containers
  - `execute_command` - Run commands in containers
  - `stop_container` - Stop containers
- **Installation**: `claude mcp add docker`
- **Config Required**: Docker daemon access
- **Use Cases**: Development environment setup, automated testing, deployment

#### 12. **Zapier** - 7000+ App Integrations
- **Purpose**: Connect to thousands of applications through Zapier
- **Key Tools**:
  - `find_app` - Search available integrations
  - `execute_action` - Run app actions
  - `search_data` - Search app data
- **Installation**: `claude mcp add zapier`
- **Config Required**: Zapier API key
- **Use Cases**: Cross-platform automation, workflow orchestration

#### 13. **Everything (Reference Server)** - Testing & Examples
- **Purpose**: Reference implementation with test prompts, resources, and tools
- **Key Tools**: Includes sample implementations of various tool types
- **Installation**: `claude mcp add everything`
- **Config Required**: None
- **Use Cases**: Learning MCP, testing integrations, development

#### 14. **Vectara** - RAG & Vector Search
- **Purpose**: Semantic search and retrieval augmented generation
- **Key Tools**:
  - `index_documents` - Add documents
  - `semantic_search` - Search by meaning
  - `chunk_query` - Split query for relevance
- **Installation**: `claude mcp add vectara`
- **Config Required**: Vectara API credentials
- **Use Cases**: Knowledge base search, document analysis, RAG pipelines

#### 15. **S3 / Object Storage** - Cloud File Storage
- **Purpose**: Access files in Amazon S3 or compatible storage
- **Key Tools**:
  - `list_objects` - Browse bucket contents
  - `get_object` - Download files
  - `put_object` - Upload files
  - `delete_object` - Remove files
- **Installation**: `claude mcp add s3`
- **Config Required**: AWS credentials, bucket name
- **Use Cases**: Data pipeline management, backup automation, file archival

---

## Troubleshooting

### Common Issues & Solutions

#### Issue: MCP Not Found
```
Error: MCP 'github' not found
```
**Solution**:
```bash
# Check installed MCPs
claude mcp list

# Install the MCP
claude mcp add github

# Verify installation
claude mcp describe github
```

#### Issue: Authentication Failed
```
Error: Authentication failed for MCP 'github'
```
**Solution**:
1. Verify token is set in environment:
   ```bash
   echo $GITHUB_TOKEN
   ```
2. Check token has correct permissions
3. Update configuration in `~/.claude.json`:
   ```json
   {
     "name": "github",
     "token_env": "GITHUB_TOKEN"
   }
   ```

#### Issue: Permission Denied (Filesystem MCP)
```
Error: Access denied to path '/etc/passwd'
```
**Solution**:
The filesystem MCP restricts access to a root path. Configure it properly:
```json
{
  "name": "filesystem",
  "settings": {
    "root_path": "/Users/yourname/projects"
  }
}
```

#### Issue: Connection Timeout
```
Error: Connection to MCP server timed out
```
**Solution**:
1. Verify the service is running (e.g., database, Slack app)
2. Check network connectivity
3. Verify credentials are still valid
4. Restart the MCP: `claude mcp remove [name] && claude mcp add [name]`

#### Issue: Configuration Not Loading
```
Warning: .mcp.json configuration ignored
```
**Solution**:
1. Ensure `.mcp.json` is in project root (same level as `.git`, `package.json`, etc.)
2. Validate JSON syntax using online validator
3. Check file permissions: `chmod 644 .mcp.json`
4. Verify MCP is installed globally first

#### Issue: Rate Limiting
```
Error: Rate limit exceeded
```
**Solution**:
1. Check API rate limits for the service
2. Add delays between requests
3. Use batch operations if available
4. Upgrade API tier if needed

### Debugging Tips

1. **Enable Verbose Logging**:
   ```bash
   claude mcp list --verbose
   ```

2. **Test MCP Connection**:
   ```bash
   claude mcp describe [mcp-name]
   ```

3. **Check Configuration Syntax**:
   ```bash
   # Validate JSON
   cat ~/.claude.json | python -m json.tool
   ```

4. **View System Logs**:
   ```bash
   # On macOS
   log stream --predicate 'process == "claude"'

   # On Linux
   journalctl -u claude -f
   ```

---

## Practice Exercise

### Scenario: Multi-System Integration Workflow

**Goal**: Build a workflow that uses multiple MCPs to create a GitHub issue from a Slack message and update your database.

### Steps

#### Step 1: Install Required MCPs
```bash
claude mcp add github
claude mcp add slack
claude mcp add postgres
```

#### Step 2: Configure Project
Create `.mcp.json` in a new project directory:
```json
{
  "mcps": [
    {
      "name": "github",
      "config": {
        "repo": "your-org/your-repo",
        "token_env": "GITHUB_TOKEN"
      }
    },
    {
      "name": "slack",
      "config": {
        "token_env": "SLACK_TOKEN"
      }
    },
    {
      "name": "postgres",
      "config": {
        "connection_string_env": "DATABASE_URL"
      }
    }
  ]
}
```

#### Step 3: Set Environment Variables
```bash
export GITHUB_TOKEN="your_github_token"
export SLACK_TOKEN="your_slack_token"
export DATABASE_URL="postgresql://user:pass@localhost/mydb"
```

#### Step 4: Test Each MCP
```bash
# Test GitHub
claude --prompt "List my open issues" # Uses GitHub MCP

# Test Slack
claude --prompt "What's the latest message in #engineering?" # Uses Slack MCP

# Test Postgres
claude --prompt "How many users are in my database?" # Uses Postgres MCP
```

#### Step 5: Create Integration Workflow
Ask Claude to:
```
Create a GitHub issue from the latest message in #bugs Slack channel.
Title should be the first 50 characters of the message.
Include the full message in the description.
Label it as 'from-slack'.
Then record this in my database with: channel, message_id, github_issue_id, timestamp.
```

#### Step 6: Verify
Check:
- New issue appears on GitHub
- Database has new record
- Slack notification shows success

### Expected Outcome
You now understand how to:
- Install and configure multiple MCPs
- Coordinate data flow between systems
- Create automated workflows
- Handle credentials securely

### Next Challenges
- Add error handling if an MCP fails
- Schedule this workflow to run periodically
- Add retry logic for failed operations
- Create a monitoring dashboard

---

## Additional Resources

### Official Documentation
- [Model Context Protocol Official Docs](https://modelcontextprotocol.io)
- [Anthropic MCP Announcement](https://www.anthropic.com/news/model-context-protocol)

### Community & Examples
- [Official MCP Servers Repository](https://github.com/modelcontextprotocol/servers)
- [MCP Server Examples](https://modelcontextprotocol.io/examples)

### Learning & Community
- Community MCP implementations on GitHub
- Discussions and support in Anthropic forums

---

## Summary

Model Context Protocol (MCP) servers are the bridge between Claude and your digital ecosystem. They:

1. **Extend Claude's capabilities** beyond built-in knowledge
2. **Provide real-time access** to external data and services
3. **Enable automation** by connecting multiple systems
4. **Keep information current** through live integrations
5. **Maintain security** through proper authentication and permissions

Start with the MCPs most relevant to your workflow, master configuration, and gradually build more complex integrations as needed.
