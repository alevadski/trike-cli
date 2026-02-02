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

const pkg = require('../package.json');

// Parse arguments
const args = process.argv.slice(2);
const hasLocal = args.includes('--local') || args.includes('-l');

const banner = '\n' +
  green + '   ████████╗██████╗ ██╗██╗  ██╗███████╗\n' +
  '   ╚══██╔══╝██╔══██╗██║██║ ██╔╝██╔════╝\n' +
  '      ██║   ██████╔╝██║█████╔╝ █████╗\n' +
  '      ██║   ██╔══██╗██║██╔═██╗ ██╔══╝\n' +
  '      ██║   ██║  ██║██║██║  ██╗███████╗\n' +
  '      ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝' + reset + '\n' +
  '\n' +
  '  v' + pkg.version + ' - REINSTALLER\n' +
  '  Removes old installation and installs fresh\n';

console.log(banner);

// Determine installation directory
function getInstallDir() {
  if (hasLocal) {
    return path.join(process.cwd(), '.claude');
  }
  const claudeConfigDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
  return claudeConfigDir;
}

// Remove directory recursively
function removeDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return false;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      removeDir(fullPath);
    } else {
      fs.unlinkSync(fullPath);
    }
  }
  fs.rmdirSync(dirPath);
  return true;
}

// Main reinstallation
function reinstall() {
  const targetDir = getInstallDir();
  const locationLabel = hasLocal
    ? targetDir.replace(process.cwd(), '.')
    : targetDir.replace(os.homedir(), '~');

  console.log(`  Target: ${cyan}${locationLabel}${reset}\n`);

  // Remove old Trike files
  const trikeLocations = [
    path.join(targetDir, 'commands', 'trike'),
    path.join(targetDir, 'agents', 'trike-curriculum-planner.md'),
    path.join(targetDir, 'hooks', 'statusline.md'),
    path.join(targetDir, 'trike')
  ];

  console.log(`  ${yellow}Removing old installation...${reset}`);

  for (const location of trikeLocations) {
    if (fs.existsSync(location)) {
      const isDir = fs.statSync(location).isDirectory();
      if (isDir) {
        if (removeDir(location)) {
          console.log(`  ${green}✓${reset} Removed ${location.replace(targetDir, locationLabel)}`);
        }
      } else {
        fs.unlinkSync(location);
        console.log(`  ${green}✓${reset} Removed ${location.replace(targetDir, locationLabel)}`);
      }
    }
  }

  console.log(`\n  ${green}Old files removed!${reset}\n`);

  // Now run the installer
  console.log(`  ${cyan}Running fresh install...${reset}\n`);

  const installScript = path.join(__dirname, 'install.js');
  require(installScript);
}

// Run reinstallation
reinstall();
