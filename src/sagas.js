import { accountsSagas } from './modules/accounts/sagas/accountsSagas';
import { all } from 'redux-saga/effects';
import { authSagas } from './modules/accounts/sagas/authSagas';
import { userSagas } from './modules/accounts/sagas/userSagas';

function* rootSaga() {
    yield all([
        accountsSagas(),
        authSagas(),
        userSagas()
    ]);
}

export default rootSaga;