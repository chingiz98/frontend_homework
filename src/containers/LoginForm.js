import React from 'react';
import { Form, Input, Button, message }  from 'antd';
import Icon from '@ant-design/icons';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import '../styles.css';
import 'antd/dist/antd.css';
import { loginRequest, dismissError } from "../actions/auth.actions";
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
    loginRequest,
    dismissError
}

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        if(!username){
            message.error('Username is required', 1);
            return;
        }
        if(!password){
            message.error('Password is required', 1);
            return;
        }
        this.props.loginRequest({username, password})
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
                        <Input prefix={<Icon type="user" style={{ fontSize: 13}} />}
                               placeholder="Username" onChange={this.handleChange}
                               name="username"
                        />
                    </FormItem>
                    <FormItem>
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                               type="password" placeholder="Password" onChange={this.handleChange}
                               name="password"
                        />
                    </FormItem>
                    <FormItem className="login-form-button" style={{alignItems: "center", justifyContent: "center"}}>
                        <Button className="login-form-button" type="primary" htmlType="submit" onClick={this.handleSubmit}>
                            {loading ? <Spin style={{alignItems: "center", justifyContent: "center"}} indicator={<LoadingOutlined style={{ fontSize: 24 , color: "#FFFFFF"}} spin />}/> : "Log in"}
                        </Button>
                    </FormItem>

                    <NavLink to="/signup"> Sign up </NavLink>
                </Form>

            </div>

        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(LoginForm);