import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import reducerStatus from "./reducerStatus";

const rootReducer = combineReducers({
    appStatus: reducerStatus,
    routing: routerReducer

});

export default rootReducer;
