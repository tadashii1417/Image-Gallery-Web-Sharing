import React, {Component} from 'react';
import './style/materialize.min.css';
import './style/materialize-social.css';
import './style/App.css';
import './style/indexMedia.css';
import Route from './router/index';
import {connect} from "react-redux";
import * as authActions from './store/actions/auth.action';
import {getToken} from "./sessionStorage";

class App extends Component {

    componentDidMount() {
        const {getMe} = this.props;
        getMe(getToken());
    }

    render() {
        const {isAuthenticated, isLoading, user} = this.props;

        if (isLoading) {
            return <div>Loading ...</div>;
        }

        return (
            <Route isAuthenticated={isAuthenticated} user={user}/>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user,
    isLoading: state.uiReducer.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    getMe: (token) => dispatch(authActions.getMe(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
