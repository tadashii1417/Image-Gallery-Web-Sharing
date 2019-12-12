import React from "react";
import axios from "../../axios";
import {connect} from "react-redux";
import {Button, Divider, Form, message, Select} from "antd";

const {Option} = Select;

class CollectionForm extends React.Component {
    state = {
        collections: [],
        selected: null
    };


    handleSubmit = e => {
        e.preventDefault();
        const key = 'updatable';
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.image_id = this.props.image_id;
                console.log(values);
                axios.post('/collection/insert_image_into_collection.php', values)
                    .then(res => {
                        message.loading({content: 'Loading...', key});
                        setTimeout(() => {
                            message.success({
                                content: 'Add to collection successful !',
                                key,
                                duration: 2
                            });
                        }, 2000);
                    })
                    .catch(err => {
                        message.error(err.response.data.message);
                    })
            }
        });
    };

    componentDidMount() {
        const {user} = this.props;
        axios.get("/collection/get_collections_of_user.php/?user_id=" + user.id)
            .then(res => {
                this.setState({collections: res.data.collections});
            })
            .catch(err => console.log(err.message));
    }

    render() {
        const {getFieldDecorator} = this.props.form;


        return (
            <Form>
                <Form.Item label="Select collection" hasFeedback style={{width: '100%'}}>
                    {getFieldDecorator('collection_id', {
                        rules: [{required: true, message: 'Please select category!'}],
                    })(
                        <Select placeholder="Please select category">
                            {this.state.collections.map(cat => (
                                <Option value={cat.id} key={cat.id}>{cat.name}</Option>
                            ))}
                        </Select>,
                    )}
                </Form.Item>
                <Divider/>
                <Button type={"primary"} onClick={this.handleSubmit} style={{marginLeft: '70%'}}>OK</Button>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user
});

const CollectionFormWrap = Form.create({name: 'upload_image'})(CollectionForm);


export default connect(mapStateToProps, null)(CollectionFormWrap);