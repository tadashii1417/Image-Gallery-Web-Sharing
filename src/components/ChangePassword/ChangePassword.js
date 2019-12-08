import {Button, Form, Input, message} from "antd";
import React from "react";
import axios from "../../axios";
import {connect} from "react-redux";
import {getToken} from "../../sessionStorage";
import * as authActions from "../../store/actions/auth.action";

class ChangePassword extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        const key = 'updatable';
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.jwt = getToken();
                axios.post('/user/change_password.php', values)
                    .then(res => {
                        message.loading({content: 'Loading...', key});
                        setTimeout(() => {
                            message.success({content: 'Your password has been change !', key, duration: 2});
                        }, 1000);
                    })
                    .catch(err => {
                        message.loading({content: 'Loading...', key});
                        setTimeout(() => {
                            message.error({content: err.response.data.message, key, duration: 2});
                        }, 1000);
                    })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {user} = this.props;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="user_email">
                        Old password
                    </label>
                    <Form.Item>
                        {getFieldDecorator('old_password', {
                            rules: [{
                                required: true,
                                message: 'Please input your old password!'
                            }],
                        })(
                            <Input className="form-control" required="required" type="password"/>,
                        )}
                    </Form.Item>
                </div>
                <div className="form-group">
                    <label htmlFor="user_email">
                        New password
                    </label>
                    <Form.Item>
                        {getFieldDecorator('new_password', {
                            rules: [{
                                min: 6,
                                message: 'Password must have at least 6 characters.'
                            }],
                        })(
                            <Input className="form-control" required="required" type="password"/>,
                        )}
                    </Form.Item>
                </div>
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
                    CHANGE PASSWORD
                </Button>
            </Form>
        );
    }
}

const ChangePass = Form.create({name: 'update'})(ChangePassword);
const mapStateToProps = (state) => ({
    user: state.authReducer.user
});

const mapDispatchToProps = (dispatch) => ({
    getMe: (token) => dispatch(authActions.getMe(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass);