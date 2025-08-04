/// <reference types="cypress" />

describe("Email Authentication with MailSlurp", () => {
  let inboxId;
  let emailAddress;

  before(function () {
    // Check if MailSlurp API key is available
    const apiKey = Cypress.env("MAILSLURP_API_KEY");
    if (!apiKey) {
      cy.log("⚠️  MailSlurp API key not found. Skipping MailSlurp tests.");
      this.skip();
      return;
    }

    cy.log("Creating MailSlurp inbox for test");
    return cy
      .mailslurp()
      .then((mailslurp) => mailslurp.createInbox())
      .then((inbox) => {
        inboxId = inbox.id;
        emailAddress = inbox.emailAddress;
        cy.log(`Created inbox: ${inboxId} with email: ${emailAddress}`);
        cy.wrap(inboxId).as("inboxId");
        cy.wrap(emailAddress).as("emailAddress");
      });
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("should complete email sign-in via magic link", function () {
    // Skip test if MailSlurp is not configured
    if (!Cypress.env("MAILSLURP_API_KEY")) {
      cy.log("Skipping test - MailSlurp not configured");
      this.skip();
      return;
    }

    cy.get("[data-cy='nav-sign-in']").click();
    cy.url().should("include", "/signin");

    cy.get("[data-cy='sign-in-button']").click();

    // Use the MailSlurp email address
    cy.get("@emailAddress").then((email) => {
      cy.get("#input-email-for-email-provider").type(email);
    });

    cy.get("button#submitButton").click();

    cy.get("h1").should("contain.text", "Check your email");

    // Wait for email to arrive and extract magic link
    cy.wait(10000); // Wait for email to be sent

    cy.mailslurp()
      .then((mailslurp) => mailslurp.waitForLatestEmail(inboxId, 30000))
      .then((email) => {
        cy.log(`Received email: ${email.subject}`);

        // Extract magic link from email body
        const magicLink =
          /href="(http:\/\/localhost:3000\/api\/auth\/callback\/email[^"]+)"/.exec(
            email.body
          )?.[1];

        expect(magicLink, "Magic link found in email").to.exist;

        // Visit the sign-in link
        cy.visit(magicLink);

        // Final assertion: user should be signed in
        cy.url().should("not.include", "/signin");
        cy.get("[data-cy='sign-out']").should("be.visible");
      });
  });
});
