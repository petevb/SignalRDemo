import React, { Component, ComponentType } from "react";
import { HubConnectionBuilder, HubConnection, HubConnectionState } from "@aspnet/signalr";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface SignalRComponentProps {
    connection: HubConnection;
}

export function withSignalR(hubPath: string) {
    const connection = new HubConnectionBuilder().withUrl(hubPath).build();

    return <OriginalProps extends SignalRComponentProps>(WrappedComponent: React.ComponentType<OriginalProps & SignalRComponentProps>) =>
        class SignalRComponent extends Component<Omit<OriginalProps, keyof SignalRComponentProps>> {

            public componentDidMount() {
                connection.start();
            }

            public componentWillUnmount() {
                connection.stop;
            }

            public render() {
                const ComponentAsAny = WrappedComponent as any; // Need this to avoid a type error, not sure why 
                return <ComponentAsAny {...this.props} connection={connection}/>;
            }
        }
}
