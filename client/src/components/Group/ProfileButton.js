import "./ProfileButton.css";
import React, {Component} from 'react';
import {IoPersonCircle} from "react-icons/io5";

class ProfileButton extends Component{
    render(){
        return(
            <div className="ProfileButton">
                <a href={"/myAccount"}>
                <div className="ProfileButtonCircle">
                    <IoPersonCircle className={"ProfileButtonIcon"} />
                </div>
                <div className="ProfileButtonTitle">
                    Example Person
                </div>
                </a>
            </div>
        )
    }
}

export default ProfileButton;