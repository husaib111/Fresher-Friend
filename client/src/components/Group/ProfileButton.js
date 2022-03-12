import "./ProfileButton.css";
import "./Group.css";
import React from "react";
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

export default ProfileButton;
