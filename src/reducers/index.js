import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import reducerStatus from "./reducerStatus";
import reducerPhotos from "./reducerPhotos";

const rootReducer = combineReducers({
    appStatus: reducerStatus,
    photos: reducerPhotos,
    routing: routerReducer
});

export default rootReducer;
