import ScrollToBottom from "react-scroll-to-bottom";
//import SwipeableViews from "react-swipeable-views";
//import GroupsList from "./GroupsList";
import "./ChatWindow.css"
import React, {useCallback, useEffect, useState} from "react";
import ChatMessage from "./ChatMessage";
import Axios from "axios";



function ChatWindow(params){
    function generateChatMessage(message){
        console.log(message);
        const {msg_txt, posted_at, first_name} = message
        return ChatMessage({author: first_name, time: posted_at, text: msg_txt});
    }

    let getInfo;
    getInfo = useCallback (async () => {
        await Axios.get(
            "https://www.fresher-friend.bham.team:5001/getCourseMessages",
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                const {data} = response;
                console.log("Data" + data);
                setInfo(data.map((message) => generateChatMessage(message) ));
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const [info, setInfo] = useState([]);
    useEffect(() => {
        getInfo();
    },[getInfo]);



    const [currentMessage, setCurrentMessage] = useState("");
    /*const [messageList, setMessageList] = useState([]);*/
    let sendMessage;
    sendMessage = async () => {
        await Axios.post(
            "https://www.fresher-friend.bham.team:5001/postCourseMessage",
            {message: "POSTED: " + currentMessage},
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
    }


    function sendMessageInTextbox() {
        console.log("Posting Message: " + currentMessage)
        sendMessage();
        setCurrentMessage("")
    }

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Group Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {info}
                </ScrollToBottom>
            </div>

            <div className="chat-footer">
                <input
                    aria-label="chatInput"
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessageInTextbox();
                    }}
                />
                <button aria-label="chatButton" onClick={sendMessageInTextbox}>&#9658;</button>
            </div>
        </div>
    )
}

export default ChatWindow;
