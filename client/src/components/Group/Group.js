import React from "react";
import "./Group.css";
import ChatWindow from "./ChatWindow";
import ProfileList from "./ProfileList";
import Navbar from "../Navbar/Navbar";

function Group() {

  return (
      <div>
          <Navbar />
          <h1 className="title">Group Name</h1>
          <ProfileList />
          <div className="chat-window-holder">
          <ChatWindow />
          </div>
      </div>

  );
}
export default Group;
