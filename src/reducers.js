import { combineReducers } from 'redux';
import accounts from './reducers/accountsReducer';
import authentication from './reducers/auth.reducer';
import user from './reducers/user.reducer';

const rootReducer = combineReducers({
    accounts,
    authentication,
    user
});

export default rootReducer;