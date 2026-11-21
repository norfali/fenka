import { defineConfig, devices } from '@playwright/test';

const baseURL = `http://127.0.0.1:${process.env.PORT ?? '4173'}`;

export default defineConfig({
  testDir: './tests',
  use: { baseURL, trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npm run preview',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
