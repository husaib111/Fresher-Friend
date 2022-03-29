import React, { useCallback, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faCertificate,
  faPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import pfp from "../../resources/default_pfp.png";
import "./Account.css";
import Interest from "./Interest";
import Axios from "axios";
import Navbar from "../Navbar/Navbar";

function Account() {
  library.add(fas);
  let {userName} = useParams();
  const [status] = useState([false, false, false])[0];


  const generateInterests = (row) => {
    const { interest_name, interest_icon } = row;
    return (
      <Interest interestName={interest_name} key={interest_name} icon={["fas", interest_icon]} />
    );
  };

  const [interests, setInterests] = useState([]);

  const getInfo = useCallback(async () => {
    console.log("getting info");
    await Axios.get(
      "https://www.fresher-friend.bham.team:5001/userInfo/"+userName,
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
        // window.location.href = "/";
      });
  },[userName]);

  const getInterests = useCallback(async () => {
    console.log("getting interests");
    await Axios.get(
      "https://www.fresher-friend.bham.team:5001/userInterests/"+userName,
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
      }
      )},[userName])

  const [info, setInfo] = useState([]);

  useEffect(() => {
    getInfo();
    getInterests();
  },[getInfo,getInterests]);


  return (
    <div>
      <Navbar />
      <div className="Account">
        <div className="basicInfo">
          <div className="pfpContainer">
            <img className="pfp" src={pfp} alt="Profile" />
          </div>
          <h1>
            {info[0]} {info[1]} {info[2]}
          </h1>
          <p className="About">{info[3]}</p>
          {/* <p className="About">First Year</p> */}
          <p className="About">
            Flat {info[4]}, Block {info[5]}, {info[6]}
          </p>
        </div>
        <div className="statusButtons">
          <div className="statusButton">
            <FontAwesomeIcon
              className={`statusIcon ${status[0] ? "isolating" : ""}`}
              icon={faCertificate}
            />
            <p className="statusLabel">I'm isolating</p>
          </div>
          <div className="statusButton">
            <FontAwesomeIcon
              className={`statusIcon ${status[1] ? "away" : ""}`}
              icon={faPlane}
            />
            <p className="statusLabel">I'm away</p>
          </div>
          <div className="statusButton">
            <FontAwesomeIcon
              className={`statusIcon ${status[2] ? "guest" : ""}`}
              icon={faUser}
            />
            <p className="statusLabel">I have a guest</p>
          </div>
        </div>
        <div className="interestBox">
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

export default Account;
