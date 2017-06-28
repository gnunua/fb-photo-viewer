import test from "tape";

import {call, put, select} from "redux-saga/effects";

import {accessTokenSelector, fetchPhotosTask, getImages, fetchGrantedPermissions, hasDeclinedPermissions} from "./sagas.js";
import {fetchGrantedPermissionSuccess, fetchPhotosFail, fetchPhotosStart, fetchPhotosSuccess} from "./actions/index";
import fbApi from "./helpers/fbApi";
import {shuffleArray} from "./helpers/helpers";
import {FETCH_DECLINED_PERMISSION_FAIL, FETCH_DECLINED_PERMISSION_START} from "./actions/actionTypes";

test('fetchPhotosTask Saga test', (assert) => {

    const gen = fetchPhotosTask();

    assert.deepEqual(
        gen.next().value,
        put(fetchPhotosStart()),
        'fetchPhotosTask Saga must dispatch fetchPhotosStart'
    );

    assert.deepEqual(
        gen.next().value,
        call(fbApi.get, '/me/photos', {"fields": "id", "limit": `${10}`}),
        'fetchPhotosTask must call fbApi.get'
    );

    const data = [];

    assert.deepEqual(
        gen.next(data).value,
        call(shuffleArray, data),
        'fetchPhotosTask must call shuffleArray'
    );

    assert.deepEqual(
        gen.next().value,
        select(accessTokenSelector),
        'fetchPhotosTask must select accessTokenSelector'
    );

    let token = 'token';

    assert.deepEqual(
        gen.next(token).value,
        call(getImages, data, token),
        'fetchPhotosTask must call getImage'
    );
    const newData = [];

    assert.deepEqual(
        gen.next(newData).value,
        put(fetchPhotosSuccess(newData)),
        'fetchPhotosTask must dispatch getImage'
    );

    const error = {};

    assert.deepEqual(
        gen.throw(error).value,
        put(fetchPhotosFail(error)),
        "fetchPhotosTask should yield an Effect put(fetchPhotosFail())"
    );

    assert.deepEqual(
        gen.next(),
        {done: true, value: undefined},
        'fetchPhotosTask Saga must be done'
    );

    assert.end();

});

test(' fetchGrantedPermissions Saga test', (assert) => {

    const gen = fetchGrantedPermissions();

    assert.deepEqual(
        gen.next().value,
        put({type: FETCH_DECLINED_PERMISSION_START}),
        'fetchGrantedPermissions Saga must dispatch {type: FETCH_DECLINED_PERMISSION_START} action'
    );

    const data = [];

    assert.deepEqual(
        gen.next(data).value,
        call(fbApi.get, '/me/permissions'),
        'fetchGrantedPermissions call  fbApi.get'
    );

    const hasDeclined = false;

    assert.deepEqual(
        gen.next(hasDeclined).value,
        call(hasDeclinedPermissions, hasDeclined),
        'fetchGrantedPermissions must call  hasDeclinedPermissions'
    );

    assert.deepEqual(
        gen.next(hasDeclined).value,
        put(fetchGrantedPermissionSuccess(hasDeclined)),
        'fetchGrantedPermissions must  dispatch fetchGrantedPermissionSuccess'
    );

    const error = {};

    assert.deepEqual(
        gen.throw(error).value,
        put({type: FETCH_DECLINED_PERMISSION_FAIL, payload: error}),
        "fetchGrantedPermissions FETCH_DECLINED_PERMISSION_FAIL action"
    );

    assert.deepEqual(
        gen.next(),
        {done: true, value: undefined},
        'fetchGrantedPermissions Saga must be done'
    );

    assert.end();

});

