import ScrollToBottom from "react-scroll-to-bottom";
//import SwipeableViews from "react-swipeable-views";
//import GroupsList from "./GroupsList";
import "./ChatWindow.css"
import React, {useCallback, useEffect, useState} from "react";
import ChatMessage from "./ChatMessage";
import Axios from "axios";



function ChatWindow(params){
    function generateChatMessage(author, time, messageText){
        return ChatMessage({author:author, time:time, messageText:messageText});
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

                setInfo([
                    generateChatMessage("Bob", "10:10", "Hello"),
                ]);
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


/*
function ChatWindow({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    //const [sendMessage] = useState("");

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };



    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Group Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                            <div
                                className="message"
                                id={username === messageContent.author ? "you" : "other"}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button aria-label="chatButton" onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}
*/
export default ChatWindow;
