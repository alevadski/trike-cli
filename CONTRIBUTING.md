# Contributing to Trike

Thanks for your interest in contributing! Trike is built to help complete beginners learn to build with AI, and contributions that improve that experience are always welcome.

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
3. Describe how it would help learners
4. Keep the beginner focus in mind

### Code Contributions

1. **Fork the repo**
2. **Create a branch** for your feature/fix
3. **Make your changes** following these guidelines:
   - Keep beginner focus: simple, clear, jargon-free
   - Test your changes with actual beginners if possible
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

- **Beginner-first language**: Avoid jargon, explain when technical terms are necessary
- **Clear comments**: Explain the "why" not just the "what"
- **Markdown formatting**: Commands use clear step-by-step instructions
- **No time estimates**: People learn at different paces

## Key Principles

When contributing, keep these in mind:

1. **Vibecoding approach**: AI builds, human understands
2. **Never overwhelm**: One concept at a time
3. **Build real things**: No fake tutorials
4. **Verify understanding**: Never skip the verification step
5. **Core principle**: Never accept code you can't explain

## Questions?

Open an issue or reach out! We're here to help.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
