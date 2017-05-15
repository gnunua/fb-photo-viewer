import {CONNECTION_STATUS, SET_DECLIEND_PERMISSION} from "../actions/actionTypes";

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
        case SET_DECLIEND_PERMISSION :
            return {
                ...state,
                hasDeclinedPermission: action.payload
            };
        default:
            return state;
    }
};

export default reducerStatus;

