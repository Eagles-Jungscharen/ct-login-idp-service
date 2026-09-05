#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const rootEnvPath = join(rootDir, '.env.local');
const frontendEnvPath = join(rootDir, 'packages', 'frontend', '.env.local');
const backendSettingsPath = join(rootDir, 'packages', 'backend', 'local.settings.json');

console.log('Synchronizing environment variables...\n');

if (!existsSync(rootEnvPath)) {
  console.error('Error: .env.local not found in root directory');
  console.error('  Please copy .env.example to .env.local and configure your values');
  process.exit(1);
}

let envContent;
try {
  envContent = readFileSync(rootEnvPath, 'utf-8');
} catch (error) {
  console.error(`Error reading ${rootEnvPath}:`, error.message);
  process.exit(1);
}

const envVars = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eq = trimmed.indexOf('=');
  if (eq > 0) {
    envVars[trimmed.substring(0, eq).trim()] = trimmed.substring(eq + 1).trim();
  }
}

const frontendVars = {};
const backendVars = {};
for (const [key, value] of Object.entries(envVars)) {
  if (key.startsWith('VITE_')) {
    frontendVars[key] = value;
  } else {
    backendVars[key] = value;
  }
}

console.log(`Found ${Object.keys(frontendVars).length} frontend variables (VITE_*)`);
console.log(`Found ${Object.keys(backendVars).length} backend variables\n`);

try {
  const frontendEnvContent = Object.entries(frontendVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  writeFileSync(frontendEnvPath, frontendEnvContent, 'utf-8');
  console.log('Frontend .env.local updated:', frontendEnvPath);
} catch (error) {
  console.error('Error writing frontend .env.local:', error.message);
  process.exit(1);
}

try {
  const localSettings = {
    IsEncrypted: false,
    Values: backendVars,
    Host: {
      LocalHttpPort: 7050,
      CORS: 'http://localhost:5173',
      CORSCredentials: true,
    },
  };
  writeFileSync(backendSettingsPath, JSON.stringify(localSettings, null, 2), 'utf-8');
  console.log('Backend local.settings.json updated:', backendSettingsPath);
} catch (error) {
  console.error('Error writing backend local.settings.json:', error.message);
  process.exit(1);
}

console.log('\nEnvironment synchronization complete.');
