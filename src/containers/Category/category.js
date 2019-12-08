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

    componentDidUpdate() {
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
        const query = new URLSearchParams(this.props.location.search);
        const categoryName = query.get('name');
        let images = "";
        if (this.state.images.length === 0) {
            images = <Result
                status="404"
                title="404"
                subTitle="Sorry, this category have no images."
                extra={<Button type="primary">Back Home</Button>}
            />;
        } else {
            images = (
                <div className={styles.title}>
                    <h4 className="heading-search">{categoryName}</h4>
                    <div className={styles.description}>This is all images in {categoryName} category !</div>
                    <ImageList images={this.state.images} title={false}/>
                </div>
            );
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