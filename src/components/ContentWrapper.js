import React from "react";
import Loader from "./Loader";

const ContentWrapper = (props) => {

    if (props.appReady) {
        return (<div>
            {props.children}
        </div>);
    }
    return (
        <Loader/>
    );
};

export default ContentWrapper;
