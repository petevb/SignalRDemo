import { HubConnectionBuilder } from "@aspnet/signalr";
import React, { Component } from "react";
import { MessageData } from "../model";
import { MessageList } from "./MessageList";
import { NewMessageForm } from "./NewMessageForm";
import { UserNameInput } from "./UserNameInput";

interface LiveChatState {
    connected: boolean;
    userName: string;
    messages: MessageData[];
}

export class LiveChat extends Component<{}, LiveChatState> {
    private connection = new HubConnectionBuilder()
        .withUrl("/hub")
        .build();

    public state: LiveChatState = {
        connected: false,
        userName: "",
        messages: []
    }

    public render() {
        const { connected, userName, messages } = this.state;
        return (
            <div>
                <h2>Live chat</h2>
                <UserNameInput value={userName} onChange={userName => this.setState({ userName })} />
                <MessageList messages={messages} />
                <NewMessageForm disabled={!connected || !userName} sendMessage={this.sendMessage} />
            </div>
        );
    }

    public async componentDidMount() {
        try {
            await this.connection.start();
            this.setState({ connected: true });
        }
        catch (error) {
            console.error(error);
        }

        this.connection.on("messageReceived", this.addMessage);
    }

    public componentWillUnmount() {
        this.connection.stop();
    }

    private addMessage = (data: MessageData) => this.setState(state => ({
        messages: [...state.messages, data]
    }));

    private sendMessage = async (message: string) => {
        const data: MessageData = { timestamp: new Date().toISOString(), from: this.state.userName, message }
        await this.connection.send("sendMessage", data);
        this.addMessage(data);
    }
}
