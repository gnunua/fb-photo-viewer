import React, {Component} from "react";

class App extends Component {
    render() {
        return (
            <div className="center-block">
                <div className="container">
                    <h2 className="text-primary">
                        Facebook Photo Viewer
                    </h2>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
