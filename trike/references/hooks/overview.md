# Hooks Reference Guide

## What Are Hooks?

Hooks are **automation triggers** that allow you to execute custom code at specific points in Claude Code's workflow. They enable you to intercept, monitor, and modify behavior at critical moments during tool execution and agent operation.

Think of hooks as event listeners that respond to specific actions:
- When you submit a prompt
- Before a tool is executed
- After a tool completes
- When the agent stops
- When a subagent stops

## Storage Location

Hooks are configured in:
```
~/.claude/settings.json
```

**Important:** Hooks are NOT stored in a separate `~/.claude/hooks/` directory. All hook configuration lives within the main settings file.

## Supported Hooks

Claude Code supports the following hook types:

### 1. UserPromptSubmit
**When it triggers:** After the user submits a prompt but before Claude processes it.

**Use cases:**
- Log all user inputs for audit trails
- Pre-process or validate user messages
- Add context or metadata to prompts
- Track interaction history

**Configuration structure:**
```json
{
  "hooks": {
    "UserPromptSubmit": {
      "command": "script.sh",
      "args": ["--log", "--validate"]
    }
  }
}
```

### 2. PreToolUse
**When it triggers:** Immediately before a tool is about to be executed.

**Use cases:**
- Validate tool parameters before execution
- Log which tools are being used and why
- Add instrumentation/metrics collection
- Enforce tool usage policies
- Block dangerous operations

**Configuration structure:**
```json
{
  "hooks": {
    "PreToolUse": {
      "command": "validate_tool.sh",
      "args": ["--strict"]
    }
  }
}
```

### 3. PostToolUse
**When it triggers:** After a tool finishes executing and returns results.

**Use cases:**
- Process or transform tool outputs
- Log execution results and performance metrics
- Detect and handle errors
- Trigger dependent actions
- Store tool execution history

**Configuration structure:**
```json
{
  "hooks": {
    "PostToolUse": {
      "command": "process_results.sh",
      "args": ["--analyze"]
    }
  }
}
```

### 4. Stop
**When it triggers:** When the main Claude Code agent stops execution.

**Use cases:**
- Clean up resources
- Generate final reports
- Archive conversation logs
- Notify external systems of completion
- Perform teardown operations

**Configuration structure:**
```json
{
  "hooks": {
    "Stop": {
      "command": "cleanup.sh",
      "args": ["--archive"]
    }
  }
}
```

### 5. SubagentStop
**When it triggers:** When a subagent completes and stops execution.

**Use cases:**
- Monitor subagent performance
- Aggregate results from multiple subagents
- Handle subagent failures
- Update parent agent state
- Log subagent execution details

**Configuration structure:**
```json
{
  "hooks": {
    "SubagentStop": {
      "command": "subagent_handler.sh",
      "args": ["--aggregate"]
    }
  }
}
```

## Important Clarification: Git Hooks Do NOT Exist

**Pre-commit and post-commit hooks are NOT supported in Claude Code.**

If you're looking for git-style hooks (pre-commit, post-commit, pre-push, etc.), those are **git features** managed by `.git/hooks/` in your repository, not Claude Code features. Claude Code hooks are different—they monitor Claude's internal workflow, not git operations.

For git hooks, see your git configuration. For Claude Code automation, use the hooks documented above.

## Complete Configuration Example

Here's a complete `.claude/settings.json` with multiple hooks configured:

```json
{
  "model": "claude-opus-4-5-20251101",
  "hooks": {
    "UserPromptSubmit": {
      "command": "/usr/local/bin/audit_prompt.sh",
      "args": ["--log", "--timestamp"]
    },
    "PreToolUse": {
      "command": "/usr/local/bin/validate_tool.sh",
      "args": ["--strict", "--security-check"]
    },
    "PostToolUse": {
      "command": "/usr/local/bin/log_results.sh",
      "args": ["--metrics", "--verbose"]
    },
    "Stop": {
      "command": "/usr/local/bin/cleanup.sh",
      "args": ["--archive", "--compress"]
    },
    "SubagentStop": {
      "command": "/usr/local/bin/subagent_monitor.sh",
      "args": ["--report"]
    }
  }
}
```

## Hook Execution Details

### Hook Scripts

Hook commands should be:
- **Executable scripts** (shell scripts, Python scripts, or compiled binaries)
- **Fast** (hooks should complete quickly to avoid blocking the workflow)
- **Robust** (handle edge cases and errors gracefully)

