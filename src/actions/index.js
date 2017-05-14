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


const makeFacebookPhotoURL = (id, accessToken) => (`https://graph.facebook.com/${id}/picture?access_token=${accessToken}`)


export const fetchPhotos = () => {
    return function (dispatch, getState) {
        dispatch(fetchPhotosStart());

        let accessToken = getState().appStatus.authResponse.accessToken;
        FB.api(
            '/me/photos',
            'GET',
            {"fields": "id"},
            function (response) {

                let {data} = response;
                let newData = data.map(({id}) => {
                    let url = makeFacebookPhotoURL(response.data[0].id, accessToken);
                    return {
                        id,
                        url
                    };
                });

                console.log(newData);

                dispatch(fetchPhotosSuccess(newData));

            }
        );
    };
};