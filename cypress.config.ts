import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

dotenv.config();

// Check if MailSlurp API key is available
const mailslurpApiKey = process.env.CYPRESS_MAILSLURP_API_KEY;
if (!mailslurpApiKey) {
  console.warn("⚠️  Warning: CYPRESS_MAILSLURP_API_KEY not set. MailSlurp tests will be skipped.");
  console.log("To enable MailSlurp tests:");
  console.log("1. Sign up at https://app.mailslurp.com/sign-up/");
  console.log("2. Get your API key from the dashboard");
  console.log("3. Set CYPRESS_MAILSLURP_API_KEY environment variable");
}

export default defineConfig({
  defaultCommandTimeout: 30000,
  responseTimeout: 30000,
  requestTimeout: 30000,

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // Add environment variable to Cypress config
      config.env.MAILSLURP_API_KEY = mailslurpApiKey;
      return config;
    },
  },
});
