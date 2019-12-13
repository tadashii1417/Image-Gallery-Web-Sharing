import React, {Component} from 'react';
import Header from '../../components/header/header';
import Welcome from '../../components/welcome/welcome';
import ImageList from '../ImageList/ImageList';
import Footer from '../../components/footer/footer';
import axios from "../../axios";

class Homepage extends Component {
    state = {
        images: []
    };

    componentDidMount() {
        axios.get("/image/get_all_images.php")
            .then(res => {
                this.setState({images: res.data.images});
            })
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div>
                <Header/>
                <Welcome {...this.props}/>
                <ImageList images={this.state.images} title={true}/>
                <Footer/>
            </div>
        );
    }
}

export default Homepage;