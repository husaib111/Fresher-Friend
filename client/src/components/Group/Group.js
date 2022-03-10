import React, from "react";
import "./Group.css";
import ChatWindow from "./ChatWindow";
import ProfileList from "./ProfileList";

function Group() {

  return (
      <div>
          <ProfileList />
          <div className="chat-window-holder">
          <ChatWindow />
          </div>
      </div>

  );
}
export default Group;
