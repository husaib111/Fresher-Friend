import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./HomePage";
import "@testing-library/jest-dom";

it("renders Welcome to FresherFriend", () => {
  render(<App />);
  expect(screen.getByText("Welcome to Fresher Friend.")).toBeInTheDocument();
});
