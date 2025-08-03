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
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ) {
      on("task", {
        async getMailtrapEmail(): Promise<string> {
          const MAILTRAP_INBOX_ID = process.env.MAILTRAP_INBOX_ID;
          const API_TOKEN = process.env.MAILTRAP_API_KEY;

          if (!API_TOKEN || !MAILTRAP_INBOX_ID) {
            throw new Error("Mailtrap API credentials are not set in .env");
          }

          try {
            // const response: AxiosResponse<MailtrapEmail[]> = await axios.get(
            //   `https://mailtrap.io/api/v1/inboxes/${MAILTRAP_INBOX_ID}/messages`,
            //   {
            //     headers: {
            //       Authorization: `Bearer ${API_TOKEN}`,
            //       "Content-Type": "application/json",
            //     },
            //   }
            // );

            const response: AxiosResponse<MailtrapEmail[]> = await axios.get(
              `https://mailtrap.io/api/v2/inboxes/${MAILTRAP_INBOX_ID}/messages`,
              {
                headers: {
                  Authorization: `Bearer ${API_TOKEN}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (!response.data || response.data.length === 0) {
              throw new Error("No emails found in Mailtrap inbox");
            }

            console.log("Fetched emails:", response.data[0]);

            const latestEmail = response.data[0];

            // const emailContent: AxiosResponse<string> = await axios.get(
            //   `https://mailtrap.io/api/v2/inboxes/${MAILTRAP_INBOX_ID}/messages/${latestEmail.id}/body.html`,
            //   {
            //     headers: {
            //       Authorization: `Bearer ${API_TOKEN}`,
            //       "Content-Type": "application/json",
            //     },
            //   }
            // );
            // return emailContent.data;

            const emailResponse: AxiosResponse<any> = await axios.get(
              `https://mailtrap.io/api/v2/inboxes/${MAILTRAP_INBOX_ID}/messages/${latestEmail.id}`,
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
