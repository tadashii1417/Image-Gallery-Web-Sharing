import React, { Component } from 'react';
import ImageCard from '../../components/imageCard/imageCard';

class ImageList extends Component {
    state = {
        imageList: [
            {
                id: 1,
                src: "https://www.w3schools.com/w3images/wedding.jpg",
                description: "wedding",
                user: {
                    id: 1,
                    avatar: "https://www.w3schools.com/howto/img_avatar.png",
                    name: "Jason Park"
                }
            }, {
                id: 2,
                src: "https://www.w3schools.com/w3images/underwater.jpg",
                description: "wedding",
                user: {
                    id: 1,
                    avatar: "https://www.w3schools.com/howto/img_avatar.png",
                    name: "Jason Park"
                }
            },
            {
                id: 3,
                src: "https://www.w3schools.com/w3images/paris.jpg",
                description: "wedding",
                user: {
                    id: 1,
                    avatar: "https://www.w3schools.com/howto/img_avatar.png",
                    name: "Jason Park"
                }
            }
        ]
    }

    render() {
        return (
            <div style={{ margin: '50px 0' }}>
                <div class="session-title">
                    <h4>Our stunning images</h4>
                </div>

                <div class='image-gallery'>
                    {
                        this.state.imageList.map(image => (
                            <ImageCard imageInfo={image} />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default ImageList;