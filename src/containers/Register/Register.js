import React, {Component} from "react";
import '../../style/register.css';
import '../../style/registerMedia.css';
import logo from "../../assets/image/logo.png";
import {Input, Form, Button, Alert, message} from 'antd';
import 'antd/es/message/style/index.css';
import {Redirect} from 'react-router-dom';
import axios from "../../axios";

class Register extends Component {
    state = {
        error: false,
        message: null,
        created: false
    };

    handleSubmit = e => {
        e.preventDefault();
        const key = 'updatable';
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post('/user/create.php', values)
                    .then(res => {
                        message.loading({ content: 'Loading...', key });
                        setTimeout(() => {
                            message.success({ content: 'Your account has been created !', key, duration: 2 });
                        }, 1000);
                        this.setState({created: true});
                    })
                    .catch(err => {
                        this.setState({error: true, message: err.response.data.message});
                    })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        let error = "";
        if (this.state.error) {
            error = <Alert message={this.state.message} type="error" showIcon/>
        }
        if (this.state.created) {
            return <Redirect to="/login"/>;
        }

        return (
            <div className="wrapper">
                <div className="rg-container">
                    <div className="sheet sheet-inverse left-panel">
                        <div className="content">
                            <div>
                                <img className="logo" alt="Logo" src={logo}/>
                            </div>
                            <div>
                                <h1 className="title">Creation starts here</h1>
                                <h2 className="sub-title">Access free, high-resolution photos you can’t find
                                    anywhere else</h2>
                            </div>
                            <div>
                                <p className="credit">Uploaded 2 months ago by Dang Bao</p>
                            </div>
                        </div>
                    </div>

                    <div className="right-panel">
                        <div className="spacer"></div>
                        <div className="login-form">
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="text-center sheet-padding-bottom">
                                        <h4 className="alpha text-weight-bold">Join With Us</h4>
                                        <p>Already have an account? <a rel="nofollow" href="/login">Login</a></p>
                                    </div>
                                    <div className="form">
                                        {error}
                                        <Form onSubmit={this.handleSubmit} className="login-form">
                                            <div className="row">
                                                <div style={{width: '50%', float: 'left', padding: '0 10px'}}>
                                                    <div className="form-group has-error">
                                                        <label htmlFor="user_first_name">First name</label>
                                                        <Form.Item>
                                                            {getFieldDecorator('firstname', {
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please input your firstname!'
                                                                }],
                                                            })(
                                                                <Input autoFocus="autofocus"
                                                                       className="form-control js-validate-field-on-blur"
                                                                       required="required"
                                                                       type="text" name="user[first_name]"
                                                                       id="user_first_name"/>,
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                </div>

                                                <div style={{width: '50%', float: 'left', padding: '0 10px'}}>
                                                    <div className="form-group">
                                                        <label htmlFor="user_last_name">Last name</label>
                                                        <Form.Item>
                                                            {getFieldDecorator('lastname', {
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please input your lastname!'
                                                                }],
                                                            })(
                                                                <Input className="form-control" type="text"
                                                                       name="user[last_name]"
                                                                       id="user_last_name"/>,
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="user_email">
                                                    Email address
                                                </label>
                                                <Form.Item>
                                                    {getFieldDecorator('email', {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please input your email!'
                                                        }, {
                                                            type: 'email',
                                                            message: 'The input is not valid E-mail!',
                                                        }],
                                                    })(
                                                        <Input className="form-control" required="required" type="email"
                                                               name="user[email]" id="user_email"/>,
                                                    )}
                                                </Form.Item>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="user_username">
                                                    Username <span className="text-secondary">(only letters, numbers, and
                                                underscores)</span>
                                                </label>
                                                <Form.Item>
                                                    {getFieldDecorator('username', {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please input your username!'
                                                        }, {
                                                            min: 6,
                                                            massage: 'Username must have at least 6 characters.'
                                                        }],
                                                    })(
                                                        <Input className="form-control" required="required" type="text"
                                                               name="user[username]" id="user_username"/>
                                                    )}
                                                </Form.Item>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="user_password">
                                                    Password <span className="text-secondary">(min. 6 char)</span>
                                                </label>
                                                <Form.Item>
                                                    {getFieldDecorator('password', {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please input your password!'
                                                        }, {
                                                            min: 6,
                                                            message: 'Password must have at least 6 characters.'
                                                        }],
                                                    })(
                                                        <Input autoComplete="off" minLength="6"
                                                               className="form-control "
                                                               required="required" type="password" name="user[password]"
                                                               id="user_password"/>
                                                    )}
                                                </Form.Item>

                                            </div>

                                            {/*<div className="form-group">*/}
                                            {/*    <a href="#" className="btn btn-default btn-block-level">Join</a>*/}
                                            {/*</div>*/}

                                            <Button type="primary" htmlType="submit" className="login-form-button">
                                                Join
                                            </Button>

                                            <div className="form-group text-center">
                                                <p className="text-secondary zeta">
                                                    By joining, you agree to the
                                                    Terms and Privacy Policy
                                                </p>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>);
    }
}

const RegisterForm = Form.create({name: 'register'})(Register);

export default RegisterForm;