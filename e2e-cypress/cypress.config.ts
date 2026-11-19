import { defineConfig } from 'cypress';
import mochawesomePlugin from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportFilename: 'reporte-e2e',
    reportPageTitle: 'Reporte E2E - SauceDemo',
    charts: true,
    // un solo html con todo adentro, mas facil de compartir
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
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
    setupNodeEvents(on) {
      mochawesomePlugin(on);
    },
  },
});
