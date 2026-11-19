import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    video: false,
    screenshotOnRunFailure: true,
    // en CI/headless reintenta una vez, en modo open no para ver el fallo real
    retries: { runMode: 1, openMode: 0 },
  },
});
