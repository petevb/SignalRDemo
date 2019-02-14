import { useEffect, useState } from "react";
import { HubConnectionBuilder, HubConnection } from "@aspnet/signalr";

const connections = new Map<string, HubConnection>();

function getConnection(hubPath: string) {
    const key = hubPath.toLowerCase();
    return connections.get(key) || (() => {
        const connection = new HubConnectionBuilder().withUrl(hubPath).build();
        console.log("built connection", connection);
        connections.set(key, connection);
        return connection;
    })();
}

export function useSignalR(hubPath: string, subscriptions: { [name: string]: (...args: any[]) => void }) {
    const connection = getConnection(hubPath);

    useEffect(() => {
        connection.start();
        console.log("connection started");

        Object.keys(subscriptions).forEach(name => {
            const callback = subscriptions[name];
            connection.on(name, callback);
        })

        return () => {
            connection.stop();
            console.log("Connection stopped");
        };
    },
        []); // Empty dependencies array means only run the code on mount

    return connection;
}