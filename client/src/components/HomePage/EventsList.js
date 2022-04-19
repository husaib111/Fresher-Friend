import "./EventsList.css"
import "./EventButton.css";
import "./HomePage.css";
//import {IoHome} from "react-icons/io5";
import Axios from "axios";
import React, { useState, useEffect } from "react";
// import React from 'react';

function EventDetails(props) {
  alert("This is event: " + props.name +"\n Happening at: " + props.location);

}


function EventButton(props) {
  return (
    <div className="EventButton">
        <div className="EventButtonCircle">
        </div>
        <div className="EventButtonTitle">
          <h1>{props.name}</h1>
        </div>
    </div>
  );
}

function EventsList(props) {
  const getEventsName = async () => {
    console.log("here");
    await Axios.get(
      "https://www.fresher-friend.bham.team:5001/eventInfo/1",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        const { data } = response;
        console.log(data);
        const {event_name} = data;
        console.log(event_name);
        setEventName(event_name);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [name, setEventName] = useState([]);
  useEffect(() => {
    getEventsName();
  });
  const getEventsLocation = async () => {
    console.log("here");
    await Axios.get(
      "https://www.fresher-friend.bham.team:5001/eventInfo/1",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        const { data } = response;
        const {location} = data;
        console.log(location);
        setLocation(location);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [location, setLocation] = useState([]);
  useEffect(() => {
    getEventsLocation();
  });
  return <div className="groupsList">
    <EventButton onClick={()=>{EventDetails()}}name={name} type="event"/>
  </div>;
  }

export default EventsList;
