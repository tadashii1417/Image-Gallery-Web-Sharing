import React from 'react';
import {Modal, Descriptions, Divider, Button} from "antd";
import 'antd/es/modal/style/index.css';
import 'antd/es/descriptions/style/index.css';
import 'antd/es/divider/style/index.css';
import {getDefaultAvatar, getImageBase, toDataURL} from "../../sessionStorage";
import styles from './imageCard.module.css';
import axios from "../../axios";

async function download(image, e) {
    e.stopPropagation();
    const a = document.createElement("a");
    a.href = await toDataURL(image.url);
    a.download = "image";
    document.body.appendChild(a);
    a.click();
    axios.get('/image/increase_download_times.php?id=' + image.id)
        .then(res => {
            image.download++;
        })
        .catch(err => console.log(err.message));
    document.body.removeChild(a);
}


class ImageCard extends React.Component {
    state = {
        visible: false
    };
    showModal = (image) => {
        axios.get('/image/increase_view_times.php?id=' + image.id)
            .then(res => {
                image.view_count++;
            })
            .catch(err => console.log(err.message));

        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.visible !== nextState.visible;
    }

    render() {
        const {imageInfo} = this.props;
        let avatar;
        if (imageInfo.owner[0].avatarUrl === "null") {
            avatar = getDefaultAvatar();
        } else {
            avatar = getImageBase() + imageInfo.owner[0].avatarUrl;
        }
        return (
            <div className="column">
                <div className="img-container" onClick={(e) => this.showModal(imageInfo, e)}>
                    <img src={getImageBase() + imageInfo.url} style={{zIndex: -1, width: '100%'}}
                         alt={imageInfo.description}/>

                    <div className="overlay" style={{zIndex: 0}}>
                        <div className="img-action" style={{zIndex: 2}}>
                            <button style={{marginRight: '4px'}}>
                                <i className="fa fa-heart"/>
                            </button>
                            <button>
                                <i className="fa fa-plus"/>
                                Collect
                            </button>
                        </div>
                        <div className="img-user">
                            <div className="img-user-left" style={{zIndex: 2}}>
                                <img src={avatar} alt="avatar"/>
                                <span>{imageInfo.owner[0].lastname}</span>
                            </div>
                            <div className="img-user-right">
                                <button onClick={(e) => download(imageInfo, e)}>
                                    <i className="fa fa-download"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    title={<div className={styles.imgAction}>
                        <Button>
                            <i className="fa fa-heart"/>
                        </Button>
                        <Button>
                            <i className="fa fa-plus"/>
                            Collect
                        </Button>
                        <Button onClick={(e) => download(imageInfo, e)}>
                            <i className="fa fa-download"/>
                        </Button>
                        <span style={{marginLeft: '-10%'}}>
                        {imageInfo.description}

                        </span>
                    </div>}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    header={null}
                    width={'70%'}
                    style={{textAlign: 'center'}}
                >
                    <img src={getImageBase() + imageInfo.url} style={{maxWidth: '100%'}}
                         alt={imageInfo.description}/>
                    <Divider/>
                    <div style={{textAlign: 'left'}}>
                        <Descriptions title="Image Info">
                            <Descriptions.Item label="Height">{imageInfo.height} mm</Descriptions.Item>
                            <Descriptions.Item label="Width">{imageInfo.width} mm</Descriptions.Item>
                            <Descriptions.Item label="Size">{imageInfo.size} B</Descriptions.Item>
                            <Descriptions.Item label="View">{imageInfo.view_count} times</Descriptions.Item>
                            <Descriptions.Item label="Download">{imageInfo.download} times</Descriptions.Item>
                            <Descriptions.Item label="Love">{imageInfo.love} times</Descriptions.Item>
                            <Descriptions.Item label="Description">{imageInfo.description}
                            </Descriptions.Item>
                        </Descriptions>,
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ImageCard;