import {CONNECTION_STATUS, FETCH_DECLINED_PERMISSION_SUCCESS} from "../actions/actionTypes";

const initialData = {
    status: '',
    authResponse: null,
    hasDeclinedPermission: null
};

const reducerStatus = (state = initialData, action) => {
    switch (action.type) {
        case CONNECTION_STATUS:
            return {
                ...state,
                ...action.payload
            };
        case FETCH_DECLINED_PERMISSION_SUCCESS :
            return {
                ...state,
                hasDeclinedPermission: action.payload
            };
        default:
            return state;
    }
};

export default reducerStatus;

