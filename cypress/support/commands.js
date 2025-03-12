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

  // https://parcelio-git-main-madinakons-projects.vercel.app/api/auth/signin
  cy.request("POST", "/api/auth/signin", {
    username: "konurbaevamadina+github@gmail.com",
    password: "Ayana_2023",
  }).then((resp) => {
    window.localStorage.setItem("authToken", resp.body.token);
  });
});

Cypress.Commands.add("logout", () => {
  // Add your logout logic here
  // For example, you can clear the local storage or cookies
  window.localStorage.removeItem("authToken");
});

// Cypress.Commands.add("loginWithGitHub", () => {
//   cy.visit(
//     "https://github.com/login/oauth/authorize?client_id=b96f8d84172b01b6462c&scope=read%3Auser%20user%3Aemail&response_type=code&redirect_uri=https%3A%2F%2Fparcelio-git-main-madinakons-projects.vercel.app%2Fapi%2Fauth%2Fcallback%2Fgithub&state=83nZArcFW22Df4n3JW9-hzDFyU1OQB9vfNnfUns8U-g"
//   );

//   // Fill in GitHub login form
//   cy.get('input[name="login"]').type("konurbaevamadina+github@gmail.com");
//   cy.get('input[name="password"]').type("Ayana_2023", { log: true });
//   cy.get('input[name="commit"]').click();
// });

Cypress.Commands.add("loginWithGitHub", () => {
  cy.visit(
    "https://github.com/login/oauth/authorize?client_id=b96f8d84172b01b6462c&scope=read%3Auser%20user%3Aemail&response_type=code&redirect_uri=https%3A%2F%2Fparcelio-git-main-madinakons-projects.vercel.app%2Fapi%2Fauth%2Fcallback%2Fgithub&state=83nZArcFW22Df4n3JW9-hzDFyU1OQB9vfNnfUns8U-g"
  );

  cy.origin("https://github.com", () => {
    // Fill in GitHub login form

    cy.get("#wcpConsentBannerCtrl").contains("Accept").click();
    cy.get('input[name="login"]').type("konurbaevamadina+github@gmail.com");
    cy.get('input[name="password"]').type("Ayana_2023", { log: true });
    cy.get('input[name="commit"]').click();
  });
});
