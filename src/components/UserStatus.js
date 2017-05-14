import React from "react";
import {CONNECTED} from "../config/consts";

const UserStatus = ({status}) => {
    const getMessage = () => {
        if (status !== CONNECTED && status !== '') {
            return (<h1>
                please log in
            </h1>);
        }
    };

    return (
        <div>
            <h3>{status}</h3>
            {getMessage()}
        </div>

    );

};

export default UserStatus;
