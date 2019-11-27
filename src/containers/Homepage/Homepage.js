import React, { Component } from 'react';
import Header from '../../components/header/header';
import Welcome from '../../components/welcome/welcome';
import ImageList from '../ImageList/ImageList';
import Footer from '../../components/footer/footer';

class Homepage extends Component {
    render() {
        return <div>
            <Header />
            <Welcome />
            <ImageList />
            <Footer />
        </div>;
    }
}

export default Homepage;