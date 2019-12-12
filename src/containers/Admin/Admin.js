import React from "react";

import { Layout, Menu, Icon, Table, Button, message, Avatar } from 'antd';
import 'antd/es/menu/style/index.css';
import 'antd/es/icon/style/index.css';
import 'antd/es/layout/style/index.css';
import 'antd/es/table/style/index.css';
import 'antd/es/button/style/index.css';
import './Admin.module.css';
import {getToken} from "../../sessionStorage";

const { Header, Content, Footer, Sider } = Layout;

const jwt = getToken();

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            menuKey: "1",
            imageColumns: [
              {
                title: 'ID',
                dataIndex: 'id',
                render: text => <a href="#!">{text}</a>
              },
              {
                title: 'Size',
                dataIndex: 'size',
              },
              {
                title: 'Width',
                dataIndex: 'width',
              },
              {
                title: 'Height',
                dataIndex: 'height',
              },
              {
                title: 'Description',
                dataIndex: 'description',
              },
              {
                title: 'Image',
                dataIndex: 'url',
                render: (text) => <Avatar shape="square" size={64} src={`http://localhost/web/backend${text}`} alt="image"/>
              },
              {
                title: 'Category ID',
                dataIndex: 'category_id',
                render: text => <a href="#!">{text}</a>
              },
              {
                title: 'Author',
                dataIndex: 'user_id',
                render: text => <a href="#!">{text}</a>
              },
              {
                title: 'Operations',
                dataIndex: 'operation',
                render: (text, record) =>
                  <Button type="primary" onClick={() => {this.handleConfirm(record.id)}}>Approve</Button>
              },
            ],
            userColumns: [
              {
                title: 'ID',
                dataIndex: 'id',
                render: text => <a href="#!">{text}</a>
              },
              {
                title: 'Username',
                dataIndex: 'username',
                render: text => <a href="#!">{text}</a>
              },
              {
                title: 'Email',
                dataIndex: 'email',
                render: text => <a href="#!">{text}</a>
              },
              {
                title: 'First name',
                dataIndex: 'firstname',
              },
              {
                title: 'Last name',
                dataIndex: 'lastname',
              },
              {
                title: 'Status',
                dataIndex: 'status',
                render: text => <a href="#!">{text}</a>
              },
              {
                title: 'Operations',
                dataIndex: 'operations',
                render: (text, record) => <Button type="danger"
                onClick={() => this.handleBlock(record.id, record.status)}>{record.status === "1" ? "Block" : "Unblock"}</Button>
              },              
            ]
        };
    }

    async handleBlock(id, status) {
      const users = [...this.state.users];
      try {
        let url = "";
        if (status === "1") {
          url = "http://localhost/web/backend/api/user/ban_user.php";
        } else {
          url = "http://localhost/web/backend/api/user/unban_user.php";
        }
        let res = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'HTTP_ORIGIN': 'localhost:3000'
          },
          body: JSON.stringify({ jwt, id })
        });
        if (res.status === 200) {
          let objIndex = users.findIndex(obj => obj.id === id);
          users[objIndex].status = (status === "1") ? "0" : "1";
          this.setState({
            users
          });
          message.success("User status changed.")
        } else {
          message.error("Unknown error.")        
        }
      } catch(err) {
        message.error("Network error!")
      }
    }
    async handleConfirm(id) {
      const images = [...this.state.images];
      try {
        let res = await fetch("http://localhost/web/backend/api/image/confirm_image.php", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'HTTP_ORIGIN': 'localhost:3000'
          },
          body: JSON.stringify({ jwt, image_id: id})
        });
        if (res.status === 200) {
          message.success("Image approved.")
          this.setState({images: images.filter(item => item.id !== id)});        
        } else {
          message.error("Unknown error.")        
        }
      } catch(err) {
        message.error("Network error!")
      }
    }
    componentDidMount() {
        fetch("http://localhost/web/backend/api/user/all.php", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'HTTP_ORIGIN': 'localhost:3000'
            },
        })
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result);
              this.setState({
                users: result.users
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                error
              });
            }
          )
        fetch("http://localhost/web/backend/api/image/get_all_unconfirmed_images.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'HTTP_ORIGIN': 'localhost:3000'
            },
            body: JSON.stringify({ 'jwt': jwt})
        })
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                images: result.images
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                error
              });
            }
          )
      }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    handleMenuClicked(item) {
      this.setState({
        menuKey: item.key
      });
      console.log(this.state.menuKey);
    }
    render() {
        return (
          <Layout>
            <Sider
              style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
              }}
            >
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleMenuClicked.bind(this)}>
                <Menu.Item key="1">
                  <Icon type="picture" />
                  <span className="nav-text">Confirm images</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="user-delete" />
                  <span className="nav-text">Block users</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
              <Header style={{ background: '#fff', padding: 0 }}>
                <div className="logo">
                  <img src="data:image/png;base64,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" alt="logo" />
                </div>
              </Header>
              <Content style={{ margin: '80px 16px 0', overflow: 'initial' }}>
                  <Table pagination={false} dataSource={this.state.menuKey === '1' ? this.state.images : this.state.users}
                  rowKey="id"
                  columns={this.state.menuKey === '1' ? this.state.imageColumns : this.state.userColumns}>
                  </Table>
              </Content>
              <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
          </Layout>
        );
    }
}



export default Admin;
