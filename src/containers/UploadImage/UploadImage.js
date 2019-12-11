import React from "react";
import Header from "../../components/header/header";
import styles from './UploadImage.module.css';
import 'antd/es/tabs/style/index.css';
import {connect} from "react-redux";
import {Form, Input, message, Button, Select} from "antd";
import 'antd/es/upload/style/index.css';
import 'antd/es/select/style/index.css';
import axios from "../../axios";
import {getToken} from "../../sessionStorage";

const {Option} = Select;

class UploadImage extends React.Component {
    state = {
        categories: [],
        file: null
    };

    handleSubmit = e => {
        e.preventDefault();
        const key = 'updatable';
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let formData = new FormData();
                formData.set("category_id", values.category);
                formData.set("description", values.description);
                formData.set("jwt", getToken());
                formData.append("image", this.state.file);

                axios.post('/image/upload.php', formData)
                    .then(res => {
                        message.loading({content: 'Loading...', key});
                        setTimeout(() => {
                            message.success({
                                content: 'Your image has been uploaded ! Please wait for admin to confirm your upload',
                                key,
                                duration: 2
                            });
                        }, 2000);
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            }
        });
    };
    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    componentDidMount() {
        axios.get('/category/get_all_category.php')
            .then(res => {
                this.setState({categories: res.data.categories});
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={styles.profile}>
                <Header/>
                <div className={styles.container}>
                    <Form>
                        <h4>Upload a photo !</h4>
                        <Form.Item label="Category" hasFeedback style={{width: '100%'}}>
                            {getFieldDecorator('category', {
                                rules: [{required: true, message: 'Please select category!'}],
                            })(
                                <Select placeholder="Please select category">
                                    {this.state.categories.map(cat => (
                                        <Option value={cat.id}>{cat.name}</Option>
                                    ))}
                                </Select>,
                            )}
                        </Form.Item>
                        <div className="form-group">
                            <label htmlFor="user_email">
                                Description
                            </label>
                            <Form.Item>
                                {getFieldDecorator('description', {
                                    rules: [],
                                })(
                                    <Input className="form-control" required="required" name="user[description]"
                                           id="user_description"/>,
                                )}
                            </Form.Item>
                        </div>

                        <div className="form-group">
                            <label htmlFor="user_email">
                                Upload file
                            </label>
                            <Input className="form-control" required="required" name="user[description]"
                                   id="user_description" type="file"
                                   onChange={(evt) => {
                                       evt.preventDefault();
                                       this.setState({
                                           file: evt.target.files[0],
                                       })
                                   }}/>,
                        </div>
                        {/*<Form.Item label="Image">*/}
                        {/*    {getFieldDecorator('image', {*/}
                        {/*        valuePropName: 'fileList',*/}
                        {/*        getValueFromEvent: this.normFile,*/}
                        {/*    })(*/}
                        {/*        <Upload.Dragger name="files">*/}
                        {/*            <p className="ant-upload-drag-icon">*/}
                        {/*                <Icon type="inbox"/>*/}
                        {/*            </p>*/}
                        {/*            <p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
                        {/*            <p className="ant-upload-hint">Support for a single or bulk upload.</p>*/}
                        {/*        </Upload.Dragger>,*/}
                        {/*    )}*/}
                        {/*</Form.Item>*/}


                        <Button type="primary" htmlType="submit" className="login-form-button"
                                onClick={this.handleSubmit}>
                            Upload photo
                        </Button>
                    </Form>
                </div>
            </div>);
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user
});

const UploadImageWrap = Form.create({name: 'upload_image'})(UploadImage);

export default connect(mapStateToProps, null)(UploadImageWrap);