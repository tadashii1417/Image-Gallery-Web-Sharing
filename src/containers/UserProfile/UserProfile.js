import React from "react";
import Header from "../../components/header/header";
import styles from './UserProfile.module.css';
import {Button, Icon, Tabs} from 'antd';
import 'antd/es/tabs/style/index.css';
import UserImages from "../../components/UserImages/UserImages";

const {TabPane} = Tabs;

class UserProfile extends React.Component {
    avatar = "https://anhdephd.com/wp-content/uploads/2019/07/hinh-anh-avatar-chibi-cute-de-thuong-dep-nhat-cho-facebook-15.jpg";

    render() {
        return (
            <div className={styles.profile}>
                <Header/>
                <div className={styles.container}>
                    <div className={styles.userinfo}>

                        <div className={styles.left}>
                            <img src={this.avatar} alt="avatar"/>
                        </div>
                        <div className={styles.right}>
                            <h4>Duong Van Truong</h4>
                            <div className={styles.inforitem}><Icon type="fire" theme="twoTone"/>
                                <span>Username: </span> tadashii
                            </div>
                            <div className={styles.inforitem}><Icon type="smile" theme="twoTone"/>
                                <span>Email : </span> tadashii1417@gmail.com
                            </div>
                            <div style={{alignItems: "center"}}>
                                <Button type="default" icon="setting">Edit profile</Button>
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
                            Loves
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <Icon type="folder-add" theme="twoTone" twoToneColor="#26a69a"/>
                                    Collections
                                </span>
                            }
                            key="3">
                            Collections
                        </TabPane>
                    </Tabs>
                </div>
            </div>);
    }
}

export default UserProfile;