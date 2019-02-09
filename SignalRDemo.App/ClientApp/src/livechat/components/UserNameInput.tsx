import React, { FunctionComponent } from "react";

interface Props {
    value: string;
    onChange: (name: string) => void;
}

export const UserNameInput: FunctionComponent<Props> = ({value, onChange}) =>
    <input
        className="form-control"
        placeholder="Your user name"
        value={value}
        onChange={e => onChange(e.target.value)}
    />