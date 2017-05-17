import * as Actions from "./actionTypes";
import fbApi from "../helpers/fbApi";
import {randomPhotoCount, shuffleArray, makeFacebookPhotoURL} from "../helpers/helpers";

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
    const request = fbApi.get('/me/photos', {"fields": "id", "limit": `${randomPhotoCount()}`});

    return function (dispatch, getState) {
        dispatch(fetchPhotosStart());
        let accessToken;
        let {authResponse} = getState().appStatus;

        if (authResponse) {
            accessToken = authResponse.accessToken;
        }

        request
            .then((data) => {
                shuffleArray(data);
                let newData = data.map(({id}) => {
                    let url = makeFacebookPhotoURL(id, accessToken);
                    return {
                        id,
                        url
                    };
                });
                dispatch(fetchPhotosSuccess(newData));
            })
            .catch((error) => {
                dispatch(fetchPhotosFail(error));
            });

    };
};

const fetchGrantedPermissionSuccess = (payload) => ({
    type: Actions.FETCH_DECLINED_PERMISSION_SUCCESS,
    payload
});

export const fetchGrantedPermissions = () => {
    const request = fbApi.get('/me/permissions');
    return function (dispatch) {
        //dispatch(fetchGrantedPermissionsStart());
        request
            .then((data) => {
                let hasDeclined = false;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].status === 'declined') {
                        hasDeclined = true;
                        break;
                    }
                }
                dispatch(fetchGrantedPermissionSuccess(hasDeclined));
            })
            .catch((error) => {
                //dispatch(fetchGrantedPermissionsFail(error));
                console.error('permissions fetching error ', error);
            });
    };
};
