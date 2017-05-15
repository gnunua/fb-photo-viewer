import React from "react";

const App = ({children}) => {
    return (
        <div className="center-block">
            <div className="container">
                <h2 className="text-primary">
                    Facebook Photo Viewer
                </h2>
                {children}
            </div>
        </div>
    );
};

export default App;