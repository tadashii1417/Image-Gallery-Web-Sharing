import React, {Component} from 'react';
import Header from '../../components/header/header';
import Welcome from '../../components/welcome/welcome';
import ImageList from '../ImageList/ImageList';
import Footer from '../../components/footer/footer';

class Homepage extends Component {
    render() {
        console.log("Props");
        console.log(this.props);

        return (
            <div>
                <Header/>
                <Welcome/>
                <ImageList/>
                <Footer/>
            </div>
        );
    }
}

export default Homepage;