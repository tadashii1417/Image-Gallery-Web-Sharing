import React from "react";
import Header from "../../components/header/header";
import styles from './UserProfile.module.css';
import {Button, Icon, Tabs} from 'antd';
import 'antd/es/tabs/style/index.css';
import UserImages from "../../components/UserImages/UserImages";
import Collections from "../../components/Collections/Collections";
import {connect} from "react-redux";
import {getDefaultAvatar, getImageBase} from "../../sessionStorage";
import UserLoveImages from "../../components/UserLoveImages/UserLoveImages";
import {Link} from "react-router-dom";

const {TabPane} = Tabs;

class UserProfile extends React.Component {

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

                        <div className={styles.left}>
                            <img src={avatar} alt="avatar"/>
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

export default connect(mapStateToProps, null)(UserProfile);