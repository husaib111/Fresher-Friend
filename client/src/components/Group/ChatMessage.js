
import React from "react";
import "./ChatMessage.css"


function ChatMessage(props) {

    const newDate = props.time.split('T');
    const formattedTime = newDate.length >= 1 ? newDate[1].slice(0, 8) : '';

    return (
        <div className={`ChatMessage ${props.type}`}>

                <div className="MessageInfo">{props.author} - {formattedTime}  </div>
                <div className="MessageBubble">
                    <div className="messageText">{props.text}</div>
                </div>

        </div>
    );
}

export default ChatMessage;
