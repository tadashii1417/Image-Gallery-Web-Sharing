import {Button, Form, Input, message} from "antd";
import React from "react";
import axios from "../../axios";
import {connect} from "react-redux";
import {getToken} from "../../sessionStorage";
import * as authActions from "../../store/actions/auth.action";

class EditBasic extends React.Component {
    state = {
        updated: false,
        error: false,
        message: ""
    };
    handleSubmit = e => {
        e.preventDefault();
        const key = 'updatable';
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                values.jwt = getToken();
                axios.post('/user/update.php', values)
                    .then(res => {
                        message.loading({content: 'Loading...', key});
                        setTimeout(() => {
                            message.success({content: 'Your account has been updated !', key, duration: 2});
                        }, 1000);
                        this.props.getMe(res.data.jwt);
                    })
                    .catch(err => {
                        message.error({content: err.message, key, duration: 2});
                    })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {user} = this.props;
        return (
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
                                           type="text" name="user[first_name]" placeholder={user.firstname}
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
                                           name="user[last_name]" placeholder={user.lastname}
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
                            <Input className="form-control" required="required" type="email" placeholder={user.email}
                                   name="user[email]" id="user_email"/>,
                        )}
                    </Form.Item>
                </div>
                <div className="form-group">
                    <label htmlFor="user_email">
                        Description
                    </label>
                    <Form.Item>
                        {getFieldDecorator('description', {
                            rules: [],
                        })(
                            <Input className="form-control" required="required" name="user[description]"
                                   placeholder={user.description} id="user_description"/>,
                        )}
                    </Form.Item>
                </div>
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
                    UPDATE PROFILE
                </Button>
            </Form>
        );
    }
}

const EditForm = Form.create({name: 'update'})(EditBasic);
const mapStateToProps = (state) => ({
    user: state.authReducer.user
});

const mapDispatchToProps = (dispatch) => ({
    getMe: (token) => dispatch(authActions.getMe(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);