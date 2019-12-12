import React from 'react';
import {withRouter} from "react-router-dom";
import axios from "../../axios";
import {Result} from "antd";
import ImageList from "../../containers/ImageList/ImageList";

class CollectionImageList extends React.Component {
    state = {
        images: []
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get("/image/get_images_of_collection.php?collection_id=" + id)
            .then(res => {
                if (res.data.images === "") {
                    this.setState({images: []});
                } else {
                    this.setState({images: res.data.images});
                }
            })
            .catch(err => console.log(err.message));
    }

    componentDidUpdate() {
        const id = this.props.match.params.id;
        axios.get("/image/get_images_of_collection.php?collection_id=" + id)
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
                subTitle={"This collection have no images. !"}
            />;
        } else {
            images = (
                <ImageList images={this.state.images} title={false}/>
            );
        }
        return images;
    }
}

export default withRouter(CollectionImageList);