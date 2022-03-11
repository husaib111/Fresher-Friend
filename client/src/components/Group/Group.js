import React from "react";
import "./Group.css";
import ChatWindow from "./ChatWindow";
import ProfileList from "./ProfileList";

function Group() {

  return (
      <div>
          <h1 className="title">Group Name</h1>
          <ProfileList />
          <div className="chat-window-holder">
          <ChatWindow />
          </div>
      </div>

  );
}
export default Group;
