import React from "react";
import Loader from "./Loader";

const ContentWrapper = (props) => {

    if (props.isLoaded) {
        return (<div>
            {props.children}
        </div>);
    }
    return (
        <Loader/>
    );
};

export default ContentWrapper;
