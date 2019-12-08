import React from 'react';

export default function (props) {
    return (
        <div className="heading">
            <div className="heading-welcome">
                <div id="title">
                    Photo Gallery
          </div>
                <div className="description">
                    <div>Welcome to our website</div>
                    <div>The best and free wallpapers shared by people all over the world.</div>
                </div>
                <div className="searchbox heading-search">
                    <i className="material-icons">search</i>
                    <input type="text" placeholder="Search Photos" />
                </div>
            </div>
        </div>
    );
}