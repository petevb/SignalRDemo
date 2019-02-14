import { SignalRComponentProps, withSignalR } from "../../signalr/withSignalR";
import React, { Component } from "react";
import { MessageData } from "../model";
import { MessageList } from "./MessageList";
import { NewMessageForm } from "./NewMessageForm";
import { UserNameInput } from "./UserNameInput";
import { HubConnectionState } from "@aspnet/signalr";

interface LiveChatState {
    userName: string;
    messages: MessageData[];
}

class LiveChatWithHoc extends Component<SignalRComponentProps, LiveChatState> {
    public state: LiveChatState = {
        userName: "",
        messages: []
    }

    public render() {
        const connected = this.props.connection.state === HubConnectionState.Connected;
        const { userName, messages } = this.state;
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
        console.log(this.props.connection);
        this.props.connection.on("messageReceived", this.addMessage);
    }

    private addMessage = (data: MessageData) => this.setState(state => ({
        messages: [...state.messages, data]
    }));

    private sendMessage = async (message: string) => {
        const data: MessageData = { timestamp: new Date().toISOString(), from: this.state.userName, message }
        await this.props.connection.send("sendMessage", data);
        this.addMessage(data);
    }
}

export const LiveChat = withSignalR("/hub")(LiveChatWithHoc);
<LiveChat />