before(function () {
  // Check if MailSlurp API key is available
  const apiKey = Cypress.env('MAILSLURP_API_KEY');
  if (!apiKey) {
    cy.log("⚠️  MailSlurp API key not found. Skipping MailSlurp tests.");
    this.skip();
    return;
  }

  cy.log("Wrap inbox before test");
  return cy
    .mailslurp()
    .then((mailslurp) => mailslurp.createInbox())
    .then((inbox) => {
      cy.log(`Inbox id ${inbox.id}`);
      cy.wrap(inbox.id).as("inboxId");
      cy.wrap(inbox.emailAddress).as("emailAddress");
    });
});

describe("template spec", () => {
  it("passes", function () {
    // Skip test if MailSlurp is not configured
    if (!Cypress.env('MAILSLURP_API_KEY')) {
      cy.log("Skipping test - MailSlurp not configured");
      this.skip();
      return;
    }

    // Check if the development server is running
    cy.request({
      url: 'http://localhost:3000',
      failOnStatusCode: false
    }).then((response) => {
      if (response.status !== 200) {
        cy.log("⚠️  Development server not running. Please start it with 'npm run dev'");
        this.skip();
        return;
      }
    });

    cy.visit("/signin");
    cy.get("@emailAddress").then((email) => {
      // Use the generated email address
      cy.get("[data-cy=email-input]").type("s0539451@htw-berlin.de");
      cy.get("[data-cy=sign-in-button]").click();
      // ...continue test logic...
    });
  });
});
