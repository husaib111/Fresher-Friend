import React, { useCallback, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faCertificate,
  faPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import pfp from "../../resources/default_pfp.png";
import { useParams } from "react-router-dom";
import "./Account.css";
import Interest from "./Interest";
import Axios from "axios";
import Navbar from "../Navbar/Navbar";

const [status,setStatus] = useState([]);

function Account() {
  library.add(fas);
  
  let {userName} = useParams();
  
  const generateInterests = (row) => {
    const { interest_name, interest_icon } = row;
    return (
      <Interest
        aria-label={interest_name}
        interestName={interest_name}
        key={interest_name}
        icon={["fas", interest_icon]}
      />
    );
  };

  const [interests, setInterests] = useState([]);

  const getInfo = useCallback(async () => {
    // console.log("getting info");
    await Axios.get(
      "https://www.fresher-friend.bham.team:5001/userInfo/" + userName,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        const { data } = response;
        const {
          first_name,
          middle_name,
          last_name,
          course_name,
          flat_num,
          block_num,
          acc_location,
        } = data[0];
        setInfo([
          first_name,
          middle_name,
          last_name,
          course_name,
          flat_num,
          block_num,
          acc_location,
        ]);
      })
      .catch((e) => {
        console.log(e);
        window.location.href = "/";
      });
  }, [userName]);

  const getInterests = useCallback(async () => {
    // console.log("getting interests");
    await Axios.get(
      "https://www.fresher-friend.bham.team:5001/userInterests/" + userName,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        const { data } = response;
        const myInterests = data.map((row) => generateInterests(row));
        setInterests(myInterests);
      })
      .catch((e) => {
        console.log(e);
        // window.location.href = "/";
      });
  }, [userName]);

  const getStatus = useCallback(async () => {
    await Axios.get(
      "https://www.fresher-friend.bham.team:5001/userStatus/" + userName,
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
        const { isolating, away, guest, priv } = data[0];
        // console.log(isolating);
        console.log("setting status to" + isolating + away + guest + priv);
        setStatus([
          parseInt(isolating),
          parseInt(away),
          parseInt(guest),
          parseInt(priv),
        ]);
      })
      .catch((e) => {
        console.log(e);
        // window.location.href = "/";
      });
  }, [userName]);

  const [info, setInfo] = useState([]);

  useEffect(() => {
    getInfo();
    getInterests();
    getStatus();
  }, [getStatus, getInfo, getInterests]);

  const accomodationInfo = "Flat " + info[4] + ", Block " + info[5] + ", " + info[6];
  
  return (
    <div>
      <Navbar />
      <div className="Account" aria-label="Other user's Profile">
        <div className="basicInfo" aria-label="Profile information">
          <div className="pfpContainer">
            <img className="pfp" src={pfp} alt="Profile" />
          </div>
          <h1>
            {info[0]} {info[1]} {info[2]}
          </h1>
          <p className="About" aria-label="Course information">
            {info[3]}
          </p>
          {/* <p className="About">First Year</p> */}
          <p id="accommodationI" className="About" aria-label="accommodation information">
            {accomodationInfo}
          </p>
        </div>
        <div className="statusButtons" aria-label="Profile status">
          <div
            className="statusButton"
            aria-label={`statusIcon ${status[0] ? "isolating" : ""}`}
          >
            <FontAwesomeIcon
              aria-label={`statusIcon ${status[0] ? "isolating" : ""}`}
              className={`statusIcon ${status[0] ? "isolating" : ""}`}
              icon={faCertificate}
              tabIndex="0"
            />
            <p className="statusLabel">I'm isolating</p>
          </div>
          <div
            className="statusButton"
            aria-label={`statusIcon ${status[1] ? "away" : ""}`}
          >
            <FontAwesomeIcon
              aria-label={`statusIcon ${status[1] ? "away" : ""}`}
              className={`statusIcon ${status[1] ? "away" : ""}`}
              icon={faPlane}
              tabIndex="0"
            />
            <p className="statusLabel">I'm away</p>
          </div>
          <div
            className="statusButton"
            aria-label={`statusIcon ${status[2] ? "guest visiting" : ""}`}
          >
            <FontAwesomeIcon
              aria-label={`statusIcon ${status[2] ? "guest visiting" : ""}`}
              className={`statusIcon ${status[2] ? "guest" : ""}`}
              icon={faUser}
              tabIndex="0"
            />
            <p className="statusLabel">I have a guest</p>
          </div>
        </div>
        <div
          id="interestB"
          className="interestBox"
          /*tabIndex={status[3] ? "-1" : "0"}*/
        >
          <h2>Interests</h2>
          <div className="interests">
            {interests}
            {/* <Interest icon={faFutbol} interestName="Football"/> */}
            {/* <Interest icon={faGamepad} interestName="Games"/> */}
            {/* <Interest icon={faTrain} interestName="Travel"/> */}
            {/* <Interest icon={faBicycle} interestName="Cycling"/> */}
          </div>
        </div>
      </div>
    </div>
  );
}

if(status[3] === 1) {
  document.getElementById("interestB").style.display = 'none';
  document.getElementById("interestB").style.zIndex = -1;
  document.getElementById("accommodationI").innerHTML = "Private Account";
}

export default Account;
