import ScrollToBottom from "react-scroll-to-bottom";
//import SwipeableViews from "react-swipeable-views";
//import GroupsList from "./GroupsList";
import "./ChatWindow.css"
import React, {useCallback, useEffect, useState} from "react";
import ChatMessage from "./ChatMessage";
import Axios from "axios";
import {useParams} from "react-router-dom";



function ChatWindow(props){
    let groupType;
    if(props.type==="course"){
        groupType = "Course"
    }
    else{
        groupType= "Acc"
    }

    function generateChatMessage(message){
        console.log("Generating chat message: " + message);
        const {msg_text, posted_at, first_name} = message
        let type = first_name==="you" ? "self":"other";
        return ChatMessage({author: first_name, time: posted_at, text: msg_text, type: type});
    }


    let getServerMessages, getFakeServerMessages;
    getServerMessages = useCallback (async () => {

        await Axios.get(
            "https://www.fresher-friend.bham.team:5001/get" + groupType + "Messages",
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
                setServerMessages(data.map((message) => generateChatMessage(message)));
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    getFakeServerMessages = () => { return (setServerMessages([
        generateChatMessage({
            msg_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            first_name:"Test Bob",
            posted_at:"2022-04-30T17:18:35.084Z"}),

        generateChatMessage({
            msg_text: "Quisque pellentesque facilisis dapibus.",
            first_name:"Test Jane",
            posted_at:"2022-04-30T17:18:35.084Z"}),

        generateChatMessage({
            msg_text: "Ut ut eros dignissim, blandit massa vel, tincidunt magna. Phasellus pharetra nisl eu tristique tempus. Donec sodales enim ac tortor lobortis rutrum. Sed sodales nibh sed consequat ultricies. Donec sed feugiat lorem. Nullam eu tempor libero, nec ultrices erat. Duis in ipsum quis dui facilisis ornare.",
            first_name:"Test Bob",
            posted_at:"2022-04-30T17:18:35.084Z"}),

        generateChatMessage({
            msg_text: "Integer rhoncus",
            first_name:"Test Bob",
            posted_at:"2022-04-30T17:18:35.084Z"}),

        generateChatMessage({
            msg_text: "quis",
            first_name:"Test Bob",
            posted_at:"2022-04-30T17:18:35.084Z"}),

    ]))}

    const [serverMessages, setServerMessages] = useState([]);
    useEffect(() => {
        getServerMessages();
        getFakeServerMessages();
    },[getServerMessages]);


    const [textBoxText, setTextBoxText] = useState("");

    let sendMessageToServer, AddUserPostedMessageToFrontEnd;
    sendMessageToServer = async () => {
        await Axios.post(
            "https://www.fresher-friend.bham.team:5001/post" + groupType + "Message",
            {message: "POSTED: " + textBoxText},
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
    }


    const [userPostedMessages, setUserPostedMessages] = useState([]);

    AddUserPostedMessageToFrontEnd = async () => {
        let newUserPostedMessages = [...userPostedMessages];

        let currentDate = new Date();

        let newMessage = generateChatMessage({
            msg_text: textBoxText, first_name: "you", posted_at:currentDate.toISOString(), type: "you"}
        );
        newUserPostedMessages.push(newMessage);
        setUserPostedMessages(newUserPostedMessages);
    }


    function sendMessageInTextbox() {
        console.log("Posting Message: " + textBoxText);
        AddUserPostedMessageToFrontEnd();

        sendMessageToServer();


        setTextBoxText("");
    }

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Group Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {serverMessages}
                    {userPostedMessages}
                </ScrollToBottom>
            </div>

            <div className="chat-footer">
                <input
                    aria-label="chatInput"
                    type="text"
                    value={textBoxText}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setTextBoxText(event.target.value);
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
