import * as dotenv from "dotenv";
dotenv.config();

import { defineConfig } from "cypress";

// Check if MailSlurp API key is available
const mailslurpApiKey = process.env.CYPRESS_MAILSLURP_API_KEY;
if (!mailslurpApiKey) {
  console.warn(
    "⚠️  Warning: CYPRESS_MAILSLURP_API_KEY not set. MailSlurp tests will be skipped."
  );
}

export default defineConfig({
  defaultCommandTimeout: 30000,
  responseTimeout: 30000,
  requestTimeout: 30000,

  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // Add environment variable to Cypress config
      // config.env.MAILSLURP_API_KEY = mailslurpApiKey;
      config.env.MAILSLURP_API_KEY = process.env.CYPRESS_MAILSLURP_API_KEY;
      return config;
    },
  },
});
