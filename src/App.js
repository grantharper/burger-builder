import React, {Component} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Auth from './containers/Auth/Auth';
import Logout from "./containers/Auth/Logout/Logout";
import * as actionCreators from './store/actions/index';


class App extends Component {

  componentDidMount() {
    this.props.checkAuth();
  }

  render() {

    let authRoutes = Array.of(
      <Route path="/checkout" component={Checkout}/>,
      <Route path="/orders" component={Orders}/>,
      <Route path="/logout" component={Logout}/>
    );

    let publicRoutes = Array.of(
      <Route path="/auth" component={Auth}/>,
      <Route path="/" exact component={BurgerBuilder}/>,
      <Redirect to="/" />
    );

    return (
      <div>
        <Layout>
          <Switch>
            {this.props.isAuthenticated ? authRoutes.concat(publicRoutes): publicRoutes}
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(actionCreators.authCheckState())
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
