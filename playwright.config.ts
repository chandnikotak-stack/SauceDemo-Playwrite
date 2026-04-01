import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';
import { URLS, AUTH_STATE_PATH } from './utils/testData';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  timeout: 30_000,
  expect: { timeout: 5_000 },

  globalSetup: './global-setup.ts', // runs login once before all tests

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'results/junit.xml' }],
  ],

  use: {
    baseURL: URLS.BASE,
    headless: true,
    actionTimeout: 10_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    storageState: AUTH_STATE_PATH,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
