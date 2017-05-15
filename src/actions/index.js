import * as Actions from "./actionTypes";
import {MIN_PHOTOS_COUNT, MAX_PHOTOS_COUNT} from "../config/index";

//helper functions
const makeFacebookPhotoURL = (id, accessToken) => `https://graph.facebook.com/${id}/picture?access_token=${accessToken}`;
const getRandomIntInRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const randomPhotoCount = () => getRandomIntInRange(MIN_PHOTOS_COUNT, MAX_PHOTOS_COUNT);

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
        if (getState().appStatus.authResponse) {
            accessToken = getState().appStatus.authResponse.accessToken;

        }
        FB.api(
            '/me/photos',
            'GET',
            {"fields": "id", "limit": `${randomPhotoCount()}`},
            function (response) {

                if (response.error) {
                    dispatch(fetchPhotosFail(response.error));
                    return;
                }
                let {data} = response;

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
        FB.api('/me/permissions', function (response) {
            if (response.error) {
                return;
            }

            let hasDeclined = false;
            for (let i = 0; i < response.data.length; i++) {

                if (response.data[i].status === 'declined') {
                    hasDeclined = true;
                    break;
                }
            }

            dispatch(setDeclinedPermission(hasDeclined));

        });

    };
};
