import React, { FunctionComponent, useState } from "react";

interface NewMessageFormProps {
    disabled: boolean;
    sendMessage: (message: string) => Promise<void>;
}

export const NewMessageForm: FunctionComponent<NewMessageFormProps> = ({ disabled, sendMessage }) => {
    const [message, setMessage] = useState("");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!message) {
            return;
        }
        await sendMessage(message);
        setMessage("");
    }

    return (
        <form onSubmit={onSubmit}>
            <input value={message} onChange={(e) => setMessage(e.target.value)} />
            <button disabled={disabled}>Send</button>
        </form>
    )
}