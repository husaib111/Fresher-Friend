import React, {useState } from "react";
import "./Group.css";
import ChatWindow from "./ChatWindow";
import ProfileList from "./ProfileList";

function Group() {

  return (
      <div>
          <ProfileList />
          <ChatWindow />
      </div>

  );
}
export default Group;
