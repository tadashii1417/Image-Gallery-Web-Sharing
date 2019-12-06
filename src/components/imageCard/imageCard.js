import React from 'react';

export default function (props) {
    const { imageInfo } = props;

    return (
        <div className="column">
            <div className="img-container">
                <img src={imageInfo.src} style={{ zIndex: -1, width: '100%' }} alt={imageInfo.description} />

                <div className="overlay" style={{ zIndex: 0 }}>
                    <div className="img-action" style={{ zIndex: 2 }}>
                        <button style={{ marginRight: '4px' }}>
                            <i className="fa fa-heart"></i>
                        </button>
                        <button>
                            <i className="fa fa-plus"></i>
                            Collect
            </button>
                    </div>
                    <div className="img-user">
                        <div className="img-user-left" style={{ zIndex: 2 }}>
                            <img src={imageInfo.user.avatar} alt="avatar" />
                            <span>{imageInfo.user.name}</span>
                        </div>
                        <div className="img-user-right">
                            <button>
                                <i className="fa fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}