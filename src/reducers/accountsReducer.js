import * as actions from '../actions/accountsActions';

const initialState = {
    accountsList: [],
    error: null,
    loading: false,
    displayedAccount: {}
};

const accounts = (state = initialState, action) => {
    switch (action.type){
        case actions.DISMISS_ERROR:
            return {
                ...state,
                error: null
            };

        case actions.GET_ACCOUNTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actions.GET_ACCOUNTS_SUCCESS:
            return {
                ...state,
                loading: false,
                accountsList: action.payload,
                displayedAccount: action.payload[0],
                error: null
            };

        case actions.ADD_ACCOUNTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actions.SET_DISPLAYED_ACCOUNT:
            return {
                ...state,
                displayedAccount: state.accountsList.find(i => i.id === action.payload),
            };

        case actions.ADD_ACCOUNT_REQUEST:
            return {
                ...state,
                accountAdding: true,
                error: null
            };

        case actions.ADD_ACCOUNT_SUCCESS:
            return {
                ...state,
                accountAdding: false,
                accountsList: state.accountsList.concat(action.account),
                displayedAccount: action.account,
                error: null
            };

        case actions.ADD_ACCOUNT_ERROR:
            return {
                ...state,
                accountAdding: false,
                error: action.error
            };

        case actions.DELETE_ACCOUNT_REQUEST:
            return {
                ...state,
                error: null
            };

        case actions.DELETE_ACCOUNT_SUCCESS:
            let newAccountsList = state.accountsList.filter(function(item) {
                return item !== state.displayedAccount
            });
            return {
                ...state,
                accountsList: newAccountsList,
                displayedAccount: newAccountsList[0],
                error: null
            };

        case actions.DELETE_ACCOUNT_ERROR:
            return {
                ...state,
                error: action.error
            }
        case actions.MAKE_DEPOSIT_REQUEST:
            return {
                ...state,
                makingDeposit: true,
                error: null
            };

        case actions.MAKE_DEPOSIT_SUCCESS:
            let newDisplayedAccount = {
                ...state.displayedAccount,
                amount: parseFloat(state.displayedAccount.amount) + parseFloat(action.amount)
                };
            let newAccounts = state.accountsList.map(function(item) {
                if(item.id === newDisplayedAccount.id){
                    return {
                        ...item,
                        amount: newDisplayedAccount.amount
                    }
                } else {
                    return item;
                }

            });
            return {
                ...state,
                displayedAccount: newDisplayedAccount,
                accountsList: newAccounts,
                makingDeposit: false,
                error: null
            };

        case actions.MAKE_DEPOSIT_ERROR:
            return {
                ...state,
                makingDeposit: false,
                error: action.error
            };

        case actions.MAKE_TRANSFER_REQUEST:
            return {
                ...state,
                makingTransfer: true,
                error: null
            };

        case actions.MAKE_TRANSFER_SUCCESS: {
            let from = action.fromId;
            let to = action.toId;
            let amount = action.amount;

            let newDisplayedAccount = {
                ...state.displayedAccount,
                amount: parseFloat(state.displayedAccount.amount) - parseFloat(amount)
            };

            let newAccounts = state.accountsList.map(function(item) {
                if (item.id === from) {
                     return newDisplayedAccount;
                } else if (item.id === to) {
                    return {
                        ...item,
                        amount: parseFloat(item.amount) + parseFloat(amount)
                    }
                } else {
                    return item;
                }
            });

            return {
                ...state,
                makingTransfer: false,
                displayedAccount: newDisplayedAccount,
                accountsList: newAccounts,
                error: null
            };
        }

        case actions.MAKE_TRANSFER_ERROR:
            return {
                ...state,
                makingTransfer: false,
                error: action.error
            };

        case actions.GET_TRANSACTIONS_REQUEST:
            return {
                ...state,
                transactionsLoading: true,
                error: null
            };

        case actions.GET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                transactionsLoading: false,
                transactions: action.transactions,
                error: null
            };

        case actions.GET_TRANSACTIONS_ERROR:
            return {
                ...state,
                transactionsLoading: false,
                error: action.error
            };

        default:
            return state;
    }
};

export default accounts;