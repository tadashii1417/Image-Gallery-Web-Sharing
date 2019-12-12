import React from "react";
import {Alert} from "antd";
import CollectionsItem from "./CollectionItem";
import styles from './CollectionItem.module.css';
import axios from "../../axios";
import {connect} from "react-redux";
import {Route} from 'react-router-dom';
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
            <div>
                <div className={styles.container}>
                    {this.state.collections.map(col => <CollectionsItem collection={col} key={col.id}/>
                    )}
                </div>
                <Route path={"/profile/:id"} render={() => <CollectionImageList/>} exact/>
                <Route path={"/profile"}
                       render={() => <Alert style={{margin: '50px'}} message="Click on the collection to view images"
                                            type="info" showIcon/>}
                       exact/>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user
});

export default connect(mapStateToProps, null)(Collections);