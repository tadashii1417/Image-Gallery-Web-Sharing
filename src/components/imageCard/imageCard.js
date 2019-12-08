import React from 'react';
import {getDefaultAvatar, getImageBase, toDataURL} from "../../sessionStorage";

async function download(id) {
    const a = document.createElement("a");
    a.href = await toDataURL(id);
    a.download = "myImage.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export default function (props) {
    const {imageInfo} = props;
    let avatar;
    if (imageInfo.owner[0].avatarUrl === "null") {
        avatar = getDefaultAvatar();
    } else {
        avatar = getImageBase() + imageInfo.owner[0].avatarUrl;
    }
    return (
        <div className="column">
            <div className="img-container">
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
        </div>
    );
}