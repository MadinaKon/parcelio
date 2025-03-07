describe("TableDataGrid Component", () => {
  beforeEach(() => {
    // Visit the page where the TableDataGrid component is rendered
    cy.visit("https://parcelio-git-main-madinakons-projects.vercel.app/");
  });

  it("should display the correct columns for authenticated users", () => {
    // Simulate user authentication
    cy.login(); // Assuming you have a custom command for logging in

    // Check if the user-specific columns are displayed
    cy.get(".MuiDataGrid-columnHeaderTitle")
      .contains("First Name")
      .should("exist");
    cy.get(".MuiDataGrid-columnHeaderTitle")
      .contains("Last Name")
      .should("exist");
    cy.get(".MuiDataGrid-columnHeaderTitle")
      .contains("Username")
      .should("exist");
    cy.get(".MuiDataGrid-columnHeaderTitle")
      .contains("Phone Number")
      .should("exist");
  });

  it("should display the correct columns for unauthenticated users", () => {
    // Simulate user logout
    cy.logout(); // Assuming you have a custom command for logging out

    // Check if the common columns are displayed
    cy.get(".MuiDataGrid-columnHeaderTitle")
      .contains("From City")
      .should("exist");
    cy.get(".MuiDataGrid-columnHeaderTitle")
      .contains("To City")
      .should("exist");
    cy.get(".MuiDataGrid-columnHeaderTitle")
      .contains("Flight Date")
      .should("exist");
    cy.get(".MuiDataGrid-columnHeaderTitle")
      .contains("Available Kilos")
      .should("exist");
  });

  it('should disable the "Add service" button for unauthenticated users', () => {
    // Simulate user logout
    cy.logout(); // Assuming you have a custom command for logging out

    // Check if the "Add service" button is disabled
    cy.get("button").contains("Add service").should("be.disabled");
  });

  it('should enable the "Add service" button for authenticated users', () => {
    // Simulate user authentication
    cy.login(); // Assuming you have a custom command for logging in

    // Check if the "Add service" button is enabled
    cy.get("a").contains("Add service").should("exist");
  });
});
