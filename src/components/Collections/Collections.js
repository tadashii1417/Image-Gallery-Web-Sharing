import React from "react";
import {Icon} from "antd";
import CollectionsItem from "./CollectionItem";
import styles from './CollectionItem.module.css';
import axios from "../../axios";
import {connect} from "react-redux";
import {Route, Switch} from 'react-router-dom';
import CollectionImageList from "./CollectionImageList";

class Collections extends React.Component {
    state = {
        collections: []
    };

    componentDidMount() {
        const {user} = this.props;
        axios.get("/collection/get_collections_of_user.php/?user_id=" + user.id)
            .then(res => {
                this.setState({collections: res.data.collections});
            })
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div className={styles.container}>
                {this.state.collections.map(col => <CollectionsItem collection={col} key={col.id}/>
                )}
                <Route path="/profile/:id" render={() => <CollectionImageList/>} exact/>
                <Route path={"/profile"} render={() => <div>Click on collection to view images.</div>} exact/>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user
});

export default connect(mapStateToProps, null)(Collections);