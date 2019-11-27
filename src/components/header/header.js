import React, { Component } from 'react';
import logo from "../../assets/image/logo.png";

export default class extends Component {
    state = {
        showSideNav: false,
    }

    handleShowSideNav = () => {
        this.setState((prev) => ({ showSideNav: !prev.showSideNav }));
    }

    render() {
        let sideNav = "";
        if (this.state.showSideNav) {
            sideNav = (
                <div id="mySidenav" className="mynavbar">
                    <a href="/" className="closebtn" onClick="openNav()">&times;</a>
                    <ul>
                        <li><a href="/">Collections</a></li>
                        <li><a href="/">Explore</a></li>
                        <li><a href="/">About us</a></li>
                    </ul>
                    <a className="waves-light btn modal-trigger" href="#uploadModal">Submit a photo</a>
                    <a className="waves-light btn ">Login</a>
                    <a className="waves-light btn ">Join free</a>
                </div>
            );
        }

        return (
            <header>
                <nav>
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="searchbox">
                        <i className="material-icons">search</i>
                        <input type="text" placeholder="Search Photos" />
                    </div>
                    <div className="navigation">
                        <ul>
                            <li><a href="./categories.html">Categories</a></li>
                            <li><a href="/">Explore</a></li>
                            <li><a href="/">About us</a></li>
                        </ul>
                    </div>
                    <div className="action-area">
                        <a className="waves-light btn submit-btn upload modal-trigger" href="#uploadModal">Submit a photo</a>
                        <a className="waves-light btn submit-btn login" href="./login.html">Login</a>
                        <a className="waves-light btn join-btn" href="./register.html">Join free</a>
                    </div>
                    <i className="fa fa-bars" onClick={this.handleShowSideNav}></i>

                </nav>
                {sideNav}


                <div className="category">
                    <div className="category-group">
                        <ul>
                            <li><a href="/">Wallpapers</a></li>
                            <li><a href="/">Nature</a></li>
                            <li><a href="/">Architecture</a></li>
                            <li><a href="/">Business</a></li>
                            <li><a href="/">Film</a></li>
                            <li><a href="/">Animal</a></li>
                            <li><a href="/">Travel</a></li>
                            <li><a href="/">Food</a></li>
                            <li><a href="/">Fashion</a></li>
                            <li><a href="/">Event</a></li>
                            <li><a href="/">Art</a></li>
                            <li><a href="/">Culture</a></li>
                            <li><a href="/">Health</a></li>
                            <li><a href="/">People</a></li>
                            <li><a href="/">Experimental</a></li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}