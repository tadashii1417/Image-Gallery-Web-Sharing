import React from 'react';
import {Link} from 'react-router-dom';
import {Modal, Descriptions, Divider, Button} from "antd";
import 'antd/es/modal/style/index.css';
import 'antd/es/descriptions/style/index.css';
import 'antd/es/divider/style/index.css';
import {getDefaultAvatar, getImageBase, toDataURL} from "../../sessionStorage";
import ImageDetail from "../ImageDetail/ImageDetail";
import styles from './imageCard.module.css';

async function download(id) {
    const a = document.createElement("a");
    a.href = await toDataURL(id);
    a.download = "myImage.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


class ImageCard extends React.Component {
    state = {
        visible: false
    };
    showModal = () => {
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
        if (this.state.visible !== nextState.visible) {
            return true;
        }
        return false;
    }

    render() {
        const {imageInfo} = this.props;
        let avatar;
        if (imageInfo.owner[0].avatarUrl === "null") {
            avatar = getDefaultAvatar();
        } else {
            avatar = getImageBase() + imageInfo.owner[0].avatarUrl;
        }
        console.log(imageInfo);
        return (
            <div className="column">
                <div className="img-container" onClick={this.showModal}>
                    <img src={getImageBase() + imageInfo.url} style={{zIndex: -1, width: '100%'}}
                         alt={imageInfo.description}/>

                    <div className="overlay" style={{zIndex: 0}}>
                        <div className="img-action" style={{zIndex: 2}}>
                            <button style={{marginRight: '4px'}}>
                                <i className="fa fa-heart"></i>
                            </button>
                            <button>
                                <i className="fa fa-plus"></i>
                                Collect
                            </button>
                        </div>
                        <div className="img-user">
                            <div className="img-user-left" style={{zIndex: 2}}>
                                <img src={avatar} alt="avatar"/>
                                <span>{imageInfo.owner[0].lastname}</span>
                            </div>
                            <div className="img-user-right">
                                {/*<a href={getImageBase() + imageInfo.url} download={"filename.png"} target={"_blank"}>*/}
                                <button onClick={() => download(imageInfo.id)}>
                                    <i className="fa fa-download"></i>
                                </button>
                                {/*</a>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    title={<div className={styles.imgAction}>
                        <Button>
                            <i className="fa fa-heart"></i>
                        </Button>
                        <Button>
                            <i className="fa fa-plus"></i>
                            Collect
                        </Button>
                        <Button onClick={() => download(imageInfo.id)}>
                            <i className="fa fa-download"></i>
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