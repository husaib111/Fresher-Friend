
import React from "react";
import "./ChatMessage.css"


function ChatMessage(props) {
    return (
        <div className={`ChatMessage ${props.author===props.user? "you": "other"}`}>
                <div>
                <div className="MessageInfo">{props.author} - {props.time}  </div>
                <div className="MessageBubble">
                    <div className="messageText">{props.messageText}</div>
                </div>
                </div>
        </div>
    );
}

export default ChatMessage;
