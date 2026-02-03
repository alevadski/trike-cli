# Contributing to Trike

Thanks for your interest in contributing! Trike helps experienced developers master Claude Code's advanced features, and contributions that improve that experience are always welcome.

## Project Context

Trike recently pivoted from teaching complete beginners to code, to helping experienced developers master Claude Code. You may see legacy references to "beginners" or "learning to code" - those should be updated to focus on Claude Code mastery for developers.

## How to Contribute

### Reporting Bugs

If you find a bug:
1. Check if it's already reported in [Issues](https://github.com/alevadski/trike-cli/issues)
2. If not, create a new issue with:
   - Clear title describing the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (OS, Node version, Claude Code version)

### Suggesting Features

Feature suggestions are welcome! Please:
1. Check existing issues first
2. Explain the use case
3. Describe how it would help developers master Claude Code
4. Keep the experienced developer audience in mind

### Code Contributions

1. **Fork the repo**
2. **Create a branch** for your feature/fix
3. **Make your changes** following these guidelines:
   - Keep outputs concise, interactive, and engaging
   - Test with real projects and actual Claude Code workflows
   - Follow existing code style
4. **Test thoroughly** - install locally and test the full flow
5. **Submit a PR** with:
   - Clear description of what changed and why
   - Any relevant issue numbers

## Development Setup

```bash
# Clone your fork
git clone https://github.com/alevadski/trike-cli.git
cd trike-cli

# Test local installation
node bin/reinstall.js

# Test in Claude Code
# Open Claude Code and run /trike:start
```

## Code Style

- **Concise outputs**: Commands should be brief and interactive, never walls of text
- **Clear comments**: Explain the "why" not just the "what"
- **Markdown formatting**: Commands use clear step-by-step instructions
- **Developer-focused**: Assume coding proficiency, focus on Claude Code features

## Key Principles

When contributing, keep these in mind:

1. **Brief & Interactive**: Every command output should be scannable and actionable
2. **Real Projects**: Teach features by applying them to user's actual codebase
3. **Personalized Learning**: Use quiz results to skip what users already know
4. **Runtime Loading**: Load reference files when needed, not all upfront
5. **Token Efficiency**: Optimize for context window usage

## Questions?

Open an issue or reach out! We're here to help.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
