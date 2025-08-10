import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";

dotenv.config();


interface MailtrapEmail {
  id: number;
  [key: string]: any;
}

export default defineConfig({
  e2e: {
     baseUrl: process.env.CYPRESS_TEST_URL,
    env: {
      TEST_URL: process.env.CYPRESS_TEST_URL,
    },
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ) {
      on("task", {
        async getMailtrapEmail(): Promise<string> {
          const MAILTRAP_INBOX_ID = process.env.MAILTRAP_INBOX_ID;
          const API_TOKEN = process.env.MAILTRAP_API_KEY;
          const MAILTRAP_ACCOUNT_ID = process.env.MAILTRAP_ACCOUNT_ID;


          if (!API_TOKEN || !MAILTRAP_INBOX_ID) {
            throw new Error("Mailtrap API credentials are not set in .env");
          }

          try {
            // First, test if we can access the API at all
         
            try {
              const testResponse = await axios.get(
                "https://mailtrap.io/api/v1/user",
                {
                  headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log("API access test successful:", testResponse.data);
            } catch (error: any) {
              console.log(
                "API access test failed:",
                error.response?.status,
                error.response?.data
              );
            }

            // Try multiple API endpoints including testing API
            const apiEndpoints = [
              // Testing API (most likely to work)
              `https://mailtrap.io/api/testing/inboxes/${MAILTRAP_INBOX_ID}/messages`,
              // v2 API with account ID
              MAILTRAP_ACCOUNT_ID
                ? `https://mailtrap.io/api/v2/accounts/${MAILTRAP_ACCOUNT_ID}/inboxes/${MAILTRAP_INBOX_ID}/messages`
                : null,
              // v1 API (fallback)
              `https://mailtrap.io/api/v1/inboxes/${MAILTRAP_INBOX_ID}/messages`,
              // Alternative v2 API without account ID
              `https://mailtrap.io/api/v2/inboxes/${MAILTRAP_INBOX_ID}/messages`,
            ].filter(Boolean);

            let response: AxiosResponse<MailtrapEmail[]> | null = null;
            let workingEndpoint = "";

            for (const endpoint of apiEndpoints) {
              try {
                console.log("Trying endpoint:", endpoint);
                response = await axios.get(endpoint!, {
                  headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json",
                  },
                });
                workingEndpoint = endpoint!;
                console.log("Success with endpoint:", endpoint);
                break;
              } catch (error: any) {
                console.log(
                  `Failed with endpoint ${endpoint}:`,
                  error.response?.status
                );
                if (error.response?.data) {
                  console.log("Error details:", error.response.data);
                }
                continue;
              }
            }

            if (!response) {
              throw new Error("All Mailtrap API endpoints failed");
            }

            if (!response.data || response.data.length === 0) {
              throw new Error("No emails found in Mailtrap inbox");
            }

            console.log("Fetched emails:", response.data[0]);

            const latestEmail = response.data[0];

            // Determine the correct email content endpoint based on the working messages endpoint
            let emailUrl: string;
            if (workingEndpoint.includes("/api/testing/")) {
              emailUrl = workingEndpoint.replace(
                "/messages",
                `/${latestEmail.id}/body.html`
              );
            } else if (workingEndpoint.includes("/api/v2/")) {
              emailUrl = workingEndpoint.replace(
                "/messages",
                `/${latestEmail.id}`
              );
            } else {
              emailUrl = workingEndpoint.replace(
                "/messages",
                `/${latestEmail.id}/body.html`
              );
            }

            console.log("Fetching email content from:", emailUrl);

            const emailResponse: AxiosResponse<any> = await axios.get(
              emailUrl,
              {
                headers: {
                  Authorization: `Bearer ${API_TOKEN}`,
                  "Content-Type": "application/json",
                },
              }
            );

            return (
              emailResponse.data.html_body || emailResponse.data.text_body || ""
            );
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

      return config;
    },
  },
});
