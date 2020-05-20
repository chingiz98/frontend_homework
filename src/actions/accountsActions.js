export const ADD_ACCOUNTS_ERROR = 'GET_ACCOUNTS_ERROR';
export const DISMISS_ERROR = 'DISMISS_ERROR';

export const GET_ACCOUNTS_REQUEST = 'GET_ACCOUNTS_REQUEST';
export const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNTS_SUCCESS';

export const SET_DISPLAYED_ACCOUNT = 'SET_DISPLAYED_ACCOUNT';

export const ADD_ACCOUNT_REQUEST = 'ADD_ACCOUNT_REQUEST';
export const ADD_ACCOUNT_SUCCESS = 'ADD_ACCOUNT_SUCCESS';
export const ADD_ACCOUNT_ERROR = 'ADD_ACCOUNT_ERROR';

export const DELETE_ACCOUNT_REQUEST = 'DELETE_ACCOUNT_REQUEST';
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_ERROR = 'DELETE_ACCOUNT_ERROR';

export const MAKE_DEPOSIT_REQUEST = 'MAKE_DEPOSIT_REQUEST';
export const MAKE_DEPOSIT_SUCCESS = 'MAKE_DEPOSIT_SUCCESS';
export const MAKE_DEPOSIT_ERROR = 'MAKE_DEPOSIT_ERROR';

export const MAKE_TRANSFER_REQUEST = 'MAKE_TRANSFER_REQUEST';
export const MAKE_TRANSFER_SUCCESS = 'MAKE_TRANSFER_SUCCESS';
export const MAKE_TRANSFER_ERROR = 'MAKE_TRANSFER_ERROR';

export const GET_TRANSACTIONS_REQUEST = 'GET_TRANSACTIONS_REQUEST';
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';
export const GET_TRANSACTIONS_ERROR = 'GET_TRANSACTIONS_ERROR';

export const dismissError = () => ({
    type: DISMISS_ERROR
});

export const getAccountsRequest = () => ({
    type: GET_ACCOUNTS_REQUEST
});

export const getAccountsSuccess = payload => ({
    type: GET_ACCOUNTS_SUCCESS,
    payload
});

export const getAccountsError = payload => ({
    type: ADD_ACCOUNTS_ERROR,
    payload
});

export const setDisplayedAccount = payload => ({
    type: SET_DISPLAYED_ACCOUNT,
    payload
});

export const addAccountRequest = name => ({
    type: ADD_ACCOUNT_REQUEST,
    name
});

export const addAccountSuccess = account => ({
    type: ADD_ACCOUNT_SUCCESS,
    account
});

export const addAccountError = error => ({
    type: ADD_ACCOUNT_ERROR,
    error
});

export const deleteAccountRequest = id => ({
    type: DELETE_ACCOUNT_REQUEST,
    id
});

export const deleteAccountSuccess = () => ({
    type: DELETE_ACCOUNT_SUCCESS
});

export const deleteAccountError = error => ({
    type: DELETE_ACCOUNT_ERROR,
    error
});

export const makeDepositRequest = (id, amount) => ({
    type: MAKE_DEPOSIT_REQUEST,
    id,
    amount
});

export const makeDepositSuccess = (amount) => ({
    type: MAKE_DEPOSIT_SUCCESS,
    amount
});

export const makeDepositError = error => ({
    type: MAKE_DEPOSIT_ERROR,
    error
});

export const makeTransferRequest = (fromId, toId, amount, comment) => ({
    type: MAKE_TRANSFER_REQUEST,
    fromId,
    toId,
    amount,
    comment
});

export const makeTransferSuccess = (fromId, toId, amount, comment) => ({
    type: MAKE_TRANSFER_SUCCESS,
    fromId,
    toId,
    amount,
    comment
});

export const makeTransferError = error => ({
    type: MAKE_TRANSFER_ERROR,
    error
});

export const getTransactionsRequest = (id) => ({
    type: GET_TRANSACTIONS_REQUEST,
    id
});

export const getTransactionsSuccess = (transactions) => ({
    type: GET_TRANSACTIONS_SUCCESS,
    transactions
});

export const getTransactionsError = error => ({
    type: GET_TRANSACTIONS_ERROR,
    error
});


