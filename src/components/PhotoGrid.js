import React from "react";
import PropTypes from 'prop-types';

const PhotoGrid = ({url}) => {
    return (
        <div className="col-md-4">
            <img src={url} className="img-responsive img-rounded"/>
        </div>
    );
};

PhotoGrid.propTypes = {
    url: PropTypes.string.isRequired
};

export default PhotoGrid;