import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./HomePage";
import "@testing-library/jest-dom";

it("renders FresherFriend", () => {
  render(<App />);
  expect(screen.getByText("Fresher Friend")).toBeInTheDocument();
});
