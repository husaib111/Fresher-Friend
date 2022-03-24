// App.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Test", () => {
  it("Test 1", () => {
    //login
    cy.visit("https://www.fresher-friend.bham.team");
    cy.findByRole("textbox", { name: /emailinput/i }).type(
      "txg071@student.bham.ac.uk"
    );
    cy.findByPlaceholderText(/password/i).type("MySecurePassword");
    cy.findByRole("checkbox", { name: /checkprivacy/i }).click();
    cy.findByRole("button", { name: /loginbutton/i }).click();
  });
});
