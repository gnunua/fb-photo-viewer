import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";

const rootReducer = combineReducers({
    a: f => {
        return f || null;
    },
    routing: routerReducer
});

export default rootReducer;
