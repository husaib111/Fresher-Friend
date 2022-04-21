import "./EventsList.css"
import "./EventButton.css";
import "./HomePage.css";
import Axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EventButton(props) {
  return (
    <div className="EventButton">
      <a href={":5001/eventInfo/1"}>
        <div className="EventButtonCircle">
        </div>
        <div className="EventButtonTitle">
          <h1>{props.name}</h1>
        </div>
      </a>
    </div>
  );
}


function makeEventButton(name) {
  console.log(name);
  const { first_name } = name;
  return <EventButton name={first_name}/>;
}

function EventsList(props) {
  let params = useParams();
  const getInfo = useCallback(async () => {
    await Axios.get(
      "https://www.fresher-friend.bham.team:5001/"+ params.type + "Users",
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
  },[params.type]);

  const [info, setInfo] = useState([]);
  useEffect(() => {
    getInfo();
  },[getInfo]);
  return <div className="ProfileList">{info}</div>;

/*
  return <div className="groupsList">
    <EventButton onClick={()=>{alert(location);}}name={name} type="event"/>
  </div>;
  */
  }

export default EventsList;
