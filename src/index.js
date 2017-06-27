import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import Main from "./containers/Main";
import configureStore from "./configureStore";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Main/>
    </Provider >,
    document.getElementById('app')
);
