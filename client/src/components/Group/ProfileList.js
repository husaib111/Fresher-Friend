import "./ProfileList.css";
import Axios from "axios";
import React, { useState, useEffect, Component } from "react";

import ProfileButton from "./ProfileButton";
function makeProfileButton(name) {
  return <ProfileButton name={name} />;
}

function ProfileList() {
  const getInfo = async (i) => {
    await Axios.get("http://www.fresher-friend.bham.team:5001/courseUsers", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const { data } = response;
        const { first_name } = data[0];
        // const divForProfileList = document.getElementByClassname('ProfileList');
        const buttons = [first_name].map((name) => makeProfileButton(name));
        setInfo(buttons);
        console.log(first_name);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [info, setInfo] = useState(() => getInfo(2));
  useEffect(() => {
    getInfo(2);
  }, []);

  return (
    <div className="ProfileList">
      {info[0]}
      {/* <ProfileButton /> */}
      {/* <ProfileButton /> */}
      {/* <ProfileButton /> */}
      {/* <ProfileButton /> */}
      {/* <ProfileButton /> */}
      {/* <ProfileButton /> */}
      {/* <ProfileButton /> */}
    </div>
  );
}

export default ProfileList;
