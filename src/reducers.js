import { combineReducers } from 'redux';
import accounts from './modules/accounts/reducers/accountsReducer';
import authentication from './modules/accounts/reducers/auth.reducer';
import user from './modules/accounts/reducers/user.reducer';

const rootReducer = combineReducers({
    accounts,
    authentication,
    user
});

export default rootReducer;