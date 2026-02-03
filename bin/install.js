#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Colors for terminal output
const cyan = '\x1b[36m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const red = '\x1b[31m';
const blue = '\x1b[34m';
const magenta = '\x1b[35m';
const reset = '\x1b[0m';

// Get version from package.json
const pkg = require('../package.json');

// Parse arguments
const args = process.argv.slice(2);
const hasGlobal = args.includes('--global') || args.includes('-g');
const hasLocal = args.includes('--local') || args.includes('-l');
const hasClaude = args.includes('--claude') || !args.some(a => a.startsWith('--'));

const banner = '\n' +
  green + '   ████████╗██████╗ ██╗██╗  ██╗███████╗\n' +
  '   ╚══██╔══╝██╔══██╗██║██║ ██╔╝██╔════╝\n' +
  '      ██║   ██████╔╝██║█████╔╝ █████╗\n' +
  '      ██║   ██╔══██╗██║██╔═██╗ ██╔══╝\n' +
  '      ██║   ██║  ██║██║██║  ██╗███████╗\n' +
  '      ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝' + reset + '\n' +
  '\n' +
  '  v' + pkg.version + ' - Training wheels for Claude Code\n';

console.log(banner);

// Determine installation directory
function getInstallDir() {
  if (hasLocal) {
    return path.join(process.cwd(), '.claude');
  }

  // Global install to ~/.claude
  const claudeConfigDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
  return claudeConfigDir;
}

// Remove directory recursively
function removeDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      removeDir(fullPath);
    } else {
      fs.unlinkSync(fullPath);
    }
  }

  fs.rmdirSync(dir);
}

// Copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Main installation
function install() {
  const src = path.join(__dirname, '..');
  const targetDir = getInstallDir();
  const locationLabel = hasLocal
    ? targetDir.replace(process.cwd(), '.')
    : targetDir.replace(os.homedir(), '~');

  console.log(`  Installing to ${cyan}${locationLabel}${reset}\n`);

  // Clean up old Trike files before reinstalling
  console.log(`  ${yellow}Cleaning up old files...${reset}`);

  const commandsDest = path.join(targetDir, 'commands', 'trike');
  const agentsDest = path.join(targetDir, 'agents');
  const trikeDest = path.join(targetDir, 'trike');

  // Remove old commands/trike directory
  if (fs.existsSync(commandsDest)) {
    removeDir(commandsDest);
  }

  // Remove old trike-* agents
  if (fs.existsSync(agentsDest)) {
    const agents = fs.readdirSync(agentsDest).filter(f => f.startsWith('trike-') && f.endsWith('.md'));
    for (const agent of agents) {
      const agentPath = path.join(agentsDest, agent);
      if (fs.existsSync(agentPath)) {
        fs.unlinkSync(agentPath);
      }
    }
  }

  // Remove old trike/ directory
  if (fs.existsSync(trikeDest)) {
    removeDir(trikeDest);
  }

  console.log(`  ${green}✓${reset} Cleaned up old files\n`);

  // Copy commands
  const commandsSrc = path.join(src, 'commands', 'trike');

  if (fs.existsSync(commandsSrc)) {
    copyDir(commandsSrc, commandsDest);
    console.log(`  ${green}✓${reset} Installed commands/trike`);
  }

  // Copy agents
  const agentsSrc = path.join(src, 'agents');

  if (fs.existsSync(agentsSrc)) {
    fs.mkdirSync(agentsDest, { recursive: true });
    const agents = fs.readdirSync(agentsSrc).filter(f => f.startsWith('trike-') && f.endsWith('.md'));
    for (const agent of agents) {
      fs.copyFileSync(path.join(agentsSrc, agent), path.join(agentsDest, agent));
    }
    if (agents.length > 0) {
      console.log(`  ${green}✓${reset} Installed ${agents.length} agents`);
    }
  }

  // Copy trike/ directory (references, templates, workflows)
  const trikeSrc = path.join(src, 'trike');

  if (fs.existsSync(trikeSrc)) {
    copyDir(trikeSrc, trikeDest);
    console.log(`  ${green}✓${reset} Installed trike/`);
  }

  // Write VERSION file
  const versionDest = path.join(targetDir, 'trike', 'VERSION');
  fs.mkdirSync(path.dirname(versionDest), { recursive: true });
  fs.writeFileSync(versionDest, pkg.version);
  console.log(`  ${green}✓${reset} Wrote VERSION (${pkg.version})`);

  console.log(`
  ${green}Done!${reset} Launch Claude Code and run ${cyan}/trike:start${reset}

  Stop typing. Start vibing. 100x your Claude Code game.
`);
}

// Run installation
if (hasGlobal && hasLocal) {
  console.error(`  ${yellow}Cannot specify both --global and --local${reset}`);
  process.exit(1);
}

install();
