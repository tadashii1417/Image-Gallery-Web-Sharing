import React from "react";
import {Icon, Tooltip} from "antd";
import 'antd/es/tooltip/style/index.css';

import styles from './CollectionItem.module.css';
import {Link, withRouter} from "react-router-dom";

class CollectionsItem extends React.Component {

    render() {
        const {collection} = this.props;
        return (
            <Link to={this.props.match.url+"/" + collection.id}>
                <Tooltip title={collection.description}>
                    <div className={styles.item}>
                        <Icon type="folder-open" theme="twoTone"/>
                        <div>{collection.name}</div>
                    </div>
                </Tooltip>
            </Link>
        );
    }
}

export default withRouter(CollectionsItem);