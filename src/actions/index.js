import * as Actions from "./actionTypes";
import {randomPhotoCount, shuffleArray, makeFacebookPhotoURL} from "../helpers";

export const setConnectionStatus = (payload) => ({
    type: Actions.CONNECTION_STATUS,
    payload
});

const fetchPhotosStart = () => ({
    type: Actions.FETCH_PHOTOS_START
});

const fetchPhotosSuccess = (response) => ({
    type: Actions.FETCH_PHOTOS_SUCCESS,
    payload: response
});

const fetchPhotosFail = (err) => ({
    type: Actions.FETCH_PHOTOS_FAIL,
    payload: err
});

export const fetchPhotos = () => {
    return function (dispatch, getState) {
        dispatch(fetchPhotosStart());
        let accessToken;
        let {authResponse} = getState().appStatus;

        if (authResponse) {
            accessToken = authResponse.accessToken;
        }

        window.FB.api(
            '/me/photos',
            'GET',
            {"fields": "id", "limit": `${randomPhotoCount()}`},
            function ({error, data}) {

                if (error) {
                    dispatch(fetchPhotosFail(error));
                    return;
                }

                shuffleArray(data);

                let newData = data.map(({id}) => {
                    let url = makeFacebookPhotoURL(id, accessToken);
                    return {
                        id,
                        url
                    };
                });

                dispatch(fetchPhotosSuccess(newData));
            }
        );
    };
};

const setDeclinedPermission = (payload) => ({
    type: Actions.SET_DECLINED_PERMISSION,
    payload
});

export const checkDeclinedPermissions = () => {
    return function (dispatch) {
        window.FB.api('/me/permissions', function ({error, data}) {
            if (error) {
                console.log('permissions fetching error ', error)
                return;
            }
            let hasDeclined = false;
            for (let i = 0; i < data.length; i++) {
                if (data[i].status === 'declined') {
                    hasDeclined = true;
                    break;
                }
            }
            dispatch(setDeclinedPermission(hasDeclined));
        });

    };
};
