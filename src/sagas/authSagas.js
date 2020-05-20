import { put, call, takeEvery } from 'redux-saga/effects';
import {LOGIN_REQUEST, loginSuccess, loginError } from '../actions/auth.actions';
import {SIGNUP_REQUEST, signupSuccess, signupError } from '../actions/auth.actions';
import { loginRequest, signUpRequest } from '../api/accountsApi';
import utils from "../utils";

function* login(action){
    try {
        const data = yield call(loginRequest, action.payload.username, action.payload.password);
        utils.saveAccessToken(data.access_token);
        yield put(loginSuccess(data));
    } catch (error) {
        yield put(loginError(error));
    }
}

function* signup(action){
    try {
        const data = yield call(signUpRequest, action.username, action.password, action.name);
        utils.saveAccessToken(data.access_token);
        yield put(signupSuccess(data.access_token));
    } catch (error) {
        yield put(signupError(error));
    }
}

function* authSagas(){
    yield takeEvery(LOGIN_REQUEST, login);
    yield takeEvery(SIGNUP_REQUEST, signup);
}

export { authSagas }