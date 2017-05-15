import React from "react";

const PhotoGrid = ({url}) => {
    return (
        <div className="col-md-4">
            <img src={url} className="img-responsive img-rounded"/>
        </div>
    );
};

export default PhotoGrid;