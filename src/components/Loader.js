import React from "react";

const Loader = () => {
    return (
        <div className="vertical-center">
            <div className="container text-center">
                <div className="row">
                    <div className="col-md-4">
                        <h3 className="text-warning">Loading...</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;