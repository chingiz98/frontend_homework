import React from 'react';
import { Form, Input, Button, message }  from 'antd';
import Icon from '@ant-design/icons';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import '../styles.css';
import 'antd/dist/antd.css';
import { signupRequest, dismissError } from "../actions/auth.actions";
import { connect } from "react-redux";
import { Redirect, NavLink } from 'react-router-dom'

const FormItem = Form.Item;

const mapStateToProps = (state, parentProps) => ({
    loading: state.authentication.loading,
    loggedIn: state.authentication.loggedIn,
    accessToken: parentProps.accessToken,
    error: state.authentication.error
});

const mapDispatchToProps = {
    signupRequest,
    dismissError
}

let usernameInput = React.createRef();
let passwordInput = React.createRef();
let passwordConfirmInput = React.createRef();
let nameInput = React.createRef();

class SignUpForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submitted: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();

        let username = usernameInput.current.state.value;
        let name = nameInput.current.state.value;
        let password = passwordInput.current.state.value;
        let passwordConfirm = passwordConfirmInput.current.state.value;

        if(!username){
            message.error('Username is required', 1);
            return;
        }
        if(!name) {
            message.error('Name is required', 1);
            return;
        }
        if(!password){
            message.error('Password is required', 1);
            return;
        }

        if(password !== passwordConfirm){
            message.error('Check the password. Password and password confirmation are not the same!', 1);
            return;
        }
        this.props.signupRequest(username, password, name);
    }

    render() {
        const { loading, error } = this.props;

        if(this.props.isAuthorized()){
                return <Redirect to="/home"/>;
        }
        if(error){
            message.error(error.Message, 1);
            this.props.dismissError();
        }
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}>
                <Form onSubmit={this.handleSubmit} className="login-form">

                    <FormItem >
                        <Input ref={usernameInput} prefix={<Icon type="user" style={{ fontSize: 13}} />}
                               placeholder="Username (e-mail)" onChange={this.handleChange}
                               name="username"
                        />
                    </FormItem>
                    <FormItem >
                        <Input ref={nameInput} prefix={<Icon type="user" style={{ fontSize: 13}} />}
                               placeholder="Name" onChange={this.handleChange}
                               name="username"
                        />
                    </FormItem>
                    <FormItem>
                        <Input ref={passwordInput} prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                               type="password" placeholder="Password" onChange={this.handleChange}
                               name="password"
                        />
                    </FormItem>
                    <FormItem>
                        <Input ref={passwordConfirmInput} prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                               type="password" placeholder="Password confirm" onChange={this.handleChange}
                               name="password"
                        />
                    </FormItem>
                    <FormItem className="login-form-button" style={{alignItems: "center", justifyContent: "center"}}>
                        <Button className="login-form-button" type="primary" htmlType="submit" onClick={this.handleSubmit}>
                            {loading ? <Spin style={{alignItems: "center", justifyContent: "center"}} indicator={<LoadingOutlined style={{ fontSize: 24 , color: "#FFFFFF"}} spin />}/> : "Sign up"}
                        </Button>
                    </FormItem>

                    <NavLink to="/login"> Log in </NavLink>
                </Form>

            </div>

        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(SignUpForm);