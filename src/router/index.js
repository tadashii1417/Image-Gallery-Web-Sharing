import React from "react";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import Homepage from "../containers/Homepage/Homepage";
import LoginForm from "../containers/Login/Login";
import Register from "../containers/Register/Register";
import NotFound from '../components/notFound/notFound';
import Category from "../containers/Category/category";
import Admin from "../containers/Admin/Admin";
import Search from "../containers/Search/search";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../containers/UserProfile/UserProfile";
import EditProfile from "../containers/EditProfile/EditProfile";
import UploadImage from "../containers/UploadImage/UploadImage";

export default function (props) {
    const {isAuthenticated} = props;
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Homepage} isAuthenticated={isAuthenticated} exact/>
                <Route path="/login" component={LoginForm} exact/>
                <Route path="/register" component={Register} exact/>
                <Route path="/category/:id" component={Category} exact/>
                <Route path="/search" component={Search} exact/>
                <Route path="/admin" component={Admin} exact/>
                {/*<Route path="/image-detail/:imageId" component={ImageDetail} exact/>*/}
                <PrivateRoute path="/profile" isAuthenticated={isAuthenticated} component={UserProfile}/>
                <PrivateRoute path="/edit-profile" isAuthenticated={isAuthenticated} component={EditProfile}/>
                <PrivateRoute path="/submit-photo" isAuthenticated={isAuthenticated} component={UploadImage}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}