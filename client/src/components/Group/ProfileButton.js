import "./ProfileButton.css";
import "./Group.css";
import React, { useState, useEffect } from "react";
import { IoPersonCircle } from "react-icons/io5";
import Axios from "axios";

function ProfileButton(props){
  
    return(
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
  )
}

//class ProfileButton extends Component{
//    render(){

export default ProfileButton;
