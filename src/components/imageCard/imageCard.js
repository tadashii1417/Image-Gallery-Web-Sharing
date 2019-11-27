import React from 'react';

export default function (props) {
    const { imageInfo } = props;

    return (
        <div class="column">
            <div class="img-container">
                <img src={imageInfo.src} style={{ zIndex: -1, width: '100%' }} alt={imageInfo.description} />

                <div class="overlay" style={{ zIndex: 0 }}>
                    <div class="img-action" style={{ zIndex: 2 }}>
                        <button style={{ marginRight: '4px' }}>
                            <i class="fa fa-heart"></i>
                        </button>
                        <button>
                            <i class="fa fa-plus"></i>
                            Collect
            </button>
                    </div>
                    <div class="img-user">
                        <div class="img-user-left" style={{ zIndex: 2 }}>
                            <img src={imageInfo.user.avatar} alt="avatar" />
                            <span>{imageInfo.user.name}</span>
                        </div>
                        <div class="img-user-right">
                            <button>
                                <i class="fa fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}