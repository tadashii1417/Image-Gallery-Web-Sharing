import {Route, Switch, BrowserRouter} from "react-router-dom";
import Homepage from "../containers/Homepage/Homepage";
import LoginForm from "../containers/Login/Login";
import React from "react";
import NotFound from '../components/notFound/notFound';

export default function (props) {
    const {isAuthenticated} = props;
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Homepage} isAuthenticated={isAuthenticated} exact/>
                <Route path="/login" component={LoginForm} exact/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}