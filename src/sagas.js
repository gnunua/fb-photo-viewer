import {take, call, all, put, select} from "redux-saga/effects";
import fbApi from "./helpers/fbApi";
import {fetchGrantedPermissionSuccess, fetchPhotosFail, fetchPhotosStart, fetchPhotosSuccess} from "./actions/index";
import {makeFacebookPhotoURL, shuffleArray} from "./helpers/helpers";
import {
    FETCH_DECLINED_PERMISSION, FETCH_DECLINED_PERMISSION_FAIL, FETCH_DECLINED_PERMISSION_START,
    FETCH_PHOTOS
} from "./actions/actionTypes";

export const getImages = (imgData, accessToken) => imgData.map(({id}) => ({id, url: makeFacebookPhotoURL(id, accessToken)}));
export const hasDeclinedPermissions = permissionsData => permissionsData.some((item) => item.status === 'declined');

export const accessTokenSelector = state => {
    let {authResponse} = state.appStatus;
    if (authResponse) {
        return authResponse.accessToken;
    }
};

export function *fetchPhotosTask() {

    yield put(fetchPhotosStart());

    try {
        const data = yield call(fbApi.get, '/me/photos', {"fields": "id", "limit": `${10}`});

        yield call(shuffleArray, data);

        const accessToken = yield select(accessTokenSelector);

        const newData = yield call(getImages, data, accessToken);

        yield put(fetchPhotosSuccess(newData));

    } catch (error) {
        yield put(fetchPhotosFail(error));
    }
}

export function *fetchGrantedPermissions() {

    yield put({type: FETCH_DECLINED_PERMISSION_START});

    try {
        const data = yield call(fbApi.get, '/me/permissions');

        const hasDeclined = yield call(hasDeclinedPermissions, data);

        yield put(fetchGrantedPermissionSuccess(hasDeclined));

    } catch (error) {
        yield put({type: FETCH_DECLINED_PERMISSION_FAIL, payload: error});
    }
}

function *watchForGrantedPermissions() {
    while (true) {
        yield take(FETCH_DECLINED_PERMISSION);
        yield call(fetchGrantedPermissions);
    }
}

function *watchForImageLoad() {
    while (true) {
        yield take(FETCH_PHOTOS);
        yield call(fetchPhotosTask);
    }
}

export default function* rootSaga() {
    yield all([
        watchForImageLoad(),
        watchForGrantedPermissions()
    ]);
}