import React, {Component} from "react";
import {connect} from "react-redux";
import Loader from "../components/Loader";
import {photosPromptSelector} from "../selectors";
import PhotoGrid from "../components/PhotoGrid";

const PhotosPrompt = ({photos, isLoaded, loggedIn}) => {
    const renderContent = () => {
        if (!isLoaded && loggedIn) {
            return (
                <Loader/>
            );
        }

        if (!loggedIn) {
            return (null);
        }

        return photos.map(({id, url}) => (<PhotoGrid key={id} url={url}/>));
    };
    return (
        <div>
            {renderContent()}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps,
        ...photosPromptSelector(state)
    };
};

export default connect(mapStateToProps)(PhotosPrompt);
