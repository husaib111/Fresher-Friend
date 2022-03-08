import "./GroupButton.css";
import React, {Component} from 'react';
import {IoHome} from "react-icons/io5";


class GroupButton extends Component{
    render(){


        return(
            <div className="GroupButton" onClick={event => this.openGroup(event)}>
                <a href = {"/Group"}>
                <div className="GroupButtonCircle">
                    <IoHome className={"GroupButtonIcon"} />
                </div>
                <div className="GroupButtonTitle">
                Example Group
                </div>
                </a>
            </div>
        )
    }

    openGroup(event) {
        console.log("Opening Group" + event)
    }
}
    export default GroupButton;