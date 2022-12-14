import "./EventButton.css";
import "./HomePage.css";
import React from "react";


function EventButton(props) {
    return (
      <div aria-label={props.name} className="EventButton">
        <a>
          <div className="EventButtonCircle">
          </div>
          <div className="EventButtonTitle">
            <h1>{props.name}</h1>
          </div>
        </a>
      </div>
    );
  }
    export default EventButton;
