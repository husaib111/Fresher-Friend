// import React from "react";
// import { render, screen } from "@testing-library/react";
// import App from "./Group";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
// import { render } from "@testing-library/react";
import Axios from "axios";

const getSession = async () => {
  try {
    const response = await Axios.post(
      "https://www.fresher-friend.bham.team:5001/login",
      {
        email: "txg071@student.bham.ac.uk",
        password: "MySecurePassword",
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const session = await response.headers["set-cookie"][0]
      .split(",")
      .map((item) => item.split(";")[0])[0]
      .split("=")[1];

    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: `token=${session}`,
    });
  } catch (e) {
    console.log(e.message);
  }
};
// getSession();

it("shows correct time for message input", () => {
  getSession();
  console.log(document.cookie);
  // render(<App />);
  // try {
  //   jest.useFakeTimers();
  //   jest.setSystemTime(new Date("20 Aug 2020 02:12:00 GMT").getTime());
  //   render(<App />);
  //   async (dispatch) => {
  //     await userEvent.type(
  //       screen.getByLabelText("chatInput"),
  //       "Chat Window Test"
  //     );
  //     const buttonE1 = screen.getByLabelText("chatButton");
  //     await userEvent.click(buttonE1);
  //     expect(screen.getByText("02:12")).toBeInTheDocument();
  //   };
  // } finally {
  //   jest.useRealTimers();
  // }
});
/*
it("shows the message on screen that a user has input", () => {
  render(<App />);
  async (dispatch) => {
    await userEvent.type(
      screen.getByLabelText("chatInput"),
      "Chat Window Test"
    );
    const buttonE1 = screen.getByLabelText("chatButton");
    await userEvent.click(buttonE1);
    expect(screen.getByText("Chat Window Test")).toBeInTheDocument();
  };
});

it("doesn't show the message Chat Window Test as no user has inputted it", () => {
  render(<App />);
  async (dispatch) => {
    const buttonE1 = screen.getByLabelText("chatButton");
    await userEvent.click(buttonE1);
    expect(screen.getByText("Chat Window Test")).not.toBeInTheDocument();
  };
}); */
