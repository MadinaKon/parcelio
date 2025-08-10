/// <reference types="cypress" />

describe("Email Authentication with MailSlurp", () => {
  let inboxId: string;
  let emailAddress: string;

  before(function () {
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
    if (!Cypress.env("MAILSLURP_API_KEY")) {
      cy.log("Skipping test - MailSlurp not configured");
      this.skip();
      return;
    }

    cy.get("[data-cy='nav-sign-in']").click();
    cy.url().should("include", "/signin");

    // Fill in email
    cy.get("@emailAddress").then((email) => {
      cy.get("#input-email-for-email-provider").type(String(email));
    });

    cy.get("button#submitButton").click();
    // cy.get("h1").should("contain.text", "Check your email");

    // cy.get("h1", { timeout: 10000 }).should("contain.text", "Check your email");

    cy.get('[data-el="card:body"]').should(
      "contain.text",
      `Send an email to ${emailAddress} and it will appear here`
    );

    // Wait for the magic link email
    cy.mailslurp()
      .then((mailslurp) => mailslurp.waitForLatestEmail(inboxId, 30000))
      .then((email) => {
        cy.log(`📧 Received email: ${email.subject}`);

        // Match link from HTML or plain text
        const body = email.body || "";

        const match = body.match(/https?:\/\/[^\s"]+/);
        const magicLink = match ? match[0] : null;

        expect(magicLink, "Magic link found in email").to.exist;

        cy.visit(magicLink!);

        cy.url().should("not.include", "/signin");
        cy.get("[data-cy='sign-out']").should("be.visible");
      });
  });
});
