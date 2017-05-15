import {createSelector} from "reselect";
import {STATUS_NOT_AUTHORIZED, STATUS_UNKNOWN, STATUS_CONNECTED} from "./config/consts";


const statusInput = state => state.appStatus.status;
const hasDeclinedPermissionInput = state => state.appStatus.hasDeclinedPermission;
const isPhotosLoadedInput = state => state.photos.fetchingState.isLoaded;

const declinedPermissionSelector = createSelector(
    [statusInput, hasDeclinedPermissionInput],
    (status, hasDeclinedPermission) => {
        return status === STATUS_CONNECTED && hasDeclinedPermission === true;
    }
);

const loggedInSelector = createSelector(
    [statusInput],
    (status) => {
        return status !== STATUS_NOT_AUTHORIZED && status !== STATUS_UNKNOWN;
    }
);

const successConnectionSelector = createSelector(
    [statusInput, hasDeclinedPermissionInput],
    (status, hasDeclinedPermission) => {
        return status === STATUS_CONNECTED && hasDeclinedPermission === false;
    }
);

export const dataSuccessLoadedSelector = createSelector(
    [successConnectionSelector, isPhotosLoadedInput],
    (success, photosLoaded) => {
        return success && photosLoaded;
    }
);

export const appCoreSelector = createSelector(
    [declinedPermissionSelector, successConnectionSelector, dataSuccessLoadedSelector, loggedInSelector],
    (hasDeclinedPermission, success, isLoaded, loggedIn) => ({
        hasDeclinedPermission,
        success,
        isLoaded,
        loggedIn
    })
);
