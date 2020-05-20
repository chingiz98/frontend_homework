export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGIN_DISMISS_ERROR = 'USERS_DISMISS_ERROR';

export const loginRequest = payload => ({
    type: LOGIN_REQUEST,
    payload
});

export const loginSuccess = payload => ({
    type: LOGIN_SUCCESS,
    payload
});

export const loginError = payload => ({
    type: LOGIN_FAILURE,
    payload
});

export const dismissError = () => ({
    type: LOGIN_DISMISS_ERROR
})

export const signupRequest = (username, password, name) => (
    {
        type: SIGNUP_REQUEST,
        username,
        password,
        name
    }
);

export const signupSuccess = (accessToken) => (
    {
        type: SIGNUP_SUCCESS,
        accessToken
    }
);

export const signupError = (error) => (
    {
        type: SIGNUP_FAILURE,
        error
    }
);

