describe("template spec", () => {
  it("passes", () => {
    cy.mailslurp()
      .then((mailslurp) => mailslurp.createInbox())
      .then((inbox) => {
        cy.visit("http://localhost:3000/signin");
        // ... use inbox.emailAddress ...
        cy.wrap(inbox.id).as("inboxId");
        cy.wrap(inbox.emailAddress).as("emailAddress");
        cy.get("[data-cy=sign-in-button]").click();
      });
  });
});
