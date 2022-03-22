import "./GroupButton.css";
import {IoHome} from "react-icons/io5";
import "./HomePage.css";
import React from "react";


function GroupButton(props) {
    return (
      <div className="GroupButton">
        <a href={"/Group"}>
          <div className="GroupButtonCircle">
            <IoHome className={"GroupButtonIcon"} />
          </div>
          <div className="GroupButtonTitle">
            <h1>{props.name}</h1>
          </div>
        </a>
      </div>
    );
  }
    export default GroupButton;
