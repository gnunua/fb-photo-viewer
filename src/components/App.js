import React, {Component} from "react";

class App extends Component {
    render() {
        return (
            <div className="container">
                <h2 className="text-primary">
                    Facebook Photo Viewer
                </h2>
                {this.props.children}
            </div>
        );
    }
}

export default App;