### Passing Data to Hooks

Data is passed to hook scripts via:
1. **Command line arguments** (specified in the `args` array)
2. **Standard input (stdin)** (hook data is provided as JSON)
3. **Environment variables** (context about the current operation)

### Hook Return Values

Hook scripts should:
- **Exit with code 0** for success
- **Exit with non-zero code** to signal failure
- **Write output to stdout** for logging/display
- **Write errors to stderr** for error logging

## Common Use Cases

### Audit and Compliance
Track all tool usage and user inputs for compliance audits:

```json
{
  "hooks": {
    "UserPromptSubmit": {
      "command": "/opt/audit/log_prompt.sh",
      "args": ["--compliance", "--strict"]
    },
    "PreToolUse": {
      "command": "/opt/audit/log_tool_request.sh",
      "args": ["--track-all"]
    }
  }
}
```

### Performance Monitoring
Monitor tool execution performance:

```json
{
  "hooks": {
    "PreToolUse": {
      "command": "/opt/monitoring/start_timer.sh"
    },
    "PostToolUse": {
      "command": "/opt/monitoring/record_metrics.sh",
      "args": ["--timing", "--resource-usage"]
    }
  }
}
```

### Security and Validation
Enforce security policies before tool execution:

```json
{
  "hooks": {
    "PreToolUse": {
      "command": "/opt/security/validate_tool.sh",
      "args": ["--block-dangerous", "--scan-params"]
    }
  }
}
```

### Logging and Archiving
Comprehensive logging of all operations:

```json
{
  "hooks": {
    "Stop": {
      "command": "/opt/logging/archive_session.sh",
      "args": ["--compress", "--timestamp", "--encrypt"]
    }
  }
}
```

## Practice Exercise

### Goal
Set up hooks to log when tools are used and track execution time.

### Steps

1. **Create a logging directory:**
   ```bash
   mkdir -p ~/.claude/logs
   ```

2. **Create a PreToolUse hook script:**
   ```bash
   #!/bin/bash
   # File: ~/.claude/hooks/start_tool_log.sh

   echo "$(date): Starting tool execution" >> ~/.claude/logs/tools.log
   ```

3. **Create a PostToolUse hook script:**
   ```bash
   #!/bin/bash
   # File: ~/.claude/hooks/end_tool_log.sh

   echo "$(date): Completed tool execution" >> ~/.claude/logs/tools.log
   ```

4. **Make scripts executable:**
   ```bash
   chmod +x ~/.claude/hooks/start_tool_log.sh
   chmod +x ~/.claude/hooks/end_tool_log.sh
   ```

5. **Update ~/.claude/settings.json:**
   ```json
   {
     "hooks": {
       "PreToolUse": {
         "command": "~/.claude/hooks/start_tool_log.sh"
       },
       "PostToolUse": {
         "command": "~/.claude/hooks/end_tool_log.sh"
       }
     }
   }
   ```

6. **Verify it works:**
   Run a Claude Code command that uses a tool, then check:
   ```bash
   cat ~/.claude/logs/tools.log
   ```

## Troubleshooting Hooks

### Hooks not executing?
- Verify hook script has executable permissions (`chmod +x`)
- Check that the command path is correct and absolute
- Review hook script for errors (test it manually)
- Check Claude Code logs for hook execution errors

### Hook is slowing down operations?
- Optimize your hook script for speed
- Consider using background processes
- Reduce verbose logging in hooks
- Consider conditional hook execution

### Hook scripts failing?
- Test the script independently from Claude Code
- Ensure proper error handling in the script
- Check file permissions and directory access
- Verify paths are absolute, not relative

## Best Practices

1. **Keep hooks fast** - They execute synchronously and block the workflow
2. **Make paths absolute** - Use full paths, not relative paths
3. **Handle errors gracefully** - Your scripts should not crash Claude Code
4. **Log everything** - Use hooks for observability and debugging
5. **Test independently** - Always test hook scripts before deployment
6. **Use meaningful names** - Name hook scripts clearly based on their purpose
7. **Document your hooks** - Keep notes on why each hook exists

## Related References

- [Settings Configuration](/references/_index.md)
- [Tool Usage](/references/util/)
- [Agent Architecture](/references/)
