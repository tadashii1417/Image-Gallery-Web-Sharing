import React, {Component} from 'react';
import logo from "../../assets/image/logo.png";
import {Menu, Icon, Dropdown, Avatar} from "antd";
import {connect} from 'react-redux';
import 'antd/es/menu/style/index.css';
import 'antd/es/icon/style/index.css';
import 'antd/es/dropdown/style/index.css';
import 'antd/es/avatar/style/index.css';
import 'antd/es/icon/style/index.css';
import styles from "./header.module.css";
import * as authActions from '../../store/actions/auth.action';

const defaultAvatar = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
const baseImage = "http://localhost/web/backend";

class Header extends Component {
    state = {
        showSideNav: false,
    };

    handleShowSideNav = () => {
        this.setState((prev) => ({showSideNav: !prev.showSideNav}));
    };

    handlerLogout = () => {
        console.log("Log out");
        this.props.logout();
    };

    rightMenu = (
        <Menu className={styles.menu} selectedKeys={[]}>
            <Menu.Item key="userCenter">
                <Icon type="user"/>
                <span>Account Center</span>
            </Menu.Item>
            <Menu.Item key="userinfo">
                <Icon type="setting"/>
                <span>Account Setting</span>
            </Menu.Item>
            <Menu.Item key="triggerError">
                <Icon type="solution"/>
                <span>Profile</span>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="logout" onClick={this.handlerLogout}>
                <Icon type="logout"/>
                <span>Logout</span>
            </Menu.Item>
        </Menu>
    );

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
                    <a className="waves-light btn modal-trigger" href="/">Submit a photo</a>
                    <a className="waves-light btn " href="/login">Login</a>
                    <a className="waves-light btn " href="/register">Join free</a>
                </div>
            );
        }

        let AuthMenu = (
            <div className="action-area">
                <a className="waves-light btn submit-btn upload modal-trigger" href="#uploadModal">Submit a
                    photo</a>
                <a className="waves-light btn submit-btn login" href="./login">Login</a>
                <a className="waves-light btn join-btn" href="./register">Join free</a>
            </div>
        );
        let avatar = defaultAvatar;

        if (this.props.isAuthenticated) {
            const {user} = this.props;
            console.log(user);
            if (user.avatarUrl !== "null") {
                avatar = baseImage + user.avatarUrl;
            }
            AuthMenu = (
                <Dropdown overlay={this.rightMenu}>
                    <div className={styles.dropdown}>
                        <span className={styles.username}>{user.username}</span>
                        <Avatar src={avatar}/>
                    </div>
                </Dropdown>);
        }

        return (
            <header>
                <nav>
                    <div className="logo">
                        <img src={logo} alt="logo"/>
                    </div>
                    <div className="searchbox">
                        <i className="material-icons">search</i>
                        <input type="text" placeholder="Search Photos"/>
                    </div>
                    <div className="navigation">
                        <ul>
                            <li><a href="/categories">Categories</a></li>
                            <li><a href="/">Explore</a></li>
                            <li><a href="/">About us</a></li>
                        </ul>
                    </div>
                    {AuthMenu}
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

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(authActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);