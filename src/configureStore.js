import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const configureStore = () => {
    const createStoreWithMiddleware = applyMiddleware(
        thunk
    )(createStore);

    const enhancers = compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    return createStoreWithMiddleware(rootReducer, {}, enhancers);

};

export default configureStore;

