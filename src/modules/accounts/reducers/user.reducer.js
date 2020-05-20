import * as actions from '../actions/user.actions';


const initialState = {
    loadingUser: false,
    updatingUser: false,
    displayedUser: {},
    error: null,
};

export function user(state = initialState, action) {
    switch (action.type) {
        case actions.GET_INFO_REQUEST:
            return {
                ...state,
                loadingUser: true,
                error: null
            };
        case actions.GET_INFO_SUCCESS:
            return {
                ...state,
                loadingUser: false,
                displayedUser: action.user,
                error: null
            };
        case actions.GET_INFO_FAILURE:
            return {
                ...state,
                loadingUser: false,
                error: action.error
            };

        case actions.UPDATE_INFO_REQUEST:
            return {
                ...state,
                updatingUser: true
            };
        case actions.UPDATE_INFO_SUCCESS:
            return {
                ...state,
                displayedUser: {
                    ...state.displayedUser,
                    username: action.username,
                    name: action.name
                },
                updatingUser: false,
                error: null
            };

        case actions.UPDATE_INFO_FAILURE:
            return {
                ...state,
                updatingUser: false,
                error: action.error
            };

        case actions.DISMISS_USER_ERROR:
            return {
              ...state,
              error: null
            };

        default:
            return state
    }
}

export default user;