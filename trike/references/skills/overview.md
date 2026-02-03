# Skills System Overview

## What Are Skills?

Skills are specialized extensions that enhance Claude Code with domain-specific capabilities and workflows. They bundle together knowledge, tools, and automated processes for handling specific types of tasks—from document editing and PDF manipulation to spreadsheet analysis and presentation creation.

Skills work by providing Claude with pre-built competencies that improve efficiency and capability in targeted areas. Instead of Claude handling every task from first principles, skills enable the agent to leverage specialized tools and knowledge optimized for particular use cases.

## Why Skills Matter

Skills matter because they:

- **Expand Capabilities**: Enable Claude to work with specialized file formats and tools that would otherwise require manual intervention
- **Improve Efficiency**: Automate complex, multi-step workflows into single operations
- **Maintain Quality**: Leverage domain-specific best practices built into each skill
- **Provide Consistency**: Ensure standardized approaches to common tasks across projects
- **Save Time**: Eliminate repetitive setup and configuration for frequently performed actions

## How Skills Work

### Folder Placement

Skills are discovered and loaded from two locations:

1. **Global Skills Directory**: `~/.claude/skills/`
   - User-level skills available across all Claude Code sessions
   - Persists across projects and working directories

2. **Local Skills Directory**: `.claude/skills/` (in current project root)
   - Project-specific skills for team collaboration
   - Overrides global skills with the same name
   - Checked into version control for consistent team experience

### SKILL.md Discovery

Each skill is a folder containing a `SKILL.md` file at its root. This file defines:

- Skill metadata (name, version, description)
- Capabilities and what the skill can do
- When and how to use the skill
- Configuration options
- Known limitations
- Trigger patterns for automatic invocation

When Claude Code starts, it scans both skill directories for any `SKILL.md` files and loads them into context. This allows Claude to automatically recognize when a task matches a skill's capabilities and invoke the appropriate skill.

## Installation

### Installing Skills

1. **From the Skill Ecosystem**: Download skill folders and place them in either location:
   ```
   cp -r skill-folder ~/.claude/skills/
   # or for project-specific
   cp -r skill-folder .claude/skills/
   ```

2. **Creating Custom Skills**: See the "Creating Custom Skills" section below

3. **Verifying Installation**: Skills are automatically discovered when Claude Code starts. List available skills using the IDE interface or by checking the skills directories.

### Important: No CLI Commands

Skills do **not** use CLI commands like `slash commands` (e.g., `/pdf`, `/excel`). This is a common misconception. Instead:

- **Skills are context-loaded**: Available in every conversation when relevant
- **Skills are auto-invoked**: Claude automatically recognizes when to use them
- **No special syntax needed**: Just describe your task naturally in the conversation
- **Explicit activation**: If needed, you can explicitly request a skill by name (e.g., "use the xlsx skill"), but this is rarely necessary

Claude determines which skills to use based on the nature of your request and file types you're working with. You don't need to "activate" or "call" skills with commands.

## Popular Skills

### Document & Content Creation

#### **docx** - Word Document Handling
Create, edit, and analyze Microsoft Word documents (.docx files). Features include text formatting, tracked changes, comments, style management, and comprehensive document manipulation. Essential for professional document workflows.

#### **pptx** - PowerPoint Presentation Creation
Build and modify PowerPoint presentations with support for layouts, slide management, speaker notes, animations, and visual design. Perfect for creating business presentations and training materials.

#### **pdf** - PDF Processing & Manipulation
Comprehensive PDF handling including reading/extracting text and tables, merging/splitting documents, rotating pages, adding watermarks, OCR for scanned PDFs, encrypting/decrypting, and form filling.

#### **xlsx** - Excel & Spreadsheet Analysis
Work with Excel files, CSV, and TSV formats. Features include cell formulas, data computation, charting, conditional formatting, pivot tables, and complex spreadsheet restructuring. Ideal for data analysis and reporting.

### Specialized Tools

#### **skill-creator** - Build Custom Skills
Guide and framework for creating new skills that extend Claude's capabilities with your own workflows. Includes best practices for skill structure, documentation, and integration patterns.

#### **keybindings-help** - Keyboard Customization
Configure keyboard shortcuts and custom keybindings in Claude Code. Supports chord bindings, rebinding keys, and modifying ~/.claude/keybindings.json for personalized workflow optimization.

### Data & Research

#### **web-search** - Internet Research
Search the web for current information and recent data. Returns formatted results with source links. Essential for accessing information beyond Claude's knowledge cutoff.

