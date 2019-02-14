import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRouteComponent = (props)=>(
  <Route {...props.routeProps} render={() => (
    props.logged_in ? (
        <div>{props.children}</div>
        ) : (
        <Redirect to={{
            pathname: '/',
            state: { from: props.location }
        }} /> )
    )} />
)
const mapStateToProps = (state, ownProps) => {
    return {
        logged_in: state.isLoginSuccess,
        location: ownProps.path,
        routeProps: {
            exact: ownProps.exact,
            path: ownProps.path
        }
    };
};

const PrivateRoute = connect(mapStateToProps, null, null, { pure: false,})(PrivateRouteComponent);
export default PrivateRoute
