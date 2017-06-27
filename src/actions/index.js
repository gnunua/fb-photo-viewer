import * as Actions from "./actionTypes";

export const setConnectionStatus = (payload) => ({
    type: Actions.CONNECTION_STATUS,
    payload
});

export const fetchPhotosStart = () => ({
    type: Actions.FETCH_PHOTOS_START
});

export const fetchPhotosSuccess = (response) => ({
    type: Actions.FETCH_PHOTOS_SUCCESS,
    payload: response
});

export const fetchPhotosFail = (err) => ({
    type: Actions.FETCH_PHOTOS_FAIL,
    payload: err
});

export const fetchPhotos = () => ({
    type: Actions.FETCH_PHOTOS
});

export const fetchGrantedPermissionSuccess = (payload) => ({
    type: Actions.FETCH_DECLINED_PERMISSION_SUCCESS,
    payload
});

export const fetchGrantedPermissions = () => ({
    type: Actions.FETCH_DECLINED_PERMISSION
});
