describe('template spec', () => {

  // beforeEach(() => {
  //   cy.mailslurp({
  //     // apiKey: Cypress.env('MAILSLURP_API_KEY'),
  //      apiKey: '',
  //   })
  // })
  it('passes', () => {
    cy.mailslurp()
      .then(mailslurp => mailslurp.createInbox())
      .then(inbox => {
        cy.visit('https://playground.mailslurp.com/')
        // ... use inbox.emailAddress ...
      });
  })
})