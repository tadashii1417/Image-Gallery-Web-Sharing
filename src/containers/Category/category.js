import React, {Component} from 'react';
import Header from '../../components/header/header';
import ImageList from '../ImageList/ImageList';
import Footer from '../../components/footer/footer';
import axios from "../../axios";
import styles from './category.module.css';
import {Result, Button} from 'antd';

class Category extends Component {
    state = {
        images: []
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get("/image/get_all_image_by_category.php?id=" + id)
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
        console.log(this.props.match.params.id);
        let images = "";
        if (this.state.images.length === 0) {
            images = <Result
                status="404"
                title="404"
                subTitle="Sorry, this category have no images."
                extra={<Button type="primary">Back Home</Button>}
            />;
        } else {
            images = (<ImageList images={this.state.images}/>);
        }
        return (
            <div className={styles.category}>
                <Header/>
                {images}
                <Footer/>
            </div>
        );
    }
}

export default Category;