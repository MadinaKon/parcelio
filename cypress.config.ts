const { defineConfig } = require("cypress");
import * as dotenv from "dotenv";
dotenv.config();

console.log("MAILTRAP API KEY:", process.env.MAILTRAP_API_KEY);
console.log("MAILTRAP INBOX ID:", process.env.MAILTRAP_INBOX_ID);

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ) {
      interface MailtrapEmail {
        id: number;
        [key: string]: any;
      }

      interface AxiosResponse<T = any> {
        data: T;
        status: number;
        statusText: string;
        headers: any;
        config: any;
        request?: any;
      }

      on("task", {
        async getMailtrapEmail(): Promise<string> {
          const axios: {
            get<T = any>(url: string, config?: any): Promise<AxiosResponse<T>>;
          } = require("axios");

          const MAILTRAP_INBOX_ID: string = process.env.MAILTRAP_INBOX_ID!;
          const API_TOKEN: string | undefined = process.env.MAILTRAP_API_KEY;

          // Validate environment variables
          if (!API_TOKEN) {
            throw new Error("MAILTRAP_API_KEY environment variable is not set");
          }
          if (!MAILTRAP_INBOX_ID) {
            throw new Error(
              "MAILTRAP_INBOX_ID environment variable is not set"
            );
          }

          console.log("Making request to Mailtrap API...");
          console.log("Inbox ID:", MAILTRAP_INBOX_ID);
          console.log(
            "API Token (first 10 chars):",
            API_TOKEN.substring(0, 10) + "..."
          );

          try {
            const response: AxiosResponse<MailtrapEmail[]> = await axios.get(
              `https://mailtrap.io/api/v1/inboxes/${MAILTRAP_INBOX_ID}/messages`,
              {
                headers: {
                  Authorization: `Bearer ${API_TOKEN}`,
                  "Content-Type": "application/json",
                },
              }
            );

            console.log("Messages response status:", response.status);
            console.log("Number of messages:", response.data.length);

            if (!response.data || response.data.length === 0) {
              throw new Error("No emails found in Mailtrap inbox");
            }

            const latestEmail: MailtrapEmail = response.data[0];
            console.log("Latest email ID:", latestEmail.id);

            // Fetch full email body (HTML)
            const emailContent: AxiosResponse<string> = await axios.get(
              `https://mailtrap.io/api/v1/inboxes/${MAILTRAP_INBOX_ID}/messages/${latestEmail.id}/body.html`,
              {
                headers: {
                  Authorization: `Bearer ${API_TOKEN}`,
                  "Content-Type": "application/json",
                },
              }
            );

            console.log("Email content retrieved successfully");
            return emailContent.data;
          } catch (error: any) {
            console.error("Mailtrap API Error:", error.message);
            if (error.response) {
              console.error("Response status:", error.response.status);
              console.error("Response data:", error.response.data);
            }
            throw new Error(
              `Failed to fetch email from Mailtrap: ${error.message}`
            );
          }
        },
      });
    },
  },
});
