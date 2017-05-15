import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import Main from "./containers/Main";

const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers, {}, enhancers)}>
        <Main/>
    </Provider >,
    document.getElementById('app')
);
