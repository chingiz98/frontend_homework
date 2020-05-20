import { put, call, takeEvery } from 'redux-saga/effects';
import {GET_ACCOUNTS_REQUEST, getAccountsSuccess, getAccountsError } from '../actions/accountsActions';
import { fetchAccounts, addAccountRequest, deleteAccountRequest, makeDepositRequest, makeTransferRequest, getTransactionsRequest } from '../api/accountsApi';
import {ADD_ACCOUNT_REQUEST, addAccountSuccess, addAccountError } from '../actions/accountsActions';
import {DELETE_ACCOUNT_REQUEST, deleteAccountSuccess, deleteAccountError } from '../actions/accountsActions';
import {MAKE_DEPOSIT_REQUEST, makeDepositSuccess, makeDepositError } from '../actions/accountsActions';
import {MAKE_TRANSFER_REQUEST, makeTransferSuccess, makeTransferError } from '../actions/accountsActions';
import {GET_TRANSACTIONS_REQUEST, getTransactionsSuccess, getTransactionsError } from '../actions/accountsActions';

function* getAccounts(){
    try {
        const data = yield call(fetchAccounts);
        yield put(getAccountsSuccess(data));
    } catch (error) {
        yield put(getAccountsError(error));
    }
}

function* addAccount(action){
    try {
        const data = yield call(addAccountRequest, action.name);
        yield put(addAccountSuccess(data));
    } catch (error) {
        yield put(addAccountError(error));
    }
}

function* deleteAccount(action){
    try {
        yield call(deleteAccountRequest, action.id);
        yield put(deleteAccountSuccess());
    } catch (error) {
        yield put(deleteAccountError(error));
    }
}

function* makeDeposit(action){
    try {
        yield call(makeDepositRequest, action.id, action.amount);
        yield put(makeDepositSuccess(action.amount));
    } catch (error) {
        yield put(makeDepositError(error));
    }
}

function* makeTransfer(action){
    try {
        yield call(makeTransferRequest, action.fromId, action.toId, action.amount, action.comment);
        yield put(makeTransferSuccess(action.fromId, action.toId, action.amount, action.comment));
    } catch (error) {
        yield put(makeTransferError(error));
    }
}

function* getTransactions(action){
    try {
        const data = yield call(getTransactionsRequest, action.id);
        yield put(getTransactionsSuccess(data));
    } catch (error) {
        yield put(getTransactionsError(error));
    }
}



function* accountsSagas(){
    yield takeEvery(GET_ACCOUNTS_REQUEST, getAccounts);
    yield takeEvery(ADD_ACCOUNT_REQUEST, addAccount);
    yield takeEvery(DELETE_ACCOUNT_REQUEST, deleteAccount);
    yield takeEvery(MAKE_DEPOSIT_REQUEST, makeDeposit);
    yield takeEvery(MAKE_TRANSFER_REQUEST, makeTransfer);
    yield takeEvery(GET_TRANSACTIONS_REQUEST, getTransactions);
}

export { accountsSagas }