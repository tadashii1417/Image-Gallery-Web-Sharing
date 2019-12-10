import React, {Component} from 'react';
import ImageCard from '../../components/imageCard/imageCard';
import {withRouter} from "react-router-dom";

class ImageList extends Component {
    render() {
        return (
            <div style={{margin: '50px 0'}}>
                {this.props.title ?
                    <div className="session-title"><h4>Our stunning images</h4></div> : ""}

                <div className='image-gallery'>
                    {
                        this.props.images.map(image => (
                            <ImageCard imageInfo={image} key={image.id} {...this.props}/>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(ImageList);