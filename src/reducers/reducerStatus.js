import {CONNECTION_STATUS} from "../actions/actionTypes";

const initialData = {
    status: '',
    authResponse: null
};

const reducerStatus = (state = initialData, action) => {
    switch (action.type) {
        case CONNECTION_STATUS: {
            return {
                ...state,
                ...action.payload
            };
        }

        default:
            return state;
    }
};

export default reducerStatus;