#### **web-fetch** - Content Retrieval
Fetch and analyze content from specific URLs. Converts HTML to markdown and processes content with targeted prompts. Useful for extracting specific information from web pages.

### Productivity & Integration

#### **git-enhanced** - Version Control Workflow
Advanced Git operations with safety checks and best practices. Handles commits, branches, merges, and history while preventing destructive actions without explicit confirmation.

#### **api-integration** - External Service Connections
Connect to and interact with external APIs and services. Handles authentication, request formatting, response parsing, and error handling for third-party integrations.

#### **database** - Data Store Management
Query and manage database systems. Supports SQL databases, document stores, and structured data operations with proper connection handling and safety.

### Code & Development

#### **code-review** - Source Code Analysis
Analyze codebases for quality, best practices, security vulnerabilities, and performance issues. Provides detailed feedback and improvement suggestions.

#### **testing** - Automated Testing
Run test suites, analyze results, and help fix failing tests. Supports multiple testing frameworks and provides detailed coverage reports.

## Creating Custom Skills

### Quick Start

Skills can be customized or created entirely from scratch to fit your specific needs:

1. **Create a skill folder**: `my-skill/`
2. **Add SKILL.md**: Define your skill with metadata and capabilities
3. **Include supporting files**: Add code, templates, or resources your skill needs
4. **Place in skills directory**: Put the folder in `~/.claude/skills/` or `.claude/skills/`
5. **Describe capabilities**: Clearly document when and how to use your skill

### Skill Structure

```
my-skill/
├── SKILL.md           # Required: Skill definition and metadata
├── config.json        # Optional: Configuration options
├── examples/          # Optional: Usage examples
├── templates/         # Optional: Reusable templates
└── docs/              # Optional: Extended documentation
```

### Best Practices

- **Clear naming**: Use descriptive, lowercase names with hyphens (e.g., `data-pipeline`)
- **Document thoroughly**: SKILL.md should explain capabilities and limitations
- **Version your skills**: Include version numbers for tracking updates
- **Test extensively**: Ensure your skill handles edge cases gracefully
- **Keep it focused**: One skill should solve one category of problems well
- **Avoid conflicts**: Choose skill names that don't clash with existing skills

For a complete guide to creating skills, use the **skill-creator** skill or consult the Anthropic Skills documentation.

## Practice Exercise

### Exercise: Set Up and Use the PDF Skill

**Objective**: Understand how skills work by using the PDF skill to process a document.

**Steps**:

1. **Verify Installation**:
   - Check that you have the `pdf` skill in `~/.claude/skills/pdf/` or `.claude/skills/pdf/`
   - If not present, create a basic skill folder structure

2. **Create a Test File**:
   - Download or create a sample PDF file (e.g., a research paper or document)
   - Note its file path

3. **Use the Skill Naturally**:
   - Open a Claude Code conversation
   - Ask Claude to help with the PDF: "Extract all tables from this PDF and convert them to CSV"
   - Observe how Claude automatically recognizes the PDF skill is relevant
   - Claude handles the task without you needing to "activate" the skill

4. **Explore Capabilities**:
   - Try different PDF tasks like:
     - "Merge these three PDFs into one document"
     - "Extract text and create a summary"
     - "Rotate pages in this PDF"
   - Notice how the skill handles different operations

5. **Check the SKILL.md**:
   - Navigate to the pdf skill folder
   - Open and read the SKILL.md file
   - Understand the skill's structure, capabilities, and limitations

6. **Reflect**:
   - Consider: What other specialized skills would benefit your workflow?
   - Think about creating a custom skill for a repetitive task in your projects
   - Document what you learned about skill discovery and invocation

## Next Steps

- **Explore Installed Skills**: Check your `~/.claude/skills/` directory to see what's available
- **Read SKILL.md Files**: Each skill documents its capabilities in detail
- **Create Your First Custom Skill**: Use skill-creator to build a skill for your specific needs
- **Join the Ecosystem**: Share useful skills with the Claude Code community

## Key Takeaways

- Skills are auto-discovered and context-loaded, not command-triggered
- They extend Claude's capabilities with specialized knowledge and tools
- Both global (`~/.claude/skills/`) and local (`.claude/skills/`) skills are supported
- Each skill is simply a folder with a `SKILL.md` file defining its capabilities
- You can easily create custom skills for your unique workflows
- Skills work automatically—just describe your task naturally

---

*For more information on specific skills, consult their individual SKILL.md files or the Anthropic Skills documentation.*
