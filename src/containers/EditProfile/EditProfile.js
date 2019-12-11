import React from "react";
import Header from "../../components/header/header";
import {Icon, Tabs} from 'antd';
import styles from './EditProfile.module.css';
import EditForm from "../../components/EditBasic/EditBasic";
import ChangePass from "../../components/ChangePassword/ChangePassword";

const {TabPane} = Tabs;

class EditProfile extends React.Component {
    render() {
        return <div className={styles.container}>
            <Header/>
            <Tabs defaultActiveKey="1" className={styles.container2} tabPosition={"left"}>
                <TabPane
                    tab={
                        <span>
                                        <Icon type="smile"/>
                                        Edit profile
                                </span>
                    }
                    key="1">
                    <EditForm/>
                </TabPane>
                <TabPane
                    tab={
                        <span>
                                    <Icon type="key" />
                                    Change password
                                </span>
                    }
                    key="2">
                    <ChangePass/>
                </TabPane>
                <TabPane
                    tab={
                        <span>
                                        <Icon type="reddit" />
                                    Change avatar
                                </span>
                    }
                    key="3">
                    Update avatar
                </TabPane>
            </Tabs>
        </div>
    }
}

export default EditProfile;