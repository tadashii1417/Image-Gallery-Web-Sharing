import React, {Component} from 'react';
import logo from "../../assets/image/logo.png";
import {Menu, Icon, Dropdown, Avatar, Modal, Form, Input, message} from "antd";
import {connect} from 'react-redux';
import 'antd/es/menu/style/index.css';
import 'antd/es/icon/style/index.css';
import 'antd/es/dropdown/style/index.css';
import 'antd/es/avatar/style/index.css';
import 'antd/es/icon/style/index.css';
import styles from "./header.module.css";
import * as authActions from '../../store/actions/auth.action';
import axios from "../../axios";
import {withRouter, Link} from 'react-router-dom';
import {getToken} from "../../sessionStorage";

const defaultAvatar = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
const baseImage = "http://localhost/web/backend";

class Header extends Component {
    state = {
        showSideNav: false,
        visible: false,
        categories: [],
        search: ""
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        e.preventDefault();
        const key = 'mkey';
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.jwt = getToken();
                axios.post('/collection/create.php', values)
                    .then(res => {
                        message.loading({content: 'Loading...', key});
                        setTimeout(() => {
                            message.success({
                                content: 'New collection has been created !',
                                key,
                                duration: 2
                            });
                        }, 2000);
                        this.handleCancel();
                    })
                    .catch(err => {
                        message.error({
                            content: err.response.data.message,
                            key,
                            duration: 2
                        });
                    })
            }
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        axios.get('/category/get_all_category.php')
            .then(res => {
                this.setState({categories: res.data.categories});
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    handleShowSideNav = () => {
        this.setState((prev) => ({showSideNav: !prev.showSideNav}));
    };

    handlerLogout = () => {
        console.log("Log out");
        this.props.logout();
    };

    handlerSearchQuery = (e) => {
        this.setState({search: e.target.value});
    };


    onKeyPress = (e) => {
        if (e.which === 13) {
            this.props.history.push("/search?keyword=" + this.state.search);
        }
    };

    rightMenu = (
        <Menu className={styles.menu} selectedKeys={[]}>
            <Menu.Item key="triggerError" className={styles.menuItem}>
                <Link to={"/profile"}>
                    <Icon type="solution"/>
                    <span>My Profile</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="userinfo" className={styles.menuItem}>
                <Link to={"/submit-photo"}>
                    <Icon type="setting"/>
                    <span>Submit a photo</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="xxx" className={styles.menuItem}>
                <div onClick={this.showModal}>
                    <Icon type="folder-open"/>
                    <span>Create collection</span>
                </div>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="logout" onClick={this.handlerLogout} className={styles.menuItem}>
                <Icon type="logout"/>
                <span>Logout</span>
            </Menu.Item>
        </Menu>
    );

    render() {
        const {getFieldDecorator} = this.props.form;

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

        let AuthMenu = "";
        let avatar = defaultAvatar;

        if (this.props.isAuthenticated) {
            const {user} = this.props;
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
        } else {
            AuthMenu = (
                <div className="action-area">
                    <a className="waves-light btn submit-btn upload modal-trigger" href='/'>Submit a
                        photo</a>
                    <a className="waves-light btn submit-btn login" href="/login">Login</a>
                    <a className="waves-light btn join-btn" href="/register">Join free</a>
                </div>
            );
        }


        return (
            <header>
                <Modal
                    title="Create new collection"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="user_email">
                                Name
                            </label>
                            <Form.Item>
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: "Name cannot be null"}],
                                })(
                                    <Input className="form-control" required="required" name="user[description]"
                                           id="user_description"/>,
                                )}
                            </Form.Item>
                        </div>
                        <div className="form-group">
                            <label htmlFor="user_email">
                                Description
                            </label>
                            <Form.Item>
                                {getFieldDecorator('description', {
                                    rules: [],
                                })(
                                    <Input className="form-control" required="required" name="user[description]"
                                           id="user_description"/>,
                                )}
                            </Form.Item>
                        </div>
                    </Form>
                </Modal>
                <nav>
                    <a href="/">
                        <div className="logo">
                            <img src={logo} alt="logo"/>
                        </div>
                    </a>
                    <div className="searchbox">
                        <i className="material-icons">search</i>
                        <input type="text" placeholder="Search Photos" onChange={this.handlerSearchQuery}
                               onKeyPress={this.onKeyPress}/>
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
                            {this.state.categories.map(cat => (
                                <li key={cat.id}>
                                    <Link to={"/category/" + cat.id + "?name=" + cat.name}>{cat.name}</Link>
                                </li>
                            ))}
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

const HeaderWrap = Form.create({name: 'upload_image'})(Header);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderWrap));