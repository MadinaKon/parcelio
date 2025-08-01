/// <reference types="cypress" />

describe("parcelio", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("navigation link signin", () => {
    cy.get("[data-cy='nav-sign-in']").click();
    cy.url().should("include", "/signin");
    cy.get("[data-cy='sign-in-github']").should("exist");
    cy.get("[data-cy='sign-in-google']").should("exist");
    cy.get("[data-cy='sign-in-button']").should("exist");
  });

  it.skip("github login", () => {
    cy.get("[data-cy='nav-sign-in']").click();
    cy.url().should("include", "/signin");
    cy.get("[data-cy='sign-in-github']").should("exist");
    cy.get("[data-cy='sign-in-github']").click();
    cy.loginBySession();
    cy.visit("/");
    cy.contains("Welcome, konurbaevamadina+github@gmail.com");
  });

  it.skip("google login", () => {
    cy.get("[data-cy='nav-sign-in']").click();
    cy.url().should("include", "/signin");
    cy.get("[data-cy='sign-in-google']").should("exist");
    cy.get("[data-cy='sign-in-google']").click();
    // Note: Google OAuth requires additional setup for testing
    // This test verifies the button exists and is clickable
  });

  it("email sign-in button exists and is clickable", () => {
    cy.get("[data-cy='nav-sign-in']").click();
    cy.url().should("include", "/signin");
    cy.get("[data-cy='sign-in-button']").should("exist");
    cy.get("[data-cy='sign-in-button']").should("be.visible");
    cy.get("[data-cy='sign-in-button']").should("contain.text", "Sign in with Email");
  });

  it("email sign-in form interaction", () => {
    cy.get("[data-cy='nav-sign-in']").click();
    cy.url().should("include", "/signin");
    cy.get("[data-cy='sign-in-button']").click();
    
    // Test email form if it appears after clicking the button
    // This assumes clicking the email button shows a form
    cy.get("[data-cy='sign-in-form']").should("exist");
    
    // Test form fields if they exist
    cy.get("[data-cy='sign-in-form']").within(() => {
      // Add email field test if it exists
      cy.get("input[type='email']").should("exist");
      cy.get("input[type='password']").should("exist");
    });
  });

  it("sign out functionality", () => {
    // First login
    cy.get("[data-cy='nav-sign-in']").click();
    cy.get("[data-cy='sign-in-github']").click();
    cy.loginBySession();
    cy.visit("/");
    
    // Then test sign out
    cy.get("[data-cy='nav-sign-out']").should("exist");
    cy.get("[data-cy='nav-sign-out']").click();
    cy.url().should("include", "/signin");
  });

  it("profile link appears after login", () => {
    cy.get("[data-cy='nav-sign-in']").click();
    cy.get("[data-cy='sign-in-github']").click();
    cy.loginBySession();
    cy.visit("/");
    
    cy.get("[data-cy='nav-profile']").should("exist");
    cy.get("[data-cy='nav-profile']").should("contain.text", "Profile");
  });

  // it("can add new todo items", () => {
  //   const newItem = "Feed the cat";
  //   cy.get("[data-test=new-todo]").type(`${newItem}{enter}`);
  //   cy.get(".todo-list li")
  //     .should("have.length", 3)
  //     .last()
  //     .should("have.text", newItem);
  // });

  // it("can check off an item as completed", () => {
  //   cy.contains("Pay electric bill")
  //     .parent()
  //     .find("input[type=checkbox]")
  //     .check();

  //   cy.contains("Pay electric bill")
  //     .parents("li")
  //     .should("have.class", "completed");
  // });

  // context("with a checked task", () => {
  //   beforeEach(() => {
  //     cy.contains("Pay electric bill")
  //       .parent()
  //       .find("input[type=checkbox]")
  //       .check();
  //   });

  //   it("can filter for uncompleted tasks", () => {
  //     cy.contains("Active").click();
  //     cy.get(".todo-list li")
  //       .should("have.length", 1)
  //       .first()
  //       .should("have.text", "Walk the dog");
  //     cy.contains("Pay electric bill").should("not.exist");
  //   });

  //   it("can filter for completed tasks", () => {
  //     cy.contains("Completed").click();
  //     cy.get(".todo-list li")
  //       .should("have.length", 1)
  //       .first()
  //       .should("have.text", "Pay electric bill");
  //     cy.contains("Walk the dog").should("not.exist");
  //   });

  //   it("can delete all completed tasks", () => {
  //     cy.contains("Clear completed").click();
  //     cy.get(".todo-list li")
  //       .should("have.length", 1)
  //       .should("not.have.text", "Pay electric bill");
  //     cy.contains("Clear completed").should("not.exist");
  //   });
  // });
});
