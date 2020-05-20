import * as actions from '../actions/auth.actions';


const initialState = {
    loggedIn: false,
    loading: false,
    error: null,
    accessToken: null
};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case actions.LOGIN_REQUEST:
            return {
                ...state,
                loggedIn: false,
                loading: true
            };
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                loading: false,
                accessToken: action.payload,
                error: null
            };
        case actions.LOGIN_FAILURE:
            return {
                ...state,
                loggedIn: false,
                loading: false,
                error: action.payload
            };

        case actions.LOGIN_DISMISS_ERROR:
            return {
                ...state,
                error: null
            }
        case actions.SIGNUP_REQUEST:
            return {
                ...state,
                error: null,
                loading: true,
                loggedIn: false
            };

        case actions.SIGNUP_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                loading: false,
                accessToken: action.accessToken,
                error: null
            };
        case actions.SIGNUP_FAILURE:
            return {
                ...state,
                loggedIn: false,
                loading: false,
                error: action.error
            };

        default:
            return state
    }
}

export default authentication;