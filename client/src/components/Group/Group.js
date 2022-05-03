// import React from "react";
import "./Group.css";
import ChatWindow from "./ChatWindow";
import ProfileList from "./ProfileList";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import Axios from "axios";
import React, { useState, useEffect } from "react";

function Group() {
  let params = useParams();
  let url;
  if(params.type==="course"){
    url="courseInfo";
  } else {
    url="accomInfo";
  }
  const getInfo = async () => {
    await Axios.get(
      "https://www.fresher-friend.bham.team:5001/" + url,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        const { data } = response;
        if(params.type==="course"){
          const {course_name} = data[0];
          setInfo(course_name);
        } else {
          const {flat_num} = data[0];
          setInfo("Flat "+flat_num);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [info, setInfo] = useState([]);
  useEffect(() => {
    getInfo();
  });

  return (
      <div>
          <Navbar />
          <h1 className="title">{info}</h1>
          <ProfileList />
          <div className="chat-window-holder">
          <ChatWindow type={params.type}/>
          </div>
      </div>

  );
}
export default Group;
