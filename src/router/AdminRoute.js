import React from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

const AdminRoute = ({component: Component, isAdmin, ...rest}) => {
    return <Route {...rest} render={props => isAdmin ? <Component {...props} /> : <Redirect to='/login'/>}/>;
};
export default AdminRoute;