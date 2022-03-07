import { GiThreeFriends } from "react-icons/gi";
import React, {Component} from 'react';
import ProfileList from "./ProfileList";

class Group extends Component{
    render(){
        return(
            <div className="App">
                <h1 className="title">
                    <GiThreeFriends className="icon" />
                    Group Page
                </h1>
                <ProfileList/>
            </div>
        )
    }
}

export default Group;
