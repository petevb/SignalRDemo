import React, { FunctionComponent } from "react";
import { MessageData } from "../model";

const Message: FunctionComponent<{message: MessageData}> = ({message}) => (
    <li>
        <strong className="message-sender">{message.from}:</strong>
        &nbsp;
        <span className="message-text">{message.message}</span>
    </li>
)

export const MessageList: FunctionComponent<{ messages: MessageData[] }> = ({ messages }) => (
    <ul>
        {messages.map(message => <Message key={message.timestamp} message={message}/>)}
    </ul>
)