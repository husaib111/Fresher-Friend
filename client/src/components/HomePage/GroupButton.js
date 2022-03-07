import "./GroupButton.css";
import React, {Component} from 'react';
import {IoHome} from "react-icons/io5";

class GroupButton extends Component{
    render(){
        return(
            <div className="GroupButton">
                <div className="GroupButtonCircle">
                    <IoHome className={"Icon"} />
                </div>
                <div className="GroupButtonTitle">
                Example Group
                </div>
            </div>
        )
    }
}

export default GroupButton;