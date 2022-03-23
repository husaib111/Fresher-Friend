import App from "./App";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

//SUPPRESS WINDOW ALERT ERROR SINCE THEY ARE NOT PART OF JEST-DOM
window.alert = () => {};

it("System Test 1", () => {
  try {
    //SHOULD RENDER THE LOGIN PAGE AND GET A TEXT "FRESHER FRIEND"
    render(<App />);
    expect(screen.getByText("Fresher Friend")).toBeInTheDocument();
    console.log("Hi");

    //SHOULD REMAIN ON LOGIN PAGE BECAUSE NO USER INFO WAS TYPED NOR AGREED TO PRIVACY POLICY
    // const loginButton = screen.getByLabelText("loginButton");
    // userEvent.click(loginButton);
    // expect(screen.getByLabelText("loginButton")).toBeInTheDocument();

    // //SHOULD REMAIN ON LOGIN PAGE BECAUSE USER HAS NOT AGREED TO PRIVACY POLICY
    // userEvent.type(
    //   screen.getByLabelText("emailInput"),
    //   "txg071@student.bham.ac.uk"
    // );
    // userEvent.type(screen.getByLabelText("passwordInput"), "MySecurePassword");
    // userEvent.click(loginButton);
    // expect(screen.getByLabelText("loginButton")).toBeInTheDocument();

    // //SHOULD LOG IN AND SHOW HOMEPAGE
    // userEvent.click(screen.getByLabelText("checkPrivacy"));
    // userEvent.click(loginButton);
    // expect(screen.getByText("Flat 1")).toBeInTheDocument();
  } catch (e) {
    console.log(e.message);
    expect(false).toBe(true);
  }
});
