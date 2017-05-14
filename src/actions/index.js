import * as Actions from "./actionTypes";

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

const fetchPhotosFaild = (err) => ({
    type: Actions.FETCH_PHOTOS_FAIL,
    payload: err
});

const makeFacebookPhotoURL = (id, accessToken) => (`https://graph.facebook.com/${id}/picture?access_token=${accessToken}`);

export const fetchPhotos = () => {
    return function (dispatch, getState) {
        dispatch(fetchPhotosStart());

        let accessToken = getState().appStatus.authResponse.accessToken;
        FB.api(
            '/me/photos',
            'GET',
            {"fields": "id", "limit": "10"},
            function (response) {

                if (response.error) {
                    dispatch(fetchPhotosFaild(response.error));
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