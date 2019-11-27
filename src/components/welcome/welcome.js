import React from 'react';

export default function (props) {
    return (
        <div class="heading">
            <div class="heading-welcome">
                <div id="title">
                    Photo Gallery
          </div>
                <div class="description">
                    <div>Welcome to our website</div>
                    <div>The best and free wallpapers shared by people all over the world.</div>
                </div>
                <div class="searchbox heading-search">
                    <i class="material-icons">search</i>
                    <input type="text" placeholder="Search Photos" />
                </div>
            </div>
        </div>
    );
}