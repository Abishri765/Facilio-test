#!/usr/bin/env node

const { execSync } = require('child_process');

try {
  // Execute your Playwright tests
  execSync('npm test', { stdio: 'inherit' });
} catch (error) {
  console.error('An error occurred:', error.message);
  process.exit(1);
}