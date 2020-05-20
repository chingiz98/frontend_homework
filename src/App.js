import React from 'react';
import AccountListContainer from './containers/AccountListContainer';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import LoginForm from "./containers/LoginForm";
import utils from "./utils";
import SignUpForm from "./containers/SignUpForm";


class App extends React.Component {

    isAuthorized = () => {
        return utils.getLoginState();
    }

    render() {

        let token = utils.getAccessToken();
        return (<BrowserRouter>
            <div>

                <Switch>
                    <Route exact path="/login">
                        <LoginForm isAuthorized={this.isAuthorized} accessToken={token}/>
                    </Route>
                    <Route exact path="/signup">
                        <SignUpForm isAuthorized={this.isAuthorized} accessToken={token}/>
                    </Route>
                    <Route exact path="/home">
                        <AccountListContainer/>
                    </Route>
                    {
                        this.isAuthorized() ? <Redirect to="/home"/> : <Redirect to="/login"/>
                    }
                </Switch>
            </div>
        </BrowserRouter>);
    }
}

export default App;