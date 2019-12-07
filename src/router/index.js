import React from "react";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import Homepage from "../containers/Homepage/Homepage";
import LoginForm from "../containers/Login/Login";
import Register from "../containers/Register/Register";
import NotFound from '../components/notFound/notFound';
import Category from "../containers/Category/category";
import ResutlWelcome from "../components/ResultWelcome/ResutlWelcome";
import Admin from "../containers/Admin/Admin";


export default function (props) {
    const {isAuthenticated} = props;
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Homepage} isAuthenticated={isAuthenticated} exact/>
                <Route path="/login" component={LoginForm} exact/>
                <Route path="/register" component={Register} exact/>
                <Route path="/category/:id" component={Category} exact/>
                <Route path="/admin" component={Admin}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}