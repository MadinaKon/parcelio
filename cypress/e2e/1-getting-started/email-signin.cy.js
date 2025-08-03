/// <reference types="cypress" />

describe("Email Authentication", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should complete email sign-in via magic link", () => {
    const testEmail = "s0539451@htw-berlin.de";

    cy.get("[data-cy='nav-sign-in']").click();
    cy.url().should("include", "/signin");

    cy.get("[data-cy='sign-in-button']").click();
    cy.get("#input-email-for-email-provider").type(testEmail);
    cy.get("button#submitButton").click();

    cy.get("h1").should("contain.text", "Check your email");

    // Wait for email to arrive (you can increase timeout if needed)
    cy.wait(15000);

    cy.task("getMailtrapEmail").then((emailHtml) => {
      // Updated regex to match the actual email format
      const magicLink =
        /href="(http:\/\/localhost:3000\/api\/auth\/callback\/email[^"]+)"/.exec(
          emailHtml
        )?.[1];

      expect(magicLink, "Magic link found in email").to.exist;

      // Visit the sign-in link
      cy.visit(magicLink);

      // Final assertion: e.g., user lands on dashboard
      cy.url().should("include", "/dashboard");
      cy.get("h1").should("contain.text", "Welcome");
    });
  });
});
