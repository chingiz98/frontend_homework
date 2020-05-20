function saveAccessToken(accessToken) {
    localStorage.setItem("jwt", accessToken);
    localStorage.setItem("loggedIn", true.toString());
}

function removeAccessToken() {
    localStorage.setItem("jwt", null);
    localStorage.setItem("loggedIn", false.toString());
}

function getAccessToken() {
    return  localStorage.getItem("jwt");
}

function getLoginState() {
    return localStorage.getItem("loggedIn") === 'true';
}


export default {saveAccessToken, removeAccessToken, getAccessToken, getLoginState}