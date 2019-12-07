import React, {Component} from "react";
import {Form, Icon, Input, Checkbox, Alert} from 'antd';
import logo from "../../assets/image/logo.png";
import {Redirect} from 'react-router-dom';
import * as authActions from '../../store/actions/auth.action';
import "antd/es/alert/style/index.css";
import "./Login.css";
import {connect} from "react-redux";

class NormalLoginForm extends Component {
    state = {
        error: false
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {username, password} = values;
                let res = await this.props.loginUser(username, password);
                this.setState({error: res});
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        if (this.props.isAuthenticated) {
            return <Redirect to="/"/>
        }
        let error = "";
        if (this.state.error) {
            error = <Alert message="Username/Password is not correct !" type="error" showIcon/>
        }
        return (
            <div className="login-form-container">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <img src={logo} alt={"logo"}/>
                    {error}
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className="form-last-items">
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className="login-form-forgot" href="/">
                            Forgot password
                        </a>
                        <button className="waves-light btn join-btn login-form-button"
                                onClick={this.handleSubmit}>Login
                        </button>
                        Or <a href="/register">Register now!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const LoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);
const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
    loginUser: (username, password) => dispatch(authActions.loginUser(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);