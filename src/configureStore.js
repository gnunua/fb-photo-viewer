import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const createStoreWithMiddleware = applyMiddleware(
        sagaMiddleware,
    )(createStore);

    const enhancers = compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    const store = createStoreWithMiddleware(rootReducer, {}, enhancers);

    sagaMiddleware.run(rootSaga);

    return store;

};

export default configureStore;

