import "./GroupButton.css";
import React, {Component} from 'react';
import {IoHome} from "react-icons/io5";

class GroupButton extends Component{
    render(){
        return(
            <div className="GroupButton">
                <IoHome className={"Icon"} />
                <p> Example Group </p>
            </div>
        )
    }
}

export default GroupButton;