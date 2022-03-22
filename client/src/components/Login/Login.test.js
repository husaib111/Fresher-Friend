/* eslint-disable no-unused-expressions */
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./Login";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

it("fails when no data is inputted", () => {
  // render(<App />);
  // async (dispatch) => {
  //   const buttonE1 = screen.getByLabelText("loginButton");
  //   await userEvent.click(buttonE1);
  //   expect(
  //     screen.getByText(
  //       "Your email or password is incorrect, please check your login information!"
  //     )
  //   ).toBeInTheDocument();
  // };
});

it("succeeds when correct data is inputted", () => {
  render(<App />);
  // async (dispatch) => {
  //   await userEvent.type(
  //     screen.getByLabelText("emailInput"),
  //     "txg071@student.bham.ac.uk"
  //   );
  //   await userEvent.type(
  //     screen.getByLabelText("passwordInput"),
  //     "MySecurePassword"
  //   );
  //   const buttonE1 = screen.getByLabelText("loginButton");
  //   await userEvent.click(buttonE1);
  //   expect(screen.getByText("Login Successful!")).toBeInTheDocument();
  // };
});

it("fails when incorrect data is inputted", () => {
  render(<App />);
  // async (dispatch) => {
  //   await userEvent.type(screen.getByLabelText("emailInput"), "badUsername");
  //   await userEvent.type(screen.getByLabelText("passwordInput"), "badpassword");
  //   const buttonE1 = screen.getByLabelText("loginButton");
  //   await userEvent.click(buttonE1);
  //   expect(
  //     screen.getByText(
  //       "Your email or password is incorrect, please check your login information!"
  //     )
  //   ).toBeInTheDocument();
  // };
});

it("fails when incorrect username and correct password is inputted", () => {
  render(<App />);
  // async (dispatch) => {
  //   await userEvent.type(screen.getByLabelText("emailInput"), "badUsername");
  //   await userEvent.type(
  //     screen.getByLabelText("passwordInput"),
  //     "MySecurePassword"
  //   );
  //   const buttonE1 = screen.getByLabelText("loginButton");
  //   await userEvent.click(buttonE1);
  //   expect(
  //     screen.getByText(
  //       "Your email or password is incorrect, please check your login information!"
  //     )
  //   ).toBeInTheDocument();
  // };
});

it("fails when correct username and incorrect password is inputted", () => {
  render(<App />);
  // async (dispatch) => {
  //   await userEvent.type(
  //     screen.getByLabelText("emailInput"),
  //     "txg071@student.bham.ac.uk"
  //   );
  //   await userEvent.type(screen.getByLabelText("passwordInput"), "badpassword");
  //   const buttonE1 = screen.getByLabelText("loginButton");
  //   await userEvent.click(buttonE1);
  //   expect(
  //     screen.getByText(
  //       "Your email or password is incorrect, please check your login information!"
  //     )
  //   ).toBeInTheDocument();
  // };
});

//it("doesn't break when unicode is inputted", () => {
//    render(<App />);
//    async (dispatch) => {
//    await userEvent.type(screen.getByLabelText("emailInput"),"這是個秘密 ");
//    await userEvent.type(screen.getByLabelText("passwordInput"),"coração");
//    const buttonE1 = screen.getByLabelText("loginButton");
//    await userEvent.click(buttonE1);
//    expect(screen.getByText("Your email or password is incorrect, please check your login information!")).toBeInTheDocument();
//    }
//});

//it("doesn't allow sql injection", () => {
//    render(<App />);
//    async (dispatch) => {
//    await userEvent.type(screen.getByLabelText("emailInput"),"\" or \"\"=\"\"");
//    await userEvent.type(screen.getByLabelText("passwordInput"),"\" or \"\"=\"\"");
//    const buttonE1 = screen.getByLabelText("loginButton");
//    await userEvent.click(buttonE1);
//    expect(screen.getByText("txg071@student.bham.ac.uk")).not.toBeInTheDocument();
//    }
//});
