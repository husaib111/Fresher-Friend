import "./ProfileList.css";
import "./ProfileButton.css";
import "./Group.css";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { useParams } from "react-router-dom";

function ProfileButton(props) {
  return (
    <div className="ProfileButton">
      <a href={"/account/" + props.username}>
        <div className="ProfileButtonCircle">
          <IoPersonCircle className={"ProfileButtonIcon"} />
        </div>
        <h1 className="ProfileButtonTitle">{props.name}</h1>
      </a>
    </div>
  );
}

function makeProfileButton(name) {
  console.log(name);
  const { first_name, email } = name;
  const username = email.substring(0, email.lastIndexOf("@"));
  return <ProfileButton name={first_name} username={username} />;
}

function ProfileList(props) {
  let params = useParams();
  const getInfo = async () => {
    await Axios.get(
      "https://www.fresher-friend.bham.team:5001/" + params.type + "Users",
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
  });

  return <div className="ProfileList"></div>;
}

export default ProfileList;
