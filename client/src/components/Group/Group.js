import { GiThreeFriends } from "react-icons/gi";
import React, {Component} from 'react';
import ProfileList from "./ProfileList";
import { useEffect, useState } from "react";


/*
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
*/

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    };

export default Group;
