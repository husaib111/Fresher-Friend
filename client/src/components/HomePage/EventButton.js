import "./EventButton.css";
import "./HomePage.css";
import React from "react";


function EventButton(props) {
    return (
      <div className="EventButton">
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
