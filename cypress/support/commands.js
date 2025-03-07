// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", () => {
  // Add your login logic here
  // For example, you can use cy.request() to programmatically log in
  cy.request("POST", "/api/auth/callback/credentials", {
    username: "your-username",
    password: "your-password",
  }).then((resp) => {
    window.localStorage.setItem("authToken", resp.body.token);
  });
});

Cypress.Commands.add("logout", () => {
  // Add your logout logic here
  // For example, you can clear the local storage or cookies
  window.localStorage.removeItem("authToken");
});
