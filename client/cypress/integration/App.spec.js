describe("System e2e tests", () => {
  it("Log as Tomas, check John's profile, set status to isolating, and log out.", () => {
    //visit the fresher friend website
    cy.visit("/");

    //input user credentials
    cy.findByRole("textbox", { name: /emailinput/i }).type(
      "txg071@student.bham.ac.uk"
    );
    cy.findByPlaceholderText(/password/i).type("MySecurePassword");

    //agree to privacy policy and log in
    cy.findByRole("checkbox", { name: /checkprivacy/i }).click();
    cy.findByRole("button", { name: /loginbutton/i }).click();

    //enter group Flat 1 and check John's profile
    cy.findByRole("link", { name: /flat 1/i }).click();
    cy.findByRole("link", { name: /john/i }).click();

    //navigate the navbar and enter own profile
    cy.get(".MenuBarButton > .NavbarIcon > path").click();
    cy.get(".TopNavbarMenuItems > :nth-child(2) > a").click();

    //set status to isolating
    cy.get(".statusButtons > :nth-child(1) > .svg-inline--fa > path").click();

    //log out from Fresher Friend
    cy.get(".logout").click();
  });

  it("Log as John, check both groups, read privacy policy, and log out.", () => {
    //visit the fresher friend website
    cy.visit("/");

    //input user credentials
    cy.findByRole("textbox", { name: /emailinput/i }).type(
      "jxs889@student.bham.ac.uk"
    );
    cy.findByPlaceholderText(/password/i).type("Password123");

    //agree to privacy policy and log in
    cy.findByRole("checkbox", { name: /checkprivacy/i }).click();
    cy.findByRole("button", { name: /loginbutton/i }).click();

    //enter group Flat 1
    cy.findByRole("link", { name: /flat 1/i }).click();

    //go back to homepage
    cy.get(".MenuBarButton > .NavbarIcon > path").click();
    cy.get(".TopNavbarMenuItems > :nth-child(1) > a").click();

    //enter course group
    cy.get(".groupsList > :nth-child(2) > a").click();

    //navigate to privacy policy
    cy.get(".MenuBarButton > .NavbarIcon > path").click();
    cy.get(".BottomNavbarMenuItems > :nth-child(2) > a").click();

    //log out from Fresher Friend
    cy.get(".MenuBarButton > .NavbarIcon > path").click();
    cy.get(".BottomNavbarMenuItems > :nth-child(3) > a").click();
  });

  it("Try logging as John, get alert to agree to Privacy Policy, read Privacy Policy, and navigate to cookie page.", () => {
    //visit the fresher friend website
    cy.visit("/");

    //input user credentials
    cy.findByRole("textbox", { name: /emailinput/i }).type(
      "jxs889@student.bham.ac.uk"
    );
    cy.findByPlaceholderText(/password/i).type("Password123");

    //try logging in without agreeing to Privacy Policy
    cy.findByRole("button", { name: /loginbutton/i }).click();

    //open Privacy Policy and read through it
    cy.get('[data-testid="privacyLink"]').click();

    //find link to allaboutcookies.org to learn more about cookies
    cy.get("p > a");
  });
});
