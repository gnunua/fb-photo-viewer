import {FETCH_PHOTOS_START, FETCH_PHOTOS_FAIL, FETCH_PHOTOS_SUCCESS} from "../actions/actionTypes";

const getCallStatus = (isStarted = false, isLoaded = false, isFailed = false, error = null) => ({
    isStarted,
    isLoaded,
    isFailed,
    error
});

const initialData = {
    fetchedData: [],
    fetchingState: getCallStatus()
};

const reducerPhotos = (state = initialData, action) => {
    switch (action.type) {
        case FETCH_PHOTOS_START:
            return {
                ...state,
                fetchingState: getCallStatus(true)
            };
        case FETCH_PHOTOS_FAIL:
            return {
                ...state,
                fetchingState: getCallStatus(false, false, true, action.payload)
            };
        case FETCH_PHOTOS_SUCCESS : {
            debugger;
            return {
                ...state,
                fetchingState: getCallStatus(false, true, false, null),
                fetchedData: action.payload
            };
        }
        default:
            return state;
    }
};

export default reducerPhotos;




