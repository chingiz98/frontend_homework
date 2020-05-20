import { accountsSagas } from './sagas/accountsSagas';
import { all } from 'redux-saga/effects';
import { authSagas } from './sagas/authSagas';
import { userSagas } from './sagas/userSagas';

function* rootSaga() {
    yield all([
        accountsSagas(),
        authSagas(),
        userSagas()
    ]);
}

export default rootSaga;