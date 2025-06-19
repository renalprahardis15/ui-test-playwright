// @ts-check
const { defineConfig, devices } = require('@playwright/test');
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.ENV || 'staging'}` });

const baseURL = process.env.BASE_URL;

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 500000,
  expect: {
    timeout: 30000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['list'], ['allure-playwright']] : [['list'], ['html']],
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    permissions: ['geolocation'],
    actionTimeout: 30000,
    navigationTimeout: 60000
  },

  /* Configure projects for major browsers */
  projects: [
    
    { 
      name: 'with-setup', 
      testMatch: /.*\.setup\.js/
    },
    {
      name: 'no-setup',
      testIgnore: /.*\.setup\.js/, // atau testMatch untuk include
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome']},
      dependencies: ['with-setup'],
    },
  ],
});

