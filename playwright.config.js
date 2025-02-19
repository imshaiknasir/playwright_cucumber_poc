// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './features',
  reporter: 'list',
  use: {
    trace: 'on-first-retry',
    baseURL: 'https://www.saucedemo.com/v1/',
  },
  testMatch: '**/*.feature',
});


