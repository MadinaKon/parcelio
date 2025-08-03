/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Example: set session before visiting the app
// Cypress.Commands.add("loginBySession", () => {
//   cy.request(
//     "POST",
//     "https://github.com/u2f/login_fragment?is_emu_login=false&mobile_ios=false&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3Db96f8d84172b01b6462c%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252Fapi%252Fauth%252Fcallback%252Fgithub%26response_type%3Dcode%26scope%3Dread%253Auser%2Buser%253Aemail%26state%3DoBw7uo-6zlHPg2VUrNLgrHoXTh4ybrVumSIc4yBwtPI",
//     {
//       user: "konurbaevamadina+github@gmail.com",
//     }
//   ).then((response) => {
//     window.localStorage.setItem("auth_token", response.body.token);
//   });
// });

Cypress.Commands.add(
  "loginBySession",
  (email = Cypress.env("TEST_USER_EMAIL")) => {
    cy.request("POST", Cypress.env("GITHUB_LOGIN_URL"), {
      user: email,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
      window.localStorage.setItem("auth_token", response.body.token);
    });
  }
);
