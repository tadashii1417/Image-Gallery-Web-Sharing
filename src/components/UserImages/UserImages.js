import React from "react";
import axios from "../../axios";
import {Result} from "antd";
import ImageList from "../../containers/ImageList/ImageList";
import {connect} from 'react-redux';

class UserImages extends React.Component {
    state = {
        images: []
    };

    componentDidMount() {
        const id = this.props.user.id;
        axios.get("/image/get_uploaded_images_of_user.php?user_id=" + id)
            .then(res => {
                if (res.data.images === "") {
                    this.setState({images: []});
                } else {
                    this.setState({images: res.data.images});
                }
            })
            .catch(err => console.log(err.message));
    }

    render() {
        let images = "";
        if (this.state.images.length === 0) {
            images = <Result
                status="404"
                title="404"
                subTitle={"You haven't uploaded any image yet ! Upload new photo for more fun."}
            />;
        } else {
            images = (
                <ImageList images={this.state.images} title={false}/>
            );
        }
        return images;
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user
});

export default connect(mapStateToProps, null)(UserImages);