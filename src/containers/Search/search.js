import React, {Component} from 'react';
import Header from '../../components/header/header';
import ImageList from '../ImageList/ImageList';
import Footer from '../../components/footer/footer';
import axios from "../../axios";
import styles from './search.module.css';
import {Result, Button} from 'antd';

class Search extends Component {
    state = {
        images: []
    };

    componentWillReceiveProps(props) {
        const query = new URLSearchParams(props.location.search);
        const keyword = query.get('keyword');
        axios.get("/image/search.php?keyword=" + keyword)
            .then(res => {
                if (res.data.images === "") {
                    this.setState({images: []});
                } else {
                    this.setState({images: res.data.images});
                }
            })
            .catch(err => console.log(err.message));

    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const keyword = query.get('keyword');
        axios.get("/image/search.php?keyword=" + keyword)
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
        const keyword = query.get('keyword');
        let images = "";
        if (this.state.images.length === 0) {
            images = <Result
                status="404"
                title="404"
                subTitle={"Sorry, no image result for keyword: " + keyword}
                extra={<Button type="primary" href="/">Back Home</Button>}
            />;
        } else {
            images = (
                <div className={styles.title}>
                    <h4 className="heading-search">{"Result for \"" + keyword + "\""}</h4>
                    <div className={styles.description}>This is search result base on description!</div>
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

export default Search;