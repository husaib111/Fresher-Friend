import "./EventsList.css"
import "./EventButton.css";
import "./HomePage.css";
import Axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
/*import {useParams} from "react-router-dom";*/
import { FaBeer } from 'react-icons/fa';


function myfunction(name) {
    console.log("name"+name);
    const { event_name, location, starttime, endtime } = name;
  alert("Welcome to Event: " + event_name + "\n Located at: " + location + "\n Starting at: " + starttime + "\n And ending at: " + endtime);
}


function EventButton(props) {
    const {event_name} = props.name;
  return (
    <button aria-label={event_name} className="loginButton btn btn-primary" onClick={() => myfunction(props.name)}><FaBeer></FaBeer>
    <div aria-label={event_name} className="event">
        <div aria-label={event_name} className="EventButtonTitle">
          <h1>{event_name}</h1>
        </div>
    </div>
    </button>
  );
}

function makeEventButton(name) {
    const { event_name, location, starttime, endtime } = name;
    console.log(event_name);
    console.log(location);
    console.log(starttime);
    console.log(endtime);
  return <EventButton name={name}/>;
}


function EventsList(props) {
  /*let params = useParams();*/
  const getInfo = useCallback(async () => {

    await Axios.get(
      "https://www.fresher-friend.bham.team:5001/getEvents",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        const { data } = response;
        // console.log(data);
        const buttons = data.map((name) => makeEventButton(name));
        console.log(buttons);
        setInfo(buttons);
      })
      .catch((e) => {
        console.log(e);
      });
  },[]);

  const [info, setInfo] = useState([]);
  useEffect(() => {
    getInfo();
  },[getInfo]);
  return <table className="EventList">{info}

  </table>;

/*
  return <div className="groupsList">
    <EventButton onClick={()=>{alert(location);}}name={name} type="event"/>
  </div>;
  */
  }

export default EventsList;
