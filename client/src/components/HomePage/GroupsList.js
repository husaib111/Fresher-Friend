import "./GroupsList.css"
import "./GroupButton.css";
import "./HomePage.css";
import {IoHome} from "react-icons/io5";
import Axios from "axios";
import React, { useState, useEffect } from "react";

function GroupButton(props) {
    return (
      <div className="ProfileButton">
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
  
  function makeGroupButton(name) {
    const { first_name } = name;
    return <GroupButton name={first_name} />;
  }
  
  function GroupsList(props) {
    const getInfo = async () => {
      await Axios.get("https://www.fresher-friend.bham.team:5001/courseUsers", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          const { data } = response;
          // console.log(data);
          const buttons = data.map((name) => makeGroupButton(name));
          console.log(buttons);
          setInfo(buttons);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const [info, setInfo] = useState([]);
    useEffect(() => {
      getInfo();
    }, []);
  
    return <div className="GroupsList">{info}</div>;
  }

export default GroupsList;
