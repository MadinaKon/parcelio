/// <reference types="cypress" />

describe("Email Authentication", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("TEST_URL"));
  });

  it("should display email sign-in button on signin page", () => {
    cy.get("[data-cy='nav-sign-in']").click();
    cy.url().should("include", "/signin");
    cy.get("[data-cy='sign-in-button']").should("exist");
    cy.get("[data-cy='sign-in-button']").should("be.visible");
    cy.get("[data-cy='sign-in-button']").should(
      "contain.text",
      "Sign in with Email"
    );

    cy.get("[data-cy='sign-in-button']").click();
    cy.url().should("include", "/api/auth/signin");
    cy.get("#input-email-for-email-provider").type(
      Cypress.env("TEST_EMAIL") || "test@example.com"
    );

    cy.get("button#submitButton").click();
    cy.get("h1").should("contain.text", "Check your email");
  });
});
