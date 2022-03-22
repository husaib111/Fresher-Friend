import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./HomePage";
import "@testing-library/jest-dom";

it("renders FresherFriend", () => {
  render(<App />);
  expect(screen.getByText("Fresher Friend")).toBeInTheDocument();
});

it("can access MyAccount via the NavBar", () => {
  render(<App />);
  // async (dispatch) => {
  //   const buttonE1 = screen.getByLabelText("menuBarButton");
  //   await userEvent.click(buttonE1);
  //   const buttonE2 = screen.getByLabelText("myAccountLink");
  //   await userEvent.click(buttonE1);
  //   expect(screen.getByText("Your Account")).toBeInTheDocument();
  // };
});
