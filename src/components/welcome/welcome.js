import React from 'react';

export default class extends React.Component {
    state = {
        search: ""
    };

    handlerSearchQuery = (e) => {
        this.setState({search: e.target.value});
    };

    onKeyPress = (e) => {
        if (e.which === 13) {
            this.props.history.push("/search?keyword=" + this.state.search);
        }
    };

    render() {
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
                        <input type="text" placeholder="Search Photos" onChange={this.handlerSearchQuery}
                               onKeyPress={this.onKeyPress}/>
                    </div>
                </div>
            </div>
        );
    }

}