export const GET_INFO_REQUEST = 'USER_GET_INFO_REQUEST';
export const GET_INFO_SUCCESS = 'USER_GET_INFO_SUCCESS';
export const GET_INFO_FAILURE = 'USER_GET_INFO_FAILURE';

export const UPDATE_INFO_REQUEST = 'USER_UPDATE_INFO_REQUEST';
export const UPDATE_INFO_SUCCESS = 'USER_UPDATE_INFO_SUCCESS';
export const UPDATE_INFO_FAILURE = 'USER_UPDATE_INFO_FAILURE';

export const DISMISS_USER_ERROR = 'DISMISS_USER_ERROR';

export const getInfoRequest = () => ({
    type: GET_INFO_REQUEST
});

export const getInfoSuccess = (user) => ({
    type: GET_INFO_SUCCESS,
    user
});

export const getInfoError = error => ({
    type: GET_INFO_FAILURE,
    error
});

export const updateInfoRequest = (username, name) => ({
    type: UPDATE_INFO_REQUEST,
    username,
    name
});

export const updateInfoSuccess = (username, name) => ({
    type: UPDATE_INFO_SUCCESS,
    username,
    name
});

export const updateInfoError = error => ({
    type: UPDATE_INFO_FAILURE,
    error
});

export const dismissUserError = () => ({
    type: DISMISS_USER_ERROR
});
