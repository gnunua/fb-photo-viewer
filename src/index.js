import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Router, useRouterHistory} from "react-router";
import {createStore, applyMiddleware, compose} from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import {syncHistoryWithStore} from "react-router-redux";
import {createHistory} from "history";
import Main from "./containers/Main";

const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStoreWithMiddleware(reducers, {}, enhancers);

const appHistory = syncHistoryWithStore(
    useRouterHistory(createHistory)({queryKey: true}),
    store
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={appHistory}>
            <Route
                path="/"
                component={Main}
            />
        </Router>

    </Provider>,
    document.getElementById('app')
);
