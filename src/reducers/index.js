import {combineReducers} from "redux";
import reducerStatus from "./reducerStatus";
import reducerPhotos from "./reducerPhotos";

const rootReducer = combineReducers({
    appStatus: reducerStatus,
    photos: reducerPhotos
});

export default rootReducer;
