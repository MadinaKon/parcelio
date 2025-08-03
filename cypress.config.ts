import { defineConfig } from "cypress";

console.log(process.env.CYPRESS_MAILSLURP_API_KEY);

export default defineConfig({
  defaultCommandTimeout: 30000,
  responseTimeout: 30000,
  requestTimeout: 30000,

  e2e: {
    setupNodeEvents(on, config) {
      // ...
    },
  },
});
