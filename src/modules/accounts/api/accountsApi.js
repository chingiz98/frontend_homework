import utils from "../utils";

export const loginRequest = (username, password) => {
    return makeRequest('/auth/login', 'POST', false, {username: username, password: password});
}
export const signUpRequest = (username, password, name) => {
    return makeRequest('/auth/signup', 'POST', false, {username: username, password: password, name: name});
}
export const getCurrentUserInfoRequest = () => {
    return makeRequest('/user/getInfo', 'GET', true );
}

export const updateCurrentUserInfoRequest = (username, name) => {
    return makeRequest('/user/updateInfo', 'POST', true, null, {username, name});
}
export const getTransactionsRequest = (accountId) => {
    return makeRequest('/accounts/getTransactions', 'GET', true, null, {accountId});
}


export const fetchAccounts = () => {
    return makeRequest('accounts/getAccounts', 'GET', true);
}
export const addAccountRequest = (name) => {
    return makeRequest('accounts/create', 'POST', true, null, {name})
}
export const deleteAccountRequest = (id) => {
    return makeRequest('accounts/close', 'POST', true, null, {id})
}
export const makeDepositRequest = (id, amount) => {
    return makeRequest('accounts/deposit', 'POST', true, null, {id, amount})
}
export const makeTransferRequest = (fromAccountId, toAccountId, amount, comment) => {
    return makeRequest("accounts/makeTransaction", 'POST', true, null,
        {fromAccountId, toAccountId, amount, comment});
}
function makeRequest(url, method, auth, data, args) {
    return new Promise((resolve, reject) => {

        let headers = {
            "Content-Type": "application/json; charset=utf-8"
        }

        if(auth){
            let jwtToken = utils.getAccessToken();
            headers.Authorization = "Bearer " + jwtToken;
        }

        if(args)
            url += '?' + new URLSearchParams(args);

        let init = {
            method: method || "GET",
            headers
        };

        if(data) {
            init.body = JSON.stringify(data);
        }




        fetch(url, init).then(response => {
            if (response.ok) {
                resolve(response.json());
            } else {
                switch (response.status) {
                    case 401:
                        console.log("Unauthorized");
                        utils.removeAccessToken();
                        reject({Code: 401, Message: "Unauthorized"})

                        break;
                    case 404:
                        console.log('Object not found');
                        break;
                    case 500:
                        console.log('Internal server error');
                        return response.json().then(reject.bind(Promise));
                        break;
                    default:
                        console.log('Some error occured');
                        break;
                }
            }
        })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
}