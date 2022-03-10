import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./Login";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

it("fails when no data is inputted", () => {
  render(<App />);
  const functionName = async (dispatch) => {
    const buttonE1 = screen.getByLabelText("loginButton");
    await userEvent.click(buttonE1);
    expect(
      screen.getByText(
        "Your email or password is incorrect, please check your login information!"
      )
    ).toBeInTheDocument();
  };
});
