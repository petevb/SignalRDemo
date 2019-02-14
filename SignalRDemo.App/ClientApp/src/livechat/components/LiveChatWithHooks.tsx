import { HubConnectionState } from "@aspnet/signalr";
import React, { useState } from "react";
import { useSignalR } from "../../signalr";
import { MessageData } from "../model";
import { MessageList } from "./MessageList";
import { NewMessageForm } from "./NewMessageForm";
import { UserNameInput } from "./UserNameInput";

export const LiveChat: React.FunctionComponent = () => {
    const [userName, setUserName] = useState("");
    const [messages, setMessages] = useState(new Array<MessageData>());

    const addMessage = (message: MessageData) => setMessages(current => [...current, message]);

    const connection = useSignalR("/hub", {
        messageReceived: addMessage
    });
    const connected = connection.state === HubConnectionState.Connected;

    const sendMessage = async (message: string) => {
        const data: MessageData = { timestamp: new Date().toISOString(), from: userName, message };
        await connection.send("sendMessage", data);
        addMessage(data);
    }

    return (
        <div>
            <h2>Live chat</h2>
            <UserNameInput value={userName} onChange={setUserName} />
            <MessageList messages={messages} />
            <NewMessageForm disabled={!connected || !userName} sendMessage={sendMessage} />
        </div>
    );
}