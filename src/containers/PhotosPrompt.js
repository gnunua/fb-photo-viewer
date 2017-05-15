import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Loader from "../components/Loader";
import {photosPromptSelector} from "../selectors";
import PhotoGrid from "../components/PhotoGrid";

const PhotosPrompt = ({photos, isLoaded, loggedIn, hasDeclinedPermission}) => {
    const renderContent = () => {
        if (!isLoaded && loggedIn && hasDeclinedPermission === false) {
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

PhotosPrompt.propTypes = {
    photos: PropTypes.arrayOf(PropTypes.object),
    isLoaded: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    hasDeclinedPermission: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps,
        ...photosPromptSelector(state)
    };
};

export default connect(mapStateToProps)(PhotosPrompt);