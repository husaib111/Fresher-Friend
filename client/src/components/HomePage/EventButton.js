import React from "react";
import "./EventButton.css";

export const Button = ({
  children,
  onClick
}) => {

  return (
    <button
      className={`btn ${"btn--success--solid"} ${"btn--large"}`}
      onClick={onClick}
      type={"button"}
    >
      {children}
    </button>
  );
};
