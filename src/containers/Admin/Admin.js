import React from "react";

import { Layout, Menu, Icon, Table, Button, message, Avatar } from 'antd';
import 'antd/es/menu/style/index.css';
import 'antd/es/icon/style/index.css';
import 'antd/es/layout/style/index.css';
import 'antd/es/table/style/index.css';
import 'antd/es/button/style/index.css';
import 'antd/dist/antd.css';

const { Header, Content, Footer, Sider } = Layout;

const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9leGFtcGxlLm9yZyIsImF1ZCI6Imh0dHA6XC9cL2V4YW1wbGUuY29tIiwiaWF0IjoxMzU2OTk5NTI0LCJuYmYiOjEzNTcwMDAwMDAsImRhdGEiOnsiaWQiOiIxIiwidXNlcm5hbWUiOiJ1c2VybmFtZSIsImVtYWlsIjoiZmlyc3RsYXN0QGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6ImZpcnN0IiwibGFzdG5hbWUiOiJsYXN0IiwiYXZhdGFyVXJsIjoiXC9vcHRcL2xhbXBwXC9odGRvY3NcL3dlYlwvYmFja2VuZFwvdXBsb2FkXC9hdmF0YXJfcnJLME9IIiwicm9sZSI6ImFkbWluIiwic3RhdHVzIjoiMSJ9fQ.dv3xuRlXuZo8N2c9BOzHksc80GnKhjDrveWvuEuYYkE';
class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            columns: [
              {
                title: 'ID',
                dataIndex: 'id',
                render: text => <a>{text}</a>
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
                render: text => <a>{text}</a>
              },
              {
                title: 'Author',
                dataIndex: 'user_id',
                render: text => <a>{text}</a>
              },
              {
                title: 'Operations',
                dataIndex: 'operation',
                render: (text, record) =>
                  <Button type="primary" onClick={() => {this.handleConfirm(record.id)}}>Approve</Button>
              },
            ]
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
        fetch("http://localhost/web/backend/api/image/get_all_unconfirmed_images.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'HTTP_ORIGIN': 'localhost:3000'
            },
            body: JSON.stringify({ 'jwt': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9leGFtcGxlLm9yZyIsImF1ZCI6Imh0dHA6XC9cL2V4YW1wbGUuY29tIiwiaWF0IjoxMzU2OTk5NTI0LCJuYmYiOjEzNTcwMDAwMDAsImRhdGEiOnsiaWQiOiIxIiwidXNlcm5hbWUiOiJ1c2VybmFtZSIsImVtYWlsIjoiZmlyc3RsYXN0QGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6ImZpcnN0IiwibGFzdG5hbWUiOiJsYXN0IiwiYXZhdGFyVXJsIjoiXC9vcHRcL2xhbXBwXC9odGRvY3NcL3dlYlwvYmFja2VuZFwvdXBsb2FkXC9hdmF0YXJfcnJLME9IIiwicm9sZSI6ImFkbWluIiwic3RhdHVzIjoiMSJ9fQ.dv3xuRlXuZo8N2c9BOzHksc80GnKhjDrveWvuEuYYkE'})
        })
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                images: result.images
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

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
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
              <Header style={{ background: '#fff', padding: 0 }} />
              <Content style={{ margin: '80px 16px 0', overflow: 'initial' }}>
                  <Table dataSource={this.state.images} rowKey="id" columns={this.state.columns}>
                  </Table>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
          </Layout>
        );
    }
}



export default Admin;
