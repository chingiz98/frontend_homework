import { put, call, takeEvery } from 'redux-saga/effects';
import {GET_INFO_REQUEST, getInfoSuccess, getInfoError } from '../actions/user.actions';
import {UPDATE_INFO_REQUEST, updateInfoSuccess, updateInfoError } from '../actions/user.actions';
import { getCurrentUserInfoRequest, updateCurrentUserInfoRequest } from '../api/accountsApi';

function* getInfo(){
    try {
        const data = yield call(getCurrentUserInfoRequest);
        yield put(getInfoSuccess(data));
    } catch (error) {
        yield put(getInfoError(error));
    }
}

function* updateInfo(action){
    try {
        yield call(updateCurrentUserInfoRequest, action.username, action.name);
        yield put(updateInfoSuccess(action.username, action.name));
    } catch (error) {
        yield put(updateInfoError(error));
    }
}

function* userSagas(){
    yield takeEvery(GET_INFO_REQUEST, getInfo);
    yield takeEvery(UPDATE_INFO_REQUEST, updateInfo);
}

export { userSagas }