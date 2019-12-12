import React from "react";
import Header from "../../components/header/header";
import styles from './UserProfile.module.css';
import {Button, Icon, Tabs, message} from 'antd';
import 'antd/es/tabs/style/index.css';
import UserImages from "../../components/UserImages/UserImages";
import Collections from "../../components/Collections/Collections";
import {connect} from "react-redux";
import {getDefaultAvatar, getImageBase, getToken, setToken} from "../../sessionStorage";
import UserLoveImages from "../../components/UserLoveImages/UserLoveImages";
import {Link} from "react-router-dom";
import axios from "../../axios";
import * as authActions from "../../store/actions/auth.action";

const {TabPane} = Tabs;

class UserProfile extends React.Component {
    state = {
        avatar: null
    };
    inputFileRef = React.createRef();

    handleBtnClick = () => {
        this.inputFileRef.current.click();
    };

    handleChange = (e, user) => {
        e.stopPropagation();
        let formData = new FormData();
        formData.set("jwt", getToken());
        formData.append("avatar", this.state.avatar);
        const key = "ssss";
        axios.post('/user/change_avatar.php', formData)
            .then(res => {
                // user.avatarUrl = res.
                setToken(res.data.jwt);
                message.success({
                    content: 'Avatar change !',
                    key,
                    duration: 2
                });
                this.props.getMe(getToken());
            })
            .catch(err => {
                message.error({
                    content: err.response.data.message,
                    key,
                    duration: 2
                });
            })
    };

    render() {
        const {user} = this.props;
        let avatar = "";
        if (user.avatarUrl === "null") {
            avatar = getDefaultAvatar();
        } else {
            avatar = getImageBase() + user.avatarUrl;
        }
        return (
            <div className={styles.profile}>
                <Header/>
                <div className={styles.container}>
                    <div className={styles.userinfo}>

                        <div className={styles.left} onClick={this.handleBtnClick}>
                            <img src={avatar} alt="avatar"/>
                            {this.state.avatar ? this.state.avatar.name : ""}
                            <Button type="primary" size={"small"}
                                    style={{margin: '0 auto', display: this.state.avatar ? 'block' : 'none'}}
                                    onClick={(e) => this.handleChange(e, user)}>Change</Button>
                        </div>

                        <div className={styles.right}>
                            <h4>{user.firstname + " " + user.lastname}</h4>
                            <div className={styles.inforitem}><Icon type="fire" theme="twoTone"/>
                                <span>Username: </span> {user.username}
                            </div>
                            <div className={styles.inforitem}><Icon type="smile" theme="twoTone"/>
                                <span>Email : </span> {user.email}
                            </div>
                            <div style={{alignItems: "center"}}>
                                <Link to={"/edit-profile"}>
                                    <Button type="default" icon="setting">Edit profile</Button>
                                </Link>
                                <input ref={this.inputFileRef} type={"file"} style={{display: 'none'}}
                                       onChange={(evt) => {
                                           evt.preventDefault();
                                           this.setState({
                                                   avatar: evt.target.files[0]
                                               }
                                           );
                                           console.log(this.state.avatar);
                                       }}/>,


                            </div>
                        </div>

                    </div>

                </div>
                <div className={styles.container2}>
                    <Tabs defaultActiveKey="1">
                        <TabPane
                            tab={
                                <span>
                                        <Icon type="smile" theme="twoTone"/>
                                        My images
                                </span>
                            }
                            key="1">
                            <UserImages/>
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96"/>
                                    Loves
                                </span>
                            }
                            key="2">
                            <UserLoveImages/>
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <Icon type="folder-add" theme="twoTone" twoToneColor="#26a69a"/>
                                    Collections
                                </span>
                            }
                            key="3">
                            <Collections/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>);
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user
});

const mapDispatchToProps = (dispatch) => ({
    getMe: (token) => dispatch(authActions.getMe(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);