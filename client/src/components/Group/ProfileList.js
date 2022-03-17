import "./ProfileList.css";
import "./ProfileButton.css";
import "./Group.css";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { IoPersonCircle } from "react-icons/io5";

function ProfileButton(props) {
  return (
    <div className="ProfileButton">
      <a href={"/myAccount"}>
        <div className="ProfileButtonCircle">
          <IoPersonCircle className={"ProfileButtonIcon"} />
        </div>
        <div className="ProfileButtonTitle">
          <h1>{props.name}</h1>
        </div>
      </a>
    </div>
  );
}

function makeProfileButton(name) {
  const { first_name } = name;
  return <ProfileButton name={first_name} />;
}

function ProfileList(props) {
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
        const buttons = data.map((name) => makeProfileButton(name));
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

  return <div className="ProfileList">{info}</div>;
}

export default ProfileList;
