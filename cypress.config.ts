import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    MAILSLURP_API_KEY: Cypress.env("MAILSLURP_API_KEY"),
  },
  e2e: {
    setupNodeEvents(on, config) {
      // ...
    },
  },
});
