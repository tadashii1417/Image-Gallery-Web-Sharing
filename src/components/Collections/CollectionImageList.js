import React from 'react';
import {withRouter} from "react-router-dom";

class CollectionImageList extends React.Component {


    render() {
        console.log(this.props);
        return (<div>Hello world</div>);
    }
}

export default withRouter(CollectionImageList);